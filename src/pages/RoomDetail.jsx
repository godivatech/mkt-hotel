import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Users, Bed, Maximize, Wind, Wifi, Tv, Bath, Droplets, Sparkles, Clock, ShieldCheck, 
  ArrowRight, Phone, Check, Calendar, Utensils
} from 'lucide-react';
import { roomsData, hotelInfo } from '../data/hotelData';
import LightboxModal from '../components/LightboxModal';
import RoomAmenitiesStrip from '../components/RoomAmenitiesStrip';

export default function RoomDetail({ onOpenBooking }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find room by slug, id, or legacy slug
  const room = roomsData.find(r => 
    r.slug === slug || 
    r.id === slug ||
    ((slug === 'deluxe-room' || slug === 'executive-double-room') && r.id === 'deluxe-queen-room') ||
    ((slug === 'family-suite' || slug === 'family-quadruple-room') && r.id === 'quadruple-room') ||
    ((slug === 'suite-room' || slug === 'family-studio-suite') && r.id === 'family-room')
  ) || roomsData[0];

  const [activeTab, setActiveTab] = useState('overview');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const getNextDayStr = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const tomorrow = getNextDayStr(today);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestCount, setGuestCount] = useState(`${room.guestsCount} Adults`);

  const handleCheckInChange = (newIn) => {
    setCheckIn(newIn);
    if (checkOut <= newIn) {
      setCheckOut(getNextDayStr(newIn));
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    onOpenBooking(room.id, { checkIn, checkOut });
  };

  const amenityIcons = {
    'High speed Wi-Fi': <Wifi size={20} />,
    'Smart TV': <Tv size={20} />,
    '24/7 Room Service': <Utensils size={20} />,
    'Luxury Bath Amenities': <Sparkles size={20} />,
    'Air Conditioning': <Wind size={20} />,
    'Hair Dryer (On Request)': <Wind size={20} />,
    'Iron Box (On Request)': <Sparkles size={20} />,
    'Free WiFi': <Wifi size={20} />,
    'Television': <Tv size={20} />,
    'Smart Television': <Tv size={20} />,
    'Attached Bathroom': <Bath size={20} />,
    'Attached Luxury Bathroom': <Bath size={20} />,
    'Complimentary Water': <Droplets size={20} />,
    'Daily Housekeeping': <Sparkles size={20} />,
    '24/7 Hot Water': <Clock size={20} />,
    'Work Desk & Chair': <Maximize size={20} />,
    'Separate Living Lounge': <Maximize size={20} />
  };

  return (
    <main>
      {/* Breadcrumb banner */}
      <div style={{ backgroundColor: 'var(--surface-alt)', borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ color: 'var(--text-muted)', margin: 0 }}>
            <Link to="/" style={{ color: 'var(--text)' }}>Home</Link>
            <span>/</span>
            <Link to="/rooms" style={{ color: 'var(--text)' }}>Rooms</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{room.name}</span>
          </nav>
        </div>
      </div>

      <section className="section-spacing">
        <div className="container">
          {/* 1. Image Gallery Mosaic (Blueprint 3) */}
          <div className="room-gallery-mosaic">
            <div className="room-gallery-main" onClick={() => setLightboxIndex(0)}>
              <img src={room.gallery[0]} alt={`${room.name} Primary View`} />
            </div>
            <div className="room-gallery-thumbs">
              {room.gallery.slice(1, 3).map((imgUrl, idx) => (
                <div key={idx} className="room-gallery-thumb" onClick={() => setLightboxIndex(idx + 1)}>
                  <img src={imgUrl} alt={`${room.name} view ${idx + 2}`} />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Room Main Grid: Content + Sticky Booking Card */}
          <div className="room-detail-layout">
            <div>
              {/* Room Header Info */}
              <div className="room-detail-header">
                <div>
                  <span className="eyebrow">{room.tagline}</span>
                  <h1 style={{ fontSize: '2.4rem', color: 'var(--dark)' }}>{room.name}</h1>
                  <div className="room-specs-pills">
                    <span className="room-specs-pill">
                      <Users size={16} /> {room.capacity}
                    </span>
                    <span className="room-specs-pill">
                      <Bed size={16} /> {room.bedType}
                    </span>
                    <span className="room-specs-pill">
                      <Maximize size={16} /> {room.size}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark)' }}>{room.priceFormatted}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ night</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => onOpenBooking(room.id)}
                    className="btn btn-primary"
                  >
                    Book Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* 5 Signature Room Amenities Bar */}
              <div style={{ margin: '1.75rem 0', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid #EFEAE1' }}>
                <RoomAmenitiesStrip />
              </div>

              {/* Tabs Navigation (Blueprint 3) */}
              <div className="tab-navigation">
                <button 
                  type="button" 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  type="button" 
                  className={`tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('amenities')}
                >
                  Amenities
                </button>
                <button 
                  type="button" 
                  className={`tab-btn ${activeTab === 'policies' ? 'active' : ''}`}
                  onClick={() => setActiveTab('policies')}
                >
                  Policies
                </button>
                <button 
                  type="button" 
                  className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  Gallery
                </button>
              </div>

              {/* Tab Contents */}
              <div className="tab-pane">
                {activeTab === 'overview' && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Room Description</h3>
                    <p style={{ lineHeight: '1.7', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
                      {room.overview}
                    </p>
                    <p style={{ lineHeight: '1.7', fontSize: '1rem', color: 'var(--text-muted)' }}>
                      Strategically located on Middle Street, guests at MKT Shanthi Nivas enjoy undisturbed peace while being just a 3-minute stroll from the Ramanathaswamy Temple North and East gates. Perfect for pilgrims returning from the 22 Kundams sacred water bath rituals.
                    </p>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Room Amenities & Facilities</h3>
                    <div className="amenities-feature-grid">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-feature-item">
                          {amenityIcons[amenity] || <Check size={18} color="var(--primary)" />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'policies' && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Hotel & Stay Policies</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {room.policies.map((policy, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                          <ShieldCheck size={18} color="var(--primary)" />
                          <span>{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {room.gallery.map((img, i) => (
                      <div 
                        key={i} 
                        style={{ aspectRatio: '16/10', borderRadius: 'var(--radius-sm)', overflow: 'hidden', cursor: 'pointer' }}
                        onClick={() => setLightboxIndex(i)}
                      >
                        <img src={img} alt={`${room.name} angle ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sticky Booking Panel (Blueprint 3) */}
            <aside className="sticky-booking-card" aria-label="Book this room">
              <div className="sticky-card-price-header">
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Standard Tariff</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--dark)' }}>
                    {room.priceFormatted} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ night</span>
                  </div>
                </div>
                <span className="badge badge-teal">Direct Rate</span>
              </div>

              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Check In</label>
                  <input 
                    type="date" 
                    className="input-control" 
                    value={checkIn}
                    min={today}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Check Out</label>
                  <input 
                    type="date" 
                    className="input-control" 
                    value={checkOut}
                    min={getNextDayStr(checkIn) || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Guests</label>
                  <select 
                    className="select-control"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="4 Adults">4 Adults</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-secondary btn-full btn-lg">
                  Check Availability
                </button>
              </form>

              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                <p style={{ marginBottom: '0.5rem' }}>Need immediate room confirmation?</p>
                <a href={`tel:${hotelInfo.phone}`} className="link-arrow" style={{ justifyContent: 'center' }}>
                  <Phone size={14} /> Call Reception: {hotelInfo.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal 
          images={room.gallery.map(img => ({ image: img, title: room.name }))}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </main>
  );
}
