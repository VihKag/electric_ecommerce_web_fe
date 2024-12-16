import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, message, Space, Spin, Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
const { Text } = Typography;
const PaymentResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Gọi API xác nhận trạng thái thanh toán với backend
        const response = await axios.post("https://techzone-2ow9.onrender.com/payment/verify", {
          paymentUrl: state.paymentUrl,
        });

        if (response.data.success) {
          // Thanh toán thành công
          message.success("Thanh toán thành công!");
          console.log(response.data);
          navigate("/order/success");
        } else {
          // Thanh toán thất bại
          message.error("Thanh toán không thành công");
          navigate("/order/failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        message.error("Đã xảy ra lỗi khi xác minh thanh toán");
        navigate("/order/failed");
      }
    };

    checkPaymentStatus();
  }, [state.paymentUrl, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <Card className="w-80 text-center shadow-md">
      <Space direction="vertical" size="large" className="w-full">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
        <Text className="text-lg font-semibold animate-pulse">
          Đang xử lý kết quả thanh toán...
        </Text>
      </Space>
    </Card>
  </div>
  );
};

export default PaymentResult;