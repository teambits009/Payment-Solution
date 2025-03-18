import React, { useState } from "react";
import { Link } from "react-router-dom";

const MerchantSignup = () => {
  const [certificateFile, setCertificateFile] = useState(null);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validation checks
    if (!data.terms) {
      alert("You must agree to the Terms and Conditions to sign up.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Log data for now (replace with API call later)
    console.log("Merchant Signup Data:", { ...data, certificateFile });
    alert("Signing up as a Merchant!");
    // Add actual signup logic here (e.g., API call with formData)
  };

  const handleCertificateChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bnpl-blue via-blue-700 to-bnpl-light-blue font-sans flex items-center justify-center py-12 px-6">
      <div className="max-w-lg w-full bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8 animate-fade-in">
          Merchant Signup
        </h2>
        <form onSubmit={handleSignupSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <label htmlFor="fullName" className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Company Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your company email"
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
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Confirm Password */}
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

          {/* Contact Phone Number */}
          <div className="relative">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
              Contact Phone Number
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

          {/* Business Certificate of Incorporation (Upload) */}
          <div className="relative">
            <label htmlFor="certificate" className="block text-sm font-medium text-white mb-1">
              Business Certificate of Incorporation
            </label>
            <input
              type="file"
              id="certificate"
              name="certificate"
              accept=".pdf,.jpg,.png"
              onChange={handleCertificateChange}
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue transition-all duration-300"
              required
            />
            {certificateFile && (
              <p className="text-sm text-gray-200 mt-1">Selected: {certificateFile.name}</p>
            )}
          </div>

          {/* Bank Name */}
          <div className="relative">
            <label htmlFor="bankName" className="block text-sm font-medium text-white mb-1">
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              placeholder="Enter your bank name"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Account Number */}
          <div className="relative">
            <label htmlFor="accountNumber" className="block text-sm font-medium text-white mb-1">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="Enter your account number"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Create a Store (Business Name) */}
          <div className="relative">
            <label htmlFor="businessName" className="block text-sm font-medium text-white mb-1">
              Store/Business Name
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              placeholder="Enter your store or business name"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Additional Fintech Fields */}
          {/* Business Address */}
          <div className="relative">
            <label htmlFor="businessAddress" className="block text-sm font-medium text-white mb-1">
              Business Address
            </label>
            <textarea
              id="businessAddress"
              name="businessAddress"
              placeholder="Enter your business address"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              rows="3"
              required
            />
          </div>

          {/* Tax Identification Number (TIN) */}
          <div className="relative">
            <label htmlFor="tin" className="block text-sm font-medium text-white mb-1">
              Tax Identification Number (TIN)
            </label>
            <input
              type="text"
              id="tin"
              name="tin"
              placeholder="Enter your TIN"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            />
          </div>

          {/* Business Category */}
          <div className="relative">
            <label htmlFor="businessCategory" className="block text-sm font-medium text-white mb-1">
              Business Category
            </label>
            <select
              id="businessCategory"
              name="businessCategory"
              className="w-full px-4 py-3 bg-white bg-opacity-20 text-blue placeholder-blue-300 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue focus:bg-opacity-30 transition-all duration-300"
              required
            >
              <option value="" disabled selected>Select a category</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="auto">Auto</option>
              <option value="luxury">Luxury</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Terms and Conditions */}
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

          {/* Submit Button */}
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
          Are you a customer?{" "}
          <Link to="/customer-signup" className="underline hover:text-bnpl-light-blue transition">
            Sign up as a Customer
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MerchantSignup;