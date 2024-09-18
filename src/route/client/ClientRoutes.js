import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import ClientLayout from '../../layout/ClientLayout';
import ProductPage from '../../pages/ecommerce/product/Product';
import CategoryPage from '../../pages/ecommerce/category/Category';
import Home from '../../pages/ecommerce/home/Home';
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
      ],
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
});

export default ClientRoutes;
