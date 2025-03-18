// src/components/PrivacyPolicy.js
import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-bnpl-blue via-blue-700 to-bnpl-light-blue font-sans flex items-center justify-center py-12 px-6">
    <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl text-white">
      <h1 className="text-4xl font-extrabold text-center mb-6">Privacy Policy</h1>
      <p className="text-gray-200 mb-4">This is a placeholder Privacy Policy...</p>
      <Link to="/" className="text-bnpl-light-blue underline hover:text-white transition">
        Back to Home
      </Link>
    </div>
  </div>
);
export default PrivacyPolicy;