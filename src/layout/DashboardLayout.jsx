// DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      {/* Header (Full Width) */}
      <div className="w-full fixed z-10 top-0 left-0 right-0">
        <Header />
      </div>

      {/* Main Content Below Header */}
      <div className="flex pt-16">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50 min-h-screen overflow-y-auto">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
