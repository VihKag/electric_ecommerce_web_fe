import React, { lazy, memo } from "react";
import { Route, Routes } from "react-router-dom";
import EcommerceLayout from "../../layout/EcommerceLayout";
const Home = lazy(() => import("../../pages/ecommerce/home/index"));
const EcommerceRoutes = memo(() => {
  return (
    <>
      <Routes>
        <Route element={<EcommerceLayout />}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </>
  );
});
export default EcommerceRoutes;