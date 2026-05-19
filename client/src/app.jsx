import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([
    { _id: "tx8", id: "0008", time: "10:30 AM", amount: 150, items: 4 },
    { _id: "tx7", id: "0007", time: "09:45 AM", amount: 200, items: 6 },
    { _id: "tx6", id: "0006", time: "09:10 AM", amount: 75, items: 2 },
    { _id: "tx5", id: "0005", time: "08:50 AM", amount: 120, items: 3 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setInventory(data.map((item, i) => ({
            ...item,
            emoji: ["☕", "🍜", "🥤", "🍘", "🧃", "🥪", "🥛", "🥔"][i % 8],
            color: ["#8B4513", "#F4A460", "#DC143C", "#DEB887", "#FF8C00", "#D2691E", "#228B22", "#FFD700"][i % 8],
          })));
        } else {
          setInventory([
            { _id: "1", name: "Kopiko Brown", price: 10, stock: 35, emoji: "☕", color: "#8B4513" },
            { _id: "2", name: "Lucky Me Pancit", price: 12, stock: 12, emoji: "🍜", color: "#F4A460" },
            { _id: "3", name: "Coca-Cola 1.5L", price: 60, stock: 5, emoji: "🥤", color: "#DC143C" },
            { _id: "4", name: "Skyflakes Crackers", price: 8, stock: 48, emoji: "🍘", color: "#DEB887" },
            { _id: "5", name: "Tang Orange Juice", price: 15, stock: 22, emoji: "🧃", color: "#FF8C00" },
            { _id: "6", name: "Rebisco Sandwich", price: 6, stock: 60, emoji: "🥪", color: "#D2691E" },
            { _id: "7", name: "Milo Energy Drink", price: 25, stock: 18, emoji: "🥛", color: "#228B22" },
            { _id: "8", name: "Piattos Cheese", price: 18, stock: 30, emoji: "🥔", color: "#FFD700" },
          ]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Backend offline, using fallback data:", err);
        setInventory([
          { _id: "1", name: "Kopiko Brown", price: 10, stock: 35, emoji: "☕", color: "#8B4513" },
          { _id: "2", name: "Lucky Me Pancit", price: 12, stock: 12, emoji: "🍜", color: "#F4A460" },
          { _id: "3", name: "Coca-Cola 1.5L", price: 60, stock: 5, emoji: "🥤", color: "#DC143C" },
          { _id: "4", name: "Skyflakes Crackers", price: 8, stock: 48, emoji: "🍘", color: "#DEB887" },
          { _id: "5", name: "Tang Orange Juice", price: 15, stock: 22, emoji: "🧃", color: "#FF8C00" },
          { _id: "6", name: "Rebisco Sandwich", price: 6, stock: 60, emoji: "🥪", color: "#D2691E" },
          { _id: "7", name: "Milo Energy Drink", price: 25, stock: 18, emoji: "🥛", color: "#228B22" },
          { _id: "8", name: "Piattos Cheese", price: 18, stock: 30, emoji: "🥔", color: "#FFD700" },
        ]);
        setLoading(false);
      });
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const newProduct = await res.json();
      setInventory(prev => [...prev, { ...newProduct, emoji: "📦", color: "#666" }]);
      return newProduct;
    } catch (err) {
      const temp = { ...product, _id: Date.now().toString(), emoji: "📦", color: "#666" };
      setInventory(prev => [...prev, temp]);
      return temp;
    }
  };

  const updateProductStock = async (id, newStock) => {
    try {
      await fetch(`${API_BASE}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
    } catch (err) {
      console.error("Failed to update stock:", err);
    }
  };

  const recordSale = async (saleData) => {
    const total = saleData.amount;
    const items = saleData.items;
    const newTx = {
      _id: Date.now().toString(),
      id: String(transactions.length + 5).padStart(4, "0"),
      time: new Date().toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }),
      amount: total,
      items: items,
    };
    setTransactions(prev => [newTx, ...prev]);
    try {
      await fetch(`${API_BASE}/api/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });
    } catch (err) {
      console.error("Failed to record sale to backend:", err);
    }
    return newTx;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading TORI POS...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - no sidebar */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - with sidebar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="ml-72 flex-1 p-8 max-w-[1400px]">
                  <Dashboard inventory={inventory} transactions={transactions} />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="ml-72 flex-1 p-8 max-w-[1400px]">
                  <Sales
                    inventory={inventory}
                    setInventory={setInventory}
                    recordSale={recordSale}
                    updateProductStock={updateProductStock}
                    transactions={transactions}
                  />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="ml-72 flex-1 p-8 max-w-[1400px]">
                  <Inventory inventory={inventory} addProduct={addProduct} />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="ml-72 flex-1 p-8 max-w-[1400px]">
                  <Reports transactions={transactions} />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;