import React, { useState } from "react";
import { Modal, Button } from "antd";

const ProductSummary = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm để mở modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm để đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Specifications } = product;

  return (
    <div className="specifications-summary text-text border p-2 mt-4">
      <h2>Thông số kỹ thuật</h2>
      {/* Tóm tắt thông số */}
      <ul>
        <li className="p-2 flex justify-between items-center">
          <div>Màn hình</div>
          <p>{Specifications.display.screen}</p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Camera chính</div>
          <p>{Specifications.camera.camera}</p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Ram - Bộ nhớ</div>
          <p>
            {Specifications.storage.ram} -{" "}
            {Specifications.storage.internal_storage}
          </p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Pin</div>
          <p>{Specifications.battery.battery}</p>
        </li>
        <li className="p-2 flex justify-between items-center">
          <div>Hệ điều hành</div>
          <p>{Specifications.operating_system.android}</p>
        </li>
      </ul>

      <Button className="w-full" onClick={showModal}>Xem đầy đủ thông số</Button>

      <Modal
        title="Thông số kỹ thuật đầy đủ"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
        <div className="specifications-summary text-text">
          <h2>Thông số kỹ thuật</h2>
          {/* Tóm tắt thông số */}
          <ul>
            <li className="p-2 flex justify-between items-center">
              <div>Màn hình</div>
              <p>{Specifications.display.screen}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Công nghệ màn hình</div>
              <p>{Specifications.display.technology}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Camera chính</div>
              <p>{Specifications.camera.camera}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Camera góc siêu rộng</div>
              <p>{Specifications.camera.ultra_wide_camera}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>RAM</div>
              <p>{Specifications.storage.ram}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Bộ nhớ trong</div>
              <p>{Specifications.storage.internal_storage}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Pin</div>
              <p>{Specifications.battery.battery}</p>
            </li>
            <li className="p-2 flex justify-between items-center">
              <div>Sạc nhanh</div>
              <p>{Specifications.battery.charging_technology}</p>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};
export default ProductSummary;
