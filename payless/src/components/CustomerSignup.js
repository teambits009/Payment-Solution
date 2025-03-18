import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomerSignup = () => {
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (!data.terms) {
      alert("You must agree to the Terms and Conditions to sign up.");
      return;
    }
    console.log("Customer Signup Data:", { ...data, cameraPhoto, idPhoto });
    alert("Signing up as a Customer!");
    // Add actual signup logic here (e.g., API call with formData)
  };

  const handleCameraPhotoChange = (e) => {
    setCameraPhoto(e.target.files[0]);
  };

  const handleIdPhotoChange = (e) => {
    setIdPhoto(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bnpl-blue via-blue-700 to-bnpl-light-blue font-sans flex items-center justify-center py-12 px-6">
      <div className="max-w-lg w-full bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8 animate-fade-in">
          Customer Signup
        </h2>
        <form onSubmit={handleSignupSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="secondName" className="block text-sm font-medium text-white mb-1">
                Second Name
              </label>
              <input
                type="text"
                id="secondName"
                name="secondName"
                placeholder="Enter your second name"
                className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
                required
              />
            </div>
          </div>
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
          <div className="relative">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="cameraPhoto" className="block text-sm font-medium text-white mb-1">
              Camera Photo
            </label>
            <input
              type="file"
              id="cameraPhoto"
              name="cameraPhoto"
              accept="image/*"
              onChange={handleCameraPhotoChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue transition-all duration-300"
              required
            />
            {cameraPhoto && (
              <p className="text-sm text-gray-200 mt-1">Selected: {cameraPhoto.name}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="idPhoto" className="block text-sm font-medium text-white mb-1">
              ID Upload Photo
            </label>
            <input
              type="file"
              id="idPhoto"
              name="idPhoto"
              accept="image/*"
              onChange={handleIdPhotoChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue transition-all duration-300"
              required
            />
            {idPhoto && (
              <p className="text-sm text-gray-200 mt-1">Selected: {idPhoto.name}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 text-bnpl-light-blue bg-white bg-opacity-20 border border-white border-opacity-30 rounded focus:ring-bnpl-light-blue"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-white">
              I agree to the{" "}
              <Link to="/terms-and-conditions" className="font-semibold underline hover:text-bnpl-light-blue transition">
                Terms and Conditions
              </Link>{" "}
              and have read the{" "}
              <Link to="/privacy-policy" className="font-semibold underline hover:text-bnpl-light-blue transition">
                Privacy Policy
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-bnpl-blue text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-bnpl-light-blue hover:scale-105 transform transition-all duration-300"
          >
            Sign Up Now
          </button>
        </form>
        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-bnpl-light-blue transition">
            Login here
          </Link>
        </p>
        <p className="text-center text-white mt-2">
          Are you a merchant?{" "}
          <Link to="/merchant-signup" className="underline hover:text-bnpl-light-blue transition">
            Sign up as a Merchant
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerSignup;