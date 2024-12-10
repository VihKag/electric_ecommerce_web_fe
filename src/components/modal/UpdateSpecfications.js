import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const UpdateSpecificationsModal = ({
  visible,
  onCancel,
  onUpdate,
  specifications,
}) => {
  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    onUpdate(values.specifications);
  };

  return (
    <Modal
      visible={visible}
      title="Update Specifications"
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={800}
      bodyStyle={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}
    >
      <Form
        form={form}
        initialValues={{ specifications }}
        onFinish={handleUpdate}
      >
        <Form.List name="specifications">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="border p-4 mb-4 rounded">
                  <Form.Item
                    {...restField}
                    name={[name, "category"]}
                    rules={[
                      { required: true, message: "Category is required" },
                    ]}
                  >
                    <Input placeholder="Category" />
                  </Form.Item>
                  <Form.List name={[name, "details"]}>
                    {(
                      detailFields,
                      { add: addDetail, remove: removeDetail }
                    ) => (
                      <>
                        {detailFields.map(
                          ({
                            key: detailKey,
                            name: detailName,
                            ...restDetailField
                          }) => (
                            <div key={detailKey} className="flex space-x-2">
                              <Form.Item
                                {...restDetailField}
                                name={[detailName, "key"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Key is required",
                                  },
                                ]}
                              >
                                <Input placeholder="Key" />
                              </Form.Item>
                              <Form.Item
                                {...restDetailField}
                                name={[detailName, "value"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Value is required",
                                  },
                                ]}
                              >
                                <Input placeholder="Value" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => removeDetail(detailName)}
                              />
                            </div>
                          )
                        )}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => addDetail()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Tạo thêm
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Button
                    type="link"
                    onClick={() => remove(name)}
                    block
                    icon={<MinusCircleOutlined />}
                  >
                    Hủy
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm phần tử
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default UpdateSpecificationsModal;
