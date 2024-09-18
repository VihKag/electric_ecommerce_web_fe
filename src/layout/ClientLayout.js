import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import ClientHeader from "../components/header/ClientHeader";
function ClientLayout() {
  return (
    <>
      <Suspense fallback={<Spin/>}>
        <div className="overflow-auto h-screen">
          <header className="bg-sale border-b shadow-sm sticky top-0 z-30 flex justify-center mb-2">
            <ClientHeader/>
          </header>
          <main>
            <Outlet />
          </main>
          <footer>
          </footer>
        </div>
      </Suspense>
    </>
  );
}
export default ClientLayout;
