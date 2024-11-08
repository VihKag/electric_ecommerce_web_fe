import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Image,
  Avatar,
  Input,
  Dropdown,
  Popover,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  ImportOutlined,
  SearchOutlined,
  DownOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

export default function AdminProducts() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => (
        <Space>
          <Image
            src={record.image}
            alt={text}
            width={40}
            height={40}
            className="object-cover rounded"
            fallback="/placeholder.svg"
          />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Qty",
      dataIndex: "qty",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (user) => (
        <Space>
          <Avatar src={user.avatar} />
          <span>{user.name}</span>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="default" icon={<EditOutlined />} />
          <Button type="default" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      product: "Lenovo 3rd Generation",
      image:
        "https://res.cloudinary.com/dpczlxs5i/image/upload/v1729336787/kltn/pg6vinktycuxqkawnfwe.jpg",
      sku: "PT001",
      category: "Laptop",
      brand: "Lenovo",
      price: 12500.0,
      unit: "Pc",
      qty: 100,
      createdBy: {
        name: "Arroon",
        avatar:
          "https://res.cloudinary.com/dpczlxs5i/image/upload/v1727797764/kltn/nvhplrsb52daynbjfcnv.png",
      },
    },
    {
      key: "2",
      product: "Bold V3.2",
      image:
        "https://res.cloudinary.com/dpczlxs5i/image/upload/v1729336787/kltn/pg6vinktycuxqkawnfwe.jpg",
      sku: "PT002",
      category: "Electronics",
      brand: "Bolt",
      price: 1600.0,
      unit: "Pc",
      qty: 140,
      createdBy: {
        name: "Kenneth",
        avatar:
          "https://res.cloudinary.com/dpczlxs5i/image/upload/v1727797764/kltn/nvhplrsb52daynbjfcnv.png",
      },
    },
    // Add more sample data here...
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Product List</h1>
          <p className="text-gray-500">Manage your products</p>
        </div>
        <Space>
          <Popover content={<div>Pdf</div>} title={null}>
            <Button className="text-orange-600" icon={<FilePdfOutlined />} />
          </Popover>
          <Popover content={<div>Excel</div>} title={null}>
            <Button className="text-green-600" icon={<FileExcelOutlined />} />
          </Popover>
          <Popover content={<div>Print</div>} title={null}>
            <Button icon={<PrinterOutlined />} />
          </Popover>
          <Button type="primary" icon={<PlusOutlined />}>
            Add New Product
          </Button>
          <Button
            type="primary"
            className="bg-blue-600"
            icon={<ImportOutlined />}
          >
            Import Product
          </Button>
        </Space>
      </div>

      <div className="flex justify-between mb-6">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <Space>
          <Button icon={<SearchOutlined />}>Filter</Button>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "Name" },
                { key: "2", label: "Date" },
                { key: "3", label: "Price" },
              ],
            }}
          >
            <Button>
              Sort by <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
}
