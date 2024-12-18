import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  message,
  Tooltip,
  Space,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { categoryService, filtersService } from "../../../services/apiService";

const { Option } = Select;

const FiltersTable = () => {
  const [filters, setFilters] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({});
  const [categories, setCategories] = useState([]);
  const [actions, setActions] = useState(false);
  const [form] = Form.useForm(); // Tạo instance form
  const columns = [
    {
      title: "Category",
      dataIndex: ["categoryId"],
      key: "category",
      render: (categoryId) => (
        <div className="flex items-center gap-2">
          {categoryId.images && <img src={categoryId.images} alt={categoryId.name} width={64} />}
          {categoryId.name}
        </div>)
    },
    {
      title: "Filters",
      dataIndex: "filters",
      key: "filters",
      render: (filters) => (
        <ul>
          {filters.map((filter, index) => (
            <li key={index}>
              <strong>{filter.key}:</strong> {filter.values.join(", ")}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => showDrawer(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    console.log(record);
    setIsEditMode(!!record);
    setCurrentFilter(record);
  };

  const handleCancel = () => {
    setIsDrawerVisible(false);
    setCurrentFilter(null);
    setIsEditMode(false);
    form.resetFields(); 
  };

  const handleAddFilter = () => {
    setIsDrawerVisible(true);
    setIsEditMode(false);
    setCurrentFilter(null);
  };

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        categoryId: isEditMode
          ? currentFilter.categoryId?._id // Giữ nguyên categoryId khi chỉnh sửa
          : values.categoryId?._id, // Lấy giá trị mới khi tạo mới
      };

      if (isEditMode) {
        console.log(currentFilter._id);
        await filtersService.updateFilters(currentFilter._id, formattedValues);
        message.success("Filter updated successfully");
      } else {
        await filtersService.createFilters(formattedValues);
        message.success("Filter created successfully");
      }

      setIsDrawerVisible(false);
      setCurrentFilter(null);

      // Fetch updated list
      const response = await filtersService.getFilters();
      setFilters(response.data.data);
    } catch (error) {
      console.error("Error saving filter:", error);
      message.error("Failed to save filter. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filtersResponse, categoriesResponse] = await Promise.all([
          filtersService.getFilters(),
          categoryService.getAllCategories(),
        ]);
        setFilters(filtersResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        message.error("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Filters</h1>
      <Button type="primary" onClick={handleAddFilter} className="mb-4">
        Add Filter
      </Button>
      <Table columns={columns} dataSource={filters} rowKey="_id" />
      <Drawer
        title={isEditMode ? "Edit Filter" : "Add Filter"}
        placement="right"
        onClose={handleCancel}
        visible={isDrawerVisible}
        width="40%"
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          initialValues={{
            categoryId: isEditMode ? currentFilter?.categoryId?._id : undefined,
            filters: currentFilter?.filters || [],
          }}
          onFinish={handleSubmit}
        >
          {isEditMode ? null :
                    <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={[{ required: true, message: "Please select a category!" }]}
                  >
                    <Select placeholder="Select a category">
                      {categories.map((category) => (
                        <Option key={category._id} value={category._id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
        
          }
          <Form.List name="filters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      fieldKey={[fieldKey, "key"]}
                      rules={[
                        { required: true, message: "Missing filter key" },
                      ]}
                    >
                      <Input placeholder="Filter key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "type"]}
                      fieldKey={[fieldKey, "type"]}
                      initialValue="list"
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.List name={[name, "values"]}>
                      {(
                        valueFields,
                        { add: addValue, remove: removeValue }
                      ) => (
                        <>
                          {valueFields.map((valueField, index) => (
                            <Space
                              key={valueField.key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...valueField}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input value or delete this field.",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  placeholder="Value"
                                  style={{ width: "60%" }}
                                />
                              </Form.Item>
                              {valueFields.length > 1 && (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => removeValue(valueField.name)}
                                />
                              )}
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => addValue()}
                              icon={<PlusOutlined />}
                            >
                              Add value
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add filter
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Update Filter" : "Add Filter"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default FiltersTable;
