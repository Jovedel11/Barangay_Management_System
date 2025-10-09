import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "@/app/public/layout/PublicLayout";
import Home from "@/app/public/page/Home";
import Login from "@/auth/Login";
import Signup from "@/auth/Signup";

const PublicRoute = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default PublicRoute;
