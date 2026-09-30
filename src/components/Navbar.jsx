import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import Logo from './Logo';
import { hotelInfo } from '../data/hotelData';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Logo taglineOnly={true} />

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Main Navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Rooms
          </NavLink>
          {/* <NavLink to="/dining" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Dining
          </NavLink> */}
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Services
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Gallery
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </nav>

        {/* Right CTA */}
        <div className="nav-actions">
          <button 
            type="button" 
            className="btn btn-secondary btn-pill"
            onClick={onOpenBooking}
            aria-label="Book Now"
          >
            <CalendarCheck size={16} />
            Book Now
          </button>

          {/* Mobile Menu Button */}
          <button 
            type="button" 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
          Home
        </NavLink>
        <NavLink to="/rooms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Rooms
        </NavLink>
        {/* <NavLink to="/dining" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Dining
        </NavLink> */}
        <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Services
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Gallery
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Contact
        </NavLink>
        
        <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            type="button" 
            className="btn btn-secondary btn-full btn-pill"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
          >
            <CalendarCheck size={18} />
            Book Now
          </button>
          <a 
            href={`tel:${hotelInfo.phone}`} 
            className="btn btn-outline btn-full"
          >
            <Phone size={16} />
            Call: {hotelInfo.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
