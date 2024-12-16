import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Input,
  Image,
  Tag,
  Modal,
  Form,
  message,
  Switch,
  Upload,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { adminService, brandService } from "../../../services/apiService";
import { toast } from "react-toastify";

const AdminBrands = () => {
  const [brands, setBrands] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [imageFile, setImageFile] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingBrand, setEditingBrand] = useState(null);

  const fetchBrands = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
    sortField = "createdAt",
    sortOrder = "asc",
    search = ""
  ) => {
    setLoading(true);
    try {
      const response = await adminService.getBrands({
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          sortField,
          sortOrder,
          search: searchText,
        },
      });
      console.log(response.data);
      setBrands(response.data.data.brands);
      setTotal(response.data.data.totalBrands);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch employees");
      setLoading(false);
    }
  };


  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sorter && "field" in sorter && "order" in sorter) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === "descend" ? "desc" : "asc");
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id - b._id,
      width: 280,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => <Image src={images} alt="Category" width={50} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];


  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name); // Thêm tên
        formData.append("status", values.status ? "true" : "false"); // Thêm trạng thái

        if (imageFile) {
          imageFile.forEach((file) => {
            formData.append("images", file.originFileObj); // Thêm file thực
          });
        } else {
          console.log("No image selected");
        }

        let response;
        if (editingBrand) {
          // Nếu đang chỉnh sửa danh mục
          formData.append("idproduct", editingBrand._id);
          response = await brandService.updateBrand(
            editingBrand._id,
            formData
          );
        } else {
          // Nếu tạo mới danh mục
          response = await brandService.createBrand(formData);
        }

        if (response.data.success) {
          message.success(response.data.message);
          setIsModalVisible(false);
          form.resetFields();
          setEditingBrand(null);
          setImageFile(null);
          fetchBrands(); // Reload lại danh sách
        } else {
          message.error(response.data.message || "Failed to save brand");
        }
      } catch (error) {
        console.error("Failed to save brand:", error);
        message.error("Failed to save brand");
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingBrand(null);
    setImageFile(null);
  };

  const handleChange = (info) => {
    console.log("Selected files:", info.fileList); // Kiểm tra danh sách file
    setImageFile(info.fileList); // Lưu toàn bộ danh sách file vào state
  };
  const handleSearch = (searchText) => {
    setSearchText(searchText);
    setPagination({...pagination, current: 1 });
  };

  const handleAdd = ()=> {
    form.setFieldsValue();
    setIsModalVisible(true);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    console.log("brand", brand);
    form.setFieldsValue({
      name: brand.name,
      status: brand.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this brand?",
      onOk: async () => {
        try {
          brandService.deleteBrandById(id);
          setBrands(brands.filter((brand) => brand._id !== id));
          message.success("Category deleted successfully");
        } catch (error) {
          console.log(error);
          message.error("Xóa thất bại");
        }
      }
    });
  };

  useEffect(() => {
    fetchBrands();
  }, [pagination]);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Brands Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Brands
        </Button>
      </div>
      <Input
        placeholder="Search brands"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={(e)=> handleSearch(e.target.value)}
        className="mb-4"
        style={{ width: 200 }}
      />
      <Table
        columns={columns}
        dataSource={brands}
        rowKey="_id"
        pagination={{
          ...pagination,
          total,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
      />
      <Modal
        title={editingBrand ? "Edit Category" : "Add New Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Brand Name"
            rules={[
              { required: true, message: "Please input the brand name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="images" label="Image">
            <Upload
              beforeUpload={() => false}
              onChange={handleChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminBrands;
