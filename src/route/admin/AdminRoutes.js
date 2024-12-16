import { memo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import AdminProducts from "../../pages/admin/product/AdminProducts";
import AdminOrders from "../../pages/admin/order/AdminOrders";
import AdminUsers from "../../pages/admin/user/AdminUsers";
import { useRoutes } from "react-router-dom";
import AdminBills from "../../pages/admin/bill/AdminBills";
import ProductDetail from "../../pages/admin/product/ProductDetail/ProductDetail";
import CreateProduct from "../../pages/admin/product/CreateProduct";
import AdminCategories from "../../pages/admin/category/AdminCategory";
import AdminBrands from "../../pages/admin/brand/AdminBrands";
import AdminStaffs from "../../pages/admin/user/AdminStaffs";
import AdminReviews from "../../pages/admin/review/AdminReview";
import ProductOnSales from "../../pages/admin/product/POS/ProductOnSales";
import Statistics from "../../pages/admin/statistic/Statistic";
import FilterAdmin from "../../pages/admin/filter/AdminFilter";
import Wishlist from "../../pages/client/Wishlist/Wishlist";
import AdminBanner from "../../pages/admin/banner/AdminBanner";
import AdminOrderDetails from "../../pages/admin/order/OrderDetail";

const AdminRoutes = memo(()=>{
    const routes = [
        {
            path: '/',
            element: <AdminLayout />,
            children: [
                {
                    exact: true,
                    index: true,
                    element: <Statistics />,
                },

                {
                    path: 'products',
                    element: <AdminProducts/>,
                },
                {
                    path: 'products/:productId',
                    element: <ProductDetail/>,
                },
                {
                    path: 'add-product',
                    element: <CreateProduct/>,
                },
                {
                    path: 'orders',
                    element: <AdminOrders />,
                },
                {
                    path: 'orders/:orderId',
                    element: <AdminOrderDetails />,
                },
                {
                    path: 'users',
                    element: <AdminUsers />,
                },
                {
                    path: 'pos',
                    element: <ProductOnSales/>,
                },
                {
                    path: 'bills',
                    element: <AdminBills/>
                },
                {
                    path: 'reviews',
                    element: <AdminReviews/>
                },
                {
                    path: 'categories',
                    element: <AdminCategories/>,
                },
                {
                    path: 'brands',
                    element: <AdminBrands/>,
                },
                {
                    path: 'staffs',
                    element: <AdminStaffs/>,
                },
                {
                    path: 'filters',
                    element: <FilterAdmin/>,
                },
                {
                    path: 'banners',
                    element: <AdminBanner />,
                }
            ]
        },
    ];
    const element = useRoutes(routes);
    return <>{element}</>
});
export default AdminRoutes;