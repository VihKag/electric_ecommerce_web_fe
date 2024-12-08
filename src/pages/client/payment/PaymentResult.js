import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Gọi API xác nhận trạng thái thanh toán với backend
        const response = await axios.post("http://127.0.0.1:4000/payment/verify", {
          paymentUrl: state.paymentUrl,
        });

        if (response.data.success) {
          // Thanh toán thành công
          toast.success("Thanh toán thành công!");
          navigate("/order/success");
        } else {
          // Thanh toán thất bại
          toast.error("Thanh toán không thành công");
          navigate("/order/failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Đã xảy ra lỗi khi xác minh thanh toán");
        navigate("/order/failed");
      }
    };

    checkPaymentStatus();
  }, [state.paymentUrl, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span>Đang xử lý kết quả thanh toán...</span>
    </div>
  );
};

export default PaymentResult;