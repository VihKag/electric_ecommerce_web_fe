import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Select,
  DatePicker,
  Modal,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { adminService, brandService, categoryService } from "../../../../services/apiService";

const { RangePicker } = DatePicker;

const ProductOnSales = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  // Search and filter states
  const [searchName, setSearchName] = useState("");
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
      const { data } = await adminService.getAllProductOnSales({
        params: {
          page: pagination.current,
          limit: pagination.pageSize,
          name: searchName,
          category: selectedCategory,
          brand: selectedBrand,
          startDate: dateRange?.[0]?.toISOString(),
          endDate: dateRange?.[1]?.toISOString(),
          ...params,
        },
      });

      if (data.success) {
        setProducts(data.data.products);
        setPagination((prev) => ({
          ...prev,
          total: data.data.totalProducts,
        }));
      }
    } catch (error) {
      message.error("Failed to fetch products");
      console.error(error);
    }
    setLoading(false);
  };

// Handle table changes
const handleTableChange = (newPagination, filters, sorter) => {
  setPagination((prev) => ({
    ...prev,
    current: newPagination.current,
    pageSize: newPagination.pageSize,
  }));

  // Fetch products with updated pagination, filters, and sorter
  fetchProducts({
    page: newPagination.current,
    limit: newPagination.pageSize,
    sortBy: sorter.field || "createdAt",
    order: sorter.order === "descend" ? "desc" : "asc",
    name: searchName,
    category: selectedCategory,
    brand: selectedBrand,
    startDate: dateRange?.[0]?.toISOString(),
    endDate: dateRange?.[1]?.toISOString(),
  });
};

  // Search handler
  const handleSearch = debounce((searchValue) => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchProducts({});
  }, 300);

  // Reset filters
  const handleReset = () => {
    setSearchName("");
    setSelectedCategory(null);
    setSelectedBrand(null);
    setDateRange(null);
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchProducts();
  };

  // Delete product
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa sản phẩm này?",
      onOk: async () => {
        try {
          message.success("Xóa sản phẩm thành công");
          fetchProducts();
        } catch (error) {
          message.error("Xóa sản phẩm thất bại");
        }
      },
    });
  };

  // Fetch initial data
  useEffect(() => {
    fetchProducts();
    // Fetch categories and brands
    const fetchDropdownData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          categoryService.getAllCategories(),
          brandService.getAllBrand(),
        ]);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
      } catch (error) {
        message.error("Failed to fetch dropdown data");
      }
    };
    fetchDropdownData();
  }, []);

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 60,
      render: (_id) => <div>{_id}</div>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (name) => <h5>{name}</h5>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={images[0]}
          alt="product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      key: "category",
      render: (categoryName) => <Tag color="blue">{categoryName}</Tag>,
    },
    {
      title: "Thương hiệu",
      dataIndex: ["brand", "name"],
      key: "brand",
      render: (brandName) => <Tag color="green">{brandName}</Tag>,
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      sorter: true,
      render: (rating) => `${rating}/5`,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      sorter: true,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
            
              icon={<EditOutlined />}
              onClick={() => navigate(`/admin/products/${record._id}`)}
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
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">Products on sales</h1>
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
            {categories.map((cat) => (
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
            {brands.map((brand) => (
              <Select.Option key={brand._id} value={brand._id}>
                {brand.name}
              </Select.Option>
            ))}
          </Select>
          <RangePicker className="w-1/4" onChange={setDateRange} />
        </div>
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
          <Button onClick={handleReset}>Đặt lại</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="ml-auto"
            onClick={() => navigate("/admin/add-product")}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        onChange={handleTableChange}
        rowKey="_id"
        className="bg-white rounded shadow"
      />
    </div>
  );
};

export default ProductOnSales;
