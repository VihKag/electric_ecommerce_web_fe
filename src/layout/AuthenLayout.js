import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import ClientHeader from "../components/header/ClientHeader";
function AuthenLayout() {
  return (
    <>
      <Suspense fallback={<Spin/>}>
        <div className="overflow-auto h-screen">
          <header className="bg-background border-b shadow-sm sticky top-0 z-30 flex justify-center">
            <ClientHeader/>
          </header>
          <main className="container mx-auto px-4 mt-8">
            <Outlet />
          </main>
        </div>
      </Suspense>
    </>
  );
}
export default AuthenLayout;
