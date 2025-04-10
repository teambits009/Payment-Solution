import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
Chart.register();
 ''
// Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
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

// Card Component
const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

// DownloadButton Component
const DownloadButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
  >
    {label}
  </button>
);

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state
  const customerName = "Brandon Opere";
  const [availableCredit, setAvailableCredit] = useState(1500.0);
  const totalCredit = 2000.0;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState("alphabetical");
  const [currentDeal, setCurrentDeal] = useState(0);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([
    { id: 1, date: "2025-03-10", merchant: "TechStore", amount: 150.0, plan: "3 months", method: "Card", status: "Completed" },
    { id: 2, date: "2025-02-25", merchant: "FashionHub", amount: 200.0, plan: "6 months", method: "Card", status: "Completed" },
  ]);
  const activeInstallments = [
    { id: 1, dueDate: "2025-04-01", merchant: "TechStore", amount: 50.0, plan: "3 months", method: "Card", status: "Pending" },
    { id: 2, dueDate: "2025-04-15", merchant: "FashionHub", amount: 50.0, plan: "6 months", method: "Card", status: "Pending" },
  ];
  const overdueInstallments = [
    { id: 4, dueDate: "2025-03-01", merchant: "BookNook", amount: 25.0, plan: "3 months", method: "Card", status: "Overdue" },
  ];
  const pendingApprovals = [
    { id: 5, requestDate: "2025-03-15", merchant: "HomeDecor", amount: 300.0, plan: "12 months", status: "Pending" },
  ];

  // Get category from URL query param
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Merchant data
  const allMerchants = [
    { name: "TechStore", category: "Electronics", products: [{ id: 1, name: "Smartphone X", price: 699.99, image: "smartphone-x.png" }] },
    { name: "FashionHub", category: "Fashion", products: [{ id: 1, name: "Summer Dress", price: 49.99, image: "summer-dress.png" }] },
    { name: "ToyHaven", category: "Toys & Games", products: [{ id: 1, name: "Action Figure", price: 29.99, image: "action-figure.png" }] },
    { name: "FurniTrend", category: "Furniture", products: [{ id: 1, name: "Sofa", price: 499.99, image: "sofa.png" }] },
    { name: "AutoShop", category: "Auto", products: [{ id: 1, name: "Car Battery", price: 99.99, image: "car-battery.png" }] },
    { name: "JewelCraft", category: "Accessories", products: [{ id: 1, name: "Gold Necklace", price: 199.99, image: "gold-necklace.png" }] },
    { name: "ShoeZone", category: "Shoes", products: [{ id: 1, name: "Running Shoes", price: 99.99, image: "running-shoes.png" }] },
    { name: "LuxuryHaven", category: "Luxury", products: [{ id: 1, name: "Diamond Ring", price: 499.99, image: "diamond-ring.png" }] },
    { name: "HomeDecor", category: "Home & Garden", products: [{ id: 1, name: "Wooden Table", price: 299.99, image: "wooden-table.png" }] },
    { name: "FitGear", category: "Sports & Fitness", products: [{ id: 1, name: "Dumbbell Set", price: 99.99, image: "dumbbell-set.png" }] },
    { name: "GlowBeauty", category: "Beauty & Health", products: [{ id: 1, name: "Moisturizer", price: 29.99, image: "moisturizer.png" }] },
    { name: "BookNook", category: "Books & Stationery", products: [{ id: 1, name: "Bestseller Novel", price: 19.99, image: "novel.png" }] },
  ];

  const categories = ["All", ...new Set(allMerchants.map((m) => m.category))];
  const tags = ["Local", "Eco-Friendly", "Top Rated"];
  const featuredDeals = allMerchants.slice(0, 3); // Simplified; add .filter(m => m.offer) if offers are added

  // Chart data
  const chartData = {
    labels: ["Feb", "Mar", "Apr"],
    datasets: [{ label: "Spending", data: [300, 150, 100], backgroundColor: "#1E3A8A" }],
  };
  const chartOptions = {
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { display: true, position: "top" } },
  };

  // Carousel effect for featured deals
  useEffect(() => {
    const interval = setInterval(() => setCurrentDeal((prev) => (prev + 1) % featuredDeals.length), 5000);
    return () => clearInterval(interval);
  }, [featuredDeals.length]);

  // Filter merchants
  const filteredMerchants = allMerchants.filter((merchant) => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || merchant.category.toLowerCase().replace(" & ", "-") === selectedCategory;
    const matchesTags = selectedTags.length === 0 || (merchant.tags && selectedTags.every(tag => merchant.tags.includes(tag)));
    return matchesSearch && matchesCategory && matchesTags;
  });

  const sortedMerchants = [...filteredMerchants].sort((a, b) => {
    if (sortOption === "alphabetical") return a.name.localeCompare(b.name);
    return 0; // Add more sorting logic if needed
  });

  const recommendedMerchants = sortedMerchants.filter((m) => transactionHistory.some((t) => t.merchant === m.name));
  const otherMerchants = sortedMerchants.filter((m) => !transactionHistory.some((t) => t.merchant === m.name));

  // Handle merchant selection
  const handleShopClick = (merchant) => {
    setSelectedMerchant(merchant);
    setRecentlyViewed((prev) => [merchant.name, ...prev.filter(name => name !== merchant.name)].slice(0, 3));
  };

  // Handle Buy Now with auth check
  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      navigate("/customer-signup"); // Redirect to signup if not authenticated
    } else if (product.price <= availableCredit) {
      setSelectedProduct(product);
      setCart((prev) => [...prev, { ...product, merchant: selectedMerchant.name }]);
      setShowPurchaseModal(true);
    } else {
      alert("Insufficient credit for this purchase.");
    }
  };

  // Handle purchase completion
  const handlePurchase = (method) => {
    const today = new Date().toISOString().split("T")[0];
    const newTransaction = {
      id: transactionHistory.length + 1,
      date: today,
      merchant: selectedMerchant.name,
      amount: selectedProduct.price,
      plan: "3 months",
      method,
      status: "Completed",
    };
    setTransactionHistory((prev) => [...prev, newTransaction]);
    setAvailableCredit((prev) => prev - selectedProduct.price);
    setShowPurchaseModal(false);
    setSelectedMerchant(null);
    alert(`Purchase successful! ${selectedProduct.name} bought for $${selectedProduct.price.toFixed(2)} with ${method}.`);
  };

  // Download CSV
  const downloadCSV = (data, filename) => {
    const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Toggle auth for testing (remove in production)
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
    if (!isAuthenticated) {
      alert("Logged in as John Doe");
    } else {
      alert("Logged out");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Customer Dashboard</h2>
        <p className="text-xl font-semibold text-gray-700 text-center mb-8">
          Welcome back, <span className="text-bnpl-blue">{customerName}</span>!
          {cart.length > 0 && (
            <span className="ml-4 text-sm text-gray-600">Cart: {cart.length} item(s)</span>
          )}
          <button onClick={toggleAuth} className="ml-4 text-sm text-bnpl-blue underline">
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </p>

        <Card title="Available Credit">
          <div className="bg-bnpl-blue text-white p-6 rounded-md text-center">
            <p className="text-4xl font-bold">${availableCredit.toFixed(2)}</p>
            <p className="text-sm mt-2">of ${totalCredit.toFixed(2)} total credit</p>
          </div>
        </Card>

        <Card title="Active Installments">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Merchant</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeInstallments.map((installment) => (
                  <tr key={installment.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{installment.dueDate}</td>
                    <td className="p-3">{installment.merchant}</td>
                    <td className="p-3">${installment.amount.toFixed(2)}</td>
                    <td className="p-3">{installment.plan}</td>
                    <td className="p-3">{installment.method}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${installment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                        {installment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Overdue Installments">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Merchant</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {overdueInstallments.map((installment) => (
                  <tr key={installment.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{installment.dueDate}</td>
                    <td className="p-3">{installment.merchant}</td>
                    <td className="p-3">${installment.amount.toFixed(2)}</td>
                    <td className="p-3">{installment.plan}</td>
                    <td className="p-3">{installment.method}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">{installment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Pending Approvals">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Request Date</th>
                  <th className="p-3">Merchant</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals.map((approval) => (
                  <tr key={approval.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{approval.requestDate}</td>
                    <td className="p-3">{approval.merchant}</td>
                    <td className="p-3">${approval.amount.toFixed(2)}</td>
                    <td className="p-3">{approval.plan}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">{approval.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Transaction History">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Merchant</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{transaction.date}</td>
                    <td className="p-3">{transaction.merchant}</td>
                    <td className="p-3">${transaction.amount.toFixed(2)}</td>
                    <td className="p-3">{transaction.plan}</td>
                    <td className="p-3">{transaction.method}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">{transaction.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <DownloadButton
              label="Download CSV"
              onClick={() => downloadCSV(transactionHistory, "transaction_history.csv")}
            />
          </div>
        </Card>

        <Card title="Spending Overview">
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>

        <Card title="Shop Now">
          {!selectedMerchant ? (
            <div className="space-y-6">
              {/* Featured Deals Carousel */}
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentDeal * 100}%)` }}>
                  {featuredDeals.map((deal) => (
                    <div key={deal.name} className="min-w-full bg-bnpl-blue text-white p-6 flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-bold">{deal.name}</h4>
                        <p className="text-md">{deal.category}</p>
                      </div>
                      <button
                        onClick={() => handleShopClick(deal)}
                        className="bg-white text-bnpl-blue px-4 py-2 rounded-md font-medium hover:bg-bnpl-light-blue hover:text-white"
                      >
                        Shop Deal
                      </button>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {featuredDeals.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentDeal(i)}
                      className={`w-2 h-2 rounded-full ${i === currentDeal ? "bg-white" : "bg-gray-400"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Recently Viewed Merchants */}
              {recentlyViewed.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Recently Viewed</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentlyViewed.map((name) => {
                      const merchant = allMerchants.find(m => m.name === name);
                      return (
                        <div key={merchant.name} className="bg-white border border-gray-200 rounded-md p-4 flex items-center justify-between hover:shadow-md transition-all duration-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                              {merchant.name[0]}
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">{merchant.name}</p>
                              <p className="text-sm text-gray-600">{merchant.category}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleShopClick(merchant)}
                            className="text-bnpl-blue font-medium hover:underline hover:text-bnpl-light-blue"
                          >
                            Shop
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search merchants (e.g., TechStore)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue text-gray-700 placeholder-gray-400"
                  />
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bnpl-blue"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="alphabetical">Alphabetical</option>
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest Partners</option>
                </select>
              </div>

              {/* Category Filters */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Explore by Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category.toLowerCase().replace(" & ", "-"))}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.toLowerCase().replace(" & ", "-") ? "bg-bnpl-blue text-white" : "bg-gray-100 text-gray-700 hover:bg-bnpl-blue hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Filters */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Filter by Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTags.includes(tag) ? "bg-bnpl-blue text-white" : "bg-gray-100 text-gray-700 hover:bg-bnpl-blue hover:text-white"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Merchants */}
              {recommendedMerchants.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommended for You</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedMerchants.map((merchant) => (
                      <div
                        key={merchant.name}
                        className="bg-white border border-gray-200 rounded-md p-4 flex items-center justify-between hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            {merchant.name[0]}
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">{merchant.name}</p>
                            <p className="text-sm text-gray-600">{merchant.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleShopClick(merchant)}
                          className="text-bnpl-blue font-medium hover:underline hover:text-bnpl-light-blue"
                        >
                          Shop
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Merchants */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{recommendedMerchants.length > 0 ? "More Merchants" : "Featured Merchants"}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherMerchants.map((merchant) => (
                    <div
                      key={merchant.name}
                      className="bg-white border border-gray-200 rounded-md p-4 flex items-center justify-between hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          {merchant.name[0]}
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">{merchant.name}</p>
                          <p className="text-sm text-gray-600">{merchant.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleShopClick(merchant)}
                        className="text-bnpl-blue font-medium hover:underline hover:text-bnpl-light-blue"
                      >
                        Shop
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedMerchant(null)}
                className="text-bnpl-blue hover:underline mb-4"
              >
                ← Back to Merchants
              </button>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  {selectedMerchant.name[0]}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{selectedMerchant.name}</h4>
                  <p className="text-gray-600">{selectedMerchant.category}</p>
                </div>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-gray-900 mb-4">Featured Products</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedMerchant.products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-md transition-all duration-200">
                      <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
                        {product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" /> : product.name[0]}
                      </div>
                      <p className="text-gray-900 font-medium">{product.name}</p>
                      <p className="text-gray-600">${product.price.toFixed(2)}</p>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="mt-2 bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200 w-full"
                      >
                        Buy Now with BNPL
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Purchase Modal */}
        {showPurchaseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Your Purchase</h3>
              <p className="text-gray-700 mb-2">
                Product: <span className="font-medium">{selectedProduct.name}</span>
              </p>
              <p className="text-gray-700 mb-4">
                Price: <span className="font-medium">${selectedProduct.price.toFixed(2)}</span>
              </p>
              <p className="text-gray-700 mb-2">Select Payment Method:</p>
              <div className="space-y-2 mb-4">
                {["Mpesa", "Card", "Stripe", "Paypal"].map((method) => (
                  <button
                    key={method}
                    onClick={() => handlePurchase(method)}
                    className="w-full bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
                  >
                    Pay with {method}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;