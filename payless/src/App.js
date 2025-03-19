import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landingpage";
import CustomerSignup from "./components/CustomerSignup";
import MerchantSignup from "./components/MerchantSignup";
import TermsAndConditions from "./components/TermsAndConditions"; // Add this
import PrivacyPolicy from "./components/PrivacyPolicy"; // Add this if created
import Login from "./components/Login";
import ApplyBNPL from "./components/ApplyBNPL";
import CustomerDashboard from "./components/CustomerDashboard";
import Stores from "./components/Stores"; // Add this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/merchant-signup" element={<MerchantSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/apply-bnpl" element={<ApplyBNPL />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* If created */}
       <Route path="/stores/*" element={<Stores />} /> {/* Add this */}
      </Routes>
    </Router>
  );
}

export default App;