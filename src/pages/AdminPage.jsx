import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ShieldAlert, KeyRound, Loader2, ArrowLeft, RefreshCw, FolderClosed, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { products as staticProducts } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000/api/products";

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiOffline, setApiOffline] = useState(false);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "vanilla",
    subcategory: "Vanilla Beans",
    image: "",
    grade: "",
    specs: "",
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Subcategory mapping for select fields
  const subcategories = {
    vanilla: ["Vanilla Beans", "Vanilla Powder", "Vanilla Cuts", "Vanilla Extract"],
    tea: ["Premium Handpicked Tips", "Broken Leaf Teas", "Leafy Teas", "Green Teas", "Gunpowder Teas", "Flavoured Teas", "Traditional Breakfast Teas"],
    spices: ["Cinnamon", "Pepper", "Cloves", "Cardamom", "Nutmeg & Mace", "Turmeric & Ginger", "Blends"],
  };

  // Fetch products on load
  const fetchProducts = async () => {
    setLoading(true);
    setApiOffline(false);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("API responded with an error status.");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.warn("Backend offline. Falling back to local catalog data.");
      setApiOffline(true);
      setProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid passcode. Please use the demo passcode 'admin123'.");
    }
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-set first subcategory on category change
      if (name === "category") {
        updated.subcategory = subcategories[value][0];
      }
      return updated;
    });
  };

  // Open modal for Create
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm({
      id: "prod-" + Math.random().toString(36).substring(2, 9),
      name: "",
      category: "vanilla",
      subcategory: "Vanilla Beans",
      image: "",
      grade: "",
      specs: "",
      description: "",
    });
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Open modal for Update
  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setForm({
      id: prod.id,
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory,
      image: prod.image,
      grade: prod.grade,
      specs: prod.specs || "",
      description: prod.description,
    });
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Create or Update submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (apiOffline) {
      // Offline Demo Mode Mode CRUD simulation
      if (editingProduct) {
        setProducts((prev) => prev.map((p) => (p.id === form.id ? { ...form } : p)));
        setSuccessMsg("Product updated locally (Demo Mode).");
      } else {
        setProducts((prev) => [form, ...prev]);
        setSuccessMsg("Product added locally (Demo Mode).");
      }
      setTimeout(() => setIsModalOpen(false), 1200);
      return;
    }

    try {
      const url = editingProduct ? `${API_URL}/${form.id}` : API_URL;
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product.");
      }

      setSuccessMsg(editingProduct ? "Product updated successfully!" : "Product added successfully!");
      fetchProducts();
      setTimeout(() => setIsModalOpen(false), 1200);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    if (apiOffline) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted locally (Demo Mode).");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete product.");

      alert("Product deleted successfully.");
      fetchProducts();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-agrovista-cream flex items-center justify-center p-6 relative font-sans">
        {/* Ambient stardust pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0" />
        
        {/* Gold blur glow */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-agrovista-gold/10 rounded-full blur-[100px]" />
        
        <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-2xl z-10 text-center">
          <div className="w-16 h-16 bg-agrovista-goldLight border border-agrovista-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <KeyRound className="text-agrovista-gold" size={32} />
          </div>
          <h2 className="text-3xl font-black text-agrovista-dark mb-2">Admin Center</h2>
          <p className="text-slate-500 text-sm font-light mb-8">
            Access credentials required to modify the export products database.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Enter demo passcode: admin123"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-agrovista focus:ring-2 focus:ring-agrovista/10 text-center text-lg font-bold tracking-widest text-slate-800 transition-all"
              />
            </div>
            {loginError && <p className="text-red-500 text-xs font-semibold">{loginError}</p>}
            
            <div className="flex gap-4">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-1/3 py-4 border border-gray-200 rounded-full text-slate-600 hover:bg-gray-50 transition font-bold"
              >
                <ArrowLeft size={16} /> Exit
              </Link>
              <button
                type="submit"
                className="w-2/3 py-4 bg-agrovista hover:bg-agrovista-dark text-white rounded-full font-bold border-b-2 border-agrovista-gold transition-all duration-300 shadow-md"
              >
                Verify &amp; Enter
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-agrovista-cream font-sans pb-24 relative">
      <Navbar />

      {/* Hero Banner Header */}
      <section className="relative pt-36 pb-16 bg-agrovista-dark text-white z-10">
        <div className="absolute inset-0 bg-[url('/images/pexels-qwirkiandco-14381803.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-agrovista-gold font-bold uppercase tracking-[0.2em] text-xs">Agrovista HQ Control</span>
            <h1 className="text-4xl md:text-5xl font-black mt-2">Export Catalog Dashboard</h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={fetchProducts}
              className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white transition flex items-center justify-center"
              title="Refresh database"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={handleOpenAdd}
              className="bg-agrovista hover:bg-agrovista-light text-white font-bold px-6 py-3.5 rounded-full border-b-2 border-agrovista-gold flex items-center gap-2 shadow-lg transition duration-300"
            >
              <Plus size={18} /> Add New Product
            </button>
          </div>
        </div>
      </section>

      {/* Main Panel Content */}
      <section className="max-w-7xl mx-auto px-6 mt-12 relative z-20">
        {apiOffline && (
          <div className="mb-8 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-800 flex items-start gap-4 shadow-sm animate-pulse">
            <ShieldAlert className="shrink-0 mt-0.5" size={24} />
            <div>
              <h4 className="font-bold">Offline Demo Mode Active</h4>
              <p className="text-xs leading-relaxed mt-1">
                The Express backend server at <code className="bg-amber-500/20 px-1 rounded">localhost:5000</code> is offline. We have loaded static mock catalog products. Any additions, updates, or deletions will be simulated dynamically in the frontend state but won't persist on page reload.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden">
          {loading ? (
            <div className="py-24 text-center text-gray-500 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-agrovista mb-4" size={40} />
              <p className="font-semibold text-lg">Querying Database Server...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center text-gray-500">
              <FolderClosed className="mx-auto text-agrovista-gold mb-4" size={48} />
              <p className="font-semibold text-lg">Catalog Database is Empty</p>
              <p className="text-sm mt-1">Add items to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-black uppercase text-gray-500 tracking-wider border-b border-gray-100">
                    <th className="py-5 px-8">Product</th>
                    <th className="py-5 px-6">Category</th>
                    <th className="py-5 px-6">Grade / Label</th>
                    <th className="py-5 px-6">Specifications</th>
                    <th className="py-5 px-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium text-slate-800">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-gray-50/40 transition">
                      <td className="py-4 px-8 flex items-center gap-4">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-14 h-14 object-cover rounded-xl border border-gray-100 shrink-0"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=200"; }}
                        />
                        <div>
                          <p className="font-bold text-agrovista-dark">{prod.name}</p>
                          <p className="text-xs text-gray-400 font-light mt-0.5">{prod.subcategory}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 bg-gray-100 rounded text-slate-600">
                          {prod.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-semibold">{prod.grade}</td>
                      <td className="py-4 px-6 text-xs text-gray-500 max-w-xs truncate">{prod.specs || "—"}</td>
                      <td className="py-4 px-8 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="p-2.5 hover:bg-gray-100 text-slate-600 hover:text-agrovista rounded-xl transition"
                            title="Edit details"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="p-2.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition"
                            title="Delete item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100 max-h-[90vh] flex flex-col">
            <form onSubmit={handleFormSubmit} className="flex flex-col flex-grow overflow-y-auto">
              
              {/* Header */}
              <div className="p-6 bg-agrovista-dark text-white border-b border-agrovista-gold/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                    <Award className="text-agrovista-gold" size={20} />
                  </div>
                  <h3 className="text-lg font-bold">
                    {editingProduct ? "Modify Product Specs" : "Add New Export Grade"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition font-bold"
                >
                  ✖
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-5 flex-grow overflow-y-auto">
                {errorMsg && <p className="p-3 bg-red-50 text-red-500 rounded-xl text-xs font-semibold">{errorMsg}</p>}
                {successMsg && <p className="p-3 bg-green-50 text-green-600 rounded-xl text-xs font-semibold">{successMsg}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Product ID */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Key (ID) *</label>
                    <input
                      type="text"
                      name="id"
                      value={form.id}
                      onChange={handleInputChange}
                      required
                      disabled={!!editingProduct}
                      placeholder="e.g. vanilla-extract-organic"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800 disabled:opacity-50"
                    />
                  </div>

                  {/* Product Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Ceylon Alba Cinnamon Sticks"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Export Category *</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800"
                    >
                      <option value="vanilla">Vanilla</option>
                      <option value="tea">Ceylon Tea</option>
                      <option value="spices">Spices</option>
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Subcategory *</label>
                    <select
                      name="subcategory"
                      value={form.subcategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800"
                    >
                      {subcategories[form.category].map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Grade Label */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Grade Label *</label>
                    <input
                      type="text"
                      name="grade"
                      value={form.grade}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Grade A Premium / 100% Pure"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Image URL *</label>
                    <input
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. /images/vanilla-cured.jpg or Unsplash URL"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800"
                    />
                  </div>
                </div>

                {/* Specs */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Technical Specifications</label>
                  <input
                    type="text"
                    name="specs"
                    value={form.specs}
                    onChange={handleInputChange}
                    placeholder="e.g. Moisture: 12-14% | Piperine: > 5.5% | Organic"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Provide a detailed sales and marketing description for buyers..."
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista text-sm font-semibold text-gray-800"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-250 rounded-full text-sm font-bold text-slate-600 hover:bg-gray-150 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-agrovista hover:bg-agrovista-dark text-white font-bold px-8 py-3 rounded-full border-b-2 border-agrovista-gold shadow-md hover:shadow-lg transition duration-300"
                >
                  Save to Database
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
