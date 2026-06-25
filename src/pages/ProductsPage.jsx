import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CheckCircle, Send, Info, Filter, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products as staticProducts } from "../data/products";
import ThreeDCard from "../components/ThreeDCard.jsx";
import TextReveal from "../components/TextReveal.jsx";
import MagneticButton from "../components/MagneticButton.jsx";

// --- ANIMATION HELPER VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const subcategoryMap = {
  vanilla: [
    { label: "All Vanilla", value: "all" },
    { label: "Vanilla Beans", value: "Vanilla Beans" },
    { label: "Vanilla Powder", value: "Vanilla Powder" },
    { label: "Vanilla Cuts", value: "Vanilla Cuts" },
    { label: "Vanilla Extract", value: "Vanilla Extract" }
  ],
  tea: [
    { label: "All Tea Grades", value: "all" },
    { label: "Premium Tips", value: "Premium Handpicked Tips" },
    { label: "Broken Leaf", value: "Broken Leaf Teas" },
    { label: "Leafy Teas", value: "Leafy Teas" },
    { label: "Green Teas", value: "Green Teas" },
    { label: "Gunpowder Teas", value: "Gunpowder Teas" },
    { label: "Flavoured Teas", value: "Flavoured Teas" },
    { label: "Breakfast Teas", value: "Traditional Breakfast Teas" }
  ],
  spices: [
    { label: "All Spices", value: "all" },
    { label: "Cinnamon", value: "Cinnamon" },
    { label: "Pepper", value: "Pepper" },
    { label: "Cloves", value: "Cloves" },
    { label: "Cardamom", value: "Cardamom" },
    { label: "Nutmeg & Mace", value: "Nutmeg & Mace" },
    { label: "Turmeric & Ginger", value: "Turmeric & Ginger" },
    { label: "Blends", value: "Blends" }
  ]
};

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  // Quote Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    volume: "",
    incoterms: "FOB",
    port: "",
    shippingMode: "Ocean Cargo (FCL/LCL)",
    message: "",
  });
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  // Fetch products from Express SQLite DB API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("API server responded with error status");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.warn("Backend offline. Falling back to local static catalog data.");
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync state with URL search params (e.g. for homepage spotlights)
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && ["vanilla", "tea", "spices"].includes(categoryParam)) {
      setSelectedCategory(categoryParam);
      setSelectedSubcategory("all");
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Set category and update URL param
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("all"); // Reset subcategory on main category switch
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // Filter products based on search query, category, and subcategory
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.specs && prod.specs.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || prod.category === selectedCategory;
    const matchesSubcat = selectedSubcategory === "all" || prod.subcategory === selectedSubcategory;

    return matchesSearch && matchesCategory && matchesSubcat;
  });

  // Open modal and prefill product name
  const handleOpenQuote = (product) => {
    setQuoteProduct(product);
    setQuoteForm((prev) => ({
      ...prev,
      message: `We would like to request an export quote for ${product.name}.`
    }));
    setIsQuoteSubmitted(false);
    setIsQuoteModalOpen(true);
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Simulate sending inquiry API request
    setIsQuoteSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-agrovista-cream font-sans relative pb-24">
      {/* Background stardust noise texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0" />
      <Navbar />

      {/* --- PAGE HEADER --- */}
      <section className="relative min-h-[65vh] py-28 bg-agrovista-dark flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 opacity-40">
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="w-full h-full bg-[url('/images/pexels-qwirkiandco-14381803.jpg')] bg-cover bg-center"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 drop-shadow-xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-agrovista-gold font-bold tracking-[0.3em] text-xs uppercase mb-3 block"
          >
            Products in this page
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-[1.05] text-center"
          >

            <span className="text-agrovista-gold mt-2 block">
              <TextReveal text="Premium Catalog" delay={0.25} />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Sourcing the finest hand-cured gourmet vanilla beans, pure vanilla extracts, and premium spices directly from estate networks to global markets.
          </motion.p>
        </div>
      </section>

      {/* --- SEARCH & FILTERS SECTION --- */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-8">
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/3">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Search products, grades, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-agrovista focus:ring-2 focus:ring-agrovista/10 transition-all font-medium text-gray-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center">
              {[
                { label: "All Categories", value: "all" },
                { label: "Premium Vanilla", value: "vanilla" },
                { label: "Ceylon Tea", value: "tea" },
                { label: "Authentic Spices", value: "spices" },
              ].map((tab) => (
                <MagneticButton key={tab.value} strength={0.15}>
                  <button
                    onClick={() => handleCategoryChange(tab.value)}
                    className={`px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${selectedCategory === tab.value
                        ? "bg-agrovista text-white shadow-lg border-b-2 border-agrovista-gold"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
                      }`}
                  >
                    {tab.label}
                  </button>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Subcategory Filter Pills (Shown only if category is selected) */}
          {selectedCategory !== "all" && subcategoryMap[selectedCategory] && (
            <div className="pt-6 border-t border-gray-100">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                <Filter size={12} className="text-agrovista-gold" /> Filter by Type:
              </p>
              <div className="flex flex-wrap gap-2">
                {subcategoryMap[selectedCategory].map((sub) => (
                  <button
                    key={sub.value}
                    onClick={() => setSelectedSubcategory(sub.value)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedSubcategory === sub.value
                        ? "bg-agrovista-goldLight border border-agrovista-gold text-agrovista-goldDark"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800"
                      }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- PRODUCTS GRID --- */}
      <section className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
        {loading ? (
          <div className="text-center py-24 text-gray-500 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Loader2 className="animate-spin text-agrovista mb-4" size={40} />
            <p className="font-semibold text-lg">Querying Database Catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Info size={48} className="text-agrovista-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-agrovista-dark">No Products Found</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              We couldn't find any products matching "{searchQuery}". Try selecting another category or refining your keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategoryChange("all");
              }}
              className="mt-6 text-agrovista font-bold border-b border-agrovista pb-0.5 hover:text-agrovista-dark transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8 px-2">
              <p className="text-sm font-bold text-gray-500">
                Showing <span className="text-agrovista-dark font-black">{filteredProducts.length}</span> export grades
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                >
                  <ThreeDCard className="rounded-3xl">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full group">
                      {/* Card Image */}
                      <div className="h-60 overflow-hidden relative">
                        <div className="absolute inset-0 bg-agrovista-dark/10 group-hover:bg-transparent transition-all duration-300 z-10" />
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition duration-700"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full z-20 shadow-sm border border-agrovista-gold/20">
                          <p className="text-[10px] font-black uppercase text-agrovista-goldDark tracking-wider">{product.grade}</p>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-bold text-agrovista uppercase tracking-widest bg-agrovista-goldLight/40 px-2.5 py-1 rounded">
                            {product.subcategory}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-agrovista-dark mb-3 group-hover:text-agrovista transition">
                          {product.name}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                          {product.description}
                        </p>

                        {/* Specs / Grade info */}
                        {product.specs && (
                          <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-6 text-xs text-gray-500 font-medium">
                            <p className="text-agrovista-dark font-bold uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1.5">
                              <ShieldCheck size={12} className="text-agrovista-gold" /> Export Specifications
                            </p>
                            <p className="leading-relaxed">{product.specs}</p>
                          </div>
                        )}

                        {/* Request Quote Button */}
                        <button
                          onClick={() => handleOpenQuote(product)}
                          className="bg-agrovista hover:bg-agrovista-dark text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition duration-300 border-b-2 border-agrovista-gold shadow-md hover:shadow-lg"
                        >
                          Request Wholesale Quote
                        </button>
                      </div>
                    </div>
                  </ThreeDCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </section>

      {/* --- REQUEST QUOTE MODAL --- */}
      <AnimatePresence>
        {isQuoteModalOpen && quoteProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(20,75,39,0.15)] overflow-hidden z-10 border border-white/45 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition z-20"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {isQuoteSubmitted ? (
                /* Success View */
                <div className="p-12 text-center flex flex-col items-center justify-center flex-grow overflow-y-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="w-20 h-20 bg-agrovista-goldLight border border-agrovista-gold rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="text-agrovista-gold" size={40} />
                  </motion.div>
                  <h3 className="text-3xl font-black text-agrovista-dark mb-4">Inquiry Registered</h3>
                  <p className="text-gray-600 leading-relaxed max-w-md mb-8">
                    Your commercial quote request for <strong className="text-agrovista font-bold">{quoteProduct.name}</strong> has been received by Agrovista Exports.
                  </p>
                  <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl text-left text-xs text-gray-500 max-w-lg mb-8">
                    <p className="text-agrovista-dark font-bold uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-agrovista-gold" /> Wholesale Trade Terms Assurance
                    </p>
                    <ul className="space-y-2">
                      <li>• A dedicated trade manager from our Negombo HQ will contact you within 12 hours.</li>
                      <li>• Complete catalog pricing sheet and lab reports will be attached to our initial email.</li>
                      <li>• Standard samples dispatch within 48 hours to registered corporate addresses.</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="bg-agrovista hover:bg-agrovista-dark text-white font-bold px-8 py-3.5 rounded-full border-b-2 border-agrovista-gold transition duration-300 w-full md:w-auto"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                /* Form View */
                <form onSubmit={handleQuoteSubmit} className="flex flex-col flex-grow overflow-y-auto">
                  {/* Modal Header */}
                  <div className="p-8 bg-agrovista-dark/95 backdrop-blur-md text-white border-b border-agrovista-gold/20 flex items-center gap-4">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shrink-0">
                      <Info size={24} className="text-agrovista-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Request Export Quote</h3>
                      <p className="text-xs text-gray-300 mt-1">Prefilled product: <span className="text-agrovista-gold font-bold">{quoteProduct.name}</span></p>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-8 space-y-6 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Corporate Name */}
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Company / Corporate Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={quoteForm.companyName}
                          onChange={handleQuoteChange}
                          required
                          placeholder="e.g. Herb & Tea Importers GmbH"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista transition-all text-sm font-medium text-gray-800"
                        />
                      </div>

                      {/* Contact Person Name */}
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Person *</label>
                        <input
                          type="text"
                          name="contactName"
                          value={quoteForm.contactName}
                          onChange={handleQuoteChange}
                          required
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista transition-all text-sm font-medium text-gray-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Corporate Email */}
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Corporate Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={quoteForm.email}
                          onChange={handleQuoteChange}
                          required
                          placeholder="e.g. procurement@herbtea.com"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista transition-all text-sm font-medium text-gray-800"
                        />
                      </div>

                      {/* Target Import Volume */}
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Estimated Volume Required *</label>
                        <input
                          type="text"
                          name="volume"
                          value={quoteForm.volume}
                          onChange={handleQuoteChange}
                          required
                          placeholder="e.g. 500 kg, 2 metric tons"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista transition-all text-sm font-medium text-gray-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Incoterms */}
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Incoterms Preference</label>
                        <select
                          name="incoterms"
                          value={quoteForm.incoterms}
                          onChange={handleQuoteChange}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista transition-all text-sm font-medium text-gray-800"
                        >
                          <option value="FOB">FOB (Free On Board - Colombo Port)</option>
                          <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                          <option value="EXW">EXW (Ex Works - Negombo Warehouse)</option>
                        </select>
                      </div>

                      {/* Destination Port */}
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Destination Port / Airport</label>
                        <input
                          type="text"
                          name="port"
                          value={quoteForm.port}
                          onChange={handleQuoteChange}
                          placeholder="e.g. Port of Rotterdam, LAX Airport"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista transition-all text-sm font-medium text-gray-800"
                        />
                      </div>
                    </div>

                    {/* Mode of Shipment */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shipment Mode</label>
                      <div className="flex gap-4">
                        {["Ocean Cargo (FCL/LCL)", "Air Freight"].map((mode) => (
                          <label
                            key={mode}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-semibold cursor-pointer transition-all flex-grow justify-center ${quoteForm.shippingMode === mode
                                ? "bg-agrovista-goldLight border-agrovista-gold text-agrovista-goldDark"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            <input
                              type="radio"
                              name="shippingMode"
                              value={mode}
                              checked={quoteForm.shippingMode === mode}
                              onChange={handleQuoteChange}
                              className="sr-only"
                            />
                            {mode}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Additional message / specifications */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Inquiry Specifications / Special Packing Requests</label>
                      <textarea
                        name="message"
                        value={quoteForm.message}
                        onChange={handleQuoteChange}
                        rows={3}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-agrovista focus:ring-1 focus:ring-agrovista transition-all text-sm font-medium text-gray-800"
                        placeholder="Please include specifications (e.g. packaging size, moisture content adjustments, private label requests)"
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-8 bg-gray-50/55 backdrop-blur-md border-t border-white/20 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <p className="text-xs text-gray-500 text-center md:text-left leading-relaxed">
                      By submitting this form, you confirm this inquiry is for commercial import purposes.
                    </p>
                    <MagneticButton strength={0.2}>
                      <button
                        type="submit"
                        className="bg-agrovista hover:bg-agrovista-dark text-white font-bold px-8 py-3.5 rounded-full border-b-2 border-agrovista-gold flex items-center gap-2 transition duration-300 w-full md:w-auto justify-center"
                      >
                        Submit Quote Request <Send size={16} />
                      </button>
                    </MagneticButton>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
