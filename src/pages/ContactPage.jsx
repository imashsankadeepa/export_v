import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// --- CHECK ITEM COMPONENT ---
function CheckItem({ children }) {
  return (
    <li className="flex items-center gap-4">
      <div className="bg-white/20 p-1 rounded-full">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span>{children}</span>
    </li>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Vanilla",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: send API request here
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[40vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1626437901032-47402a11b652?q=80&w=2070')",
            }}
          />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          {/* <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-green-500 font-bold tracking-[0.2em] uppercase mb-2 block"
          >
            Support
          </motion.span> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-20 container mx-auto px-6 -mt-20 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/94716500200"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="bg-[#25D366] text-white p-8 rounded-2xl shadow-xl text-center"
          >
            <img src="/icons/whatsapp.svg" size={32} className="mx-auto filter brightness-0 invert" alt="WhatsApp Icon" />
            <h3 className="text-xl font-bold mt-4">WhatsApp Us</h3>
            <p className="text-sm opacity-90 mt-2">
              Chat instantly with our team
            </p>
            <p className="text-lg font-bold mt-3">+94 71 650 0200</p>
          </motion.a>

          {/* Phone */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-agrovista"
          >
            <Phone className="mx-auto text-agrovista-gold" size={32} />
            <h3 className="text-xl font-bold mt-4">Call Us</h3>
            <p className="text-gray-500 text-sm">Sun–Fri 8am–5pm</p>
            <p className="font-bold mt-2 text-agrovista-dark">
              <a
                href="tel:+94716500200"
                className="hover:text-agrovista-gold transition-colors"
              >
                +94 716 500 200
              </a>
            </p>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-agrovista-gold"
          >
            <Mail className="mx-auto text-agrovista-gold" size={32} />
            <h3 className="text-xl font-bold mt-4">Email Us</h3>
            <p className="text-gray-500 text-sm">For inquiries</p>
            <p className="font-bold mt-2 text-agrovista-dark">
              <a
                href="mailto:info@agrovista.online"
                className="hover:text-agrovista-gold transition-colors"
              >
                info@agrovista.online
              </a>
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-agrovista"
          >
            <MapPin className="mx-auto text-agrovista-gold" size={32} />
            <h3 className="text-xl font-bold mt-4">Visit Us</h3>
            <div className="text-gray-500 text-xs text-left mt-3 space-y-1">
              <p><strong>HQ:</strong> No. 121, 1st Floor, St. Joseph Street, Negombo, Sri Lanka</p>
              <p><strong>Branch:</strong> PO Box 1295 Waverly Gardens, Mulgrave, Victoria, Australia</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FORM SECTION */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* LEFT */}
            <div className="lg:w-1/3 bg-agrovista-dark text-white p-12 relative border-r border-agrovista-gold/20">
              <h3 className="text-3xl font-black mb-6">
                Let's Discuss Your Order
              </h3>

              <p className="mb-8 text-gray-300 font-light leading-relaxed">
                Connect with our commercial export desk for custom vanilla processing, tea blending, or bulk spice deliveries.
              </p>

              <ul className="space-y-6">
                <CheckItem>Fast Inquiry Response</CheckItem>
                <CheckItem>Direct Plantation Prices</CheckItem>
                <CheckItem>Custom Vacuum Packing</CheckItem>
              </ul>

              <img
                src="/icons/whatsapp_icon.png"
                size={20}
                className="absolute bottom-0 right-0 opacity-10"
              />
            </div>

            {/* RIGHT */}
            <div className="lg:w-2/3 p-12">
              {submitted ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-black text-agrovista">
                    Inquiry Received!
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Our trade sales team will email you official pricing sheets within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="p-4 bg-gray-50 border rounded-lg"
                      required
                    />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="p-4 bg-gray-50 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="p-4 bg-gray-50 border rounded-lg"
                    />

                    {/* <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="p-4 bg-gray-50 border rounded-lg"
                    >
                      <option>Tea Products</option>
                      <option>Spices</option>
                      <option>Vanilla</option>
                      <option>Other</option>
                    </select> */}

                    <input
                      list="interests"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="p-4 bg-gray-50 border rounded-lg w-full"
                      placeholder="Select or type interest"
                    />

                    <datalist id="interests">
                      <option value="Vanilla">Vanilla (Grade A &amp; B)</option>
                      <option value="Tea Products">Tea Products</option>
                      <option value="Spices">Spices</option>
                      <option value="Other">Other</option>
                    </datalist>
                  </div>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                    className="w-full p-4 bg-gray-50 border rounded-lg mb-6"
                  />

                  <button
                    type="submit"
                    className="bg-agrovista hover:bg-agrovista-dark text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 border-b-2 border-agrovista-gold transition duration-300 shadow-md"
                  >
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <div className="mt-4 aspect-video w-full h-[35.5rem] overflow-hidden rounded-xl border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d624.2421533627274!2d79.84140534815101!3d7.207209039787484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ef003e385c3f%3A0xa5dc55368143cad9!2sAgrovista%20Plantations%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1782109179591!5m2!1sen!2slk"
          className="absolute left-0 top-100 h-[70%] w-full overflow-hidden"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer />
    </main>
  );
}
