import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./routers/AdminRoute";
import PublicRoute from "./routers/PublicRoute";
import ResidentRoute from "./routers/ResidentRoute";
import "./core/styles/global.css";
import { AuthProvider } from "@/hooks/useAuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/resident/*" element={<ResidentRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/*" element={<PublicRoute />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
