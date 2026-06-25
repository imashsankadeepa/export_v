import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  Youtube,
  Instagram,
  Facebook,
  MapPin,
} from "lucide-react";

import {
  FaXTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa6";

import { RiTiktokFill } from "react-icons/ri";

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
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Footer() {
  const [hover, setHover] = useState(false);
  return (
    <footer className="bg-gray-950 text-white font-sans relative z-20">
      {/* Newsletter Section */}
      <div className="bg-black/40 py-12 border-b border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container mx-auto px-6 text-center"
        >
          <h2 className="text-3xl font-light mb-2 tracking-wide">
            Join Our Global <span className="text-agrovista-gold font-normal">Wholesale Network</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 font-light">
            Get the latest export market updates on Ceylon spices and vanilla commodity prices.
          </p>
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-0 overflow-hidden rounded-sm shadow-xl">
            <input
              type="email"
              placeholder="Enter your company email address..."
              className="flex-grow px-6 py-4 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-agrovista transition-all"
            />
            <button className="bg-agrovista hover:bg-agrovista-dark text-white font-bold px-10 py-4 border-b-2 border-agrovista-gold uppercase tracking-widest flex items-center justify-center transition-all duration-300">
              Subscribe <Send size={18} className="ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
      {/* Links Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Column 1: Company */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-agrovista-gold uppercase tracking-[0.2em] font-bold text-xs mb-6 pb-2 border-b border-agrovista-gold/20">
            Agrovista
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            {[
              "About Agrovista",
              "Our Plantation",
              "Sustainability",
              "Export Process",
              "Contact Us",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-agrovista-gold cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 2: Products */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-agrovista-gold uppercase tracking-[0.2em] font-bold text-xs mb-6 pb-2 border-b border-agrovista-gold/20">
            Our Products
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            {[
              "Ceylon Vanilla Beans",
              "Pure Cinnamon",
              "Orthodox Tea",
              "Black Pepper",
              "Coconut Products",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-agrovista-gold cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Support */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-agrovista-gold uppercase tracking-[0.2em] font-bold text-xs mb-6 pb-2 border-b border-agrovista-gold/20">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-light">
            {[
              "Request a Quote",
              "Shipping Policy",
              "Quality Certificates",
              "Lab Reports",
              "FAQ",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-agrovista-gold cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Contact */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-agrovista-gold uppercase tracking-[0.2em] font-bold text-xs mb-6 pb-2 border-b border-agrovista-gold/20">
            Export Hotline
          </h3>
          <div className="flex items-start gap-4 mb-6">
            <Phone className="text-agrovista-gold mt-1" size={24} />
            <div>
              <p className="text-xl font-bold text-white">
                <a href="tel:+94716500200" className="hover:text-agrovista-gold transition-colors">
                  +94 716 500 200
                </a>
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                Sun - Fri (8:00 AM - 5:00 PM)
              </p>
            </div>
          </div>
          <div className="space-y-4 text-xs text-gray-400 font-light">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-agrovista-gold mt-1 shrink-0" />
              <div>
                <p><strong>Head Office:</strong> No. 121, 1st Floor, St. Joseph Street, Negombo, Sri Lanka</p>
                <p className="mt-2"><strong>Branch:</strong> PO Box 1295 Waverly Gardens, Mulgrave, 3170 Victoria, Australia</p>
              </div>
            </div>
            <a
              href="mailto:info@agrovista.online"
              className="flex items-center gap-3 hover:text-agrovista-gold cursor-pointer transition-colors text-gray-300"
            >
              <Mail size={16} className="text-agrovista-gold" />
              info@agrovista.online
            </a>
          </div>
        </motion.div>
      </motion.div>
      {/* Socials & Copyright */}
      <div className="py-10 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          {/* Socials & Copyright */}
          <div className="flex justify-center gap-8 mb-8">
            {/* Facebook */}
            <div className="group cursor-pointer">
              <a
                href="https://www.facebook.com/agrovistaexports"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook
                  size={20}
                  className="text-gray-500 group-hover:hidden transition"
                />

                <FaFacebook
                  size={20}
                  className="text-[#1877F2] hidden group-hover:block transition"
                />
              </a>
            </div>

            {/* Instagram */}
            <div className="group cursor-pointer">
              <a
                href="https://www.instagram.com/agrovistaexports"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  size={20}
                  className="text-gray-500 group-hover:hidden transition"
                />

                <FaInstagram
                  size={20}
                  className="text-[#E4405F] hidden group-hover:block transition"
                />
              </a>
            </div>

            {/* X (Twitter) */}
            <div className="group cursor-pointer">
              <a
                href="https://www.x.com/agrovistaexports"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter
                  size={20}
                  className="text-gray-500 group-hover:hidden transition"
                />

                <FaXTwitter
                  size={20}
                  className="text-white hidden group-hover:block transition"
                />
              </a>
            </div>

            {/* YouTube */}
            <div className="group cursor-pointer">
              <a
                href="https://www.youtube.com/@agrovistaexports"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube
                  size={20}
                  className="text-gray-500 group-hover:hidden transition"
                />

                <FaYoutube
                  size={20}
                  className="text-[#FF0000] hidden group-hover:block transition"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
            <div className="flex items-center gap-4">
              <img src="/images/logo_horizontal.png" alt="Agrovista Logo" className="h-16 w-auto object-contain brightness-0 invert opacity-45" />
              <p>© 2026 Agrovista Exports (Pvt) Ltd. All Rights Reserved.</p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Terms of Trade
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
