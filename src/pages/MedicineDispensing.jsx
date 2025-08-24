import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import TopEllipseBackground from "../components/TopEllipseBackground";
import PrimaryButton from "../components/PrimaryButton";

// --- Mock Data & Reusable Components (from previous step) ---

const medicalKits = [
  {
    id: 1,
    name: "First Aid Kit",
    description: "Essential supplies for common injuries.",
    price: 1200, // Using numbers for easier calculation
    stock: "In Stock",
    imageUrl: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    name: "Diabetes Care Kit",
    description: "Monitor and manage blood sugar levels.",
    price: 2500,
    stock: "In Stock",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MpakwoRF3mOMBOSiX9r5u9agRrPSVbtBSg&s",
  },
  {
    id: 3,
    name: "Cold & Flu Kit",
    description: "Relief from seasonal cold and flu symptoms.",
    price: 850,
    stock: "Low Stock",
    imageUrl: "https://care24hospital.in/wp-content/uploads/2020/12/Rectangle-3.jpg",
  },
  {
    id: 4,
    name: "Travel Health Kit",
    description: "Stay healthy and prepared on the go.",
    price: 1500,
    stock: "Out of Stock",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWy5xk-t7nt3Zw7eAMs00AI-Ptg0BKhlcrmA&s",
  },
];

const StockBadge = ({ stock }) => {
  const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full";
  let specificClasses = "";
  switch (stock) {
    case "In Stock": specificClasses = "bg-green-100 text-green-800"; break;
    case "Low Stock": specificClasses = "bg-yellow-100 text-yellow-800"; break;
    case "Out of Stock": specificClasses = "bg-red-100 text-red-800"; break;
    default: specificClasses = "bg-gray-100 text-gray-800";
  }
  return <span className={`${baseClasses} ${specificClasses}`}>{stock}</span>;
};

const KitCard = ({ kit, onAddToCart }) => {
  const isOutOfStock = kit.stock === "Out of Stock";
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-orange-300">
      <div className="w-full h-40 bg-gray-100"><img src={kit.imageUrl} alt={kit.name} className="w-full h-full object-cover" /></div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800">{kit.name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{kit.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-semibold text-orange-500">₹{kit.price}</p>
          <StockBadge stock={kit.stock} />
        </div>
        <PrimaryButton
          className="w-full justify-center mt-4"
          disabled={isOutOfStock}
          onClick={() => onAddToCart(kit)}
          aria-label={isOutOfStock ? `${kit.name} is out of stock` : `Add ${kit.name} to cart`}
        >
          {isOutOfStock ? "Unavailable" : "Add to Cart"}
        </PrimaryButton>
      </div>
    </div>
  );
};


// --- Main Medicine Dispensing Page ---
export default function MedicineDispensing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);

  // Check if we came from the payment gate
  const { fromPaymentGate } = location.state || {};

  const handleAddToCart = (kitToAdd) => {
    setCart((prevCart) => {
      const existingKit = prevCart.find((item) => item.id === kitToAdd.id);
      if (existingKit) {
        // If kit exists, update its quantity
        return prevCart.map((item) =>
          item.id === kitToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If kit doesn't exist, add it to the cart
      return [...prevCart, { ...kitToAdd, quantity: 1 }];
    });
  };

  const { totalItems, totalPrice } = useMemo(() => {
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems: items, totalPrice: price };
  }, [cart]);

  const handleCheckout = () => {
    // Navigate to the checkout page and pass the cart state and the fromPaymentGate flag
    navigate('/checkout', { state: { cart, totalPrice, fromPaymentGate } });
  };

  return (
    <div className="relative min-h-screen bg-gray-50 font-sans pb-28"> {/* Added padding-bottom */}
      <TopEllipseBackground color="#FFF1EA" height="40%" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="text-3xl text-gray-700 hover:text-orange-500 transition-colors" aria-label="Go Back">←</button>
          <div className="text-center">
            <Logo />
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-2">Medicine Dispensing</h1>
            <p className="text-gray-600">Select a kit to add to your cart</p>
          </div>
          <div className="w-8"></div>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicalKits.map((kit) => (
            <KitCard key={kit.id} kit={kit} onAddToCart={handleAddToCart} />
          ))}
        </main>
      </div>

      {/* Floating Cart / Checkout Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
          <button onClick={handleCheckout} className="w-full flex items-center justify-between bg-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105">
            <span>{totalItems} item{totalItems > 1 ? 's' : ''} in cart</span>
            <span>Checkout (₹{totalPrice}) →</span>
          </button>
        </div>
      )}
    </div>
  );
}