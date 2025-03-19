import React, { useState } from "react";
import { Link } from "react-router-dom";

// Navbar Component (Reused for consistency)
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
          <section className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works for Customers</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              With Genesis BNPL, your Credit Score—calculated from your purchases and spending—determines your ability to shop now and pay later. Here’s the detailed process:
            </p>

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

            {/* Step 2: Shop */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Shop with Your Credit Score</h3>
                <p className="text-gray-700 mb-4">
                  Browse partner stores and select Genesis BNPL at checkout. Your Credit Score, based on past purchases and spending, determines if you can buy an item. The more you shop, the higher your score and limit grow.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Eligibility:</strong> A $699 Smartphone X requires a Credit Score reflecting $500+ spent or 5+ items bought.</li>
                  <li><strong>Real-Time Check:</strong> See your score and limit during checkout.</li>
                  <li><strong>Wide Reach:</strong> Use online or in-store with your Genesis QR code.</li>
                </ul>
                <p className="text-gray-600 italic mt-2">
                  Example: After buying 3 items ($150 total), your Credit Score rises, qualifying you for a $1000 limit.
                </p>
              </div>
            </div>

            {/* Step 3: Choose a Plan */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Choose a Plan with Your Credit Score</h3>
                <p className="text-gray-700 mb-4">
                  Pick a 3, 6, or 12-month plan based on your Credit Score. Higher scores unlock longer plans or larger purchases. Pay a small upfront amount (if needed) and the rest over time—interest-free if on schedule.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>3 Months:</strong> $233/month for a $699 item (base score eligible).</li>
                  <li><strong>6 Months:</strong> $116.50/month (needs 5+ purchases or $300 spent).</li>
                  <li><strong>12 Months:</strong> $58.25/month (requires 10+ purchases or $600 spent).</li>
                  <li><strong>Score Impact:</strong> Timely payments boost your score further.</li>
                </ul>
                <p className="text-gray-600 italic mt-2">
                  Tip: Consistent purchases improve your Credit Score, giving you more plan options!
                </p>
              </div>
            </div>

            {/* Step 4: Pay Over Time */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pay Over Time & Boost Your Credit Score</h3>
                <p className="text-gray-700 mb-4">
                  Manage payments via the Genesis dashboard. Each on-time payment increases your Credit Score, reflecting your reliability and unlocking bigger BNPL opportunities.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Payment Options:</strong> Use Mpesa, Card, Stripe, or Paypal.</li>
                  <li><strong>Score Boost:</strong> Pay 3 installments on time to raise your limit by $200.</li>
                  <li><strong>Tracking:</strong> Monitor your score, balance, and history in real-time.</li>
                  <li><strong>Early Payoff:</strong> Settle early to accelerate score growth.</li>
                </ul>
                <Link to="/customer-dashboard" className="mt-4 inline-block text-bnpl-blue hover:underline font-medium">
                  Explore Dashboard
                </Link>
              </div>
            </div>

            {/* Benefits */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Genesis BNPL?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                  <div className="text-bnpl-blue text-4xl mb-4">📊</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Credit Score Growth</h4>
                  <p className="text-gray-700">Build your score with every purchase and payment.</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                  <div className="text-bnpl-blue text-4xl mb-4">💸</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Flexible Limits</h4>
                  <p className="text-gray-700">Higher scores mean bigger BNPL opportunities.</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                  <div className="text-bnpl-blue text-4xl mb-4">🌟</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">No Interest</h4>
                  <p className="text-gray-700">Pay on time and keep costs low.</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center">How It Works for Merchants</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Partner with Genesis BNPL to leverage our Credit Score system—based on customer purchases and spending—to drive sales while we manage payments.
            </p>

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

            {/* Step 2: Integrate */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrate Genesis BNPL</h3>
                <p className="text-gray-700 mb-4">
                  Add our BNPL option to your store. Customers with sufficient Credit Scores—earned through purchases and spending—can buy instantly, driving your sales with no risk to you.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Easy Tools:</strong> Plugins for Shopify, WooCommerce, or custom APIs.</li>
                  <li><strong>In-Store:</strong> Offer BNPL via QR codes or POS.</li>
                  <li><strong>Score-Driven:</strong> We approve based on transactional history.</li>
                </ul>
                <p className="text-gray-600 italic mt-2">
                  Example: A customer with 5 purchases ($300 spent) gets approved for your $200 item.
                </p>
              </div>
            </div>

            {/* Step 3: Offer BNPL */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Offer Flexible Payments</h3>
                <p className="text-gray-700 mb-4">
                  Customers choose BNPL at checkout, with approval tied to their Credit Score. The more they’ve bought and spent, the larger the purchases they can make—boosting your revenue.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Increased Sales:</strong> Customers with higher scores buy more.</li>
                  <li><strong>Instant Approval:</strong> We check their score in seconds.</li>
                  <li><strong>No Risk:</strong> You’re paid regardless of their repayment.</li>
                </ul>
              </div>
            </div>

            {/* Step 4: Get Paid */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-bnpl-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Get Paid Upfront</h3>
                <p className="text-gray-700 mb-4">
                  After a purchase, we pay you the full amount within 24-48 hours (minus a 2-5% fee), regardless of the customer’s Credit Score or repayment status. They repay us based on their score-driven plan.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Fast Payouts:</strong> Funds in your account quickly.</li>
                  <li><strong>Score Monitoring:</strong> We track customer reliability for you.</li>
                  <li><strong>Growth:</strong> Reinvest earnings to expand your business.</li>
                </ul>
                <Link to="/merchant-signup" className="mt-4 inline-block text-bnpl-blue hover:underline font-medium">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Benefits */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Partner with Genesis?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                  <div className="text-bnpl-blue text-4xl mb-4">📈</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Boost Sales</h4>
                  <p className="text-gray-700">Credit Score system drives bigger purchases.</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                  <div className="text-bnpl-blue text-4xl mb-4">💰</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Upfront Payment</h4>
                  <p className="text-gray-700">Get paid instantly, no credit risk.</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                  <div className="text-bnpl-blue text-4xl mb-4">📊</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Reliable Customers</h4>
                  <p className="text-gray-700">Score ensures consistent spenders.</p>
                </div>
              </div>
            </div>
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