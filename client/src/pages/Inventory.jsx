import { useState } from "react";

function Inventory({ inventory, addProduct }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    await addProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    });
    setNewProduct({ name: "", price: "", stock: "" });
    setShowAddModal(false);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", class: "bg-red-100 text-red-700" };
    if (stock <= 10) return { label: "Low Stock", class: "bg-amber-100 text-amber-700" };
    return { label: "In Stock", class: "bg-emerald-100 text-emerald-700" };
  };

  const totalValue = inventory.reduce((sum, i) => sum + i.price * i.stock, 0);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Inventory</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Stock</p>
          <p className="text-2xl font-bold text-gray-900">{inventory.reduce((s, i) => s + i.stock, 0)}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Inventory Value</p>
          <p className="text-2xl font-bold text-blue-600">₱{totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventory.map((item) => {
              const status = getStockStatus(item.stock);
              return (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">
                        {item.image || "📦"}
                      </div>
                      <span className="font-semibold text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">₱{item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.stock > 10 ? "bg-emerald-500" : item.stock > 0 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min((item.stock / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.class}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">₱{(item.price * item.stock).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Kopiko Brown"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="35"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
