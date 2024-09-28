import { Button, Modal } from "antd";
import { useState } from "react";

export default function PaymentMethods() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    Modal.destroyAll();
    setIsModalOpen(false);
  };
  return (
    <div className="w-full">
      <Button type="primary" onClick={showModal}>
        Phương thức thanh toán
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Các phương thức thanh toán"
        footer={[
          <Button type="primary" onClick={handleCancel}>
            Xác nhận
          </Button>,
        ]}
      >
        <div>Thanh toán ondivne qua các hình thức tài khoản ngân hàng</div>
        <div>Thanh toán trực tiếp qua điện thoại</div>
        <div>Thanh toán trực tuyến qua email</div>
      </Modal>
    </div>
  );
}
