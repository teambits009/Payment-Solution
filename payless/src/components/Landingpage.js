import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHowItWorksDropdownOpen, setIsHowItWorksDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Store categories data
  const storeCategories = [
    { name: "Fashion", icon: "👗" },
    { name: "Electronics", icon: "📱" },
    { name: "Toys & Games", icon: "🎲" },
    { name: "Furniture", icon: "🛋️" },
    { name: "Auto", icon: "🚗" },
    { name: "Accessories", icon: "⌚" },
    { name: "Shoes", icon: "👟" },
    { name: "Luxury", icon: "💎" },
    { name: "Home & Garden", icon: "🏡" },
    { name: "Sports & Fitness", icon: "⚽" },
    { name: "Beauty & Health", icon: "💄" },
    { name: "Books & Stationery", icon: "📚" },
  ];

  // Our Partners data
  const partners = [
    { name: "TechOps Apex", description: "Innovative tech solutions" },
    { name: "CreditBoost", description: "Empowering financial growth" },
    { name: "ShopSphere", description: "Global e-commerce platform" },
    { name: "PayFlex", description: "Flexible payment systems" },
    { name: "RetailRise", description: "Boosting retail success" },
    { name: "PayLess", description: "Improving financial growth" },
  ];

  // Handle Shop Now click to pass category to CustomerDashboard
  const handleShopNow = (category) => {
    navigate(`/customer-dashboard?category=${category.toLowerCase().replace(" & ", "-")}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar Section (PayPal-inspired) */}
      <nav className="bg-bnpl-blue text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-bnpl-light-blue transition">
              Genesis
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <div
              className="relative"
              onMouseEnter={() => setIsHowItWorksDropdownOpen(true)}
              onMouseLeave={() => setIsHowItWorksDropdownOpen(false)}
            >
              <button className="text-lg hover:text-bnpl-light-blue transition flex items-center">
                How It Works
                <span className="ml-1">▼</span>
              </button>
              {isHowItWorksDropdownOpen && (
                <div className="absolute bg-white text-bnpl-blue rounded-md shadow-md mt-2 py-2 w-40">
                  <Link
                    to="/how-it-works#customers"
                    className="block px-4 py-2 text-lg hover:bg-bnpl-light-blue hover:text-white transition"
                  >
                    For Customers
                  </Link>
                  <Link
                    to="/how-it-works#merchants"
                    className="block px-4 py-2 text-lg hover:bg-bnpl-light-blue hover:text-white transition"
                  >
                    For Merchants
                  </Link>
                </div>
              )}
            </div>
            <Link to="/customers" className="text-lg hover:text-bnpl-light-blue transition">
              For Customers
            </Link>
            <Link to="/merchants" className="text-lg hover:text-bnpl-light-blue transition">
              For Merchants
            </Link>
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
              <Link to="/customers" className="text-lg hover:text-bnpl-light-blue transition">
                For Customers
              </Link>
              <Link to="/merchants" className="text-lg hover:text-bnpl-light-blue transition">
                For Merchants
              </Link>
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

      {/* Hero Section (Styled like Navbar, Extended by 1/2) */}
      <header className="bg-bnpl-blue text-white py-24 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Shop Now, Pay Later with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Build your Credit Score with every purchase and unlock flexible payments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/customer-signup"
              className="bg-white text-bnpl-blue px-8 py-4 rounded-md font-medium text-lg hover:bg-bnpl-light-blue hover:text-white transition-all duration-200"
            >
              Get Started as a Customer
            </Link>
            <Link
              to="/merchant-signup"
              className="border border-white px-8 py-4 rounded-md font-medium text-lg hover:bg-bnpl-light-blue hover:border-bnpl-light-blue transition-all duration-200"
            >
              Join as a Merchant
            </Link>
          </div>
        </div>
      </header>

      {/* Customer Benefits Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          Why Customers Love Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">💸</div>
            <h3 className="text-xl font-bold text-black mb-4">Flexible Payments</h3>
            <p className="text-gray-700">
              Split your purchases into 3, 6, or 12 easy installments.
            </p>
          </div>
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-black mb-4">No Hidden Fees</h3>
            <p className="text-gray-700">
              Transparent pricing with zero interest on timely payments.
            </p>
          </div>
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-black mb-4">Credit Score Growth</h3>
            <p className="text-gray-700">
              Boost your score with every purchase and payment.
            </p>
          </div>
        </div>
      </section>

      {/* Merchant Benefits Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          Boost Your Business with BNPL
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-black mb-4">Increase Sales</h3>
            <p className="text-gray-700">
              Customers with higher Credit Scores buy more.
            </p>
          </div>
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-black mb-4">Get Paid Upfront</h3>
            <p className="text-gray-700">
              Receive full payment while we manage installments.
            </p>
          </div>
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-black mb-4">Easy Integration</h3>
            <p className="text-gray-700">
              Add BNPL to your store effortlessly.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/merchant-signup"
            className="bg-bnpl-blue text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-800 transition-all duration-200"
          >
            Become a Merchant Partner
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto py-12 px-6" id="how-it-works">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          How It Works
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          Your Credit Score—based on purchases and spending—unlocks BNPL benefits for customers and merchants.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-black mb-4">For Customers</h3>
            <ol className="space-y-4 text-gray-700 list-decimal pl-5">
              <li>
                <span className="text-bnpl-blue font-semibold">Sign Up & Build Credit Score:</span> Join Genesis and start with a base Credit Score. Buy 5+ items or spend $200 to grow it.
              </li>
              <li>
                <span className="text-bnpl-blue font-semibold">Shop with Your Score:</span> Use BNPL at checkout—your score determines eligibility (e.g., $699 item needs $500 spent).
              </li>
              <li>
                <span className="text-bnpl-blue font-semibold">Pay Later & Boost Score:</span> Choose 3, 6, or 12 months. On-time payments raise your score (e.g., +$200 after 3 payments).
              </li>
            </ol>
            <Link
              to="/how-it-works#customers"
              className="mt-4 inline-block text-bnpl-blue hover:underline font-medium"
            >
              Learn More
            </Link>
          </div>
          <div className="bg-white p-8 rounded-md shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-black mb-4">For Merchants</h3>
            <ol className="space-y-4 text-gray-700 list-decimal pl-5">
              <li>
                <span className="text-bnpl-blue font-semibold">Register:</span> Join our network—customer eligibility is based on their Credit Score from purchases.
              </li>
              <li>
                <span className="text-bnpl-blue font-semibold">Offer BNPL:</span> Let customers shop with their score—higher scores mean bigger sales.
              </li>
              <li>
                <span className="text-bnpl-blue font-semibold">Get Paid:</span> Receive full payment upfront while we handle repayments tied to their score.
              </li>
            </ol>
            <Link
              to="/how-it-works#merchants"
              className="mt-4 inline-block text-bnpl-blue hover:underline font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Store Categories Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          Explore Our Store Categories
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          Shop with BNPL across a wide range of categories at our partner stores.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {storeCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-md shadow-md border border-gray-200 flex flex-col items-center text-center"
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <p className="text-lg font-bold text-black mb-4">{category.name}</p>
              <button
                onClick={() => handleShopNow(category.name)}
                className="text-bnpl-blue hover:underline text-lg font-medium"
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          Our Partners
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          We collaborate with leading companies to bring you the best shopping experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white p-6 rounded-md shadow-md border border-gray-200 text-center"
            >
              <h3 className="text-xl font-bold text-black mb-4">{partner.name}</h3>
              <p className="text-gray-700">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-bnpl-blue text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Genesis</h3>
            <p className="text-gray-200 mb-4">
              Empowering flexible payments for customers and growth for merchants since 2025.
            </p>
            <p className="text-sm">© 2025 Genesis. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="hover:text-bnpl-light-blue transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/customer-signup" className="hover:text-bnpl-light-blue transition">
                  For Customers
                </Link>
              </li>
              <li>
                <Link to="/merchant-signup" className="hover:text-bnpl-light-blue transition">
                  For Merchants
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-bnpl-light-blue transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-200 mb-2">
              Email: <Link to="mailto:support@bnplsystem.com" className="hover:text-bnpl-light-blue">support@bnplsystem.com</Link>
            </p>
            <p className="text-gray-200 mb-2">
              Phone: <span className="font-medium">+1 (800) 123-4567</span>
            </p>
            <p className="text-gray-200">
              Address: 123 Payment Lane, Finance City, USA
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-200 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
              />
              <button
                type="submit"
                className="bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;