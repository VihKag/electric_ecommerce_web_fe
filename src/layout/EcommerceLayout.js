import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import EHeader from "../components/header/EcommerceHeader";
function EcommerceLayout() {
  return (
    <>
      <Suspense fallback={<Spin/>}>
        <div className="overflow-auto h-screen">
          <header className="bg-background border-b shadow-sm sticky top-0 z-30 flex justify-center mb-2">
            <EHeader/>
          </header>
          <main className="container mx-auto px-4">
            <Outlet />
          </main>
          <footer>
          </footer>
        </div>
      </Suspense>
    </>
  );
}
export default EcommerceLayout;
