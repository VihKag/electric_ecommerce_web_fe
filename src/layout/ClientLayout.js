import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import ClientNav from "../components/navbar/ClientNav";
function ClientLayout() {
  return (
    <>
      <Suspense fallback={<Spin/>}>
        <div className="overflow-auto h-screen">
          <header className="bg-sale border-b shadow-sm sticky top-0 z-30 flex justify-center mb-2">
            <ClientNav/>
          </header>
          <main className="h-screen">
            <Outlet />
          </main>
        </div>
      </Suspense>
    </>
  );
}
export default ClientLayout;
