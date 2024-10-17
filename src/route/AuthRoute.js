import React, { Children, lazy, memo } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import AuthenLayout from "../layout/AuthenLayout";
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const RestorePass = lazy(() => import('../pages/auth/RestorePass'));
export const AuthenRoutes = memo(()=>{
  const routes = [
    {
      element: <AuthenLayout />,
      children:[
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
        }
      ]
    }
  ];
  const element = useRoutes(routes);
  return (
    <>{element}</>
  );
});
