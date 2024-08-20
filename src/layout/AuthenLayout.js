import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import EHeader from "../components/header/EcommerceHeader";
function AuthenLayout() {
  return (
    <>
      <Suspense fallback={<Spin/>}>
        <div className="overflow-auto h-screen">
          <header className="bg-background border-b shadow-sm sticky top-0 z-30 flex justify-center">
            <EHeader/>
          </header>
          <main className="container mx-auto mt-8">
            <Outlet />
          </main>
          <footer>
          </footer>
        </div>
      </Suspense>
    </>
  );
}
export default AuthenLayout;
