import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import ClientLayout from '../../layout/ClientLayout';
import ProductPage from '../../pages/client/product/Product';
import CategoryPage from '../../pages/client/category/Category';
import Home from '../../pages/client/home/Home';
import ShoppingCart from '../../pages/client/cart/ShoppingCart';
const ClientRoutes = memo(() => {
  const routes = [
    {
      element: <ClientLayout />,
      children: [
        {
          path: '',
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
      ],
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
});

export default ClientRoutes;
