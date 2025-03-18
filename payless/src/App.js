import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage";
import CustomerSignup from "./components/CustomerSignup";
import MerchantSignup from "./components/MerchantSignup";
import TermsAndConditions from "./components/TermsAndConditions"; // Add this
import PrivacyPolicy from "./components/PrivacyPolicy"; // Add this if created
import Login from "./components/Login";
import CustomerDashboard from "./components/CustomerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/merchant-signup" element={<MerchantSignup />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* If created */}
        <Route path="/login" element={<Login />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;