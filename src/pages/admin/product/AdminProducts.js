import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Space,
  Image,
  Input,
  Popover,
  Tag,
  Switch,
  Modal,
  Select,
  DatePicker,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  ImportOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { brandService, categoryService, productService } from "../../../services/apiService";

const { RangePicker } = DatePicker;
export default function AdminProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  // Dropdown options (you'd typically fetch these from an API)
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images) =>
        images?.length > 0 ? (
          <Image src={images[0]} alt="Product" width={60} height={60} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true,
      render: (category) => category?.name || "N/A",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: true,
      render: (brand) => brand?.name || "N/A",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: true,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(record._id, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          style={{
            backgroundColor: record.status ? "#22c55e" : "#ff4d4f",
          }}
        />
      ),
    },
    {
      title: "CreateAt",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt) =>
        new Date(createdAt).toLocaleDateString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => navigate(`${location.pathname}/${record._id}`)}
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => handleDeleteProduct(record._id)}
            type="default"
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  // Gọi API để lấy danh sách sản phẩm
  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/employees/products",
        {
          params: {
            page: pagination.current,
            limit: pagination.pageSize,
            name: searchKeyword, // Không truyền tham số nếu không có giá trị
            category: selectedCategory,
            brand: selectedBrand,
            startDate: dateRange?.[0]?.toISOString(),
            endDate: dateRange?.[1]?.toISOString(),
            ...params,
          },
        }
      );

      const { data } = response.data; // response.data.data chứa kết quả trả về
      setProducts(data.products);
      setPagination((prev) => ({
        ...prev,
        total: data.totalProducts,
      }));
    } catch (error) {
      message.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

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
      name: searchKeyword,
      category: selectedCategory,
      brand: selectedBrand,
      startDate: dateRange?.[0]?.toISOString(),
      endDate: dateRange?.[1]?.toISOString(),
    });
  };
  
  const handleSearch = debounce((searchValue) => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchProducts({
    });
  }, 300); // 300ms delay

  const handleReset = () => {
    setSearchKeyword("");
    setSelectedCategory(null);
    setSelectedBrand(null);
    setDateRange(null);
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchProducts();
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
  // Lấy dữ liệu lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  const exportToExcel = () => {
    // Chuẩn bị dữ liệu
    const worksheet = XLSX.utils.json_to_sheet(
      products.map((product) => ({
        ID: product._id,
        Name: product.name,
        Category: product.category?.name || "N/A",
        Brand: product.brand?.name || "N/A",
        Rating: product.rating || "N/A",
        Sold: product.sold || "N/A",
        Status: product.status ? "Active" : "Inactive",
        CreatedAt: new Date(product.createdAt).toLocaleString("vi-VN"),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Xuất file
    XLSX.writeFile(workbook, "Products.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Tiêu đề
    doc.text("Product List", 20, 10);

    // Chuẩn bị dữ liệu cho bảng
    const tableData = products.map((product, index) => [
      index + 1,
      product._id,
      product.name,
      product.category?.name || "N/A",
      product.brand?.name || "N/A",
      product.rating || "N/A",
      product.sold || "N/A",
      product.status ? "Active" : "Inactive",
      new Date(product.createdAt).toLocaleString("vi-VN"),
    ]);

    // Thêm bảng với `jspdf-autotable`
    doc.autoTable({
      head: [
        [
          "#",
          "ID",
          "Name",
          "Category",
          "Brand",
          "Rating",
          "Sold",
          "Status",
          "Created At",
        ],
      ],
      body: tableData,
    });

    // Xuất file PDF
    doc.save("Products.pdf");
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("status", newStatus);
      formdata.append("idproduct", productId);
      await productService.updateProduct(formdata);
      message.success("Cập nhật thành công!");
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, status: newStatus }
            : product
        )
      );
    } catch (error) {
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    Modal.confirm({
      title: "Bạn có chắc xóa sản phẩm?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        try {
          setLoading(true);
          await productService.deleteProduct(productId);
          message.success("Xóa thành công!");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
        } catch (error) {
          console.log(error);
          message.error("Xóa thất bại!");
        } finally {
          setLoading(false);
        }
      },
    });
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Danh sách sản phẩm</h1>
        </div>
        <Space className="flex-wrap">
          <Popover content={<div>Pdf</div>}>
            <Button
              className="text-orange-600"
              onClick={exportToPDF}
              icon={<FilePdfOutlined />}
            />
          </Popover>
          <Popover content={<div>Excel</div>}>
            <Button
              className="text-green-600"
              onClick={exportToExcel}
              icon={<FileExcelOutlined />}
            />
          </Popover>
          <Button
            onClick={() => navigate("/admin/add-product")}
            type="primary"
            icon={<PlusOutlined />}
          >
            Add New Product
          </Button>
          <Button
            type="primary"
            className="bg-blue-600"
            onClick={() => message.info("TÍnh năng đang phát triển!")}
            icon={<ImportOutlined />}
          >
            Import Products
          </Button>
        </Space>
      </div>

      <div className="flex justify-between mb-6 flex-wrap items-center">
        <div>
          <Input
            placeholder="Search"
            onChange={
              (e) => setSearchKeyword(e.target.value) // Gọi hàm debounce
            }
            onPressEnter={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
        </div>

        <div className="flex items-center space-x-2">
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
          <div className="flex space-x-2">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Tìm kiếm
            </Button>
            <Button onClick={handleReset}>Đặt lại</Button>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey={(record) => record._id}
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
        loading={loading}
        className="bg-white rounded shadow"
        scroll={{ x: 1200 }}
      />
    </div>
  );
}
