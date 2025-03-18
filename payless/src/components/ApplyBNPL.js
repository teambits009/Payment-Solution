import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Reusable Navbar Component (Adapted for Dashboard)
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth token)
    navigate("/login");
  };

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
          <button
            onClick={handleLogout}
            className="bg-white text-bnpl-blue px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:text-white transition"
          >
            Log Out
          </button>
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
            <button
              onClick={handleLogout}
              className="bg-white text-bnpl-blue px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:text-white transition"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const ApplyForBNPL = () => {
  // Mock customer data (replace with real data from auth/API)
  const customerName = "Brandon Opere";
  const availableCredit = 1500.00;
  const creditHistory = {
    totalTransactions: 3,
    completedPayments: 3,
    overduePayments: 1,
    creditScore: "Good", // Mocked, could be calculated
  };

  const [formData, setFormData] = useState({
    fullName: customerName,
    phoneNumber: "",
    merchantName: "",
    purchaseAmount: "",
    itemDescription: "",
    planDuration: "3",
    paymentMethod: "Card",
    monthlyIncome: "",
    purchaseReason: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(formData.purchaseAmount) > availableCredit) {
      alert("Purchase amount exceeds available credit!");
      return;
    }
    console.log("BNPL Application Data:", { ...formData, creditHistory });
    // Add API call here to submit application
    navigate("/customer-dashboard"); // Redirect on success
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-6 flex justify-center">
        <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-black mb-6 text-center">Apply for BNPL</h1>

          {/* Credit Summary */}
          <div className="bg-bnpl-blue text-white p-4 rounded-md mb-6 text-center">
            <p className="text-lg font-semibold">Available Credit: ${availableCredit.toFixed(2)}</p>
            <p className="text-sm">
              Credit Status: <span className="font-medium">{creditHistory.creditScore}</span> (
              {creditHistory.completedPayments} completed, {creditHistory.overduePayments} overdue)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
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
                disabled // Pre-filled from auth
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
                placeholder="+1 (123) 456-7890"
              />
            </div>

            {/* Purchase Details */}
            <div>
              <label htmlFor="merchantName" className="block text-gray-700 font-medium mb-2">
                Merchant Name
              </label>
              <input
                type="text"
                id="merchantName"
                name="merchantName"
                value={formData.merchantName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
                placeholder="e.g., TechStore"
              />
              {/* Could be a dropdown with partnered merchants */}
            </div>
            <div>
              <label htmlFor="purchaseAmount" className="block text-gray-700 font-medium mb-2">
                Purchase Amount ($)
              </label>
              <input
                type="number"
                id="purchaseAmount"
                name="purchaseAmount"
                value={formData.purchaseAmount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
                min="1"
                step="0.01"
                max={availableCredit}
                placeholder={`Max ${availableCredit}`}
              />
            </div>
            <div>
              <label htmlFor="itemDescription" className="block text-gray-700 font-medium mb-2">
                Item Description
              </label>
              <textarea
                id="itemDescription"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
                rows="3"
                placeholder="e.g., Laptop Model XYZ"
              />
            </div>

            {/* Repayment Preferences */}
            <div>
              <label htmlFor="planDuration" className="block text-gray-700 font-medium mb-2">
                Plan Duration
              </label>
              <select
                id="planDuration"
                name="planDuration"
                value={formData.planDuration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
              >
                <option value="Card">Credit/Debit Card</option>
                <option value="Bank">Bank Transfer</option>
                <option value="Wallet">Digital Wallet</option>
                <option value="Card">Mpesa</option>
                <option value="Bank">Google Pay</option>
                <option value="Wallet">Stripe</option>
              </select>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="monthlyIncome" className="block text-gray-700 font-medium mb-2">
                Monthly Income ($)
              </label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                required
                min="0"
                step="0.01"
                placeholder="e.g., 3000"
              />
            </div>
            <div>
              <label htmlFor="purchaseReason" className="block text-gray-700 font-medium mb-2">
                Reason for Purchase
              </label>
              <textarea
                id="purchaseReason"
                name="purchaseReason"
                value={formData.purchaseReason}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                rows="3"
                placeholder="e.g., Need a new laptop for work"
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="w-full bg-bnpl-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
              >
                Submit Application
              </button>
              <Link
                to="/customer-dashboard"
                className="w-full bg-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-400 transition-all duration-200 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyForBNPL;