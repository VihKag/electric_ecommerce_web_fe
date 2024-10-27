import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientRoutes from "./route/client/ClientRoutes";
import AdminRoutes from "./route/admin/AdminRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<ClientRoutes />} />
      </Routes>
    </>
  );
}
export default App;
