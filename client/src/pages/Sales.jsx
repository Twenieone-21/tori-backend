import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sales({ inventory, setInventory, recordSale, updateProductStock, transactions = [] }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setInventory(prev => prev.map(item => item._id === product._id ? { ...item, stock: item.stock - 1 } : item));
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i._id === productId);
    if (!item) return;
    setInventory(prev => prev.map(i => i._id === productId ? { ...i, stock: i.stock + item.quantity } : i));
    setCart(prev => prev.filter(i => i._id !== productId));
  };

  const updateQty = (productId, delta) => {
    const item = cart.find(i => i._id === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    if (delta > 0) {
      const invItem = inventory.find(i => i._id === productId);
      if (!invItem || invItem.stock <= 0) return;
      setInventory(prev => prev.map(i => i._id === productId ? { ...i, stock: i.stock - 1 } : i));
    } else {
      setInventory(prev => prev.map(i => i._id === productId ? { ...i, stock: i.stock + 1 } : i));
    }
    setCart(prev => prev.map(i => i._id === productId ? { ...i, quantity: newQty } : i));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
    cart.forEach(item => {
      const newStock = inventory.find(i => i._id === item._id)?.stock || 0;
      updateProductStock(item._id, newStock);
    });
    recordSale({ items: itemCount, amount: total, products: cart.map(c => ({ productId: c._id, quantity: c.quantity, price: c.price })) });
    alert(`Sale completed! Total: ₱${total.toLocaleString()}`);
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", bg: "bg-red-100", text: "text-red-700", bar: "bg-red-500" };
    if (stock <= 10) return { label: "Low Stock", bg: "bg-amber-100", text: "text-amber-700", bar: "bg-amber-500" };
    return { label: "In Stock", bg: "bg-emerald-100", text: "text-emerald-700", bar: "bg-emerald-500" };
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sales</h2>
          <p className="text-slate-500 mt-1.5 text-sm font-medium">Select products and manage your cart</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-bold text-blue-700">{cart.length} items in cart</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Products */}
        <div className="col-span-3">
          <div className="flex items-center gap-3 mb-5">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Products
            </h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{inventory.length} items</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {inventory.map(item => {
              const s = getStatus(item.stock);
              return (
                <div key={item._id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm" style={{ background: (item.color || '#666') + '15' }}>
                      {item.emoji || '📦'}
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${s.bg} ${s.text}`}>
                      {s.label}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h4>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-blue-600">₱{item.price}</span>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                      <div className={`w-2 h-2 rounded-full ${s.bar}`}></div>
                      {item.stock} left
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div className={`h-full ${s.bar} rounded-full transition-all duration-500`} style={{ width: `${Math.min((item.stock / 50) * 100, 100)}%` }}></div>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={item.stock === 0}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${item.stock === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5'}`}
                  >
                    {item.stock === 0 ? '❌ Out of Stock' : '➕ Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart + Recent Transactions */}
        <div className="col-span-2 space-y-6">
          {/* Cart */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Cart
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🛒</div>
                  <p className="text-slate-400 font-bold">Your cart is empty</p>
                  <p className="text-sm text-slate-400 mt-1">Add products to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-5 max-h-[280px] overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item._id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 hover:bg-blue-50/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ background: (item.color || '#666') + '15' }}>
                          {item.emoji || '📦'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-slate-400 font-medium">₱{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1">
                          <button onClick={() => updateQty(item._id, -1)} className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4"/></svg>
                          </button>
                          <span className="w-6 text-center font-bold text-sm text-slate-700">{item.quantity}</span>
                          <button onClick={() => updateQty(item._id, 1)} className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
                          </button>
                        </div>
                        <div className="text-right min-w-[60px]">
                          <p className="font-extrabold text-slate-900 text-sm">₱{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-dashed border-slate-100 pt-4 mb-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-medium">Subtotal</span>
                      <span className="font-bold text-slate-700">₱{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-medium">Tax (0%)</span>
                      <span className="font-bold text-slate-700">₱0</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₱{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button onClick={handleCheckout} className="checkout-btn w-full text-black py-3.5 rounded-xl font-extrabold text-lg shadow-lg">
                    💳 Checkout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                Recent Transactions
              </h3>
              <button onClick={() => navigate('/reports')} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-4">
              {transactions.length === 0 ? (
                <p className="text-slate-400 text-center py-6 text-sm">No transactions yet</p>
              ) : (
                <div className="space-y-1">
                  {transactions.slice(0, 4).map((tx, i) => (
                    <div key={tx._id || i} className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex flex-col items-center justify-center border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-700">{tx.time?.split(' ')[0]}</span>
                          <span className="text-[9px] text-slate-400">{tx.time?.split(' ')[1]}</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            Sale #{tx.id}
                            {i === 0 && <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-bold rounded-full">NEW</span>}
                          </p>
                          <p className="text-xs text-slate-400 font-medium">{tx.items} items • ₱{tx.amount}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900">₱{tx.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
