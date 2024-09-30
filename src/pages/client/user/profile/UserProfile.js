import React, { useState } from 'react'
import { Avatar, Button, Card, Form, Input, Select, DatePicker, message } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons'

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const onFinish = (values) => {
    console.log('Success:', values)
    message.success('Profile updated successfully!')
    setIsEditing(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.error('Failed to update profile. Please try again.')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Hồ sơ tài khoản</h1>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
          <div className="border-t border-gray-200">
            <Form
              name="user-profile"
              initialValues={{
                name: 'NGUYỄN VINH KHANG',
                email: 'nguyenvinhkhang@example.com',
                phone: '0327447104',
                address: '123 Main St, Ho Chi Minh City, Vietnam',
                membershipLevel: 'NULL',
                birthdate: null,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="px-4 py-5 sm:p-6"
            >
              <div className="flex justify-center mb-6">
                <Avatar size={128} icon={<UserOutlined />} src="/placeholder.svg?height=128&width=128" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input prefix={<UserOutlined />} disabled={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} disabled={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input prefix={<PhoneOutlined />} disabled={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please input your address!' }]}
                >
                  <Input prefix={<HomeOutlined />} disabled={!isEditing} />
                </Form.Item>
                <Form.Item name="membershipLevel" label="Membership Level">
                  <Select disabled={!isEditing}>
                    <Select.Option value="SNULL">SNULL</Select.Option>
                    <Select.Option value="SILVER">SILVER</Select.Option>
                    <Select.Option value="GOLD">GOLD</Select.Option>
                    <Select.Option value="PLATINUM">PLATINUM</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="birthdate" label="Birthdate">
                  <DatePicker className="w-full" disabled={!isEditing} />
                </Form.Item>
              </div>
              {isEditing && (
                <Form.Item className="mt-6">
                  <Button type="primary" htmlType="submit" className="w-full">
                    Save Changes
                  </Button>
                </Form.Item>
              )}
            </Form>
          </div>
          {!isEditing && (
            <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Member since: <time dateTime="2020-01-07">January 7, 2020</time>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Last updated: <time dateTime="2023-01-01">January 1, 2023</time>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}