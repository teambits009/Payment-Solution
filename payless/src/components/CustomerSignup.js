import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.termsAccepted) {
      alert("You must accept the Terms and Conditions to proceed.");
      return;
    }
    console.log("Customer Signup Data:", formData);
    // Add customer API call here
    navigate("/customer-dashboard"); // Redirect to customer dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar (PayPal-inspired, matched with LandingPage) */}
      <nav className="bg-bnpl-blue text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-bnpl-light-blue transition">
              Genesis
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/how-it-works" className="text-lg hover:text-bnpl-light-blue transition">
              How It Works
            </Link>
            <Link to="/customers" className="text-lg hover:text-bnpl-light-blue transition">
              For Customers
            </Link>
            <Link to="/merchants" className="text-lg hover:text-bnpl-light-blue transition">
              For Merchants
            </Link>
            <Link
              to="/login"
              className="border border-white px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:border-bnpl-light-blue transition"
            >
              Login
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-3xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-bnpl-blue py-4">
            <div className="flex flex-col space-y-4 text-center">
              <Link to="/how-it-works" className="text-lg hover:text-bnpl-light-blue transition">
                How It Works
              </Link>
              <Link to="/customers" className="text-lg hover:text-bnpl-light-blue transition">
                For Customers
              </Link>
              <Link to="/merchants" className="text-lg hover:text-bnpl-light-blue transition">
                For Merchants
              </Link>
              <Link
                to="/login"
                className="border border-white px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:border-bnpl-light-blue transition"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Customer Signup Form (PayPal-inspired) */}
      <section className="max-w-7xl mx-auto py-12 px-6 flex justify-center">
        <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 w-full max-w-md">
          <h1 className="text-3xl font-bold text-black mb-6 text-center">
            Customer Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-bnpl-blue focus:ring-bnpl-blue border-gray-300 rounded"
                required
              />
              <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-bnpl-blue hover:underline font-medium">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-bnpl-blue hover:underline font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Sign up to enjoy <span className="text-bnpl-blue font-semibold">flexible payments</span>,{" "}
              <span className="text-bnpl-blue font-semibold">no hidden fees</span>, and shop at{" "}
              <span className="text-bnpl-blue font-semibold">thousands of stores</span>.
            </p>
            <button
              type="submit"
              className="w-full bg-bnpl-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
            >
              Sign Up as a Customer
            </button>
          </form>
          <p className="mt-6 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-bnpl-blue hover:underline font-medium">
              Log In
            </Link>
          </p>
          <p className="mt-2 text-center text-gray-700">
            Signing up as a merchant?{" "}
            <Link to="/merchant-signup" className="text-bnpl-blue hover:underline font-medium">
              Merchant Signup
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default CustomerSignup;