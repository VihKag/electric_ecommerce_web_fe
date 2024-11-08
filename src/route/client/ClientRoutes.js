import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import ClientLayout from '../../layout/ClientLayout';
import ProductPage from '../../pages/client/product/Product';
import CategoryPage from '../../pages/client/category/Category';
import Home from '../../pages/client/home/Home';
import ShoppingCart from '../../pages/client/cart/ShoppingCart';
import Payment from '../../pages/client/payment/Payment';
import UserDashboard from '../../pages/client/user/UserDashboard';
import UserProfile from '../../pages/client/user/profile/UserProfile';
import Order from '../../pages/client/user/orders/Orders';
import OrderDetails from '../../pages/client/user/orders/order_details/OrderDetail';
import Contact from '../../pages/client/contact/Contact';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import RestorePass from '../../pages/auth/RestorePass';
import NotFound from '../../pages/NotFound';
const categories = [
  'tivi',
  'laptop',
  'dien-thoai',
  'camera',
  'pc',
  'tablet',
  'loa',
  'tai-nghe',
  'phu-kien',
  'do-gia-dung',
];
const ClientRoutes = memo(() => {
  const routes = [
    {
      path: '/',
      element: <ClientLayout />,
      children: [
        {
          index: true, 
          element: <Home />,
        },
        {
          path: "auth/login",
          element: <Login />
        },
        {
          path: "auth/register",
          element: <Register /> 
        },
        {
          path: "aith/restore-password",
          element: <RestorePass />
        },
        ...categories.map(category => ([
          {
            path: category, 
            element: <CategoryPage />,  // Route chỉ có category
          },
          {
            path: `${category}/:productid`, 
            element: <ProductPage />,  // Route cho category và productid
          }
        ])).flat(),
        {
          path: 'cart',
          element: <ShoppingCart />,

        },
        {
          path: 'conact',
          element: <Contact />,

        },
        {
          path: 'payment',
          element: <Payment />,
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register /> 
        },
        {
          path: "restore-password",
          element: <RestorePass />
        },
        {
          path: 'user',
          element: <UserDashboard />,
          children:[
            {
              path: 'profile',
              element: <UserProfile/>,
            },
            {
              path: 'orders',
              element: <Order />,
            },
            {
              path: 'order/:orderId',
              element: <OrderDetails />,
            },
          ]
        },
        {
          path: '*',
          element: <NotFound />, // Đảm bảo trang NotFound được render nếu không tìm thấy route
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
});

export default ClientRoutes;
