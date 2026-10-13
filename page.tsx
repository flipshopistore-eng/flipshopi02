"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  { name: "All", icon: "🛒" },
  { name: "Fruits & Veggies", icon: "🍎" },
  { name: "Dairy & Breakfast", icon: "🥛" },
  { name: "Munchies & Snacks", icon: "🍿" },
  { name: "Cold Drinks & Juices", icon: "🥤" },
  { name: "Atta, Rice & Dal", icon: "🌾" },
  { name: "Personal Care", icon: "🧴" },
  { name: "Cleaning Essentials", icon: "🧼" },
];

const initialProducts = [
  {
    id: 1,
    name: "Fresh Red Apples",
    detail: "Crisp and juicy imported apples",
    category: "Fruits & Veggies",
    price: 129,
    oldPrice: 169,
    unit: "4 pcs",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=85",
    color: "#fff0ee",
    badge: "8 MINS",
    seller: "Flipshopi Direct Farms",
  },
  {
    id: 2,
    name: "Robusta Fresh Bananas",
    detail: "Naturally ripened sweet bananas",
    category: "Fruits & Veggies",
    price: 49,
    oldPrice: 65,
    unit: "6 pcs",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=85",
    color: "#fff8df",
    badge: "10 MINS",
    seller: "Flipshopi Direct Farms",
  },
  {
    id: 3,
    name: "Farm Fresh Tomatoes",
    detail: "Juicy organic red tomatoes",
    category: "Fruits & Veggies",
    price: 32,
    oldPrice: 45,
    unit: "500 g",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500&q=85",
    color: "#fff0ed",
    badge: "8 MINS",
    seller: "Local Organics Hub",
  },
  {
    id: 4,
    name: "Fresh Broccoli",
    detail: "Crisp green antioxidant-rich",
    category: "Fruits & Veggies",
    price: 59,
    oldPrice: 79,
    unit: "1 pc",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=85",
    color: "#eaf5e5",
    badge: "12 MINS",
    seller: "GreenValley Farms",
  },
  {
    id: 5,
    name: "Amul Taaza Full Cream Milk",
    detail: "Homogenized toned pasteurized milk",
    category: "Dairy & Breakfast",
    price: 34,
    oldPrice: 38,
    unit: "500 ml",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=85",
    color: "#edf5ff",
    badge: "6 MINS",
    seller: "Amul Dairy Hub",
  },
  {
    id: 6,
    name: "Classic Salted Potato Chips",
    detail: "Crispy snack crunchy bite",
    category: "Munchies & Snacks",
    price: 20,
    oldPrice: 25,
    unit: "1 pack",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=85",
    color: "#fff2df",
    badge: "9 MINS",
    seller: "SnackCorner Express",
  },
  {
    id: 7,
    name: "Premium India Gate Basmati Rice",
    detail: "Aged long grain aromatic rice",
    category: "Atta, Rice & Dal",
    price: 199,
    oldPrice: 249,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=85",
    color: "#f6f0e5",
    badge: "12 MINS",
    seller: "Daily Staples Co.",
  },
  {
    id: 8,
    name: "Real Citrus Orange Juice",
    detail: "100% natural fruit extract juice",
    category: "Cold Drinks & Juices",
    price: 89,
    oldPrice: 110,
    unit: "1 bottle",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=85",
    color: "#fff0df",
    badge: "7 MINS",
    seller: "Beverage World",
  },
  {
    id: 9,
    name: "Fresh Greek Yogurt",
    detail: "Creamy probiotic rich cup",
    category: "Dairy & Breakfast",
    price: 75,
    oldPrice: 95,
    unit: "200 g",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=85",
    color: "#f0fdf4",
    badge: "9 MINS",
    seller: "Dairy Craft",
  },
  {
    id: 10,
    name: "Crunchy Peanut Butter",
    detail: "High protein spread",
    category: "Dairy & Breakfast",
    price: 150,
    oldPrice: 190,
    unit: "350 g",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=85",
    color: "#fef3c7",
    badge: "10 MINS",
    seller: "Fitness Nutrition",
  },
  {
    id: 11,
    name: "Spicy Masala Noodles",
    detail: "2-minute instant meal",
    category: "Munchies & Snacks",
    price: 14,
    oldPrice: 16,
    unit: "70 g",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=85",
    color: "#fef2f2",
    badge: "6 MINS",
    seller: "QuickSnacks Hub",
  },
  {
    id: 12,
    name: "Sparkling Lemon Soda",
    detail: "Chilled refreshing beverage",
    category: "Cold Drinks & Juices",
    price: 40,
    oldPrice: 50,
    unit: "600 ml",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=85",
    color: "#eff6ff",
    badge: "5 MINS",
    seller: "Beverage World",
  },
];

type Product = typeof initialProducts[number];

export default function FlipshopiApp() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [location, setLocation] = useState("Connaught Place, New Delhi");
  const [locationOpen, setLocationOpen] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [notice, setNotice] = useState("");

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Fruits & Veggies");
  const [newProductUnit, setNewProductUnit] = useState("1 kg");

  const visibleProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = `${p.name} ${p.category} ${p.detail}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, search, activeCategory]);

  const cartItems = products.filter((p) => (quantities[p.id] || 0) > 0);
  const count = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * quantities[p.id], 0);
  const discount = cartItems.reduce((sum, p) => sum + (p.oldPrice - p.price) * quantities[p.id], 0);

  function changeQuantity(id: number, delta: number) {
    setQuantities((previous) => {
      const next = Math.max(0, (previous[id] || 0) + delta);
      return { ...previous, [id]: next };
    });
  }

  function notify(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setCurrentUser(null);
    notify("Logged out successfully");
  }

  function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!newProductName || !newProductPrice) {
      notify("Please provide product name and price");
      return;
    }
    const newProd: Product = {
      id: Date.now(),
      name: newProductName,
      detail: "Added by seller partner",
      category: newProductCategory,
      price: Number(newProductPrice),
      oldPrice: Number(newProductPrice) + 40,
      unit: newProductUnit,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=85",
      color: "#eaf5e5",
      badge: "8 MINS",
      seller: currentUser?.name || "Verified Seller",
    };
    setProducts([newProd, ...products]);
    setNewProductName("");
    setNewProductPrice("");
    notify("Product listed successfully on Flipshopi!");
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#111827] font-sans">
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, system-ui, sans-serif; }
        .flipshopi-wrap { width: min(1280px, calc(100% - 32px)); margin: auto; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { scrollbar-width: none; }
      `}</style>

      {/* Top Professional Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 text-white py-2 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-3">
        <span>🚀 <strong>Flipshopi Express:</strong> Superfast grocery delivery in 10 minutes at your door</span>
        <span className="hidden md:inline bg-emerald-900/60 px-2.5 py-0.5 rounded-full text-[10px] text-yellow-300 font-bold">100% Quality Assured</span>
      </div>

      {/* Professional Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="flipshopi-wrap flex items-center justify-between gap-6 py-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:bg-emerald-800 transition">
              ⚡
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-gray-900">
                Flip<span className="text-emerald-700">shopi</span>
              </span>
              <span className="block text-[9px] font-bold tracking-widest text-emerald-600 uppercase">
                Quick Commerce
              </span>
            </div>
          </Link>

          {/* Location Picker */}
          <button
            onClick={() => setLocationOpen(true)}
            className="hidden lg:flex flex-col text-left border-l pl-4 border-gray-200 max-w-[200px]"
          >
            <span className="text-[11px] font-extrabold text-gray-900 uppercase flex items-center gap-1">
              Delivery in 9 mins ⚡
            </span>
            <span className="text-xs text-gray-500 truncate">{location} ▾</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl flex items-center gap-3 bg-gray-100 hover:bg-gray-100/80 focus-within:bg-white focus-within:border-emerald-600 px-4 py-2.5 rounded-2xl border border-transparent transition shadow-inner">
            <span className="text-gray-400 text-base">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for milk, vegetables, snacks, rice..."
              className="w-full bg-transparent text-sm outline-none text-gray-800 font-medium placeholder-gray-400"
            />
          </div>

          {/* Auth & Cart Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline text-xs font-extrabold bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl border border-emerald-200">
                  {currentUser.role === "seller" ? "📦 " : "👤 "} {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/customer/login")}
                  className="text-xs font-bold text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/seller/login")}
                  className="hidden sm:inline-block text-xs font-bold bg-amber-400 text-gray-900 px-4 py-2.5 rounded-xl shadow-xs hover:bg-amber-300 transition"
                >
                  Seller Hub
                </button>
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition active:scale-95"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white text-emerald-700 px-2 py-0.5 rounded-full text-xs font-black">
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* SELLER CONTROL PANEL (If logged in as seller) */}
      {currentUser?.role === "seller" && (
        <section className="flipshopi-wrap my-8 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-gray-900">📦 Flipshopi Seller Dashboard</h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage live stock items and scale your quick commerce sales.</p>
            </div>
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full">Partner Verified</span>
          </div>

          <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Product Title</label>
              <input
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="e.g. Organic Strawberries"
                className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl outline-none focus:border-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="e.g. 120"
                className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl outline-none focus:border-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
                className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl outline-none focus:border-emerald-700"
              >
                {categories.filter(c => c.name !== "All").map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl hover:bg-emerald-800 transition shadow-sm"
            >
              + List Item Now
            </button>
          </form>
        </section>
      )}

      {/* Hero Banner */}
      <section className="flipshopi-wrap pt-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-100 via-teal-100 to-amber-100 p-8 md:p-12 overflow-hidden shadow-sm flex items-center justify-between border border-emerald-200/50">
          <div className="max-w-xl z-10">
            <span className="bg-white/90 text-emerald-800 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              ⚡ Flipshopi Lightning Speed
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              Groceries & daily needs at your door in <span className="text-emerald-700">9 minutes.</span>
            </h1>
            <p className="text-sm md:text-base text-gray-700 mt-3 font-medium">
              Experience lightning-fast delivery on farm-fresh fruits, vegetables, dairy, snacks, and household essentials.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#products"
                className="bg-emerald-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-md hover:bg-emerald-800 transition"
              >
                Shop Now →
              </a>
              <Link
                href="/seller/register"
                className="bg-white text-emerald-800 border border-emerald-300 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xs hover:bg-emerald-50 transition"
              >
                Become a Seller Partner
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex text-9xl select-none">
            🧺🥦🥛
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="flipshopi-wrap py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-gray-900">Explore Categories</h2>
          <span className="text-xs font-bold text-emerald-700">View All ({categories.length - 1})</span>
        </div>
        <div className="category-track flex gap-4 overflow-x-auto hide-scroll pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex flex-col items-center gap-2.5 min-w-[110px] p-5 rounded-2xl border transition ${
                activeCategory === cat.name
                  ? "border-emerald-700 bg-emerald-50/80 text-emerald-800 shadow-xs"
                  : "border-gray-200/80 bg-white hover:border-gray-300 text-gray-700 shadow-2xs"
              }`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-extrabold text-center tracking-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="flipshopi-wrap pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              {activeCategory === "All" ? "Featured Essentials & Groceries" : activeCategory}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Handpicked high quality goods ready for instant dispatch.</p>
          </div>
          <span className="text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-gray-600 shadow-2xs">
            {visibleProducts.length} items found
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleProducts.map((product) => {
            const qty = quantities[product.id] || 0;
            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-lg transition group"
              >
                <div>
                  <div className="relative h-36 sm:h-40 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-gray-50" style={{ background: product.color }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-white/95 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded shadow-xs">
                        ⚡ {product.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{product.unit}</span>
                  <h3 className="text-xs font-bold text-gray-900 line-clamp-2 mt-0.5 leading-snug">{product.name}</h3>
                  <p className="text-[10px] text-gray-400 truncate mt-1">{product.detail}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-gray-900">₹{product.price}</span>
                    <span className="text-[10px] text-gray-400 line-through block">₹{product.oldPrice}</span>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => changeQuantity(product.id, 1)}
                      className="border border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white font-black text-xs px-3.5 py-2 rounded-xl transition shadow-2xs"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center bg-emerald-700 text-white rounded-xl overflow-hidden text-xs font-bold shadow-xs">
                      <button onClick={() => changeQuantity(product.id, -1)} className="px-2.5 py-1.5 hover:bg-black/10 transition">−</button>
                      <span className="px-2">{qty}</span>
                      <button onClick={() => changeQuantity(product.id, 1)} className="px-2.5 py-1.5 hover:bg-black/10 transition">+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in" onClick={() => setCartOpen(false)}>
          <aside className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-lg font-black text-gray-900">Your Flipshopi Basket 🛒</h2>
                <p className="text-xs text-emerald-700 font-bold mt-0.5">⚡ Delivery in 9 minutes</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-gray-100">✕</button>
            </div>

            {count === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-6xl mb-3">🧺</span>
                <h3 className="font-bold text-gray-800 text-base">Your cart is empty</h3>
                <p className="text-xs text-gray-400 mt-1">Add items from the store to experience fast delivery.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 hide-scroll">
                  {cartItems.map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{p.name}</h4>
                        <span className="text-[10px] text-gray-400">{p.unit}</span>
                        <p className="text-xs font-black text-gray-900 mt-1">₹{p.price * quantities[p.id]}</p>
                      </div>
                      <div className="flex items-center bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs">
                        <button onClick={() => changeQuantity(p.id, -1)} className="px-2 py-1.5 hover:bg-black/10">−</button>
                        <span className="px-2">{quantities[p.id]}</span>
                        <button onClick={() => changeQuantity(p.id, 1)} className="px-2.5 py-1.5 hover:bg-black/10">+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t p-5 bg-gray-50">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Item Total</span>
                    <span>₹{subtotal + discount}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-emerald-700 mb-3">
                    <span>Total Discount Saved</span>
                    <span>-₹{discount}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-gray-900 border-t pt-3 mb-5">
                    <span>To Pay Amount</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <button
                    onClick={() => notify("Order placed successfully! Partner agent dispatched.")}
                    className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-bold text-sm shadow-md hover:bg-emerald-800 transition"
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* Location Modal */}
      {locationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs" onClick={() => setLocationOpen(false)}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black text-gray-900 mb-1">Set Delivery Location</h3>
            <p className="text-xs text-gray-500 mb-4">Enter your address for lightning fast 9-minute deliveries.</p>
            <input
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter area, apartment, street name"
              className="w-full border border-gray-200 px-4 py-3 text-sm rounded-xl outline-none focus:border-emerald-700 mb-3 font-medium"
            />
            <button
              onClick={() => {
                if (addressInput.trim()) {
                  setLocation(addressInput.trim());
                  setLocationOpen(false);
                  notify("Delivery location updated!");
                }
              }}
              className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-sm"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-12 border-t border-gray-800 mt-20">
        <div className="flipshopi-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                ⚡
              </div>
              <span className="text-xl font-black text-white">
                Flip<span className="text-emerald-500">shopi</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Flipshopi is your ultimate quick-commerce destination bringing farm-fresh groceries, household supplies, and daily essentials straight to your doorstep in minutes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 mb-4">Useful Links</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="/" className="hover:text-white transition">Home Store</Link></li>
              <li><Link href="/customer/login" className="hover:text-white transition">Customer Login</Link></li>
              <li><Link href="/seller/login" className="hover:text-white transition">Seller Hub Portal</Link></li>
              <li><a href="#products" className="hover:text-white transition">Browse All Products</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><span>Fruits & Vegetables</span></li>
              <li><span>Dairy & Breakfast</span></li>
              <li><span>Munchies & Snacks</span></li>
              <li><span>Cold Drinks & Juices</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 mb-4">Customer Care</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Need help with your order? Reach out to our 24/7 support team.
            </p>
            <span className="inline-block bg-emerald-900/60 text-emerald-300 font-bold text-xs px-3 py-1.5 rounded-xl border border-emerald-700/50">
              support@flipshopi.example
            </span>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flipshopi-wrap flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Flipshopi Quick Commerce Pvt. Ltd. All rights reserved.</p>
            <p className="font-semibold text-gray-400">⚡ Superfast Deliveries in 9 Minutes</p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {notice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-5 py-3 rounded-2xl text-xs font-extrabold shadow-2xl border border-gray-800">
          {notice}
        </div>
      )}
    </main>
  );
}