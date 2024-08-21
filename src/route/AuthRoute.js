import React, { lazy, memo } from "react";
import { Route, Routes } from "react-router-dom";
import AuthenLayout from "../layout/AuthenLayout";
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
// const SignUp = lazy(() => import('../pages/auth/SignUp'));
// const FbSignUp = lazy(() => import('../pages/auth/FbSignUp'));
// const FbLogin = lazy(() => import('../pages/auth/FbLogin'));
const RestorePass = lazy(() => import('../pages/auth/RestorePass'));
export const AuthenRoutes = memo(()=>{
  return (
    <Routes>
      <Route element={<AuthenLayout />}>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/restore-password" element={<RestorePass />} />
      </Route>
    </Routes>
  );
});
