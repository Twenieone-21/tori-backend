import { useState } from "react";

function Inventory({ inventory, addProduct }) {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    await addProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    });
    setNewProduct({ name: "", price: "", stock: "" });
    setShowModal(false);
  };

  const getStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", bg: "bg-red-100", text: "text-red-700", bar: "bg-red-500" };
    if (stock <= 10) return { label: "Low Stock", bg: "bg-amber-100", text: "text-amber-700", bar: "bg-amber-500" };
    return { label: "In Stock", bg: "bg-emerald-100", text: "text-emerald-700", bar: "bg-emerald-500" };
  };

  const totalValue = inventory.reduce((sum, i) => sum + i.price * i.stock, 0);
  const totalStock = inventory.reduce((sum, i) => sum + i.stock, 0);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Inventory</h2>
          <p className="text-slate-500 mt-1.5 text-sm font-medium">Manage your products and stock levels</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">📦</div>
            <p className="text-sm font-bold text-slate-500">Total Products</p>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{inventory.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg">📊</div>
            <p className="text-sm font-bold text-slate-500">Total Stock</p>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalStock}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-lg">💰</div>
            <p className="text-sm font-bold text-slate-500">Inventory Value</p>
          </div>
          <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₱{totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Stock Level</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {inventory.map(item => {
              const s = getStatus(item.stock);
              return (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-sm" style={{ background: (item.color || '#666') + '15' }}>
                        {item.emoji || '📦'}
                      </div>
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">₱{item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${s.bar} rounded-full transition-all duration-500`} style={{ width: `${Math.min((item.stock / 60) * 100, 100)}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-600 w-8">{item.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${s.bg} ${s.text}`}>{s.label}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">₱{(item.price * item.stock).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 w-[420px] shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">➕</div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Add New Product</h3>
                <p className="text-sm text-slate-400">Fill in the product details</p>
              </div>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                <input type="text" required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" placeholder="e.g. Kopiko Brown" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price (₱)</label>
                  <input type="number" required min="0" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" placeholder="10" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Stock</label>
                  <input type="number" required min="0" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" placeholder="35" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;