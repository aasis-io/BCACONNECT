import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import DashboardLayout from "../layout/DashboardLayout";
import AddNote from "../pages/Dashboard/AddNote";
import Home from "../pages/Dashboard/Home";
import ListUsers from "../pages/Dashboard/ListUsers";
import Notes from "../pages/Dashboard/Notes";
import PostApproval from "../pages/Dashboard/PostApproval";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard/uploads" element={<AddNote />} />
        <Route path="/dashboard/approvals" element={<PostApproval />} />
        <Route path="/dashboard/users" element={<ListUsers />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/notes" element={<Notes />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
