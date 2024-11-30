import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Spin } from "antd";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function ClientLayout() {
  const location = useLocation();
  // const isHideFooterPage = location.pathname === "/cart" || location.pathname === '/user';
  const hideFooterPaths = ['/cart', '/user'];
const isHideFooterPage = hideFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      <Suspense fallback={<Spin/>}>
      
        <div className="h-screen">
        <ToastContainer autoClose={1000}/>
          <header className="bg-primary z-50 top-0 sticky" >
            <Header/>
          </header>
          <main className="mx-2 my-6">
          
            <Outlet />
          </main>
          {!isHideFooterPage && (
            <footer className="border-t-2">                             
              <Footer />                                                              
            </footer>
          )}                                                                        
        </div>
      </Suspense>
    </>
  );
}
export default ClientLayout;
