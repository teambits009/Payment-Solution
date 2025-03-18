import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Reusable Navbar Component
const Navbar = ({ signupPath, signupText }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
            to={signupPath}
            className="bg-white text-bnpl-blue px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:text-white transition"
          >
            {signupText}
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
              to={signupPath}
              className="bg-white text-bnpl-blue px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:text-white transition"
            >
              {signupText}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable Form Container
const FormContainer = ({ children, title }) => (
  <div className="min-h-screen bg-gray-100 font-sans">
    <section className="max-w-7xl mx-auto py-12 px-6 flex justify-center">
      <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">{title}</h1>
        {children}
      </div>
    </section>
  </div>
);

// Reusable Input Field
const InputField = ({ id, label, type, name, value, onChange, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
      required={required}
    />
  </div>
);

// Reusable Submit Button
const SubmitButton = ({ text }) => (
  <button
    type="submit"
    className="w-full bg-bnpl-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
  >
    {text}
  </button>
);

// Reusable Links Section
const LinksSection = ({ forgotPath = "/forgot-password", signupPath, signupText, alternatePath, alternateText }) => (
  <div className="mt-6 space-y-2 text-center text-gray-700">
    <p>
      <Link to={forgotPath} className="text-bnpl-blue hover:underline font-medium">
        Forgot Password?
      </Link>
    </p>
    <p>
      Don’t have an account?{" "}
      <Link to={signupPath} className="text-bnpl-blue hover:underline font-medium">
        {signupText}
      </Link>
    </p>
    <p>
      Switch to{" "}
      <Link to={alternatePath} className="text-bnpl-blue hover:underline font-medium">
        {alternateText} Login
      </Link>
    </p>
  </div>
);

// Main Login Component
const Login = () => {
  const [isMerchant, setIsMerchant] = useState(false);
  const [formData, setFormData] = useState({
    merchantId: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${isMerchant ? "Merchant" : "Customer"} Login Data:`, formData);
    // Add API call here
    navigate(isMerchant ? "/merchant-dashboard" : "/customer-dashboard");
  };

  const toggleLoginType = () => {
    setIsMerchant(!isMerchant);
    setFormData({ merchantId: "", email: "", password: "" }); // Reset form on toggle
  };

  return (
    <>
      <Navbar signupPath={isMerchant ? "/merchant-signup" : "/customer-signup"} signupText="Sign Up" />
      <FormContainer title={isMerchant ? "Merchant Log In" : "Customer Log In"}>
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleLoginType}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isMerchant
                ? "bg-gray-200 text-gray-700"
                : "bg-bnpl-blue text-white hover:bg-blue-800"
            }`}
          >
            Customer
          </button>
          <button
            onClick={toggleLoginType}
            className={`ml-4 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isMerchant
                ? "bg-bnpl-blue text-white hover:bg-blue-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Merchant
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isMerchant && (
            <InputField
              id="merchantId"
              label="Merchant ID"
              type="text"
              name="merchantId"
              value={formData.merchantId}
              onChange={handleChange}
            />
          )}
          <InputField
            id="email"
            label={isMerchant ? "Business Email" : "Email Address"}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="text-sm text-gray-600 text-center">
            {isMerchant ? (
              <>
                Log in to <span className="text-bnpl-blue font-semibold">increase sales</span>, get{" "}
                <span className="text-bnpl-blue font-semibold">paid upfront</span>, and manage BNPL{" "}
                <span className="text-bnpl-blue font-semibold">easily</span>.
              </>
            ) : (
              <>
                Log in to enjoy <span className="text-bnpl-blue font-semibold">flexible payments</span>,{" "}
                <span className="text-bnpl-blue font-semibold">no hidden fees</span>, and shop at{" "}
                <span className="text-bnpl-blue font-semibold">thousands of stores</span>.
              </>
            )}
          </p>
          <SubmitButton text="Log In" />
        </form>
        <LinksSection
          signupPath={isMerchant ? "/merchant-signup" : "/customer-signup"}
          signupText="Sign Up"
          alternatePath={isMerchant ? "/login" : "/merchant-login"}
          alternateText={isMerchant ? "Customer" : "Merchant"}
        />
      </FormContainer>
    </>
  );
};

export default Login;