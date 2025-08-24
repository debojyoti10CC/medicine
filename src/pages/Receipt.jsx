import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import TopEllipseBackground from "../components/TopEllipseBackground";
import PrimaryButton from "../components/PrimaryButton";

export default function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get payment data from location state
  const { 
    cart = [], 
    totalPrice = 0, 
    reportCost = 0, 
    finalTotalPrice = 0,
    fromMedicineDispensing = false,
    paymentDate = new Date().toLocaleDateString(),
    paymentTime = new Date().toLocaleTimeString()
  } = location.state || {};

  // Generate a mock transaction ID
  const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans">
      <TopEllipseBackground color="#FFF1EA" height="30%" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <Logo />
          <div className="mt-4 mb-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-green-600">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mt-2">Thank you for your payment</p>
          </div>
        </header>

        <main className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Transaction Details */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Transaction Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-gray-800">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-800">{paymentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="text-gray-800">{paymentTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="text-gray-800">Online Payment</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {reportCost > 0 && (
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-semibold text-gray-800">Health Report</p>
                    <p className="text-sm text-gray-500">Comprehensive health summary</p>
                  </div>
                  <p className="font-semibold text-gray-700">₹{reportCost}</p>
                </div>
              )}
              
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-semibold text-gray-700">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 pt-4 mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-gray-600">Total Paid</span>
              <span className="text-green-600">₹{finalTotalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <PrimaryButton 
              onClick={() => navigate('/report')} 
              className="w-full justify-center"
            >
              View Health Report
            </PrimaryButton>
            
            <button 
              onClick={() => navigate('/medicine-dispensing')} 
              className="w-full py-3 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Continue Shopping
            </button>
            
            <button 
              onClick={() => navigate('/')} 
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Download Receipt Option */}
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.print()} 
              className="text-sm text-gray-600 hover:text-orange-500 underline"
            >
              Print Receipt
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}