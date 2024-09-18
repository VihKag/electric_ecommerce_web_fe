import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthenRoutes } from "./route/AuthRoute";
import ClientRoutes from "./route/client/ClientRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<AuthenRoutes />} />
        <Route path="/*" element={<ClientRoutes />} />
      </Routes>
    </>
  );
}
export default App;
