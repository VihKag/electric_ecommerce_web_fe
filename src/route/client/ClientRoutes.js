import React, { memo } from "react";
import { useRoutes } from "react-router-dom";
import ClientLayout from "../../layout/ClientLayout";
import ProductPage from "../../pages/client/product/Product";
import CategoryPage from "../../pages/client/category/Category";
import Home from "../../pages/client/home/Home";
import ShoppingCart from "../../pages/client/cart/ShoppingCart";
import UserDashboard from "../../pages/client/user/UserDashboard";
import UserProfile from "../../pages/client/user/profile/UserProfile";
import Order from "../../pages/client/user/orders/Orders";
import Contact from "../../pages/client/contact/Contact";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import RestorePass from "../../pages/auth/RestorePass";
import NotFound from "../../pages/NotFound";
import SearchResultPage from "../../pages/client/product/SearchResultPage";
import ChangePassword from "../../pages/auth/ChangePassword";
import FooterContent from "../../components/footer/FooterContent";
import AddressList from "../../pages/client/user/address/UserAddresses";
import Checkout from "../../pages/client/checkout/Checkout";
import OrderSuccess from "../../pages/client/Order/OrderFailure";
import FailedOrderPage from "../../pages/client/Order/OrderFailure";
import SuccessOrderPage from "../../pages/client/Order/OrderSuccess";
import Wishlist from "../../pages/client/Wishlist/Wishlist";
import UserInvoices from "../../pages/client/user/bill/Bill";
const ClientRoutes = memo(() => {
  const routes = [
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "auth/register",
          element: <Register />,
        },
        {
          path: "auth/restore-password",
          element: <RestorePass />,
        },
        {
          path: "auth/change-password",
          element: <ChangePassword />,
        },
        {
          path: "category/:categoryId",
          element: <CategoryPage />, // Route chỉ có category
        },
        {
          path: "cart",
          element: <ShoppingCart />,
        },
        {
          path: "conact",
          element: <Contact />,
        },
        // {
        //   path: "payment",
        //   element: <Payment />,
        // },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "restore-password",
          element: <RestorePass />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "/order/failed",
          element: <FailedOrderPage />,
        },
        {
          path: "/order/success",
          element: <SuccessOrderPage />,
        },
        {
          path: "wishList",
          element: <Wishlist />,
        },
        {
          path: "user",
          element: <UserDashboard />,
          children: [
            {
              path: "profile",
              element: <UserProfile />,
            },
            {
              path: "bills",
              element: <UserInvoices />,
            },
            {
              path: "orders",
              element: <Order />,
            },
            {
              path: "addresses",
              element: <AddressList />, // Route chỉ cho phép người dùng đăng nhập vào
            },
          ],
        },
        {
          path: `product/:productId`,
          element: <ProductPage />,
        },
        {
          path: `search`,
          element: <SearchResultPage />,
        },
        {
          path: "our/:page",
          element: <FooterContent />,
        },
        {
          path: "/order/success",
          element: <OrderSuccess />,
        },
        {
          path: "*",
          element: <NotFound />, // Đảm bảo trang NotFound được render nếu không tìm thấy route
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
});

export default ClientRoutes;
