import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Switch, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { adminService } from '../../services/apiService';

const UpdateUserModal= ({ visible, onCancel, onSuccess, user }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      if (values.image && values.image[0]) {
        formData.append('image', values.image[0].originFileObj);
      }

      await adminService.updateUser(user._id, formData);
      message.success('User updated successfully');
      onSuccess();
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Update User"
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        onFinish={onFinish}
      >
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contact" label="Contact">
          <Input />
        </Form.Item>
        <Form.Item name="bonuspoint" label="Bonus Points">
          <InputNumber />
        </Form.Item>
        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch />
        </Form.Item>
    
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;

