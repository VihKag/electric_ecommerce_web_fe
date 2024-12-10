import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Form,
  Button,
  Radio,
  Space,
  Typography,
  Divider,
  List,
  Avatar,
  Spin,
} from "antd";
import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddressModal from "../../../components/modal/AddressModal";

const { Title, Text } = Typography;

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    toast.info("Vui lòng đăng nhập!");
    navigate("/auth/login");
  }
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10); // Thời gian đếm ngược ban đầu
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const ckt = searchParams.get("ckt");
  const productItems = JSON.parse(sessionStorage.getItem(ckt)) || [];
  // Tính tổng tiền (dùng useMemo để tránh tính lại không cần thiết)
  const totalAmount = useMemo(
    () =>
      productItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [productItems]
  );
  // Fetch địa chỉ từ server (dùng useCallback để tránh khởi tạo lại hàm)
  const fetchAddresses = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/address/${user.id}`
      );
      if (response.data.success) {
        setAddresses(response.data.data);

        // Set default address (status = true)
        const defaultAddress = response.data.data.find((addr) => addr.status);
        if (defaultAddress) {
          form.setFieldsValue({ selectedAddress: defaultAddress._id });
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  }, [form, user?.id]);

  // Xử lý thanh toán qua VNPAY
  const handleVNPAYPayment = useCallback(async () => {
    try {
      if (totalAmount <= 0) throw new Error("Số tiền thanh toán không hợp lệ.");

      const response = await axios.post(
        "http://127.0.0.1:4000/payment/create_payment_urlv2",
        { amount: totalAmount },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success && response.data.paymentUrl) {
        return response.data.paymentUrl;
      } else {
        throw new Error(
          response.data.message || "Không thể tạo liên kết thanh toán."
        );
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xử lý thanh toán qua VNPAY.");
      throw error;
    }
  }, [totalAmount]);

  // Tạo đơn hàng
  const createOrder = useCallback(async () => {
    try {
      const payload = {
        user: user.id,
        productItem: productItems,
        informationUser: {
          address:
            addresses.find((addr) => addr._id === selectedAddress)?.address ||
            "",
          phone:
            addresses.find((addr) => addr._id === selectedAddress)?.phone || "",
          name: user.username || "",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:4000/orders",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        if (paymentMethod === "vnpay") {
          const paymentUrl = await handleVNPAYPayment();
          if (paymentUrl) window.location.href = paymentUrl;
        } else if (paymentMethod === "cash") {
          toast.success("Đặt hàng thành công!");
          navigate("/order/success", { state: response.data.order });
        }
      } else {
        toast.error("Đặt hàng thất bại!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");
    }
  }, [
    user,
    productItems,
    addresses,
    selectedAddress,
    paymentMethod,
    navigate,
    handleVNPAYPayment,
  ]);

  // Xử lý fetch địa chỉ khi mount
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Đặt địa chỉ mặc định khi danh sách địa chỉ thay đổi
  useEffect(() => {
    const defaultAddress = addresses.find((address) => address.status);
    setSelectedAddress(defaultAddress?._id || addresses[0]?._id || null);
  }, [addresses]);

  // Xử lý khi không có sản phẩm
  useEffect(() => {
    if (productItems.length === 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      const navigateTimer = setTimeout(() => navigate("/"), 10000);
      return () => {
        clearInterval(timer);
        clearTimeout(navigateTimer);
      };
    }
  }, [productItems, navigate]);

  if (productItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold mb-4">
          Không có sản phẩm nào trong giỏ hàng. Bạn sẽ được chuyển về trang chủ
          trong {countdown} giây.
        </p>
      </div>
    );
  }

  const onFinish = () => {
    createOrder();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        userId: user.id,
        address: `${values.house}, ${values.ward}, ${values.district}, ${values.province}`,
        name: values.name,
        phone: values.phone,
        status: true,
      };

      const response = await axios.post(
        "http://127.0.0.1:4000/address/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("Địa chỉ đã được thêm thành công!");
        form.resetFields();
        setIsModalOpen(false);
        fetchAddresses();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Thêm địa chỉ thất bại!");
      } else if (error.request) {
        toast.error("Không thể kết nối đến máy chủ!");
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
      console.error(error);
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value); // Cập nhật giá trị khi chọn một địa chỉ khác
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="container max-w-[1200px] h-screen mx-auto px-4 py-8">
      <Title level={2} className="mb-6">
        THANH TOÁN
      </Title>
      <div className="flex flex-col md:flex-row gap-8">
        <AddressModal
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          form={form}
        />
        <div className="w-full md:w-2/3">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <Title level={4}>Địa chỉ giao hàng</Title>
              {loading ? (
                <div className="flex justify-center py-4">
                  <Spin />
                </div>
              ) : addresses.length === 0 ? ( // Kiểm tra nếu không có địa chỉ
                <div className="flex flex-col items-center py-4">
                  <Text>Chưa có địa chỉ!</Text>
                  <button
                    onClick={() => setIsModalOpen(true)} // Điều hướng đến trang thêm địa chỉ
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Thêm địa chỉ
                  </button>
                </div>
              ) : (
                <Form.Item
                  name="selectedAddress"
                  rules={[
                    { required: true, message: "Please select an address" },
                  ]}
                >
                  <Radio.Group
                    value={selectedAddress} // Thiết lập giá trị hiện tại
                    onChange={handleAddressChange} // Xử lý thay đổi khi người dùng chọn
                    className="w-full"
                  >
                    {addresses.map((address) => (
                      <Radio
                        key={address._id}
                        value={address._id}
                        className="w-full border p-4 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex flex-col">
                          <Text strong>{address.name}</Text>
                          <Text>{address.phone}</Text>
                          <Text>{address.address}</Text>
                          {address.status && (
                            <Text type="success" className="mt-1">
                              Địa chỉ mặc định
                            </Text>
                          )}
                        </div>
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <Title level={4}>Phương thức thanh toán</Title>
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
              >
                <Space direction="vertical">
                  <Radio value="vnpay">
                    <Space>
                      <CreditCardOutlined />
                      Thanh toán VNPAY
                    </Space>
                  </Radio>
                  <Radio value="cash">
                    <Space>
                      <DollarOutlined />
                      Thanh toán khi nhận hàng
                    </Space>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>

            <Button type="primary" htmlType="submit" className="w-full">
              Đặt hàng
            </Button>
          </Form>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Title level={4}>Đơn hàng</Title>
            <ProductList items={productItems} />
            <Divider />
            <OrderSummary items={productItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

const OrderSummary = ({ items }) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0; // You can adjust this if there's a shipping fee
  const total = subtotal + shipping;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Text>Subtotal:</Text>
        <Text>{subtotal.toLocaleString("vi-VN")} ₫</Text>
      </div>
      <div className="flex justify-between">
        <Text>Shipping:</Text>
        <Text>
          {shipping === 0 ? "Free" : `${shipping.toLocaleString("vi-VN")} ₫`}
        </Text>
      </div>
      <div className="flex justify-between font-semibold">
        <Text>Total:</Text>
        <Text>{total.toLocaleString("vi-VN")} ₫</Text>
      </div>
    </div>
  );
};

const ProductList = ({ items }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.images} shape="square" size={64} />}
            title={item.name}
            description={
              <div>
                <p>{`${item.memory}, ${item.color}`}</p>
                <p>{`Quantity: ${item.quantity}`}</p>
                <p className="font-semibold">{`${item.price.toLocaleString(
                  "vi-VN"
                )} ₫`}</p>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};
