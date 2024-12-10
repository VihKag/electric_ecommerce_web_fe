import React, { useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ClientRoutes from "./route/client/ClientRoutes";
import AdminRoutes from "./route/admin/AdminRoutes";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};
function App() {
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<ClientRoutes />} />
        </Routes>
      </Wrapper>
    </>
  );
}
export default App;
