import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("customer"); // Default to customer
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Log data for now (replace with API call later)
    console.log(`${userType.charAt(0).toUpperCase() + userType.slice(1)} Login Data:`, data);
    alert(`Logging in as a ${userType}!`);
    
    // Simulate successful login and redirect (replace with actual auth logic)
    if (userType === "customer") {
      navigate("/customer-dashboard"); // Placeholder route
    } else {
      navigate("/merchant-dashboard"); // Placeholder route
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bnpl-blue via-blue-700 to-bnpl-light-blue font-sans flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8 animate-fade-in">
          Login
        </h2>

        {/* User Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-1 flex space-x-2">
            <button
              type="button"
              onClick={() => setUserType("customer")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                userType === "customer"
                  ? "bg-bnpl-blue text-white"
                  : "text-white hover:bg-bnpl-light-blue hover:text-white"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType("merchant")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                userType === "merchant"
                  ? "bg-bnpl-blue text-white"
                  : "text-white hover:bg-bnpl-light-blue hover:text-white"
              }`}
            >
              Merchant
            </button>
          </div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          {/* Merchant ID (Visible only for Merchant) */}
          {userType === "merchant" && (
            <div className="relative">
              <label htmlFor="merchantId" className="block text-sm font-medium text-white mb-1">
                Merchant ID
              </label>
              <input
                type="text"
                id="merchantId"
                name="merchantId"
                placeholder="Enter your Merchant ID"
                className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
                required
              />
            </div>
          )}

          {/* Email Address */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-white hover:text-bnpl-light-blue underline transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-bnpl-blue text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-bnpl-light-blue hover:scale-105 transform transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup Links */}
        <p className="text-center text-white mt-6">
          Don't have an account?{" "}
          <Link
            to={userType === "customer" ? "/customer-signup" : "/merchant-signup"}
            className="underline hover:text-bnpl-light-blue transition"
          >
            Sign up as a {userType}
          </Link>
        </p>
        <p className="text-center text-white mt-2">
          Switch to{" "}
          <button
            type="button"
            onClick={() => setUserType(userType === "customer" ? "merchant" : "customer")}
            className="underline hover:text-bnpl-light-blue transition bg-transparent border-none p-0"
          >
            {userType === "customer" ? "Merchant" : "Customer"}
          </button>{" "}
          login
        </p>
      </div>
    </div>
  );
};

export default Login;