import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  message,
  Tag,
  Space,
  Popover,
  Button,
  Modal,
  Form,
  Drawer,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  FileExcelOutlined,
  FilePdfOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { adminService } from "../../../services/apiService";
import { formatCurrency } from "../../../utils/currencyUtils";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [sortField, setSortField] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Trạng thái mở/đóng Drawer
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu thông tin order được chọn
  const [form] = Form.useForm(); // Tạo instance form AntD

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id - b._id,
    },
    {
      title: "User",
      dataIndex: ["infomationUser", "name"],
      key: "customerName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Address",
      dataIndex: ["infomationUser", "address"],
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: ["infomationUser", "phone"],
      key: "phone",
    },
    {
      title: "Products",
      dataIndex: "productItem",
      key: "productItem",
      render: (products) =>
        products.map((item) => (
          <div key={item._id}>
            <b>{item.name}</b> - {item.color} / {item.memory} (x{item.quantity})
          </div>
        )),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `${formatCurrency(total)}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        let color = "";
        switch (status) {
          case "PROGRESS":
            color = "blue";
            break;
          case "COMPLETED":
            color = "green";
            break;
          case "CANCELED":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeFilled />} onClick={() => navigate(`/admin/orders/${record._id}`)} />
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

  const exportToExcel = () => {
    const excelData = orders.map((order) => {
      const productDetails = order.productItem
        .map(
          (item) =>
            `${item.name} (${item.color}/${item.memory}) x${item.quantity}`
        )
        .join(", ");

      return {
        "Order ID": order._id,
        User: order.infomationUser.name,
        Address: order.infomationUser.address,
        Phone: order.infomationUser.phone,
        Products: productDetails,
        Total: formatCurrency(order.total),
        Status: order.orderStatus,
        "Created At": new Date(order.createdAt).toLocaleString(),
        "Updated At": new Date(order.updatedAt).toLocaleString(),
      };
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    // Tùy chỉnh kích thước cột
    ws["!cols"] = [
      { wch: 20 }, // Order ID
      { wch: 20 }, // User
      { wch: 30 }, // Address
      { wch: 15 }, // Phone
      { wch: 50 }, // Products
      { wch: 15 }, // Total
      { wch: 15 }, // Status
      { wch: 20 }, // Created At
      { wch: 20 }, // Updated At
    ];

    XLSX.writeFile(wb, "Orders.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF("landscape"); // Chế độ ngang
    const pageWidth = doc.internal.pageSize.getWidth(); // Lấy chiều rộng trang

    // Tiêu đề PDF
    doc.setFontSize(18);
    doc.text("Order List", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(99);

    // Dữ liệu cho bảng
    const tableColumn = [
      "Order ID",
      "User",
      "Address",
      "Phone",
      "Products",
      "Total",
      "Status",
      "Created At",
      "Updated At",
    ];
    const tableRows = [];

    orders.forEach((order) => {
      const productDetails = order.productItem
        .map(
          (item) =>
            `${item.name} (${item.color}/${item.memory}) x${item.quantity}`
        )
        .join(", ");

      const orderData = [
        order._id,
        order.infomationUser.name,
        order.infomationUser.address,
        order.infomationUser.phone,
        productDetails,
        formatCurrency(order.total),
        order.orderStatus,
        new Date(order.createdAt).toLocaleString(),
        new Date(order.updatedAt).toLocaleString(),
      ];
      tableRows.push(orderData);
    });

    // Tạo bảng
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
      },
      columnStyles: {
        2: { cellWidth: 40 }, // Cột Address
        4: { cellWidth: 60 }, // Cột Products
      },
      margin: { top: 25 },
      didDrawPage: (data) => {
        // Thêm footer vào mỗi trang
        const pageCount = doc.internal.getNumberOfPages();
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          pageWidth - 20,
          doc.internal.pageSize.getHeight() - 10,
          {
            align: "right",
          }
        );
      },
    });

    // Lưu file PDF
    doc.save("Orders.pdf");
  };

  const fetchOrders = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
    sortField = "createdAt",
    sortOrder = "asc",
    search = ""
  ) => {
    setLoading(true);
    try {
      const response = await adminService.getOrders({
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          sortField,
          sortOrder,
          search: searchText,
        },
      });
      setOrders(response.data.data.orders);
      setTotal(response.data.data.totalOrders);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch orders");
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
  const handleSearch = (search) => {
    setPagination({ current: 1 });
    fetchOrders(1, pagination.pageSize, sortField, sortOrder, search);
  };
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc xóa order này?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        try {
          setLoading(true);
          await adminService.deleteOrders(id);
          message.success("Xóa thành công!");
          setOrders((prevorders) =>
            prevorders.filter((order) => order._id !== id)
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
  // Xử lý mở Drawer
  const handleEdit = (order) => {
    setSelectedOrder(order);
    form.setFieldsValue(order); // Đặt giá trị mặc định cho form
    setIsDrawerOpen(true);
  };
  // Xử lý đóng Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedOrder(null);
    form.resetFields(); // Reset lại form
  };

  // Cập nhật order
  const handleUpdateOrder = async () => {
    try {
      const values = form.getFieldsValue(); // Lấy dữ liệu từ form
      await adminService.updateOrder(selectedOrder._id, values); // Gửi yêu cầu cập nhật tới API
      message.success("Order updated successfully");
      fetchOrders(); // Refresh danh sách orders
      closeDrawer();
    } catch (error) {
      console.error(error);
      message.error("Failed to update order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Order Management</h1>
        </div>
        <Space className="flex-wrap">
          <Popover content={<div>PDF</div>}>
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
        </Space>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search by username"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{
          ...pagination,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={loading}
        onChange={handleTableChange}
      />

      {/* Drawer */}
      <Drawer
        title="Update Order"
        width={480}
        onClose={closeDrawer}
        open={isDrawerOpen}
        footer={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button type="primary" onClick={handleUpdateOrder}>
              Update
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Order Status"
            name="orderStatus"
            rules={[{ required: true, message: "Please select order status" }]}
          >
            <Select
              options={[
                { value: "PROGRESS", label: "Progress" },
                { value: "DELIVERY", label: "Delivery" },
                { value: "COMPLETED", label: "Completed" },
                { value: "CANCELED", label: "Canceled" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="User Name"
            name={["infomationUser", "name"]}
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name={["infomationUser", "address"]}
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name={["infomationUser", "phone"]}
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminUsers;
