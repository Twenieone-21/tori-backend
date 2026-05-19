function Reports({ transactions }) {
  const total = transactions.reduce((s, tx) => s + (tx.amount || tx.total || 0), 0);
  const items = transactions.reduce((s, tx) => s + (tx.items || tx.itemCount || 0), 0);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reports</h2>
          <p className="text-slate-500 mt-1.5 text-sm font-medium">View your sales analytics and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-2xl">💰</div>
            <div>
              <p className="text-sm font-bold text-slate-500">Total Revenue</p>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₱{total.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center text-2xl">📦</div>
            <div>
              <p className="text-sm font-bold text-slate-500">Total Items Sold</p>
              <p className="text-4xl font-extrabold text-emerald-600">{items}</p>
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
          Transaction History
        </h3>
        {transactions.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No transactions yet</p>
        ) : (
          <div className="space-y-1">
            {transactions.map((tx, i) => (
              <div key={tx._id || i} className="flex items-center justify-between px-5 py-4 rounded-xl hover:bg-slate-50 hover:translate-x-1 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600 text-sm border border-slate-100">
                    #{tx.id?.slice(-2) || i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Sale #{tx.id || tx._id?.slice(-4)}</p>
                    <p className="text-sm text-slate-400 font-medium">{new Date(tx.createdAt).toLocaleDateString('en-PH') || tx.time} • {tx.items || 0} items</p>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 text-lg">₱{(tx.amount || tx.total || 0).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
