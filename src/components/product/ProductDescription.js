import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ProductDescription = ({description}) => {
    const [showMore, setShowMore] = useState(false)
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-600 mb-3">Đặc Điểm Nổi Bật</h2>
        <div>{description}</div>
      </div>
      
    {/* <Button 
          variant="outline"                 
          className="flex items-center justify-center w-56 mx-auto p-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Thu gọn' : 'Xem thêm'}
          {showMore ? <FontAwesomeIcon icon={faChevronUp} className="ml-1 h-4 w-4" /> : <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-4 w-4" />}
        </Button> */}
    </div>
  )
};

export default ProductDescription;
