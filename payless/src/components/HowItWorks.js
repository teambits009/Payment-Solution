import React, { useState } from "react";
import { Link } from "react-router-dom";

// Navbar Component
const Navbar = () => {
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
          <a href="#customers" className="text-lg hover:text-bnpl-light-blue transition">
            For Customers
          </a>
          <a href="#merchants" className="text-lg hover:text-bnpl-light-blue transition">
            For Merchants
          </a>
          <Link
            to="/customer-signup"
            className="bg-white text-bnpl-blue px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:text-white transition"
          >
            Sign Up
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
            <a href="#customers" className="text-lg hover:text-bnpl-light-blue transition">
              For Customers
            </a>
            <a href="#merchants" className="text-lg hover:text-bnpl-light-blue transition">
              For Merchants
            </a>
            <Link
              to="/customer-signup"
              className="bg-white text-bnpl-blue px-6 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:text-white transition"
            >
              Sign Up
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
  );
};

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Learn how Genesis BNPL uses your Credit Score—built from your purchase history and spending—to unlock flexible shopping and drive merchant success.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-6 py-3 text-lg font-medium rounded-tl-md rounded-bl-md transition-all duration-200 ${
              activeTab === "customers"
                ? "bg-bnpl-blue text-white"
                : "bg-gray-200 text-gray-700 hover:bg-bnpl-light-blue hover:text-white"
            }`}
          >
            For Customers
          </button>
          <button
            onClick={() => setActiveTab("merchants")}
            className={`px-6 py-3 text-lg font-medium rounded-tr-md rounded-br-md transition-all duration-200 ${
              activeTab === "merchants"
                ? "bg-bnpl-blue text-white"
                : "bg-gray-200 text-gray-700 hover:bg-bnpl-light-blue hover:text-white"
            }`}
          >
            For Merchants
          </button>
        </div>

        {/* Content */}
        {activeTab === "customers" ? (
          <section id="customers" className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works for Customers</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              With Genesis BNPL, your Credit Score—calculated from your purchases and spending—determines your ability to shop now and pay later. Here’s the detailed process:
            </p>
            {/* Rest of the customer section remains unchanged */}
            {/* Step 1: Sign Up */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up & Build Your Credit Score</h3>
                <p className="text-gray-700 mb-4">
                  Create a Genesis account with basic details (name, email, phone, ID). New users start with a base Credit Score. As you shop and spend consistently, your score grows, unlocking higher credit limits for BNPL purchases.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Base Score:</strong> Start with a $500 limit for new users.</li>
                  <li><strong>Score Growth:</strong> Buy 5+ products or spend $200+ to boost your score.</li>
                  <li><strong>No External Credit Check:</strong> Your score is based solely on Genesis transactions.</li>
                </ul>
                <p className="text-gray-600 italic mt-2">
                  Example: After signing up, your initial Credit Score qualifies you for a $500 limit.
                </p>
                <Link to="/customer-signup" className="mt-4 inline-block text-bnpl-blue hover:underline font-medium">
                  Start Now
                </Link>
              </div>
            </div>
            {/* Other steps and benefits remain unchanged */}
          </section>
        ) : (
          <section id="merchants" className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works for Merchants</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Partner with Genesis BNPL to leverage our Credit Score system—based on customer purchases and spending—to drive sales while we manage payments.
            </p>
            {/* Rest of the merchant section remains unchanged */}
            {/* Step 1: Register */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Register Your Business</h3>
                <p className="text-gray-700 mb-4">
                  Join Genesis as a merchant by submitting your business details. We’ll set you up to offer BNPL, where customer eligibility is determined by their Credit Score from Genesis transactions.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Quick Setup:</strong> Approved in 48 hours, no fees.</li>
                  <li><strong>Credit Score Insight:</strong> We assess customers based on their purchase history.</li>
                  <li><strong>Support:</strong> Get onboarding help from our team.</li>
                </ul>
                <Link to="/merchant-signup" className="mt-4 inline-block text-bnpl-blue hover:underline font-medium">
                  Join Now
                </Link>
              </div>
            </div>
            {/* Other steps and benefits remain unchanged */}
          </section>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <div className="flex justify-center gap-4">
            <Link
              to="/customer-signup"
              className="bg-bnpl-blue text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-800 transition-all duration-200"
            >
              Start as a Customer
            </Link>
            <Link
              to="/merchant-signup"
              className="border border-bnpl-blue text-bnpl-blue px-8 py-4 rounded-md font-medium text-lg hover:bg-bnpl-blue hover:text-white transition-all duration-200"
            >
              Join as a Merchant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;