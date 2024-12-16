import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import { useEffect } from "react";
import { adminService } from "../../services/apiService";

const UpdateVariantsModal = ({
  visible,
  onCancel,
  onUpdate,
  productId,
  memory,
  variants = [],
  mode = "create",
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "update" && variants) {
      // Nếu là chế độ update, set dữ liệu từ variants
      form.setFieldsValue({ variants, memory });
    } else {
      form.resetFields();
    }
  }, [variants, memory, mode]);


  const handleFinish = async (values) => {
    console.log(values);
    try {
      const payload = {
        productId,
        memory: mode === "create" ? values.memory : memory, // Lấy memory từ input hoặc prop
        variants: values.variants,
      };
      console.log("payload: ",payload);
      if (mode === "create") {
        // Gọi API tạo mới
        await adminService.createVariant(payload);
        message.success("Variants created successfully");
      } else {
        // Gọi API cập nhật (cần thay đổi API phù hợp nếu có update từng variant)
        await adminService.updateVariants(payload);
        message.success("Variants updated successfully");
      }
      
      onUpdate(); // Làm mới dữ liệu sản phẩm
      onCancel(); // Đóng modal
      form.resetFields();
    } catch (error) {
      console.error("Failed to save variant:", error);
      message.error("Failed to save variant");
    }
  };

  return (
      <Modal
      className="mt-10"
        title={mode === "create" ? "Add Variant" : `Update Variant ${memory}`}
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            {mode === "create" ? "Add" : "Update"}
          </Button>,
        ]}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto"}} // Thêm scroll khi nội dung quá dài
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {mode === "create" && (
            <Form.Item
              label="Type"
              name="memory"
              rules={[{ required: true, message: "Memory is required" }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.List name="variants" initialValue={variants}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} style={{ marginBottom: 16, border: "1px solid #ccc", padding: 16, borderRadius: 4 }}>
                    <Form.Item
                      {...restField}
                      label="Color"
                      name={[name, "color"]}
                      fieldKey={[fieldKey, "color"]}
                      rules={[{ required: true, message: "Color is required" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Initial Price"
                      name={[name, "price", "initial"]}
                      fieldKey={[fieldKey, "price", "initial"]}
                      rules={[{ required: true, message: "Initial Price is required" }]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Discount Price"
                      name={[name, "price", "discount"]}
                      fieldKey={[fieldKey, "price", "discount"]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Stock Quantity"
                      name={[name, "stockQuantity"]}
                      fieldKey={[fieldKey, "stockQuantity"]}
                      rules={[{ required: true, message: "Stock Quantity is required" }]}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Button type="dashed" danger onClick={() => remove(name)}>
                      Remove Variant
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Variant
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
  );
};

export default UpdateVariantsModal;
