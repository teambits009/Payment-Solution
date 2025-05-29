import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// Mock data (replace with API calls in production)
const initialCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", status: "Verified", documents: ["id.pdf"], creditScore: 600 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", status: "Pending", documents: ["id.pdf", "proof.pdf"], creditScore: 750 },
];

const initialMerchants = [
  { 
    id: 1, 
    name: "TechTrend Innovations", 
    status: "Verified", 
    financialDetails: "Bank: DTB", 
    registrationDate: "2025-01-15",
    documents: ["incorporation.pdf", "tax_id.pdf", "business_license.pdf"]
  },
  { 
    id: 2, 
    name: "ShopSphere", 
    status: "Pending", 
    financialDetails: "M-Pesa", 
    registrationDate: "2025-05-20",
    documents: ["incorporation.pdf", "tax_id.pdf", "business_license.pdf"]
  },
];

const initialCategories = [
  { code: "RE", name: "Real Estate", paymentChannel: "DTB Bank" },
  { code: "HC", name: "Healthcare", paymentChannel: "Stripe" },
  { code: "CH", name: "Charity", paymentChannel: "M-Pesa" },
];

const initialOrders = [
  {
    id: "ORD001",
    customerId: 1,
    merchantId: 1,
    categoryCode: "RE",
    amount: 1000,
    systemFee: 50,
    paymentChannel: "DTB Bank",
    status: "Completed",
    date: "2025-05-01",
  },
  {
    id: "ORD002",
    customerId: 2,
    merchantId: 2,
    categoryCode: "HC",
    amount: 500,
    systemFee: 25,
    paymentChannel: "Stripe",
    status: "Pending",
    date: "2025-05-25",
  },
];

const initialTransactions = [
  {
    id: "TXN001",
    customerId: 1,
    merchantId: 1,
    categoryCode: "RE",
    amount: 5000,
    systemFee: 250,
    paymentChannel: "DTB Bank",
    status: "Disbursed",
    documents: ["contract.pdf"],
    date: "2025-05-10",
  },
  {
    id: "TXN002",
    customerId: 2,
    merchantId: 2,
    categoryCode: "HC",
    amount: 300,
    systemFee: 15,
    paymentChannel: "Stripe",
    status: "Pending",
    documents: ["invoice.pdf"],
    date: "2025-05-20",
  },
];

const initialDisputes = [
  { id: "DIS001", customerId: 1, merchantId: 1, orderId: "ORD001", issue: "Non-delivery", status: "Open", date: "2025-05-15" },
];

const initialAuditLogs = [
  { id: 1, action: "Merchant Verified", user: "Admin1", timestamp: "2025-05-29T12:00:00Z" },
  { id: 2, action: "Transaction Disbursed", user: "Admin1", timestamp: "2025-05-29T12:15:00Z" },
];

const initialNotifications = [
  { id: 1, message: "New merchant (ShopSphere) registered", type: "info", date: "2025-05-29T12:10:00Z" },
  { id: 2, message: "Transaction TXN002 pending disbursement", type: "warning", date: "2025-05-29T12:20:00Z" },
];

// Sample analytics data
const transactionData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Transaction Volume ($)",
      data: [5000, 7000, 6000, 9000, 12000],
      backgroundColor: "#1E3A8A",
      borderColor: "#1E3A8A",
      borderWidth: 1,
    },
  ],
};

const userGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "New Users",
      data: [100, 150, 120, 200, 250],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
    },
  ],
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [customers, setCustomers] = useState(initialCustomers);
  const [merchants, setMerchants] = useState(initialMerchants);
  const [categories, setCategories] = useState(initialCategories);
  const [orders,] = useState(initialOrders);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [disputes, setDisputes] = useState(initialDisputes);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Calculate total accumulated fees
  const totalFees = transactions.reduce((sum, txn) => sum + txn.systemFee, 0);

  // Mock authentication check
  const isAuthenticated = true;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Search and filter logic
  const filterData = (data, keys) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(search.toLowerCase()))
    );
  };

  // Pagination logic
  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  // Handle verification
  const handleVerify = async (type, id) => {
    setLoading(true);
    try {
      if (type === "customer") {
        setCustomers(customers.map((c) => (c.id === id ? { ...c, status: "Verified" } : c)));
      } else if (type === "merchant") {
        setMerchants(merchants.map((m) => (m.id === id ? { ...m, status: "Verified" } : m)));
      }
      setAuditLogs([
        ...auditLogs,
        {
          id: auditLogs.length + 1,
          action: `${type.charAt(0).toUpperCase() + type.slice(1)} Verified`,
          user: "Admin1",
          timestamp: new Date().toISOString(),
        },
      ]);
      setNotifications([
        ...notifications,
        {
          id: notifications.length + 1,
          message: `${type.charAt(0).toUpperCase() + type.slice(1)} ID ${id} verified`,
          type: "success",
          date: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category submit
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = {
      code: formData.get("code"),
      name: formData.get("name"),
      paymentChannel: formData.get("paymentChannel"),
    };

    if (editingItem) {
      setCategories(categories.map((c) => (c.code === category.code ? category : c)));
    } else {
      setCategories([...categories, category]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Handle dispute resolution
  const handleResolveDispute = (id) => {
    setDisputes(disputes.map((d) => (d.id === id ? { ...d, status: "Resolved" } : d)));
    setAuditLogs([
      ...auditLogs,
      {
        id: auditLogs.length + 1,
        action: `Dispute ${id} Resolved`,
        user: "Admin1",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // Handle transaction disbursement
  const handleDisburseTransaction = (id) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, status: "Disbursed" } : t)));
    setAuditLogs([
      ...auditLogs,
      {
        id: auditLogs.length + 1,
        action: `Transaction ${id} Disbursed`,
        user: "Admin1",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // Filtered and paginated data
  const filteredCustomers = filterData(customers, ["name", "email", "phone", "status"]);
  const filteredMerchants = filterData(merchants, ["name", "status", "financialDetails"]);
  const filteredCategories = filterData(categories, ["code", "name"]);
  const filteredOrders = filterData(orders, ["id", "categoryCode", "status"]);
  const filteredTransactions = filterData(transactions, ["id", "categoryCode", "status"]);
  const filteredDisputes = filterData(disputes, ["id", "issue", "status"]);
  const filteredAuditLogs = filterData(auditLogs, ["action", "user"]);
  const filteredNotifications = filterData(notifications, ["message", "type"]);
  const paginatedCustomers = paginate(filteredCustomers);
  const paginatedMerchants = paginate(filteredMerchants);
  const paginatedCategories = paginate(filteredCategories);
  const paginatedOrders = paginate(filteredOrders);
  const paginatedTransactions = paginate(filteredTransactions);
  const paginatedDisputes = paginate(filteredDisputes);
  const paginatedAuditLogs = paginate(filteredAuditLogs);
  const paginatedNotifications = paginate(filteredNotifications);

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <aside className="bg-bnpl-blue text-white w-64 p-6 fixed h-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Safari Gamers Admin</h2>
        <nav className="space-y-2">
          {[
            { section: "overview", label: "Overview" },
            { section: "customers", label: "Customers" },
            { section: "merchants", label: "Merchants" },
            { section: "categories", label: "Categories" },
            { section: "orders", label: "Orders" },
            { section: "transactions", label: "Transactions" },
            { section: "fees", label: "Transaction Fees" },
            { section: "onboarding", label: "Onboarding" },
            { section: "disputes", label: "Disputes" },
            { section: "system", label: "System Health" },
            { section: "audit", label: "Audit Logs" },
            { section: "notifications", label: "Notifications" },
          ].map(({ section, label }) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`block w-full text-left py-2 px-4 rounded-md ${
                activeSection === section ? "bg-bnpl-light-blue" : "hover:bg-bnpl-light-blue"
              } transition duration-200 text-sm font-medium`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 px-4 rounded-md hover:bg-red-500 transition duration-200 text-sm font-medium"
          >
            Logout
          </button>
          <Link
            to="/"
            className="block py-2 px-4 rounded-md hover:bg-bnpl-light-blue transition duration-200 text-sm font-medium"
          >
            Back to Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bnpl-blue transition duration-200"
            />
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Total Customers</h3>
                  <p className="text-2xl text-bnpl-blue">{customers.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Total Merchants</h3>
                  <p className="text-2xl text-bnpl-blue">{merchants.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
                  <p className="text-2xl text-bnpl-blue">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Total Transactions</h3>
                  <p className="text-2xl text-bnpl-blue">{transactions.length}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume</h3>
                  <Bar data={transactionData} options={{ responsive: true }} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                  <Line data={userGrowthData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          )}

          {/* Customers Section */}
          {activeSection === "customers" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customers</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Documents</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{customer.name}</td>
                        <td className="py-3 px-4">{customer.email}</td>
                        <td className="py-3 px-4">{customer.phone}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              customer.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{customer.documents.join(", ")}</td>
                        <td className="py-3 px-4">
                          {customer.status === "Pending" && (
                            <button
                              onClick={() => handleVerify("customer", customer.id)}
                              disabled={loading}
                              className="text-bnpl-blue hover:underline mr-2 disabled:opacity-50"
                            >
                              Verify
                            </button>
                          )}
                          <button className="text-bnpl-blue hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredCustomers.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Merchants Section */}
          {activeSection === "merchants" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Merchants</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Financial Details</th>
                      <th className="py-3 px-4">Registration Date</th>
                      <th className="py-3 px-4">Documents</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMerchants.map((merchant) => (
                      <tr key={merchant.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{merchant.name}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              merchant.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {merchant.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{merchant.financialDetails}</td>
                        <td className="py-3 px-4">{merchant.registrationDate}</td>
                        <td className="py-3 px-4">{merchant.documents.join(", ")}</td>
                        <td className="py-3 px-4">
                          {merchant.status === "Pending" && (
                            <button
                              onClick={() => handleVerify("merchant", merchant.id)}
                              disabled={loading}
                              className="text-bnpl-blue hover:underline mr-2 disabled:opacity-50"
                            >
                              Verify
                            </button>
                          )}
                          <button className="text-bnpl-blue hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredMerchants.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Categories Section */}
          {activeSection === "categories" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <button
                  onClick={() => {
                    setModalType("category");
                    setEditingItem(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition duration-200 mb-4"
                >
                  Add New Category
                </button>
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Payment Channel</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCategories.map((category) => (
                      <tr key={category.code} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{category.code}</td>
                        <td className="py-3 px-4">{category.name}</td>
                        <td className="py-3 px-4">{category.paymentChannel}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              setModalType("category");
                              setEditingItem(category);
                              setIsModalOpen(true);
                            }}
                            className="text-bnpl-blue hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredCategories.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Merchant</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">System Fee (5%)</th>
                      <th className="py-3 px-4">Payment Channel</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">
                          {customers.find((c) => c.id === order.customerId)?.name}
                        </td>
                        <td className="py-3 px-4">
                          {merchants.find((m) => m.id === order.merchantId)?.name}
                        </td>
                        <td className="py-3 px-4">
                          {categories.find((c) => c.code === order.categoryCode)?.name}
                        </td>
                        <td className="py-3 px-4">${order.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">${order.systemFee.toFixed(2)}</td>
                        <td className="py-3 px-4">{order.paymentChannel}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">
                          <button className="text-bnpl-blue hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredOrders.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {activeSection === "transactions" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Transactions</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Transaction ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Merchant</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">System Fee (5%)</th>
                      <th className="py-3 px-4">Payment Channel</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Documents</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{txn.id}</td>
                        <td className="py-3 px-4">
                          {customers.find((c) => c.id === txn.customerId)?.name}
                        </td>
                        <td className="py-3 px-4">
                          {merchants.find((m) => m.id === txn.merchantId)?.name}
                        </td>
                        <td className="py-3 px-4">
                          {categories.find((c) => c.code === txn.categoryCode)?.name}
                        </td>
                        <td className="py-3 px-4">${txn.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">${txn.systemFee.toFixed(2)}</td>
                        <td className="py-3 px-4">{txn.paymentChannel}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              txn.status === "Disbursed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {txn.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{txn.documents.join(", ")}</td>
                        <td className="py-3 px-4">{txn.date}</td>
                        <td className="py-3 px-4">
                          {txn.status === "Pending" && (
                            <button
                              onClick={() => handleDisburseTransaction(txn.id)}
                              className="text-bnpl-blue hover:underline mr-2"
                            >
                              Disburse
                            </button>
                          )}
                          <button className="text-bnpl-blue hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredTransactions.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Fees Section */}
          {activeSection === "fees" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction Fees</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Total Accumulated Fees</h3>
                  <p className="text-2xl text-bnpl-blue">${totalFees.toFixed(2)}</p>
                </div>
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Transaction ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Merchant</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Transaction Amount</th>
                      <th className="py-3 px-4">System Fee (5%)</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{txn.id}</td>
                        <td className="py-3 px-4">
                          {customers.find((c) => c.id === txn.customerId)?.name}
                        </td>
                        <td className="py-3 px-4">
                          {merchants.find((m) => m.id === txn.merchantId)?.name}
                        </td>
                        <td className="py-3 px-4">
                          {categories.find((c) => c.code === txn.categoryCode)?.name}
                        </td>
                        <td className="py-3 px-4">${txn.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">${txn.systemFee.toFixed(2)}</td>
                        <td className="py-3 px-4">{txn.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredTransactions.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Onboarding Section */}
          {activeSection === "onboarding" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Onboarding</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Onboarding</h3>
                <table className="w-full text-left table-auto mb-6">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Documents</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{customer.name}</td>
                        <td className="py-3 px-4">{customer.email}</td>
                        <td className="py-3 px-4">{customer.phone}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              customer.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{customer.documents.join(", ")}</td>
                        <td className="py-3 px-4">
                          {customer.status === "Pending" && (
                            <button
                              onClick={() => handleVerify("customer", customer.id)}
                              disabled={loading}
                              className="text-bnpl-blue hover:underline mr-2 disabled:opacity-50"
                            >
                              Verify
                            </button>
                          )}
                          <button className="text-bnpl-blue hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Merchant Onboarding</h3>
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Financial Details</th>
                      <th className="py-3 px-4">Registration Date</th>
                      <th className="py-3 px-4">Documents</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMerchants.map((merchant) => (
                      <tr key={merchant.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{merchant.name}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              merchant.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {merchant.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{merchant.financialDetails}</td>
                        <td className="py-3 px-4">{merchant.registrationDate}</td>
                        <td className="py-3 px-4">{merchant.documents.join(", ")}</td>
                        <td className="py-3 px-4">
                          {merchant.status === "Pending" && (
                            <button
                              onClick={() => handleVerify("merchant", merchant.id)}
                              disabled={loading}
                              className="text-bnpl-blue hover:underline mr-2 disabled:opacity-50"
                            >
                              Verify
                            </button>
                          )}
                          <button className="text-bnpl-blue hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= Math.max(filteredCustomers.length, filteredMerchants.length)}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Disputes Section */}
          {activeSection === "disputes" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disputes</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Dispute ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Merchant</th>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Issue</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDisputes.map((dispute) => (
                      <tr key={dispute.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{dispute.id}</td>
                        <td className="py-3 px-4">
                          {customers.find((c) => c.id === dispute.customerId)?.name}
                        </td>
                        <td className="py-3 px-4">
                          {merchants.find((m) => m.id === dispute.merchantId)?.name}
                        </td>
                        <td className="py-3 px-4">{dispute.orderId}</td>
                        <td className="py-3 px-4">{dispute.issue}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              dispute.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {dispute.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{dispute.date}</td>
                        <td className="py-3 px-4">
                          {dispute.status === "Open" && (
                            <button
                              onClick={() => handleResolveDispute(dispute.id)}
                              className="text-bnpl-blue hover:underline mr-2"
                            >
                              Resolve
                            </button>
                          )}
                          <button className="text-bnpl-blue hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredDisputes.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* System Health Section */}
          {activeSection === "system" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Health</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Platform Uptime</h3>
                    <p className="text-2xl text-bnpl-blue">99.9%</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Transaction Success Rate</h3>
                    <p className="text-2xl text-bnpl-blue">98.5%</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Pending Verifications</h3>
                    <p className="text-2xl text-bnpl-blue">
                      {customers.filter((c) => c.status === "Pending").length +
                        merchants.filter((m) => m.status === "Pending").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audit Logs Section */}
          {activeSection === "audit" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Audit Logs</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAuditLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{log.action}</td>
                        <td className="py-3 px-4">{log.user}</td>
                        <td className="py-3 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredAuditLogs.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedNotifications.map((notification) => (
                      <tr key={notification.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{notification.message}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              notification.type === "success"
                                ? "bg-green-100 text-green-800"
                                : notification.type === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">{new Date(notification.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredNotifications.length}
                    className="px-4 py-2 bg-bnpl-blue text-white rounded-md disabled:bg-gray-400 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && modalType === "category" && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {editingItem ? "Edit Category" : "Add New Category"}
                </h3>
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <input
                    type="text"
                    name="code"
                    defaultValue={editingItem?.code || ""}
                    placeholder="Category Code (e.g., RE)"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bnpl-blue transition duration-200"
                    required
                    disabled={editingItem}
                  />
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingItem?.name || ""}
                    placeholder="Category Name"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bnpl-blue transition duration-200"
                    required
                  />
                  <select
                    name="paymentChannel"
                    defaultValue={editingItem?.paymentChannel || ""}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bnpl-blue transition duration-200"
                    required
                  >
                    <option value="">Select Payment Channel</option>
                    <option value="Stripe">Stripe</option>
                    <option value="DTB Bank">DTB Bank</option>
                    <option value="M-Pesa">M-Pesa</option>
                  </select>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-bnpl-blue text-white rounded-md hover:bg-blue-800 transition duration-200"
                    >
                      {editingItem ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;