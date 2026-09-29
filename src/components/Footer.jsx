import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Landmark, ShieldCheck, Heart } from 'lucide-react';
import Logo from './Logo';
import { hotelInfo } from '../data/hotelData';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <Logo light={true} />
            <p className="footer-brand-desc">
              A peaceful, modern hotel in the sacred heart of Rameswaram. Providing clean, comfortable air-conditioned accommodation and pure vegetarian hospitality for pilgrims, families, and travelers.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(218,155,90,0.2)', color: '#F3C082' }}>
                <Landmark size={13} /> 250m to Temple
              </span>
              <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                <ShieldCheck size={13} /> Pure Vegetarian
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <div className="footer-links-list">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/rooms" className="footer-link">Our Rooms</Link>
              <Link to="/dining" className="footer-link">Pure Veg Dining</Link>
              <Link to="/gallery" className="footer-link">Photo Gallery</Link>
              <Link to="/about" className="footer-link">About MKT</Link>
              <Link to="/contact" className="footer-link">Contact & Directions</Link>
            </div>
          </div>

          {/* Room Categories */}
          <div>
            <h4 className="footer-col-title">Accommodations</h4>
            <div className="footer-links-list">
              <Link to="/rooms/deluxe-room" className="footer-link">Deluxe Room</Link>
              <Link to="/rooms/executive-room" className="footer-link">Executive Room</Link>
              <Link to="/rooms/family-suite" className="footer-link">Family Suite</Link>
              <Link to="/rooms/suite-room" className="footer-link">Suite Room</Link>
              <button 
                type="button" 
                onClick={onOpenBooking} 
                className="footer-link" 
                style={{ textAlign: 'left', color: 'var(--accent)', fontWeight: 600, marginTop: '0.5rem' }}
              >
                Check Live Availability →
              </button>
            </div>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h4 className="footer-col-title">Hotel Contact</h4>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>
                <strong>MKT Shanthi Nivas</strong><br />
                {hotelInfo.address.street},<br />
                {hotelInfo.address.city}, {hotelInfo.address.state} - {hotelInfo.address.pincode}
              </span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>
                Reception Desk:<br />
                <a href={`tel:${hotelInfo.phone}`} style={{ color: '#F3C082', fontWeight: 600 }}>
                  {hotelInfo.phone}
                </a>
              </span>
            </div>
            <div className="footer-contact-item">
              <Clock size={18} />
              <span>
                Front Desk: 24/7 Available<br />
                Check-in: 12 PM | Check-out: 11 AM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} MKT Shanthi Nivas. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span>93 Middle Street, Rameswaram</span>
            <span>Pilgrim & Family Stay</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Made with <Heart size={13} fill="#DA9B5A" color="#DA9B5A" /> for Rameswaram Yatris
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
