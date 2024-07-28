import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";

const AuthRoutes = memo(() => {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="forgotPassword" element={<ForgotPass />} />
      <Route path="register" element={<SignUp />} />
      <Route path="fbRegister" element={<FbSignUp />} />
      <Route path="fbLogIn" element={<FbLogin />} />
    </Routes>
  );
});
