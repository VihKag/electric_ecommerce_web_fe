import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Input, 
  Button, 
  Space, 
  Select, 
  DatePicker, 
  Modal, 
  Tag, 
  Tooltip 
} from 'antd';
import { 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const { RangePicker } = DatePicker;

const ProductOnSales = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  
  // Search and filter states
  const [searchName, setSearchName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  
  // Dropdown options (you'd typically fetch these from an API)
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch products
  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
        console.log(selectedCategory);
        console.log(selectedBrand);
      const { data } = await axios.get('http://127.0.0.1:4000/employees/products/sales', {
        params: {
          page: pagination.current,
          limit: pagination.pageSize,
          name: searchName,
          category: selectedCategory,
          brand: selectedBrand,
          startDate: dateRange?.[0]?.toISOString(),
          endDate: dateRange?.[1]?.toISOString(),
          ...params
        }
      });

      if (data.success) {
        setProducts(data.data.products);
        setPagination(prev => ({
          ...prev,
          total: data.data.totalProducts
        }));
      }
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error(error);
    }
    setLoading(false);
  };

  // Handle table changes
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
    fetchProducts({
      sortBy: sorter.field || 'createdAt',
      order: sorter.order === 'descend' ? 'desc' : 'asc'
    });
  };

  // Search handler
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchProducts();
  };

  // Reset filters
  const handleReset = () => {
    setSearchName('');
    setSelectedCategory(null);
    setSelectedBrand(null);
    setDateRange(null);
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchProducts();
  };

  // Delete product
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa sản phẩm này?',
      onOk: async () => {
        try {
        //   await axios.delete(`http://127.0.0.1:4000/products/sales/${id}`);
          toast.success('Xóa sản phẩm thành công');
          fetchProducts();
        } catch (error) {
          toast.error('Xóa sản phẩm thất bại');
        }
      }
    });
  };

  // Fetch initial data
  useEffect(() => {
    fetchProducts();
    // Fetch categories and brands
    const fetchDropdownData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axios.get('http://127.0.0.1:4000/categories'),
          axios.get('http://127.0.0.1:4000/brands')
        ]);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
      } catch (error) {
        toast.error('Failed to fetch dropdown data');
      }
    };
    fetchDropdownData();
  }, []);

  // Table columns
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (name) => <strong>{name}</strong>
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <img 
          src={images[0]} 
          alt="product" 
          className="w-16 h-16 object-cover rounded"
        />
      )
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category',
      render: (categoryName) => (
        <Tag color="blue">{categoryName}</Tag>
      )
    },
    {
      title: 'Thương hiệu',
      dataIndex: ['brand', 'name'],
      key: 'brand',
      render: (brandName) => (
        <Tag color="green">{brandName}</Tag>
      )
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      sorter: true,
      render: (rating) => `${rating}/5`
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold',
      sorter: true
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button 
              icon={<EditOutlined />} 
              onClick={() => {/* Mở modal chỉnh sửa */}}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div className="p-4 bg-gray-50">
      <div className="mb-4 bg-white p-4 rounded shadow">
        <div className="flex items-center space-x-2 mb-4">
          <Input 
            placeholder="Tìm kiếm theo tên sản phẩm"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-1/4"
          />
          <Select 
            placeholder="Chọn danh mục" 
            className="w-1/4"
            value={selectedCategory}
            onChange={setSelectedCategory}
            allowClear
          >
            {categories.map(cat => (
              <Select.Option key={cat._id} value={cat._id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
          <Select 
            placeholder="Chọn thương hiệu" 
            className="w-1/4"
            value={selectedBrand}
            onChange={setSelectedBrand}
            allowClear
          >
            {brands.map(brand => (
              <Select.Option key={brand._id} value={brand._id}>
                {brand.name}
              </Select.Option>
            ))}
          </Select>
          <RangePicker 
            className="w-1/4"
            onChange={setDateRange}
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
          <Button 
            onClick={handleReset}
          >
            Đặt lại
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            className="ml-auto"
            onClick={() => {/* Mở modal thêm sản phẩm */}}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <Table 
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="_id"
        className="bg-white rounded shadow"
      />
    </div>
  );
};

export default ProductOnSales;