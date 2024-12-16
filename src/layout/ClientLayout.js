import React, { Suspense, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ClientLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // const isHideFooterPage = location.pathname === "/cart" || location.pathname === '/user';
  const hideFooterPaths = ["/cart", "/user"];
  const isHideFooterPage = hideFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      // Navigate to search results page
      const encodedKeyword = encodeURIComponent(searchInput.trim());
      navigate(`/search?keyword=${encodedKeyword}`);
    }
  };
  return (
    <>
      <Suspense
        fallback={
          <Spin
            size="large"
          />
        }
      >
        <div className="h-full min-h-screen">
          <header className="bg-primary z-50 top-0 py-2 sticky">
            <Header
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleSearch={handleSearch}
            />
          </header>
          <main className="mx-2">
            <Outlet />
          </main>
          {!isHideFooterPage && (
            <footer className="border-t-2 relative">
              <Footer />
            </footer>
          )}
        </div>
      </Suspense>
    </>
  );
}
export default ClientLayout;
