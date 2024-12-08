import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Descriptions, Image, Tabs, Tag } from "antd";
import { HomeOutlined, StarFilled } from "@ant-design/icons";
import { adminService } from "../../../../services/apiService";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../../utils/currencyUtils";

const ProductDetail = () => {
  // const { productId, specifications, variants } = sampleProductData;
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const fetchProduct = async () => {
    try {
      // Fetch product data from API or database
      const response = await adminService.getProductById(productId);
      console.log(response.data);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
            title: product.productId?.name,
          },
        ]}
      />

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{productId.name}</h1>

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Basic Info" key="1">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 pr-4">
                <Image.PreviewGroup>
                  {product.productId?.images.map((img, index) => (
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
                    {product.productId?.category.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand">
                    {product.productId?.brand.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rating">
                    <StarFilled className="text-yellow-400" />{" "}
                    {productId.rating}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sold">
                    {product.productId?.sold}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={productId.status ? "green" : "red"}>
                      {product.productId?.status ? "Active" : "Inactive"}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Stock">
                    <Tag color={productId.isStock ? "green" : "red"}>
                      {product.productId?.isStock ? "In Stock" : "Out of Stock"}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{product.productId?.description}</p>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Specifications" key="2">
            {product.specifications?.length > 0 ?
              (product.specifications.map((spec, index) => (
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
              ))) : (
                <div>
                  <Button>
                    Tạo mới
                  </Button>
                </div>
              ) }
          </Tabs.TabPane>

          <Tabs.TabPane tab="Variants" key="3">
            {product.variants?.length > 0 ? (
              product.variants.map((variant, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {variant.memory}
                  </h3>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <div >
                <Button>Tạo mới</Button>
              </div>
            )}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default ProductDetail;
