import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
function ClientLayout() {
  return (
    <>
      <Suspense fallback={<Spin/>}>
        <div className="h-screen">
          <header className="bg-primary border-b shadow-sm sticky top-0 z-30 flex justify-center mb-2">
            <Header/>
          </header>
          <main>
            <Outlet />
          </main>
          <footer className="border-t-2">
            <Footer/>
          </footer>
        </div>
      </Suspense>
    </>
  );
}
export default ClientLayout;
