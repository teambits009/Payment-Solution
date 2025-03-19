import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-bnpl-blue text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-bnpl-light-blue transition">
            Genesis
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/customer-dashboard" className="text-lg hover:text-bnpl-light-blue transition">
            Dashboard
          </Link>
          <Link to="/how-it-works" className="text-lg hover:text-bnpl-light-blue transition">
            How It Works
          </Link>
        </div>
      </div>
    </nav>
  );
};

const ShopNow = () => {
  // Expanded merchant data with 12 partners across various categories
  const allMerchants = [
    { name: "TechStore", category: "Electronics", logo: "techstore-logo.png", offer: "10% off with BNPL", url: "/stores/techstore" },
    { name: "FashionHub", category: "Fashion", logo: "fashionhub-logo.png", offer: "Free shipping", url: "/stores/fashionhub" },
    { name: "HomeDecor", category: "Home Goods", logo: "homedecor-logo.png", offer: "5% cashback", url: "/stores/homedecor" },
    { name: "BookNook", category: "Books", logo: "booknook-logo.png", offer: "15% off first purchase", url: "/stores/booknook" },
    { name: "SportZone", category: "Sports", logo: "sportzone-logo.png", url: "/stores/sportzone" },
    { name: "GlowBeauty", category: "Beauty", logo: "glowbeauty-logo.png", offer: "Buy 2, get 1 free", url: "/stores/glowbeauty" },
    { name: "FurniTrend", category: "Furniture", logo: "furnitrend-logo.png", offer: "Free delivery over $200", url: "/stores/furnitrend" },
    { name: "TasteBox", category: "Food & Beverage", logo: "tastebox-logo.png", url: "/stores/tastebox" },
    { name: "JewelCraft", category: "Jewelry", logo: "jewelcraft-logo.png", offer: "20% off select items", url: "/stores/jewelcraft" },
    { name: "ToyHaven", category: "Toys", logo: "toyhaven-logo.png", offer: "10% off toys", url: "/stores/toyhaven" },
    { name: "TravelEase", category: "Travel", logo: "travelease-logo.png", url: "/stores/travelease" },
    { name: "FitGear", category: "Fitness", logo: "fitgear-logo.png", offer: "Free shipping on gear", url: "/stores/fitgear" },
  ];

  const availableCredit = 1500.0; // Could be passed via context or props

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories derived from merchants
  const categories = ["All", ...new Set(allMerchants.map((m) => m.category))];

  // Filter merchants based on search and category
  const filteredMerchants = allMerchants.filter((merchant) => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || merchant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Shop with Genesis BNPL</h1>

        {/* Credit Reminder Banner */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-8 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 font-medium text-center sm:text-left relative group">
            You have{" "}
            <span className="text-bnpl-blue font-bold">${availableCredit.toFixed(2)}</span> available to shop with BNPL!
            <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 -top-10 left-1/2 transform -translate-x-1/2 sm:left-0 sm:translate-x-0 z-10 w-48">
              Split your purchases into affordable payments!
            </span>
          </p>
          <Link
            to="/apply-bnpl"
            className="bg-bnpl-blue text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Increase Credit
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search merchants (e.g., TechStore)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue text-gray-700 placeholder-gray-400"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-bnpl-blue text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-bnpl-blue hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Merchant Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Partnered Merchants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <div
                key={merchant.name}
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-all duration-200"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4">
                  {merchant.logo ? (
                    <img src={merchant.logo} alt={merchant.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    merchant.name[0]
                  )}
                </div>
                <p className="text-gray-900 font-semibold text-lg">{merchant.name}</p>
                <p className="text-sm text-gray-600 mb-2">{merchant.category}</p>
                {merchant.offer && (
                  <p className="text-sm text-green-600 font-medium mb-4">{merchant.offer}</p>
                )}
                <Link
                  to={merchant.url}
                  className="bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
                >
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
          {filteredMerchants.length === 0 && (
            <p className="text-gray-600 text-center mt-6">No merchants match your search or filter.</p>
          )}
        </div>

        {/* Educational Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 italic">
            Shop with ease using your BNPL credit. Split payments over time at checkout.{" "}
            <Link to="/how-it-works" className="text-bnpl-blue hover:underline">
              Learn More
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopNow;