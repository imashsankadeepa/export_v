import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/admin', label: 'Admin Login' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 h-20">
      <div className="container mx-auto px-6 h-full flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo_horizontal.png"
            alt="Agrovista Exports Logo"
            className="h-[72px] w-auto object-contain hover:scale-105 transition duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`hover:text-agrovista-gold transition duration-300 ${pathname === href ? 'text-agrovista font-bold border-b-2 border-agrovista-gold' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-block bg-agrovista text-white px-6 py-2.5 rounded-full font-bold hover:bg-agrovista-dark hover:shadow-lg border-b-2 border-agrovista-gold transition-all duration-300"
        >
          Request Quote
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4 shadow-xl">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={`text-gray-700 font-medium hover:text-agrovista-gold transition ${pathname === href ? 'text-agrovista font-bold' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-agrovista text-white px-6 py-3 rounded-full text-center font-bold hover:bg-agrovista-dark transition duration-300 border-b-2 border-agrovista-gold"
          >
            Request Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
