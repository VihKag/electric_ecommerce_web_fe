import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../../../components/locationSelector/LocationSelector";

export default function PaymentForm(){
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const navigate = useNavigate();
    const handlePayment = () => {
      alert("Payment successful!");
      navigate("/");
    };
    return(
        <>
        <form className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full p-2 border rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Địa chỉ"
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4">
                <LocationSelector/>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phương thức vận chuyển</h3>
                <div className="border rounded p-4 text-center">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Shipping method"
                    className="mx-auto mb-2"
                  />
                  <p>
                    Vui lòng chọn tỉnh / thành để có danh sách phương thức vận
                    chuyển.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <img src="/placeholder.svg?height=24&width=24" alt="COD" />
                    Thanh toán khi giao hàng (COD)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                    />
                    <img
                      src="/placeholder.svg?height=24&width=24"
                      alt="Bank transfer"
                    />
                    Chuyển khoản qua ngân hàng
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Hoàn tất đơn hàng
              </Button>
            </form>
        </>
    );
}