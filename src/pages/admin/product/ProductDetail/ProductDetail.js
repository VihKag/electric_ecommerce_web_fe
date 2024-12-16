import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Descriptions,
  Image,
  Tabs,
  Tag,
  Modal,
  message,
} from "antd";
import { EditOutlined, HomeOutlined, StarFilled } from "@ant-design/icons";
import { adminService } from "../../../../services/apiService";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../../utils/currencyUtils";
import { toast } from "react-toastify";
import UpdateProductModal from "../../../../components/modal/UpdateProduct";
import UpdateSpecificationsModal from "../../../../components/modal/UpdateSpecfications";
import UpdateVariantsModal from "../../../../components/modal/UpdateVariantModal";
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateSpecsModalVisible, setUpdateSpecsModalVisible] = useState(false);
  const [variantMode, setVariantMode] = useState("create"); // 'create' hoặc 'update'
  const [updateVariantsModalVisible, setUpdateVariantsModalVisible] =
    useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleOpenVariantModal = (mode, variant = null) => {
    setVariantMode(mode);
    setSelectedVariant(variant);
    console.log("variants: ",variant);
    setUpdateVariantsModalVisible(true);
  };

  useEffect(() => {
    if (selectedVariant) {
      setUpdateVariantsModalVisible(true); // Mở modal sau khi state đã có giá trị
    }
  }, [selectedVariant]);

  useState(false);
  const { productId } = useParams();
  const fetchProduct = async () => {
    try {
      // Fetch product data from API or database
      const response = await adminService.getProductById(productId);
      console.log("product: ", response.data);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateSpecifications = async (specifications) => {
    try {
      const response = adminService.updateSpecifications(
        productId,
        specifications
      );
      message.success("Specifications updated successfully");
      fetchProduct();
      setUpdateSpecsModalVisible(false);
    } catch (error) {
      console.error("Failed to update specifications:", error);
      message.error("Failed to update specifications");
    }
  };
  const handleDeleteVariant = async (variantId) => {
    try {
      await adminService.deleteVariant(variantId);
      message.success("Variant deleted successfully");
      fetchProduct();
    } catch (error) {
      console.error("Failed to delete variant:", error);
      message.error("Failed to delete variant");
    }
  }
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <Breadcrumb
        className="text-base font-medium m-1"
        separator=">"
        items={[
          {
            href: "/admin",
            title: <HomeOutlined />,
          },
          {
            href: `/admin/products`,
            title: (
              <>
                <span>Sản phẩm</span>
              </>
            ),
          },
          {
            title: product?.name,
          },
        ]}
      />

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Basic Info" key="1">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 pr-4">
                <Image.PreviewGroup>
                  {product?.images?.map((img, index) => (
                    <Image
                      key={index}
                      width={200}
                      src={img}
                      className="mb-2 mr-2"
                    />
                  ))}
                </Image.PreviewGroup>
              </div>
              <div className="w-full md:w-1/2">
                <Descriptions column={1}>
                  <Descriptions.Item label="Category">
                    {product?.category?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand">
                    {product?.brand?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rating">
                    <StarFilled className="text-yellow-400" /> {product.rating}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sold">
                    {product?.sold}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={product.status ? "green" : "red"}>
                      {product?.status ? "Active" : "Inactive"}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stock">
                    <Tag color={product.isStock ? "green" : "red"}>
                      {product?.isStock ? "In Stock" : "Out of Stock"}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{product?.description}</p>
            </div>
            <div className="mt-9 absolute right-[-20px] py-2">
              <Button
                type="default"
                size="large"
                icon={<EditOutlined />}
                onClick={() => setUpdateModalVisible(true)}
              >
                Update
              </Button>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Specifications" key="2">
            {product.specifications?.length > 0
              ? product.specifications.map((spec, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {spec.category}
                    </h3>
                    <Descriptions column={1} bordered size="small">
                      {spec.details.map((detail, detailIndex) => (
                        <Descriptions.Item key={detailIndex} label={detail.key}>
                          {detail.value}
                        </Descriptions.Item>
                      ))}
                    </Descriptions>
                  </div>
                ))
              : null}
            <div className="mt-9 absolute right-[-20px] py-2">
              <Button
                type="default"
                size="large"
                icon={<EditOutlined />}
                onClick={() => setUpdateSpecsModalVisible(true)}
              >
                Edit
              </Button>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Variants" key="3">
            {product.variants?.length > 0 ? (
              product.variants.map((variant, index) => (
                <div key={index} className="mb-4">
                  <div className="text-lg font-semibold mb-2 flex justify-between items-center">
                    <div>{variant.memory !=="null" ? variant.memory : null}</div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          handleOpenVariantModal("update", variant)
                        }
                      >
                        Update
                      </Button>
                      <Button danger onClick={() =>handleDeleteVariant(variant._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Color
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Initial Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Discount Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {variant.variants.map((v, vIndex) => (
                        <tr key={vIndex}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {v.color}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatCurrency(v.price.initial)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatCurrency(v.price.discount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {v.stockQuantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p>No variants available.</p>
            )}
            <div className="mt-9 absolute right-[-20px] py-2">
              <Button
                type="primary"
                onClick={() => handleOpenVariantModal("create")}
              >
                Add Variant
              </Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>

      <UpdateProductModal
        visible={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        onUpdate={fetchProduct}
        product={product}
      />
      <UpdateSpecificationsModal
        visible={updateSpecsModalVisible}
        onCancel={() => setUpdateSpecsModalVisible(false)}
        onUpdate={handleUpdateSpecifications}
        specifications={product.specifications || []}
      />
      <UpdateVariantsModal
        visible={updateVariantsModalVisible}
        onCancel={() => setUpdateVariantsModalVisible(false)}
        onUpdate={fetchProduct}
        mode={variantMode}
        variants={selectedVariant ? selectedVariant.variants : []}
        memory={variantMode === "update" ? selectedVariant.memory : null}
        productId={productId}
      />
    </>
  );
};
export default ProductDetail;
