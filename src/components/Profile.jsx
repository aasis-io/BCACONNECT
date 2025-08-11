import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    } else {
      axiosInstance
        .get("/user/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          // if token invalid/expired, redirect to login
          localStorage.removeItem("jwt");
          navigate("/login");
        });
    }
  }, [jwt, navigate]);

  if (!user) {
    return <div className="p-6 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="flex items-center gap-6 mb-8">
        {/* Profile Image */}
        <div>
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-semibold">
              {user.data.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name and Info */}
        <div>
          <h2 className="text-2xl font-semibold">
            {user.data.fullName}
          </h2>
          <p className="text-gray-600">@{user.data.userName}</p>
          <p className="text-gray-600">{user.data.email}</p>
          <p className="text-gray-600">Semester: {user.data.semester}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          to="/home/change-password"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </Link>

        <Link
          to="/home/edit-profile"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Edit Details
        </Link>
      </div>
    </div>
  );
};

export default Profile;
