import React,{useState} from 'react'
import { Card, Button, Tag, Modal, Rate, Input, Upload, Divider } from 'antd'
import { PhoneOutlined, EnvironmentOutlined, UserOutlined,CameraOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
const { TextArea } = Input
export default function OrderDetails() {
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false)
  const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];
  const showReviewModal = () => {
    setIsReviewModalVisible(true)
  }

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false)
  }

  const handleReviewSubmit = () => {
    // Handle review submission logic here
    setIsReviewModalVisible(false)
  }
  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100">
      <Card title="Chi tiết đơn hàng" extra={<Button type="primary" danger>Đã hủy</Button>}>
        <div className="mb-4">
          <p className="font-semibold">Mã đơn hàng: WN0302219909</p>
          <p className="text-gray-500">29/9/2024 21:12</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src="/placeholder.svg?height=80&width=80" alt="TECNO SPARK Go 2024" className="w-20 h-20 object-cover mr-4" />
            <div>
              <h3 className="font-semibold">TECNO SPARK Go 2024-Vàng</h3>
              <Tag color="gold">Vàng</Tag>
            </div>
          </div>
          <p>Số lượng: 1</p>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="primary" danger onClick={showReviewModal}>Đánh giá</Button>
          <Button>Mua lại</Button>
        </div>

        <Divider />

        <h3 className="font-semibold mb-2">Thông tin thanh toán</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Tổng tiền sản phẩm:</span>
            <span>2.190.000đ</span>
          </div>
          <div className="flex justify-between">
            <span>Giảm giá:</span>
            <span className="text-red-500">-240.000đ</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển:</span>
            <span>Miễn phí</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Phải thanh toán:</span>
            <span>1.950.000đ</span>
          </div>
          <div className="flex justify-between font-semibold text-red-500">
            <span>Còn phải thanh toán:</span>
            <span>1.950.000đ</span>
          </div>
        </div>

        <Divider />

        <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
        <div className="space-y-2">
          <p><UserOutlined className="mr-2" /> Nguyễn Vinh Khang</p>
          <p><PhoneOutlined className="mr-2" /> 0327447104</p>
          <p><EnvironmentOutlined className="mr-2" /> 218-220 Trần Quang Khải, Phường Tân Định, Quận 1</p>
        </div>

        <Divider />

        <h3 className="font-semibold mb-2">Thông tin hỗ trợ</h3>
        <div className="space-y-2">
          <p>Số điện thoại cửa hàng:</p>
          <p className="text-red-500"><PhoneOutlined className="mr-2" /> (028) 7100 0218</p>
          <p>Địa chỉ cửa hàng:</p>
          <p><EnvironmentOutlined className="mr-2" /> 218-220 Trần Quang Khải, Phường Tân Định, Quận 1</p>
        </div>
        <Button type="link" className="p-0 mt-2 text-blue-500">xem chỉ đường</Button>
      </Card>

      <Modal
        title="Đánh giá & nhận xét"
        visible={isReviewModalVisible}
        onCancel={handleReviewCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleReviewSubmit}>
            GỬI ĐÁNH GIÁ
          </Button>,
        ]}
      >
        <div className="flex items-center mb-4">
          <img src="/placeholder.svg?height=60&width=60" alt="TECNO SPARK Go 2024" className="w-16 h-16 object-cover mr-4" />
          <h3 className="font-semibold">TECNO SPARK Go 2024-Vàng</h3>
        </div>

        <div className="mb-4 text-lg font-medium">
          Đánh giá: <span className='ml-4'><Rate className='text-lg' tooltips={desc}  /></span>
        </div>

        <Divider>Trải nghiệm</Divider>

        <div className="space-y-4 mb-4">
          <div className="flex justify-between items-center">
            <span>Hiệu năng</span>
            <div>
              <Rate className='text-sm' tooltips={desc}  />
              <span className="ml-2 text-sm">Siêu mạnh mẽ</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Thời lượng pin</span>
            <div>
              <Rate className='text-sm' tooltips={desc}  />
              <span className="ml-2 text-sm">Cực khủng</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Chất lượng camera</span>
            <div>
              <Rate className='text-sm' tooltips={desc}  />
              <span className="ml-2 text-sm">Chụp đẹp, chuyên nghiệp</span>
            </div>
          </div>
        </div>

        <TextArea rows={4} placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm" />

        <Upload
          listType="picture-card"
          className="mt-4"
        >
          <div>
            <CameraOutlined />
            <div className="mt-2">Thêm hình ảnh</div>
          </div>
        </Upload>
      </Modal>
    </div>
  )
}