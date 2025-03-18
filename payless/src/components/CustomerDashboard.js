import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2"; // Requires react-chartjs-2 and chart.js
import { Chart } from "chart.js/auto"; // Register Chart.js components
Chart.register(); // Ensure Chart.js is registered

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

// Card Component for Consistency
const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 mb-6">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
    {children}
  </div>
);

// Download Button Component
const DownloadButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-bnpl-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-all duration-200"
  >
    {label}
  </button>
);

const CustomerDashboard = () => {
  // Mock customer name (replace with real data from auth context or API)
  const customerName = "Brandon Opere";

  // Mock data (replace with API data in production)
  const availableCredit = 1500.00;
  const activeInstallments = [
    { id: 1, dueDate: "2025-04-01", merchant: "TechStore", amount: 50.00, plan: "3 months", method: "Card", status: "Pending" },
    { id: 2, dueDate: "2025-04-15", merchant: "FashionHub", amount: 50.00, plan: "6 months", method: "Card", status: "Pending" },
    { id: 3, dueDate: "2025-03-20", merchant: "GadgetShop", amount: 50.00, plan: "3 months", method: "Card", status: "Paid" },
  ];
  const overdueInstallments = [
    { id: 4, dueDate: "2025-03-01", merchant: "BookStore", amount: 25.00, plan: "3 months", method: "Card", status: "Overdue" },
  ];
  const pendingApprovals = [
    { id: 5, requestDate: "2025-03-15", merchant: "HomeDecor", amount: 300.00, plan: "12 months", status: "Pending" },
  ];
  const transactionHistory = [
    { id: 1, date: "2025-03-10", merchant: "TechStore", amount: 150.00, plan: "3 months", method: "Card", status: "Completed" },
    { id: 2, date: "2025-02-25", merchant: "FashionHub", amount: 200.00, plan: "6 months", method: "Card", status: "Completed" },
    { id: 3, date: "2025-02-01", merchant: "GadgetShop", amount: 100.00, plan: "3 months", method: "Card", status: "Completed" },
  ];

  // Chart data for spending visualization
  const chartData = {
    labels: ["Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Spending",
        data: [300, 150, 100], // Mock spending amounts
        backgroundColor: "#1E3A8A", // bnpl-blue
      },
    ],
  };
  const chartOptions = {
    scales: { y: { beginAtZero: true } },
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  // Download functions
  const downloadCSV = (data, filename) => {
    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-black mb-4 text-center">Customer Dashboard</h2>
        {/* Welcome Message */}
        <p className="text-xl font-semibold text-gray-700 text-center mb-8">
          Welcome back, <span className="text-bnpl-blue">{customerName}</span>!
        </p>

        {/* Available Credit Card */}
        <Card title="Available Credit">
          <div className="bg-bnpl-blue text-white p-6 rounded-md text-center">
            <p className="text-4xl font-bold">${availableCredit.toFixed(2)}</p>
          </div>
        </Card>

        {/* Active Installments Card */}
        <Card title="Active Installments">
          {activeInstallments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Due Date</th>
                    <th className="px-4 py-2 font-semibold">Merchant</th>
                    <th className="px-4 py-2 font-semibold">Amount</th>
                    <th className="px-4 py-2 font-semibold">Plan</th>
                    <th className="px-4 py-2 font-semibold">Method</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInstallments.map((installment) => (
                    <tr key={installment.id} className="border-b">
                      <td className="px-4 py-2">{installment.dueDate}</td>
                      <td className="px-4 py-2">{installment.merchant}</td>
                      <td className="px-4 py-2">${installment.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{installment.plan}</td>
                      <td className="px-4 py-2">{installment.method}</td>
                      <td
                        className={`px-4 py-2 font-medium ${
                          installment.status === "Paid" ? "text-green-600" : "text-bnpl-blue"
                        }`}
                      >
                        {installment.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center">No active installments.</p>
          )}
          <div className="mt-4 text-right">
            <DownloadButton
              label="Download Installments"
              onClick={() => downloadCSV(activeInstallments, "active_installments.csv")}
            />
          </div>
        </Card>

        {/* Overdue Installments Card */}
        <Card title="Overdue Installments">
          {overdueInstallments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Due Date</th>
                    <th className="px-4 py-2 font-semibold">Merchant</th>
                    <th className="px-4 py-2 font-semibold">Amount</th>
                    <th className="px-4 py-2 font-semibold">Plan</th>
                    <th className="px-4 py-2 font-semibold">Method</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueInstallments.map((installment) => (
                    <tr key={installment.id} className="border-b">
                      <td className="px-4 py-2">{installment.dueDate}</td>
                      <td className="px-4 py-2">{installment.merchant}</td>
                      <td className="px-4 py-2">${installment.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{installment.plan}</td>
                      <td className="px-4 py-2">{installment.method}</td>
                      <td className="px-4 py-2 text-red-600 font-medium">{installment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center">No overdue installments.</p>
          )}
        </Card>

        {/* Pending Approvals Card */}
        <Card title="Pending Approvals">
          {pendingApprovals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Request Date</th>
                    <th className="px-4 py-2 font-semibold">Merchant</th>
                    <th className="px-4 py-2 font-semibold">Amount</th>
                    <th className="px-4 py-2 font-semibold">Plan</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map((approval) => (
                    <tr key={approval.id} className="border-b">
                      <td className="px-4 py-2">{approval.requestDate}</td>
                      <td className="px-4 py-2">{approval.merchant}</td>
                      <td className="px-4 py-2">${approval.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{approval.plan}</td>
                      <td className="px-4 py-2 text-bnpl-blue font-medium">{approval.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center">No pending approvals.</p>
          )}
        </Card>

        {/* Transaction History Card */}
        <Card title="Transaction History">
          {transactionHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Date</th>
                    <th className="px-4 py-2 font-semibold">Merchant</th>
                    <th className="px-4 py-2 font-semibold">Amount</th>
                    <th className="px-4 py-2 font-semibold">Plan</th>
                    <th className="px-4 py-2 font-semibold">Method</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="px-4 py-2">{transaction.date}</td>
                      <td className="px-4 py-2">{transaction.merchant}</td>
                      <td className="px-4 py-2">${transaction.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{transaction.plan}</td>
                      <td className="px-4 py-2">{transaction.method}</td>
                      <td className="px-4 py-2 text-green-600 font-medium">{transaction.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center">No transaction history.</p>
          )}
          <div className="mt-4 text-right">
            <DownloadButton
              label="Download Transactions"
              onClick={() => downloadCSV(transactionHistory, "transaction_history.csv")}
            />
          </div>
        </Card>

        {/* Spending Graph Card */}
        <Card title="Spending Overview">
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>

        {/* Shop Now and Apply for BNPL Section */}
        <div className="flex justify-center space-x-6">
          <Link
            to="/stores"
            className="bg-bnpl-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-all duration-200 text-center"
          >
            Shop Now
          </Link>
          <Link
            to="/apply-bnpl"
            className="bg-bnpl-blue text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-all duration-200 text-center"
          >
            Apply for BNPL
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;