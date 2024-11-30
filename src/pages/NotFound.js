import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, Bạn đã truy cập vào trang không tồn tại."
        extra={[
          <Button
            type="primary"
            key="console"
            className="bg-primary hover:bg-primary border-primary hover:border-primary"
            onClick={() => navigate('/')}
          >
            Trang chủ
          </Button>,
          <Button key="buy" onClick={() => navigate(-1)}>Quay lại</Button>,
        ]}
      />
    </div>
  )
}