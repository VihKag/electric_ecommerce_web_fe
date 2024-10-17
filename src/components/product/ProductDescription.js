import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ProductDescription = () => {
    const [showMore, setShowMore] = useState(false)
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-600 mb-3">Đặc Điểm Nổi Bật</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Phù hợp cho lập trình viên, thiết kế đồ họa 2D, dân văn phòng</li>
          <li>Hiệu năng vượt trội - Cân mọi tác vụ từ word, exel đến chỉnh sửa ảnh trên các phần mềm như AI, PTS</li>
          <li>Đa nhiệm mượt mà - Ram 8GB cho phép vừa mở trình duyệt để tra cứu thông tin, vừa làm việc trên phần mềm</li>
          <li>Trang bị SSD 256GB - Cho thời gian khởi động nhanh chóng, tối ưu hoá thời gian load ứng dụng</li>
          <li>Chất lượng hình ảnh sắc nét - Màn hình Retina cao cấp cùng công nghệ TrueTone cân bằng màu sắc</li>
          <li>Thiết kế sang trọng - Nặng chỉ 1.29KG, độ dày 16.1mm. Tiện lợi mang theo mọi nơi</li>
        </ul>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Macbook Air M1 2020 - Sang trọng, tinh tế, hiệu năng khủng</h1>
      
      <p className="mb-4">
        Macbook Air M1 là dòng sản phẩm có thiết kế mỏng nhẹ, sang trọng và tinh tế cùng với đó là giá thành phải chăng nên 
        MacBook Air đã thu hút được đông đảo người dùng yêu thích và lựa chọn. Đây cũng là một trong những phiên bản 
        Macbook Air mới nhất mà khách hàng không thể bỏ qua khi đến với CellphoneS. Dưới đây là chi tiết về thiết kế, cấu 
        hình của máy.
      </p>
      
      <h2 className="text-xl font-semibold mb-2">Thiết kế tinh tế, chất liệu nhôm bền bỉ</h2>
      
      <div className={`transition-all duration-300 overflow-hidden ${showMore ? 'max-h-none' : 'max-h-20'}`}>
        <p className="mb-4">
          Macbook Air 2020 M1 mới vẫn luôn tuân thủ triết lý thiết kế với những đường nét đơn nhưng vô cùng sang trọng. Máy 
          có độ mỏng nhẹ chỉ 1.29kg và các cạnh trần viền khiến thiết bị trở nên đẹp hơn và cao cấp hơn.
        </p>

        <h2 className="text-xl font-semibold">Hiệu năng mạnh mẽ với chip M1</h2>
        <p>
          MacBook Air M1 2020 được trang bị bộ vi xử lý Apple M1 mới nhất, mang lại hiệu năng vượt trội. Chip M1 
          tích hợp CPU 8 nhân, GPU 7 nhân và Neural Engine 16 nhân, cho phép máy xử lý các tác vụ đa nhiệm mượt mà, 
          render video nhanh chóng và chạy các ứng dụng đồ họa phức tạp một cách dễ dàng.
        </p>

        <h2 className="text-xl font-semibold">Thời lượng pin ấn tượng</h2>
        <p>
          Với chip M1 tiết kiệm năng lượng, MacBook Air 2020 có thể hoạt động liên tục lên đến 18 giờ, cho phép bạn 
          làm việc cả ngày mà không cần sạc pin. Đây là một cải tiến đáng kể so với các phiên bản MacBook Air trước đó.
        </p>

        <h2 className="text-xl font-semibold">Màn hình Retina sắc nét</h2>
        <p>
          MacBook Air M1 2020 sở hữu màn hình Retina 13.3 inch với độ phân giải 2560 x 1600 pixels, mang lại hình ảnh 
          sắc nét và màu sắc chân thực. Công nghệ True Tone tự động điều chỉnh nhiệt độ màu của màn hình để phù hợp 
          với môi trường xung quanh, giúp bảo vệ mắt người dùng.
        </p>
      </div>
      
    <div className='description-btn w-full h-full relative'>
    <Button 
          variant="outline"                 
          className="flex items-center justify-center w-56 mx-auto p-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Thu gọn' : 'Xem thêm'}
          {showMore ? <FontAwesomeIcon icon={faChevronUp} className="ml-1 h-4 w-4" /> : <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-4 w-4" />}
        </Button>
    </div>
    </div>
  )
};

export default ProductDescription;
