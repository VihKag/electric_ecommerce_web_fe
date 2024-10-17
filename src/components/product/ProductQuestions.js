import React from 'react';
import { Collapse } from 'antd';
const text = `
  SPARK Go 2024 sở hữu màn hình lớn với công nghệ IPS LCD và tần số quét 90Hz cho chất lượng hiển thị tốt và thao tác cuộn lướt mượt mà hơn, 
  bên cạnh đó máy còn được trang bị tính năng Dynamic Port giúp hiển thị thông tin ngay lập tức giúp bạn dễ dàng tra cứu và theo dõi hơn. 
`;
const items = [
  {
    key: '1',
    label: 'Công nghệ màn hình có gì nổi bật?',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'TECNO SPARK Go 2024 dùng chip gì, xử lí nhanh không?',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'TECNO SPARK Go 2024 có những phiên bản màu sắc nào?',
    children: <p>{text}</p>,
  },
];
const ProductQuestions = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return <Collapse className='bg-white' items={items} defaultActiveKey={['1']} onChange={onChange} />;
};
export default ProductQuestions;