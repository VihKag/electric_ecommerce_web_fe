import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [hasToastShown, setHasToastShown] = useState(false); // State để theo dõi việc hiển thị toast

  useEffect(() => {
    // Khi người dùng chưa đăng nhập, hiển thị toast
    if (!isAuthenticated && !hasToastShown) {
      localStorage.removeItem("token");
      toast.error('Vui lòng đăng nhập!');
      setHasToastShown(true); // Đánh dấu toast đã hiển thị
    }
  }, [isAuthenticated, hasToastShown]); // Theo dõi isAuthenticated và hasToastShown

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children; // Nếu đã đăng nhập, render children
};

export default ProtectedRoute;
