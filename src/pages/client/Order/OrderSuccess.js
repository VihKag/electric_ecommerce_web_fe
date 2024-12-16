import React, { useEffect, useState } from "react";
import { Card, Descriptions, Typography, Result, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/currencyUtils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../redux/slices/cartSlice";
import { commonService } from "../../../services/apiService";

const { Title } = Typography;

const SuccessOrderPage = () => {
  const user = useSelector((state)=> state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.auth.user);
  const [searchParams] = useSearchParams(); // Destructure to get the search parameters
  const [orderDetails, setOrderDetails] = useState({});
  useEffect(() => {
    // Convert search params to an object
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value);
    });
    //Thiết lập thông tin đơn hàng VNPAY
    setOrderDetails(params);


  // Gửi thông tin tới API createorder
  const createOrder = async () => {
    const data = JSON.parse(sessionStorage.getItem(`order`));
    console.log('payload: ',data);
    try {
      const payload = {
        ...data,
        paid: params.vnp_BankCode ? true : false,
        billCode: params.vnp_BankCode ? params.vnp_BankCode : "COD",
        vnp_TxnRef: params.vnp_TxnRef,
        vnp_PayDate: params.vnp_PayDate,
        vnp_Amount: params.vnp_Amount,
        vnp_BankCode: params.vnp_BankCode,
        vnp_CardType: params.vnp_CardType,
      }
      
      const response = await commonService.createOrder(payload);

      console.log("Order created successfully:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  createOrder();
  dispatch(fetchCart(user.id));
  }, [searchParams]);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <Card>
        <Result
          icon={<CheckCircleOutlined />}
          title="Payment Successful"
          subTitle="Your order has been processed successfully."
          extra={[
            <Button type="primary" onClick={() => navigate("/")} key="back">
              Quay về trang chủ
            </Button>,
          ]}
        />
        <Title level={2}>Thông tin đơn hàng</Title>
        <Descriptions bordered>
          <Descriptions.Item label="Order ID">
            {orderDetails.vnp_TxnRef}
          </Descriptions.Item>
          <Descriptions.Item label="Amount">
            {formatCurrency(orderDetails.vnp_Amount)}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Date">
            {orderDetails.vnp_PayDate}
          </Descriptions.Item>
          <Descriptions.Item label="Card Type">
            {orderDetails.vnp_CardType}
          </Descriptions.Item>
          <Descriptions.Item label="Bank Code">
            {orderDetails.vnp_BankCode}
          </Descriptions.Item>
          <Descriptions.Item label="Order Info">
            {orderDetails.vnp_OrderInfo?.split(":").pop()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default SuccessOrderPage;
