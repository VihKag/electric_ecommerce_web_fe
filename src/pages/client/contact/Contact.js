import React from 'react'
import { Form, Input, Button, Card, Typography} from 'antd'
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography
const { TextArea } = Input

export default function Contact() {
  const onFinish = (values) => {
    console.log('Form values:', values)
    // Here you would typically send the form data to your backend
  }
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Title level={1} className="text-center mb-8">Contact Us</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <Title level={3}>Send us a message</Title>
            <Form
              name="contact"
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please input the subject!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please input your message!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div>
            <Card className="shadow-lg mb-8">
              <Title level={3}>Contact Information</Title>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MailOutlined className="text-xl text-blue-600 mr-4" />
                  <div>
                    <Paragraph className="mb-0 font-semibold">Email</Paragraph>
                    <Paragraph className="mb-0">contact@example.com</Paragraph>
                  </div>
                </div>
                <div className="flex items-center">
                  <PhoneOutlined className="text-xl text-blue-600 mr-4" />
                  <div>
                    <Paragraph className="mb-0 font-semibold">Phone</Paragraph>
                    <Paragraph className="mb-0">+1 (123) 456-7890</Paragraph>
                  </div>
                </div>
                <div className="flex items-center">
                  <EnvironmentOutlined className="text-xl text-blue-600 mr-4" />
                  <div>
                    <Paragraph className="mb-0 font-semibold">Address</Paragraph>
                    <Paragraph className="mb-0">123 Example Street, City, Country</Paragraph>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="shadow-lg">
              <Title level={3}>Our Location</Title>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Map location"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}