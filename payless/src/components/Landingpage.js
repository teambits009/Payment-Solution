import React, { useState } from "react";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHowItWorksDropdownOpen, setIsHowItWorksDropdownOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar Section */}
      <nav className="bg-bnpl-blue text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <a href="/" className="hover:text-bnpl-light-blue">
              Genesis
            </a>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <div
              className="relative"
              onMouseEnter={() => setIsHowItWorksDropdownOpen(true)}
              onMouseLeave={() => setIsHowItWorksDropdownOpen(false)}
            >
              <button className="hover:text-bnpl-light-blue transition flex items-center">
                How It Works
                <span className="ml-1">▼</span>
              </button>
              {isHowItWorksDropdownOpen && (
                <div className="absolute bg-white text-bnpl-blue rounded-lg shadow-lg mt-2 py-2 w-40">
                  <a
                    href="/how-it-works#customers"
                    className="block px-4 py-2 hover:bg-bnpl-light-blue hover:text-white"
                  >
                    For Customers
                  </a>
                  <a
                    href="/how-it-works#merchants"
                    className="block px-4 py-2 hover:bg-bnpl-light-blue hover:text-white"
                  >
                    For Merchants
                  </a>
                </div>
              )}
            </div>
            <a href="/customers" className="hover:text-bnpl-light-blue transition">
              For Customers
            </a>
            <a href="/merchants" className="hover:text-bnpl-light-blue transition">
              For Merchants
            </a>
            <a
              href="/customer-signup"
              className="bg-white text-bnpl-blue px-4 py-2 rounded-lg font-semibold hover:bg-bnpl-light-blue hover:text-white transition"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="border border-white px-4 py-2 rounded-lg font-semibold hover:bg-bnpl-light-blue hover:border-bnpl-light-blue transition"
            >
              Login
            </a>
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
              <a href="/how-it-works" className="hover:text-bnpl-light-blue transition">
                How It Works
              </a>
              <a href="/customers" className="hover:text-bnpl-light-blue transition">
                For Customers
              </a>
              <a href="/merchants" className="hover:text-bnpl-light-blue transition">
                For Merchants
              </a>
              <a
                href="/customer-signup"
                className="bg-white text-bnpl-blue px-4 py-2 rounded-lg font-semibold hover:bg-bnpl-light-blue hover:text-white transition"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="border border-white px-4 py-2 rounded-lg font-semibold hover:bg-bnpl-light-blue hover:border-bnpl-light-blue transition"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="bg-bnpl-blue text-white py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop Now, Pay Later with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Flexible payments for customers. More sales for merchants.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/customer-signup"
              className="bg-white text-bnpl-blue px-6 py-3 rounded-lg font-semibold hover:bg-bnpl-light-blue hover:text-white transition"
            >
              Get Started as a Customer
            </a>
            <a
              href="/merchant-signup"
              className="bg-bnpl-light-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-bnpl-blue transition"
            >
              Join as a Merchant
            </a>
          </div>
        </div>
      </header>

      {/* Customer Benefits Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-bnpl-blue text-center mb-8">
          Why Customers Love Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">💸</div>
            <h3 className="text-xl font-semibold text-bnpl-blue mb-2">
              Flexible Payments
            </h3>
            <p className="text-gray-600">
              Split your purchases into 3, 6, or 12 easy installments.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold text-bnpl-blue mb-2">
              No Hidden Fees
            </h3>
            <p className="text-gray-600">
              Transparent pricing with zero interest on timely payments.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-bnpl-blue text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-bnpl-blue mb-2">
              Shop Anywhere
            </h3>
            <p className="text-gray-600">
              Use BNPL at thousands of partner stores online and in-person.
            </p>
          </div>
        </div>
      </section>

      {/* Merchant Benefits Section */}
      <section className="bg-gradient-to-br from-bnpl-blue via-blue-700 to-bnpl-light-blue text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Boost Your Business with BNPL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-bnpl-blue rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Increase Sales</h3>
              <p className="text-gray-600">
                Offer flexible payments to attract more customers.
              </p>
            </div>
            <div className="bg-white text-bnpl-blue rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Get Paid Upfront</h3>
              <p className="text-gray-600">
                We pay you immediately while customers pay over time.
              </p>
            </div>
            <div className="bg-white text-bnpl-blue rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
              <p className="text-gray-600">
                Add BNPL to your store with a simple setup.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/merchant-signup"
              className="bg-bnpl-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-bnpl-blue transition"
            >
              Become a Merchant Partner
            </a>
          </div>
        </div>
      </section>

      {/* Refined How It Works Section */}
      <section className="max-w-6xl mx-auto py-12 px-6" id="how-it-works">
        <h2 className="text-3xl font-bold text-bnpl-blue text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6" id="customers">
            <h3 className="text-xl font-semibold text-bnpl-blue mb-4">
              For Customers
            </h3>
            <ol className="space-y-4 text-gray-600 list-decimal pl-5">
              <li>
                <span className="font-bold text-bnpl-blue">Sign Up:</span>{" "}
                Create an account and get approved in minutes.
              </li>
              <li>
                <span className="font-bold text-bnpl-blue">Shop:</span> Choose
                BNPL at checkout from our partner stores.
              </li>
              <li>
                <span className="font-bold text-bnpl-blue">Pay Later:</span>{" "}
                Select a plan (3, 6, or 12 months) and pay over time.
              </li>
            </ol>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6" id="merchants">
            <h3 className="text-xl font-semibold text-bnpl-blue mb-4">
              For Merchants
            </h3>
            <ol className="space-y-4 text-gray-600 list-decimal pl-5">
              <li>
                <span className="font-bold text-bnpl-blue">Register:</span> Join
                our network with a quick setup.
              </li>
              <li>
                <span className="font-bold text-bnpl-blue">Offer BNPL:</span>{" "}
                Provide customers with flexible payment options.
              </li>
              <li>
                <span className="font-bold text-bnpl-blue">Get Paid:</span>{" "}
                Receive full payment upfront while we handle installments.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Store Categories Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-bnpl-blue text-center mb-8">
          Explore Our Store Categories
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Shop with BNPL across a wide range of categories at our partner stores.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {storeCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-lg p-4 text-center hover:bg-bnpl-light-blue hover:text-white transition"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-bnpl-blue text-center mb-8">
          Our Partners
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We collaborate with leading companies to bring you the best shopping experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-bnpl-light-blue hover:text-white transition"
            >
              <h3 className="text-xl font-semibold text-bnpl-blue mb-2">
                {partner.name}
              </h3>
              <p className="text-gray-600">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Footer Section */}
      <footer className="bg-bnpl-blue text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Genesis</h3>
            <p className="text-gray-200 mb-4">
              Empowering flexible payments for customers and growth for
              merchants since 2025.
            </p>
            <p className="text-sm">© 2025 Genesis. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a href="/how-it-works" className="hover:underline hover:text-bnpl-light-blue">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/customer-signup" className="hover:underline hover:text-bnpl-light-blue">
                  For Customers
                </a>
              </li>
              <li>
                <a href="/merchant-signup" className="hover:underline hover:text-bnpl-light-blue">
                  For Merchants
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline hover:text-bnpl-light-blue">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-200 mb-2">
              Email:{" "}
              <a href="mailto:support@bnplsystem.com" className="hover:underline hover:text-bnpl-light-blue">
                support@bnplsystem.com
              </a>
            </p>
            <p className="text-gray-200 mb-2">
              Phone: <span className="font-medium">+1 (800) 123-4567</span>
            </p>
            <p className="text-gray-200">
              Address: 123 Payment Lane, Finance City, USA
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://twitter.com/bnplsystem"
                className="text-2xl hover:text-bnpl-light-blue"
                aria-label="Follow us on Twitter"
              >
                
              </a>
              <a
                href="https://facebook.com/bnplsystem"
                className="text-2xl hover:text-bnpl-light-blue"
                aria-label="Follow us on Facebook"
              >
                
              </a>
              <a
                href="https://instagram.com/bnplsystem"
                className="text-2xl hover:text-bnpl-light-blue"
                aria-label="Follow us on Instagram"
              >
                
              </a>
              <a
                href="https://linkedin.com/company/bnplsystem"
                className="text-2xl hover:text-bnpl-light-blue"
                aria-label="Follow us on LinkedIn"
              >
                
              </a>
            </div>
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
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-bnpl-light-blue"
              />
              <button
                type="submit"
                className="bg-bnpl-light-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-bnpl-blue transition"
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