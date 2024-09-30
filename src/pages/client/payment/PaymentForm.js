import { Button, Radio, Space, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../../../components/locationSelector/LocationSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar, faTruckFast } from "@fortawesome/free-solid-svg-icons";

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [valueRadio, setValueRadio] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const handlePayment = () => {
    console.log("Form Data:", formData);
    console.log("Payment Method:", paymentMethod);
    console.log("Shipping Method:", valueRadio === 1 ? "Giao hàng tận nơi" : "Tự lấy ở cửa hàng");
    alert("Payment successful!");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShippingChange = (e) => {
    console.log("radio checked", e.target.value);
    setValueRadio(e.target.value);
  };

  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handlePayment();
        }}
      >
        <Input
          type="text"
          placeholder="Họ và tên"
          className="w-full p-2 border rounded"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <div className="flex gap-4">
          <Input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="tel"
            placeholder="Số điện thoại"
            className="w-full p-2 border rounded"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <Input
          type="text"
          placeholder="Địa chỉ"
          className="w-full p-2 border rounded"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <div>
          <LocationSelector />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Phương thức vận chuyển</h3>
          <div className="">
            <Radio.Group
              onChange={handleShippingChange}
              value={valueRadio}
              size="large"
            >
              <Space direction="vertical">
                <Radio className="text-base" value={1}>
                  Giao hàng tận nơi
                </Radio>
                <Radio className="text-base" value={2}>
                  Tự lấy ở cửa hàng
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            size="large"
          >
            <Space direction="vertical">
              <Radio className="text-base" value="cod">
                <FontAwesomeIcon icon={faTruckFast} /> Thanh toán khi giao hàng (COD)
              </Radio>
              <Radio className="text-base" value="bank">
                <FontAwesomeIcon icon={faMoneyCheckDollar} /> Chuyển khoản qua ngân hàng
              </Radio>
            </Space>
          </Radio.Group>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full py-4 px-4 rounded-md bg-sale text-white"
        >
          Hoàn tất đơn hàng
        </Button>
      </form>
    </>
  );
}
