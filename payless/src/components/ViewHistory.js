import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation

const MerchantDashboard = () => {
  const navigate = useNavigate();

  // Mock data with BNPL purchase details, credit scores, and payment history
  const [dashboardData] = useState({
    totalSales: 7500,
    pendingSettlements: 850,
    settledThisMonth: 4200,
    transactions: [
      {
        id: 1,
        orderId: "ORD-1001",
        customer: "John Doe",
        contact: "john.doe@email.com",
        amount: 250.00,
        dateTime: "Mar 18, 2025 14:30:00",
        paymentPlan: "6 months",
        paymentStatus: "Paid",
        refundEligible: false,
        creditScore: 780,
        paymentHistory: [
          { installment: 1, date: "Mar 18, 2025", amount: 41.67, status: "Paid" },
          { installment: 2, date: "Apr 18, 2025", amount: 41.67, status: "Paid" },
          { installment: 3, date: "May 18, 2025", amount: 41.67, status: "Paid" },
          { installment: 4, date: "Jun 18, 2025", amount: 41.67, status: "Paid" },
          { installment: 5, date: "Jul 18, 2025", amount: 41.67, status: "Paid" },
          { installment: 6, date: "Aug 18, 2025", amount: 41.65, status: "Paid" },
        ],
      },
      {
        id: 2,
        orderId: "ORD-1002",
        customer: "Jane Smith",
        contact: "jane.smith@email.com",
        amount: 150.00,
        dateTime: "Mar 17, 2025 09:15:00",
        paymentPlan: "3 months",
        paymentStatus: "Pending",
        refundEligible: true,
        creditScore: 620,
        paymentHistory: [
          { installment: 1, date: "Mar 17, 2025", amount: 50.00, status: "Paid" },
          { installment: 2, date: "Apr 17, 2025", amount: 50.00, status: "Pending" },
          { installment: 3, date: "May 17, 2025", amount: 50.00, status: "Pending" },
        ],
      },
      {
        id: 3,
        orderId: "ORD-1003",
        customer: "Acme Corp",
        contact: "contact@acmecorp.com",
        amount: 500.00,
        dateTime: "Mar 16, 2025 16:45:00",
        paymentPlan: "12 months",
        paymentStatus: "Paid",
        refundEligible: false,
        creditScore: 810,
        paymentHistory: [
          { installment: 1, date: "Mar 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 2, date: "Apr 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 3, date: "May 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 4, date: "Jun 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 5, date: "Jul 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 6, date: "Aug 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 7, date: "Sep 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 8, date: "Oct 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 9, date: "Nov 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 10, date: "Dec 16, 2025", amount: 41.67, status: "Paid" },
          { installment: 11, date: "Jan 16, 2026", amount: 41.67, status: "Paid" },
          { installment: 12, date: "Feb 16, 2026", amount: 41.61, status: "Paid" },
        ],
      },
      {
        id: 4,
        orderId: "ORD-1004",
        customer: "Sarah Lee",
        contact: "sarah.lee@email.com",
        amount: 300.00,
        dateTime: "Mar 15, 2025 11:20:00",
        paymentPlan: "6 months",
        paymentStatus: "Pending",
        refundEligible: true,
        creditScore: 670,
        paymentHistory: [
          { installment: 1, date: "Mar 15, 2025", amount: 50.00, status: "Paid" },
          { installment: 2, date: "Apr 15, 2025", amount: 50.00, status: "Pending" },
          { installment: 3, date: "May 15, 2025", amount: 50.00, status: "Pending" },
          { installment: 4, date: "Jun 15, 2025", amount: 50.00, status: "Pending" },
          { installment: 5, date: "Jul 15, 2025", amount: 50.00, status: "Pending" },
          { installment: 6, date: "Aug 15, 2025", amount: 50.00, status: "Pending" },
        ],
      },
      {
        id: 5,
        orderId: "ORD-1005",
        customer: "Bob Jones",
        contact: "bob.jones@email.com",
        amount: 200.00,
        dateTime: "Mar 14, 2025 13:10:00",
        paymentPlan: "3 months",
        paymentStatus: "Paid",
        refundEligible: false,
        creditScore: 720,
        paymentHistory: [
          { installment: 1, date: "Mar 14, 2025", amount: 66.67, status: "Paid" },
          { installment: 2, date: "Apr 14, 2025", amount: 66.67, status: "Paid" },
          { installment: 3, date: "May 14, 2025", amount: 66.66, status: "Paid" },
        ],
      },
    ],
    bankDetails: { name: "Chase Bank", lastFour: "1234" },
  });

  const handleLogout = () => {
    navigate("/login");
  };

  const handleWithdraw = () => {
    alert(`Requesting withdrawal of $${dashboardData.pendingSettlements} to ${dashboardData.bankDetails.name} ending in ${dashboardData.bankDetails.lastFour}`);
  };

  const handleRefund = (orderId) => {
    alert(`Initiating refund for Order ID: ${orderId}. This is a mock action; implement API call here.`);
  };

  const handleViewPaymentHistory = (orderId) => {
    const transaction = dashboardData.transactions.find(txn => txn.orderId === orderId);
    navigate(`/payment-history/${orderId}`, { state: { transaction } });
  };

  const getCreditWorthiness = (score) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    if (score >= 600) return "Poor";
    return "Bad";
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-bnpl-blue text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-bnpl-light-blue transition">
              Genesis
            </Link>
          </div>
          <div className="flex space-x-6 items-center">
            <span className="text-lg text-white">Welcome, Ann </span>
            <span className="text-lg text-bnpl-light-blue">Dashboard</span>
            <button
              onClick={handleLogout}
              className="text-lg hover:text-bnpl-light-blue transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sales Summary Section */}
      <section className="max-w-7xl mx-auto py-8 px-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-black text-center mb-6">
          Merchant Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 text-center">
            <p className="text-lg font-semibold text-gray-700">Total BNPL Sales</p>
            <p className="text-3xl font-bold text-bnpl-blue">${dashboardData.totalSales.toLocaleString()}</p>
            <p className="text-sm text-gray-500">All-time sales via Genesis BNPL</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 text-center">
            <p className="text-lg font-semibold text-gray-700">Pending Settlements</p>
            <p className="text-3xl font-bold text-orange-600">${dashboardData.pendingSettlements.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Awaiting transfer to your bank</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 text-center">
            <p className="text-lg font-semibold text-gray-700">Settled This Month</p>
            <p className="text-3xl font-bold text-green-600">${dashboardData.settledThisMonth.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Funds transferred this month</p>
          </div>
        </div>
      </section>

      {/* BNPL Transactions Table Section */}
      <section className="max-w-7xl mx-auto py-8 px-6 bg-white">
        <h2 className="text-2xl font-bold text-black mb-4">BNPL Purchase Tracking</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-gray-700 font-semibold p-4 text-left">Customer Name</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Contact</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Order ID</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Date & Time</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Amount</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Payment Plan</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Payment Status</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Credit Score</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Credit Worthiness</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.transactions.map((txn, index) => (
                <tr key={txn.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-4 text-gray-700">{txn.customer}</td>
                  <td className="p-4 text-gray-700">{txn.contact}</td>
                  <td className="p-4 text-gray-700">{txn.orderId}</td>
                  <td className="p-4 text-gray-700">{txn.dateTime}</td>
                  <td className="p-4 text-gray-700">${txn.amount.toFixed(2)}</td>
                  <td className="p-4 text-gray-700">{txn.paymentPlan}</td>
                  <td className={`p-4 ${txn.paymentStatus === "Paid" ? "text-green-600" : "text-orange-600"}`}>
                    {txn.paymentStatus}
                  </td>
                  <td className="p-4 text-gray-700">{txn.creditScore}</td>
                  <td className={`p-4 ${
                    getCreditWorthiness(txn.creditScore) === "Excellent" ? "text-green-600" :
                    getCreditWorthiness(txn.creditScore) === "Good" ? "text-blue-600" :
                    getCreditWorthiness(txn.creditScore) === "Fair" ? "text-yellow-600" :
                    getCreditWorthiness(txn.creditScore) === "Poor" ? "text-orange-600" :
                    "text-red-600"
                  }`}>
                    {getCreditWorthiness(txn.creditScore)}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRefund(txn.orderId)}
                        disabled={!txn.refundEligible}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          txn.refundEligible
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        } transition-all duration-200`}
                      >
                        Refund
                      </button>
                      <button
                        onClick={() => handleViewPaymentHistory(txn.orderId)}
                        className="px-3 py-1 bg-bnpl-blue text-white rounded-md text-sm font-medium hover:bg-blue-800 transition-all duration-200"
                      >
                        View History
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4 text-bnpl-blue">
          <span>Showing 1-5 of 20</span>
          <div className="space-x-2">
            <button className="hover:underline">Previous</button>
            <button className="hover:underline">Next</button>
          </div>
        </div>
      </section>

      {/* Withdraw Funds Section */}
      <section className="max-w-7xl mx-auto py-8 px-6 text-center bg-gray-100">
        <p className="text-lg text-gray-700 mb-6">
          Withdraw your pending settlements to your linked bank account.
        </p>
        <p className="text-xl font-semibold text-bnpl-blue mb-2">
          Available to Withdraw: ${dashboardData.pendingSettlements.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Bank: {dashboardData.bankDetails.name} ending in ****{dashboardData.bankDetails.lastFour}
        </p>
        <button
          onClick={handleWithdraw}
          className="bg-bnpl-blue text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-800 transition-all duration-200"
        >
          Withdraw Funds
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-bnpl-blue text-white py-6 px-6 text-center">
        <p className="text-sm text-gray-200">
          © 2025 Genesis. All rights reserved. |{" "}
          <Link to="mailto:support@bnplsystem.com" className="text-bnpl-blue hover:underline">
            Support
          </Link>{" "}
          Privacy Policy{" "}
          <Link to="/terms-and-conditions" className="text-bnpl-blue hover:underline">
            Privacy Policy
          </Link>{" "}
          Terms and Conditions{" "}
          <Link to="/privacy" className="text-bnpl-blue hover:underline">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default MerchantDashboard;

// Customer Payment History Component
export const CustomerPaymentHistory = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Now properly imported
  const { transaction } = state || {};

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-700">No transaction data available.</p>
      </div>
    );
  }

  const getCreditWorthiness = (score) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    if (score >= 600) return "Poor";
    return "Bad";
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-bnpl-blue text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-bnpl-light-blue transition">
              Genesis
            </Link>
          </div>
          <button
            onClick={() => navigate("/merchant-dashboard")}
            className="text-lg hover:text-bnpl-light-blue transition"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Customer Payment History Section */}
      <section className="max-w-7xl mx-auto py-8 px-6 bg-white">
        <h1 className="text-3xl font-bold text-black mb-6">
          Payment History for {transaction.customer}
        </h1>

        {/* Customer Details */}
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Details</h2>
          <p className="text-gray-700"><strong>Name:</strong> {transaction.customer}</p>
          <p className="text-gray-700"><strong>Contact:</strong> {transaction.contact}</p>
          <p className="text-gray-700"><strong>Credit Score:</strong> {transaction.creditScore}</p>
          <p className={`text-gray-700`}>
            <strong>Credit Worthiness:</strong>{" "}
            <span className={
              getCreditWorthiness(transaction.creditScore) === "Excellent" ? "text-green-600" :
              getCreditWorthiness(transaction.creditScore) === "Good" ? "text-blue-600" :
              getCreditWorthiness(transaction.creditScore) === "Fair" ? "text-yellow-600" :
              getCreditWorthiness(transaction.creditScore) === "Poor" ? "text-orange-600" :
              "text-red-600"
            }>
              {getCreditWorthiness(transaction.creditScore)}
            </span>
          </p>
        </div>

        {/* BNPL Plan Info */}
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">BNPL Plan Information</h2>
          <p className="text-gray-700"><strong>Order ID:</strong> {transaction.orderId}</p>
          <p className="text-gray-700"><strong>Purchase Date & Time:</strong> {transaction.dateTime}</p>
          <p className="text-gray-700"><strong>Total Amount:</strong> ${transaction.amount.toFixed(2)}</p>
          <p className="text-gray-700"><strong>Payment Plan:</strong> {transaction.paymentPlan}</p>
          <p className={`text-gray-700`}>
            <strong>Payment Status:</strong>{" "}
            <span className={transaction.paymentStatus === "Paid" ? "text-green-600" : "text-orange-600"}>
              {transaction.paymentStatus}
            </span>
          </p>
        </div>

        {/* Payment History Table */}
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-gray-700 font-semibold p-4 text-left">Installment #</th>
                  <th className="text-gray-700 font-semibold p-4 text-left">Due Date</th>
                  <th className="text-gray-700 font-semibold p-4 text-left">Amount</th>
                  <th className="text-gray-700 font-semibold p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {transaction.paymentHistory.map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 text-gray-700">{payment.installment}</td>
                    <td className="p-4 text-gray-700">{payment.date}</td>
                    <td className="p-4 text-gray-700">${payment.amount.toFixed(2)}</td>
                    <td className={`p-4 ${payment.status === "Paid" ? "text-green-600" : "text-orange-600"}`}>
                      {payment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};