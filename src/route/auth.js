import { Spin } from "antd";
import React, { lazy, memo } from "react";
import { Route, Routes } from "react-router-dom";
import AuthenLayout from "../layout/AuthenLayout";
const Login = lazy(() => import("../pages/auth/Login"));
// const ForgotPass = lazy(() => import('../pages/auth/ForgotPass'));
// const SignUp = lazy(() => import('../pages/auth/SignUp'));
// const FbSignUp = lazy(() => import('../pages/auth/FbSignUp'));
// const FbLogin = lazy(() => import('../pages/auth/FbLogin'));

export const AuthenRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthenLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};
