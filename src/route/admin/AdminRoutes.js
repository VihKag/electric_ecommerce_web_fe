import { memo } from "react";
import AdminLayout from "../../layout/AdminLayout";
import AdminProducts from "../../pages/admin/product/AdminProducts";
import AdminOrders from "../../pages/admin/order/AdminOrders";
import AdminUsers from "../../pages/admin/user/AdminUsers";
import { useRoutes } from "react-router-dom";
import AdminBills from "../../pages/admin/bill/AdminBills";

const AdminRoutes = memo(()=>{
    const routes = [
        {
            path: '/',
            element: <AdminLayout />,
            children: [
                {
                    path: 'dashboard',
                    element: <AdminLayout />,
                },
                {
                    path: 'products',
                    element: <AdminProducts/>,
                },
                {
                    path: 'orders',
                    element: <AdminOrders />,
                },
                {
                    path: 'users',
                    element: <AdminUsers />,
                },
                {
                    path: 'bills',
                    element: <AdminBills/>
                },
            ]
        },
    ];
    const element = useRoutes(routes);
    return <>{element}</>
});
export default AdminRoutes;