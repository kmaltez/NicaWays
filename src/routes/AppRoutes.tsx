import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Register, Welcome } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/*" element={<Navigate to={"/welcome"} replace />} />
    </Routes>
  );
};
