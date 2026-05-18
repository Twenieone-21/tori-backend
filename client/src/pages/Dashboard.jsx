import { useNavigate } from "react-router-dom";

function Dashboard({ inventory, transactions }) {
  const navigate = useNavigate();

  const totalSales = transactions.reduce((sum, tx) => sum + (tx.amount || tx.total || 0), 0);
  const itemsSold = transactions.reduce((sum, tx) => sum + (tx.items || tx.itemCount || 0), 0);
  const lowStock = inventory.filter((i) => i.stock <= 10).length;
  const txCount = transactions.length;

  const stats = [
    { label: "Total Sales", value: `₱${totalSales.toLocaleString()}`, change: "+12%", up: true, icon: "💰", color: "from-blue-500 to-blue-600", light: "bg-blue-50", text: "text-blue-600" },
    { label: "Items Sold", value: itemsSold, change: "+8%", up: true, icon: "📦", color: "from-emerald-500 to-emerald-600", light: "bg-emerald-50", text: "text-emerald-600" },
    { label: "Low Stock", value: lowStock, change: "-5%", up: false, icon: "⚠️", color: "from-amber-500 to-amber-600", light: "bg-amber-50", text: "text-amber-600" },
    { label: "Transactions", value: txCount, change: "+14%", up: true, icon: "📋", color: "from-purple-500 to-purple-600", light: "bg-purple-50", text: "text-purple-600" },
  ];

  const actions = [
    { label: "New Sale", icon: "➕", color: "from-blue-500 to-indigo-600", path: "/sales" },
    { label: "Add Item", icon: "📦", color: "from-emerald-500 to-teal-600", path: "/inventory" },
    { label: "View Reports", icon: "📊", color: "from-amber-500 to-orange-600", path: "/reports" },
    { label: "Inventory", icon: "📂", color: "from-purple-500 to-pink-600", path: "/inventory" },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hello, Maria! 👋</h2>
          <p className="text-slate-500 mt-1.5 text-sm font-medium">Here's what's happening in your store today</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all relative">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-sm font-semibold text-slate-700 hover:shadow-md transition-all">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Today
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Overview
        </h3>
        <div className="grid grid-cols-4 gap-5">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className={`w-14 h-14 ${s.light} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                  {s.icon}
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${s.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={s.up ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                  </svg>
                  {s.change}
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{s.value}</p>
              <p className="text-sm font-medium text-slate-400">{s.label}</p>
              <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-500`} style={{ width: `${60 + idx * 10}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
          Quick Actions
        </h3>
        <div className="grid grid-cols-4 gap-5">
          {actions.map((a, idx) => (
            <button
              key={idx}
              onClick={() => navigate(a.path)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/50 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${a.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-lg`}>
                {a.icon}
              </div>
              <p className="text-sm font-bold text-slate-700">{a.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Recent Transactions
          </h3>
          <button onClick={() => navigate("/reports")} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {transactions.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No transactions yet</p>
        ) : (
          <div className="space-y-1">
            {transactions.slice(0, 5).map((tx, i) => (
              <div key={tx._id || i} className="flex items-center justify-between px-5 py-4 rounded-xl hover:bg-slate-50 hover:translate-x-1 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-100">
                    <span className="text-xs font-bold text-slate-700">{tx.time?.split(' ')[0] || '--'}</span>
                    <span className="text-[10px] text-slate-400">{tx.time?.split(' ')[1] || ''}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      Sale #{tx.id || tx._id?.slice(-4)}
                      {i === 0 && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">NEW</span>}
                    </p>
                    <p className="text-sm text-slate-400 font-medium">{tx.items || 0} items sold</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-slate-900 text-lg">₱{(tx.amount || tx.total || 0).toLocaleString()}</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;