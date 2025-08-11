import { useGoogleLogin } from "@react-oauth/google"; // <-- install this package if you haven't yet
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance.js";
import GoogleLogo from "../../assets/google.svg";
import { AuthContext } from "./../../context/AuthContext.jsx"; // <-- adjust the path as per your project

const apiUrl = "http://localhost:8080"; // Replace with your backend URL

const Login = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    login,
    error,
    loginSuccessMessage,
    setLoginSuccessMessage,
    googleLogin,
  } = useContext(AuthContext);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("jwt", response.data.data);
      toast.success("Login Successful");

      navigate("/dashboard", {
        state: { email: formData.email },
      });
    } catch (error) {
      const backendError =
        error.response?.data?.error || error.response?.data?.message;

      if (error.response?.status === 400) {
        toast.error(backendError || "Invalid email or password.");
      } else if (error.response?.status === 404) {
        toast.error(backendError || "User not found.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const { name, email, sub: googleId } = googleRes.data;

        const res = await axios.post(apiUrl + `/api/auth/google-login`, {
          name,
          email,
          googleId,
        });

        if (res.data.token) {
          const authData = {
            token: res.data.token,
            user: res.data.user,
          };
          localStorage.setItem("authData", JSON.stringify(authData));
          googleLogin(authData.token, authData.user);
          navigate("/");
        } else {
          console.error("No token returned from the backend");
        }
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "implicit",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4 py-12">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-lg shadow-xl rounded-lg p-10">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-1">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Sign in to your BCA Connect account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base text-gray-800 font-medium mb-1"
            >
              email
            </label>
            <input
              id="email"
              type="text"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base text-gray-800 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 placeholder-gray-400"
                placeholder="••••••••"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-6">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <span className="block text-center my-6 text-gray-600 relative before:absolute before:content-[''] before:w-[45%] before:h-[2px] before:bg-gray-300 rounded-lg before:left-0 before:top-[50%] after:absolute after:content-[''] after:w-[45%] after:h-[2px] after:bg-gray-300 after:right-0 after:top-[50%] font-semibold">
          or
        </span>

        <div className="w-full justify-center place-items-center mb-2">
          <div className="w-full text-center flex place-items-center justify-center">
            <button
              onClick={() => loginWithGoogle()}
              className="flex text-sm place-items-center justify-center font-semibold text-gray-600 border border-gray-200 py-3 px-6 w-full rounded-lg hover:cursor-pointer bg-gray-50 hover:bg-gray-200 duration-200"
            >
              <img
                src={GoogleLogo}
                alt="Google Logo"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
