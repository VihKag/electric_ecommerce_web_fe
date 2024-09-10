import React, { lazy, memo } from "react";
import { Route, Routes } from "react-router-dom";
import EcommerceLayout from "../../layout/EcommerceLayout";
import Category from "../../pages/ecommerce/category/Category";
const Home = lazy(() => import("../../pages/ecommerce/home/Home"));
const EcommerceRoutes = memo(() => {
  return (
    <>
      <Routes>
        <Route element={<EcommerceLayout />}>
          <Route index element={<Home />}/>
          <Route path="category" element={<Category/>}/>
        </Route>
      </Routes>
    </>
  );
});
export default EcommerceRoutes;