// File: src/routes/PrivateRoutes.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "@/pages/dashboard";

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}