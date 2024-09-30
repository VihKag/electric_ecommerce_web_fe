import { useLocation, useNavigate } from "react-router-dom";
import { Button, Divider } from "antd";
import { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemsForPayment, subtotal } = location.state || {};
  useEffect(() => {
    if (!itemsForPayment || itemsForPayment.length === 0) {
      setTimeout(() => navigate("/cart"), 1000);
    }
  }, [itemsForPayment, navigate]);
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Của hàng điện tử KT</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
            <p className="mb-4">
              Bạn đã có tài khoản?{" "}
              <a href="#" className="text-blue-600">
                Đăng nhập
              </a>
            </p>
            <div>
              <PaymentForm />
            </div>
          </div>
          <div className="w-full md:w-1/3 p-2 ">
            <div>
              {itemsForPayment?.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="flex gap-4 mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex">
                        <p className="text-xs font-semibold">{item.title}</p>
                        <span className="text-gray-600 text-sm">
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Divider />
            <div className="mt-4">
              <input
                type="text"
                placeholder="Mã giảm giá"
                className="w-full p-2 border rounded"
              />
              <Button className="mt-2 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">
                Sử dụng
              </Button>
            </div>
            <Divider />
            <div className="flex justify-between items-center my-4">
              <span>Phí vận chuyển</span>
              <span>—</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Tổng cộng</span>
              <span className={subtotal > 0 ? `text-primary` : null}>{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
