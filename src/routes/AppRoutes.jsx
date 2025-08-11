import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Dashboard/Home";
import AddNote from "../pages/Dashboard/AddNote";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard/uploads" element={<AddNote />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
