import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowRight, RotateCcw } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import RoomAmenitiesStrip from '../components/RoomAmenitiesStrip';
import { roomsData } from '../data/hotelData';

export default function Rooms({ onOpenBooking }) {
  const [selectedTypes, setSelectedTypes] = useState(['all']);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');

  const handleTypeToggle = (type) => {
    if (type === 'all') {
      setSelectedTypes(['all']);
      return;
    }

    let updated = selectedTypes.filter(t => t !== 'all');
    if (updated.includes(type)) {
      updated = updated.filter(t => t !== type);
      if (updated.length === 0) updated = ['all'];
    } else {
      updated.push(type);
    }
    setSelectedTypes(updated);
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSelectedTypes(['all']);
    setMaxPrice(6000);
    setSelectedAmenities([]);
    setSortBy('recommended');
  };

  // Filter & Sort Logic
  const filteredRooms = useMemo(() => {
    return roomsData.filter(room => {
      // Type filter
      if (!selectedTypes.includes('all')) {
        const matchesType = selectedTypes.some(t => room.id.includes(t));
        if (!matchesType) return false;
      }

      // Price filter
      if (room.price > maxPrice) return false;

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(a => 
          room.amenities.some(item => item.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'capacity') return b.guestsCount - a.guestsCount;
      return 0; // recommended
    });
  }, [selectedTypes, maxPrice, selectedAmenities, sortBy]);

  return (
    <main>
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <img 
          src="/assets/images/room-executive.jpg" 
          alt="Rooms at MKT Shanthi Nivas" 
          className="page-hero-backdrop"
        />
        <div className="container page-hero-content">
          <h1 className="page-hero-title">Our Rooms</h1>
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Rooms</span>
          </nav>
        </div>
      </section>

      {/* Signature Room Amenities Bar */}
      <RoomAmenitiesStrip />

      {/* Rooms Listing Layout */}
      <section className="section-spacing">
        <div className="container">
          <div className="rooms-page-layout">
            {/* Left Filter Sidebar (Blueprint 2) */}
            <aside className="filter-sidebar" aria-label="Room Filters">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SlidersHorizontal size={18} color="var(--primary)" />
                  Filter Rooms
                </h3>
                <button 
                  type="button" 
                  onClick={handleResetFilters}
                  style={{ fontSize: '0.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>

              {/* Room Type */}
              <div className="filter-group">
                <div className="filter-group-title">Room Type</div>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes('all')} 
                    onChange={() => handleTypeToggle('all')} 
                  />
                  <span>All Rooms</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes('deluxe-queen-room')} 
                    onChange={() => handleTypeToggle('deluxe-queen-room')} 
                  />
                  <span>Deluxe Queen Room</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes('quadruple-room')} 
                    onChange={() => handleTypeToggle('quadruple-room')} 
                  />
                  <span>Quadruple Room</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes('family-room')} 
                    onChange={() => handleTypeToggle('family-room')} 
                  />
                  <span>Family Room</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <div className="filter-group-title">Price Range</div>
                <div className="price-slider-wrap">
                  <input 
                    type="range" 
                    min="2000" 
                    max="6000" 
                    step="250" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>₹2,000</span>
                    <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="filter-group">
                <div className="filter-group-title">Amenities</div>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes('Air Conditioning')} 
                    onChange={() => handleAmenityToggle('Air Conditioning')} 
                  />
                  <span>Air Conditioning</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes('Wi-Fi')} 
                    onChange={() => handleAmenityToggle('Wi-Fi')} 
                  />
                  <span>High speed Wi-Fi</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes('TV')} 
                    onChange={() => handleAmenityToggle('TV')} 
                  />
                  <span>Smart TV</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes('Room Service')} 
                    onChange={() => handleAmenityToggle('Room Service')} 
                  />
                  <span>24/7 Room Service</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes('Hot Water')} 
                    onChange={() => handleAmenityToggle('Hot Water')} 
                  />
                  <span>24/7 Hot Water</span>
                </label>
              </div>
            </aside>

            {/* Right Rooms Grid (Blueprint 2) */}
            <section aria-label="Available Rooms List">
              <div className="rooms-list-header">
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Showing <strong>{filteredRooms.length}</strong> of {roomsData.length} rooms
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label htmlFor="sort-rooms" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</label>
                  <select 
                    id="sort-rooms"
                    className="select-control"
                    style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.88rem' }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="capacity">Guest Capacity</option>
                  </select>
                </div>
              </div>

              {filteredRooms.length > 0 ? (
                <div className="rooms-grid rooms-grid-2">
                  {filteredRooms.map((room) => (
                    <RoomCard 
                      key={room.id} 
                      room={room} 
                      onQuickBook={() => onOpenBooking(room.id)}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: '3rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--surface)',
                  border: '1px dashed var(--border)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>No rooms match your filter</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Try expanding your price range or clearing amenity filters.
                  </p>
                  <button type="button" onClick={handleResetFilters} className="btn btn-primary">
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
