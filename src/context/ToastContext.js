import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastShown, setToastShown] = useState(false);

  const showToast = (message) => {
    if (!toastShown) {
      message.success(message);
      setToastShown(true);
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      <ToastContainer autoClose={2000}/>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
