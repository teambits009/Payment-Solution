import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MerchantDashboard = () => {
  const navigate = useNavigate();

  // Mock data with Safarigamers purchase details and credit scores
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

  // Mock refund handler
  const handleRefund = (orderId) => {
    alert(`Initiating refund for Order ID: ${orderId}. This is a mock action; implement API call here.`);
  };

  // Mock payment history handler
  const handleViewPaymentHistory = (orderId) => {
    alert(`Viewing full payment history for Order ID: ${orderId}. This is a mock action; implement detailed view here.`);
  };

  // Function to determine credit worthiness based on credit score
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
      <nav className="bg-Safarigamers-blue text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-Safarigamers-light-blue transition">
              Safarigamers
            </Link>
          </div>
          <div className="flex space-x-6 items-center">
            <span className="text-lg text-white">Welcome, Ann </span>
            <span className="text-lg text-Safarigamers-light-blue">Dashboard</span>
            <button
              onClick={handleLogout}
              className="text-lg hover:text-Safarigamers-light-blue transition"
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
            <p className="text-lg font-semibold text-gray-700">Total Safarigamers Sales</p>
            <p className="text-3xl font-bold text-Safarigamers-blue">${dashboardData.totalSales.toLocaleString()}</p>
            <p className="text-sm text-gray-500">All-time sales via Safarigamers Safarigamers</p>
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

      {/* Safarigamers Transactions Table Section with Credit Worthiness */}
      <section className="max-w-7xl mx-auto py-8 px-6 bg-white">
        <h2 className="text-2xl font-bold text-black mb-4">Safarigamers Purchase Tracking</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-50">
              <tr>
                {/* Top Section: Customer Details */}
                <th className="text-gray-700 font-semibold p-4 text-left">Customer Name</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Contact</th>
                {/* Middle Section: Safarigamers Plan Info */}
                <th className="text-gray-700 font-semibold p-4 text-left">Order ID</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Date & Time</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Amount</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Payment Plan</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Payment Status</th>
                {/* Credit Worthiness Section */}
                <th className="text-gray-700 font-semibold p-4 text-left">Credit Score</th>
                <th className="text-gray-700 font-semibold p-4 text-left">Credit Worthiness</th>
                {/* Bottom Section: Actions */}
                <th className="text-gray-700 font-semibold p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.transactions.map((txn, index) => (
                <tr key={txn.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  {/* Customer Details */}
                  <td className="p-4 text-gray-700">{txn.customer}</td>
                  <td className="p-4 text-gray-700">{txn.contact}</td>
                  {/* Safarigamers Plan Info */}
                  <td className="p-4 text-gray-700">{txn.orderId}</td>
                  <td className="p-4 text-gray-700">{txn.dateTime}</td>
                  <td className="p-4 text-gray-700">${txn.amount.toFixed(2)}</td>
                  <td className="p-4 text-gray-700">{txn.paymentPlan}</td>
                  <td className={`p-4 ${txn.paymentStatus === "Paid" ? "text-green-600" : "text-orange-600"}`}>
                    {txn.paymentStatus}
                  </td>
                  {/* Credit Worthiness */}
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
                  {/* Actions */}
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
                        className="px-3 py-1 bg-Safarigamers-blue text-white rounded-md text-sm font-medium hover:bg-blue-800 transition-all duration-200"
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
        <div className="flex justify-between mt-4 text-Safarigamers-blue">
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
        <p className="text-xl font-semibold text-Safarigamers-blue mb-2">
          Available to Withdraw: ${dashboardData.pendingSettlements.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Bank: {dashboardData.bankDetails.name} ending in ****{dashboardData.bankDetails.lastFour}
        </p>
        <button
          onClick={handleWithdraw}
          className="bg-Safarigamers-blue text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-800 transition-all duration-200"
        >
          Withdraw Funds
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-Safarigamers-blue text-white py-6 px-6 text-center">
        <p className="text-sm text-gray-200">
          © 2025 Safarigamers. All rights reserved. |{" "}
          <Link to="mailto:support@Safarigamerssystem.com" className="text-Safarigamers-blue hover:underline">
            Support
          </Link>{" "}
          Privacy Policy{" "}
          <Link to="/terms-and-conditions" className="text-Safarigamers-blue hover:underline">
            Privacy Policy
          </Link>{" "}
          Terms and Conditions{" "}
          <Link to="/privacy" className="text-Safarigamers-blue hover:underline">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default MerchantDashboard;