import React, { Suspense } from "react";
import AuthRoutes from "../route/auth";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
function AuthenLayout() {
  return (
    <>
      <Suspense fallback={Spin}>
        <div className="container mx-auto">
          <header>
          </header>
          <main className="my-40">
            <Outlet />
          </main>
          <footer>
            <p>© 2024 Your Company</p>
          </footer>
        </div>
      </Suspense>
    </>
  );
}
export default AuthenLayout;
