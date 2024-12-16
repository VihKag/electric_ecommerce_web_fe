import { useEffect, useState } from 'react'
import { Modal, Form, Input, message, Select } from 'antd'
import { adminService } from '../../services/apiService'


export default function AddStaffModal({ visible, onCancel, onSuccess }) {
    const [form] = Form.useForm();
    
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = async (values) => {
      try {
        setLoading(true)
        await adminService.createStaff(values);
        message.success('Staff registered successfully')
        form.resetFields()
        onSuccess()
      } catch (error) {
        message.error(error.response?.data?.message || 'Failed to register staff')
      } finally {
        setLoading(false)
      }
    }
    useEffect(() => {
      if (visible) {
        form.resetFields();
      }
    }, [visible, form]);
  return (
    <Modal
      title="Add New Staff"
      open={visible}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      okText="Register"
      confirmLoading={loading}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="username"
          label="Username"
          defaultValue=""
          rules={[
            { required: true, message: 'Please input username!' },
            { min: 3, message: 'Username must be at least 3 characters!' }
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select placeholder="Select a role">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="employee">Staff</Select.Option>
            <Select.Option value="manager">Manager</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="contact"
          label="Contact"
          rules={[
            { required: true, message: 'Please input contact number!' },
            { pattern: /^\d+$/, message: 'Please enter a valid phone number!' }
          ]}
        >
          <Input placeholder="Enter contact number" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

