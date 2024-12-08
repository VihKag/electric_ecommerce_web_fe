import React from "react";
import { Collapse } from "antd";
const items = [
  {
    key: "1",
    label: " Sản phẩm có được bảo hành không?",
    children: (
      <p>
        Tất cả các sản phẩm như điện thoại, laptop, v.v. đều được bảo hành chính
        hãng. Thời gian bảo hành thường là 12-24 tháng, tùy thuộc vào nhà sản
        xuất. Vui lòng kiểm tra thông tin bảo hành trong mô tả sản phẩm hoặc
        liên hệ với chúng tôi để biết thêm chi tiết.
      </p>
    ),
  },
  {
    key: "2",
    label: "Tôi có thể đổi trả sản phẩm trong trường hợp nào?",
    children: (
      <p>
        Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 7 ngày nếu:
        <ul>
          <li>1. Sản phẩm bị lỗi từ nhà sản xuất.</li>
          <li>2. Sản phẩm không đúng như đơn hàng đã đặt.</li>
          <li>3. Sản phẩm còn nguyên hộp, tem niêm phong, và đầy đủ phụ kiện.</li>
        </ul>
      </p>
    ),
  },
  {
    key: "3",
    label: "Tôi có thể kiểm tra hàng trước khi thanh toán không?",
    children: (
      <p>
        Có, chúng tôi hỗ trợ kiểm tra hàng trước khi thanh toán đối với các đơn
        hàng giao qua dịch vụ COD (thanh toán khi nhận hàng). Quý khách có thể
        kiểm tra ngoại quan sản phẩm và số lượng trước khi nhận hàng.
      </p>
    ),
  },
];
const ProductQuestions = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse
      className="bg-white text-base font-sans font-normal"
      items={items}
      defaultActiveKey={["1"]}
      onChange={onChange}
    />
  );
};
export default ProductQuestions;
