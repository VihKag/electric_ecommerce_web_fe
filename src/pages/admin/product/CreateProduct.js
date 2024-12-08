import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  InputNumber,
  message,
  Space,
  Radio,
  Switch,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { adminService } from "../../../services/apiService";
import { v4 as uuidv4 } from "uuid"; 
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState("variants");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const fetchBrands = async () => {
    try {
      const response = await adminService.getBrands();
      console.log("brands: ", response.data.data);
      setBrands(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await adminService.getCategories();
      console.log("categories: ", response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      let memoryVariants;
      if (productType === "single") {
        memoryVariants = [
          {
            memory: null,
            variants: [values.singleVariant],
          },
        ];
      } else {
        memoryVariants = values.memoryVariants;
      }
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("brand", values.brand);
      formData.append("description", values.description);
      formData.append("specifications", JSON.stringify(values.specifications)); // Serialize to JSON string
      formData.append("memoryVariants", JSON.stringify(memoryVariants));
      // Append each file to the FormData
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      formData.append(
        "status",
        values.status ? JSON.stringify(values.status) : "false"
      );
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await adminService.postProducts(formData);
      console.log(response.data);
      message.success("Product created successfully with all details");
      form.resetFields();
      setFileList([]);
      navigate(`/admin/products/${response.data.data._id}`);
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while saving the product");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);
  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
      <Form
        form={form}
        name="productForm"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6"
      >
        {/* Product Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Thông tin sản phẩm</h2>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories?.map((cate) => (
                <Option key={cate._id} value={cate._id}>
                  {cate.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="brand"
            label="Thương hiệu"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn thương hiệu">
              {brands?.map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả sản phẩm"
            rules={[{ required: true }]}
          >
            <TextArea rows={8} />
          </Form.Item>
          <Form.Item
            name="images"
            label="Hình ảnh"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent auto upload
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked" // Sử dụng valuePropName để binding giá trị checked
          >
            <Switch defaultChecked={false} />
          </Form.Item>
        </div>
        <div className="md:grid md:grid-cols-2 gap-4">
          {/* Specifications */}
          <div className="bg-white p-6 rounded-lg shadow mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Thông số sản phẩm</h2>
            <Form.List name="specifications">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div key={uuidv4()} className="space-y-2">
                      <Form.Item
                        {...restField}
                        name={[name, "category"]}
                        rules={[
                          { required: true, message: "Thiếu loại!" },
                        ]}
                      >
                        <Input placeholder="Loại" />
                      </Form.Item>
                      <Form.List name={[name, "details"]}>
                        {(
                          detailFields,
                          { add: addDetail, remove: removeDetail }
                        ) => (
                          <>
                            {detailFields.map((detailField) => (
                              <div
                                key={uuidv4()}
                                className="flex items-center space-x-2"
                              >
                                <Form.Item
                                  {...detailField}
                                  name={[detailField.name, "key"]}
                                  rules={[
                                    { required: true, message: "Thiếu từ khóa!" },
                                  ]}
                                >
                                  <Input placeholder="Key" />
                                </Form.Item>
                                <Form.Item
                                  {...detailField}
                                  name={[detailField.name, "value"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Thiếu giá trị!",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Value" />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => removeDetail(detailField.name)}
                                />
                              </div>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addDetail()}
                                block
                              >
                                Xác nhận
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                      <Button type="link" onClick={() => remove(name)} block>
                        Hủy bỏ
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Tạo thêm
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          {/* Variants */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Variants</h2>
            <Form.Item name="productType" label="Product Type">
              <Radio.Group
                onChange={(e) => setProductType(e.target.value)}
                value={productType}
              >
                <Radio key="single-radio" value="single">
                  Single
                </Radio>
                <Radio key="variants-radio" value="variants">
                  Variants
                </Radio>
              </Radio.Group>
            </Form.Item>

            {productType === "single" ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Single</h3>
                <Space direction="vertical" className="w-full">
                  <Form.Item
                    name={["singleVariant", "color"]}
                    rules={[{ required: true, message: "Thiếu loại" }]}
                  >
                    <Input placeholder="Loại" />
                  </Form.Item>
                  <Form.Item
                    name={["singleVariant", "price", "initial"]}
                    rules={[
                      { required: true, message: "Thiếu giá tiền" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Giá gốc"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item name={["singleVariant", "price", "discount"]}>
                    <InputNumber
                      placeholder="Giá giảm (Không bắt buộc)"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["singleVariant", "stockQuantity"]}
                    label="Số lượng"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Số lượng"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Space>
              </div>
            ) : (
              <Form.List name="memoryVariants">
                {(memoryFields, { add: addMemory, remove: removeMemory }) => (
                  <>
                    {memoryFields.map((memoryField, memoryIndex) => (
                      <div key={uuidv4()} className="border-b pb-4 mb-4">
                        <Form.Item
                          {...memoryField}
                          label="Loại"
                          name={[memoryField.name, "memory"]}
                          rules={[
                            { required: true, message: "Missing memory" },
                          ]}
                        >
                          <Input placeholder="e.g. 64GB, 128GB" />
                        </Form.Item>
                        <Form.List name={[memoryField.name, "variants"]}>
                          {(
                            variantFields,
                            { add: addVariant, remove: removeVariant }
                          ) => (
                            <>
                              {variantFields.map((variantField) => (
                                <div
                                  key={uuidv4()}
                                  className="flex items-center space-x-2 mb-2"
                                >
                                  <Form.Item
                                    {...variantField}
                                    name={[variantField.name, "color"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing color",
                                      },
                                    ]}
                                    className="mb-0 flex-grow"
                                  >
                                    <Input placeholder="Color" />
                                  </Form.Item>
                                  <Form.Item
                                    {...variantField}
                                    name={[variantField.name, "stockQuantity"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter stock quantity",
                                      },
                                    ]}
                                    className="mb-0"
                                  >
                                    <InputNumber
                                      placeholder="Stock Quantity"
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...variantField}
                                    name={[
                                      variantField.name,
                                      "price",
                                      "initial",
                                    ]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing initial price",
                                      },
                                    ]}
                                    className="mb-0"
                                  >
                                    <InputNumber
                                      placeholder="Initial Price"
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...variantField}
                                    name={[
                                      variantField.name,
                                      "price",
                                      "discount",
                                    ]}
                                    className="mb-0"
                                  >
                                    <InputNumber
                                      placeholder="Discount"
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    onClick={() =>
                                      removeVariant(variantField.name)
                                    }
                                  />
                                </div>
                              ))}
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => addVariant()}
                                  block
                                >
                                  Tạo thêm
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                        {memoryFields.length > 1 && (
                          <Button
                            type="link"
                            onClick={() => removeMemory(memoryField.name)}
                            block
                          >
                            Hủy bỏ
                          </Button>
                        )}
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => addMemory()} block>
                        Tạo thêm
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            )}
          </div>
        </div>

        <Form.Item className="absolute px-12 w-80 right-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full py-4"
          >
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateProduct;
