import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [user] = useState({ fullName: "Jane Doe", spendingLimit: 750 }); // Mock data
  const [activePlans] = useState([
    { id: 1, category: "Electronics", total: 300, remaining: 250, nextDue: "Mar 25, 2025", monthly: 50 },
    { id: 2, category: "Fashion", total: 150, remaining: 100, nextDue: "Mar 20, 2025", monthly: 25 },
  ]);
  const navigate = useNavigate();

  const handlePayNow = (planId) => {
    alert(`Processing payment for Plan #${planId}`);
    // Add payment API call here
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans py-12 px-6">
      {/* Navbar */}
      <nav className="bg-white py-4 px-6 sticky top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-bnpl-blue">Genesis Customer Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="max-w-6xl mx-auto mt-8">
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-black">Welcome, {user.fullName}</h2>
          <p className="mt-2 text-gray-700">
            Spending Limit: <span className="font-medium">${user.spendingLimit}</span>
          </p>
          <p className="text-sm text-gray-600">Active Plans: {activePlans.length}</p>
        </div>
      </section>

      {/* Active Plans Overview */}
      <section className="max-w-6xl mx-auto mt-8">
        <h3 className="text-xl font-semibold text-black mb-4">Active Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activePlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-6 rounded-md shadow-sm border border-gray-200"
            >
              <h4 className="text-lg font-medium text-black">{plan.category}</h4>
              <p className="text-gray-700">Total: ${plan.total}</p>
              <p className="text-gray-700">Remaining: ${plan.remaining}</p>
              <p className="text-gray-700">Next Payment: ${plan.monthly} due {plan.nextDue}</p>
              <button
                onClick={() => handlePayNow(plan.id)}
                className="mt-4 bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
              >
                Pay Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Payments */}
      <section className="max-w-6xl mx-auto mt-8">
        <h3 className="text-xl font-semibold text-black mb-4">Upcoming Payments</h3>
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-gray-700">
            Next Due: ${activePlans[0].monthly} on {activePlans[0].nextDue}
          </p>
          <button className="mt-2 text-bnpl-blue hover:underline font-medium">Set Reminder</button>
          <Link to="/payment-schedule" className="block mt-2 text-bnpl-blue hover:underline font-medium">
            View Full Schedule
          </Link>
        </div>
      </section>

      {/* Shop with BNPL */}
      <section className="max-w-6xl mx-auto mt-8">
        <h3 className="text-xl font-semibold text-black mb-4">Shop with BNPL</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Fashion", "Electronics", "Furniture", "Luxury"].map((category) => (
            <div
              key={category}
              className="bg-white p-4 rounded-md shadow-sm border border-gray-200 text-center"
            >
              <p className="font-medium text-black">{category}</p>
              <Link
                to={`/shop/${category.toLowerCase()}`}
                className="text-sm text-bnpl-blue hover:underline"
              >
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Spending Limit & Credit Status */}
      <section className="max-w-6xl mx-auto mt-8">
        <h3 className="text-xl font-semibold text-black mb-4">Spending Limit & Credit Status</h3>
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <p className="text-gray-700">
            Available: ${user.spendingLimit - activePlans.reduce((sum, p) => sum + p.remaining, 0)}
          </p>
          <p className="text-gray-700">
            Used: ${activePlans.reduce((sum, p) => sum + p.remaining, 0)}
          </p>
          <button className="mt-2 text-bnpl-blue hover:underline font-medium">Request Increase</button>
        </div>
      </section>

      {/* Profile & Settings */}
      <section className="max-w-6xl mx-auto mt-8 mb-12">
        <h3 className="text-xl font-semibold text-black mb-4">Profile & Settings</h3>
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <Link to="/profile" className="block text-bnpl-blue hover:underline font-medium">
            Edit Profile
          </Link>
          <Link
            to="/payment-methods"
            className="block mt-2 text-bnpl-blue hover:underline font-medium"
          >
            Manage Payment Methods
          </Link>
          <Link to="/support" className="block mt-2 text-bnpl-blue hover:underline font-medium">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;