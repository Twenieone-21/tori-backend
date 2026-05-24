import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Zap, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Check, 
  ArrowRight, 
  Store, 
  Shield, 
  Smartphone,
  Menu,
  X,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Plus,
  FileText,
  FolderOpen,
  Clock,
  Users
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      title: "Mabilis na Benta",
      desc: "One-click sales processing. Perfect for busy sari-sari stores during rush hours.",
      color: "bg-blue-600"
    },
    {
      icon: <Package className="w-6 h-6 text-white" />,
      title: "Inventory Tracking",
      desc: "Know exactly what's in stock. Get alerts before items run out.",
      color: "bg-emerald-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Sales Reports",
      desc: "See your daily, weekly, and monthly earnings at a glance.",
      color: "bg-violet-500"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Mobile Friendly",
      desc: "Works on any device — tablet, laptop, or desktop.",
      color: "bg-orange-500"
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Secure Data Storage",
      desc: "Store sales and inventory records digitally for easier tracking.",
      color: "bg-rose-500"
    },
    {
      icon: <Store className="w-6 h-6 text-white" />,
      title: "Built for Pinoy Stores",
      desc: "Designed specifically for small businesses in the Philippines.",
      color: "bg-cyan-500"
    }
  ];

  const pricingFeatures = [
    "Unlimited Sales Transactions",
    "Inventory Management",
    "Sales Analytics & Reports",
    "Low Stock Alerts",
    "Cloud Data Backup",
    "Multi-device Access",
    "Email Support",
    "Regular Updates"
  ];

  const quickActions = [
    { icon: <Plus className="w-6 h-6 text-blue-600" />, label: "New Sale" },
    { icon: <Package className="w-6 h-6 text-emerald-600" />, label: "Add Item" },
    { icon: <FileText className="w-6 h-6 text-orange-600" />, label: "View Reports" },
    { icon: <FolderOpen className="w-6 h-6 text-violet-600" />, label: "Inventory" }
  ];

  const recentTransactions = [
    { id: "0009", time: "06:53 PM", items: 3, amount: "₱30", status: "NEW" },
    { id: "0008", time: "10:30 AM", items: 4, amount: "₱150", status: null },
    { id: "0007", time: "09:45 AM", items: 6, amount: "₱200", status: null }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Tori POS</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How It Works</a>
              <Link 
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium text-slate-600 py-2">Features</a>
            <a href="#pricing" className="block text-sm font-medium text-slate-600 py-2">Pricing</a>
            <a href="#how-it-works" className="block text-sm font-medium text-slate-600 py-2">How It Works</a>
            <Link 
              to="/login" 
              className="block w-full text-center px-5 py-2.5 text-slate-600 font-medium"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="block w-full text-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Now available for small businesses in the Philippines
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              The <span className="text-blue-600">Simplest POS</span><br />
              for Your Sari-Sari Store
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Track sales, manage inventory, and grow your business — all in one easy-to-use dashboard. 
              No complicated setup. No hidden fees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                Learn More
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by <strong className="text-slate-900">500+</strong> store owners</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block px-3 py-1 bg-white rounded-md text-xs text-slate-400 border border-slate-200">
                    tori-backend.vercel.app
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 bg-slate-50">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Sales", value: "₱5,240", color: "text-blue-600", bar: "bg-blue-500", icon: <span className="text-lg font-bold text-blue-500">₱</span>, bg: "bg-blue-50" },
                    { label: "Items Sold", value: "142", color: "text-emerald-600", bar: "bg-emerald-500", icon: <Package className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50" },
                    { label: "Low Stock", value: "3", color: "text-amber-600", bar: "bg-amber-500", icon: <AlertTriangle className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50" },
                    { label: "Transactions", value: "28", color: "text-violet-600", bar: "bg-violet-500", icon: <Receipt className="w-5 h-5 text-violet-500" />, bg: "bg-violet-50" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                        {stat.icon}
                      </div>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-xs text-slate-500 mb-2">{stat.label}</div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.bar} rounded-full`} style={{width: `${60 + i * 10}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quickActions.map((action, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                          {action.icon}
                        </div>
                        <span className="text-xs font-medium text-slate-600">{action.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-violet-500" />
                      Recent Transactions
                    </h3>
                    <span className="text-xs text-blue-600 font-medium">View All →</span>
                  </div>
                  <div className="space-y-2">
                    {recentTransactions.map((tx, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <Receipt className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                              Sale #{tx.id}
                              {tx.status && <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">{tx.status}</span>}
                            </div>
                            <div className="text-xs text-slate-500">{tx.items} items sold</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-slate-900">{tx.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Run Your Store
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to make your daily operations smoother and faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/10`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simulan sa Ilang Minuto Lang
            </h2>
            <p className="text-lg text-slate-600">
              Setting up Tori POS is quick and easy. No technical skills needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    { step: "01", title: "Sign Up", desc: "Create your account in less than 2 minutes. No credit card required.", icon: <Users className="w-6 h-6 text-blue-600" />, color: "bg-blue-600" },
    { step: "02", title: "Add Your Products", desc: "Input your items, prices, and stock levels. Or import from a spreadsheet.", icon: <Package className="w-6 h-6 text-emerald-600" />, color: "bg-emerald-500" },
    { step: "03", title: "Start Selling", desc: "Open your store and process sales with just a few clicks.", icon: <ShoppingCart className="w-6 h-6 text-violet-600" />, color: "bg-violet-500" }
  ].map((item, i) => (
    <div key={i} className="relative">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-600/20`}>
          {item.step}
        </div>
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
          {item.icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[120px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-400">
              One plan. All features. No hidden charges.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                BEST VALUE
              </div>
              
              <div className="text-center mb-8">
                <div className="text-sm font-medium text-slate-400 mb-2">Monthly Subscription</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">₱149</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">Billed monthly. Cancel anytime.</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pricingFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/register"
                className="block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-center transition-all shadow-lg shadow-blue-600/25"
              >
                Start Your Free Trial
              </Link>
              <p className="text-center text-xs text-slate-500 mt-4">
                7-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of sari-sari store owners who trust Tori POS to manage their daily sales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link 
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all whitespace-nowrap"
            >
              Get Started — It's Free
            </Link>
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all"
            >
              Sign In
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Free 7-day trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Tori POS</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>

            <div className="text-sm text-slate-500">
              © 2026 Tori POS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;