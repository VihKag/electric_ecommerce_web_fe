import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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