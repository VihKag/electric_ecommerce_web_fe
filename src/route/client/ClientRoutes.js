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
          path: 'category',
          element: <CategoryPage />,
        },
        {
          path: 'category/:productid',
          element: <ProductPage />,

        },
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
            // {
            //   path: 'addresses',
            //   element: <Addresses />,
            // },
            // {
            //   path: 'change-password',
            //   element: <ChangePassword />,
            // },
            // {
            //   path: 'logout',
            //   element: <Logout />,
            // },
          ]
        },
        
      ],
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
});

export default ClientRoutes;
