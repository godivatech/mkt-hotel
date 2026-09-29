import React, { useState } from 'react';
import { Calendar, Users, ArrowRight } from 'lucide-react';

const getNextDayStr = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export default function BookingBar({ onSearch, className = '' }) {
  const today = new Date().toISOString().split('T')[0];
  const nextDate = getNextDayStr(today);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(nextDate);
  const [guestOption, setGuestOption] = useState('2 Adults, 1 Room');

  const handleCheckInChange = (newIn) => {
    setCheckIn(newIn);
    if (checkOut <= newIn) {
      setCheckOut(getNextDayStr(newIn));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        checkIn,
        checkOut,
        guestOption
      });
    }
  };

  return (
    <div className={`hero-booking-panel ${className}`}>
      <form onSubmit={handleSubmit} className="booking-form-grid">
        {/* Check In */}
        <div className="booking-field">
          <label className="booking-field-label">Check In</label>
          <div className="booking-input-wrapper">
            <Calendar size={18} />
            <input 
              type="date" 
              className="booking-input"
              value={checkIn}
              min={today}
              onChange={(e) => handleCheckInChange(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="booking-field">
          <label className="booking-field-label">Check Out</label>
          <div className="booking-input-wrapper">
            <Calendar size={18} />
            <input 
              type="date" 
              className="booking-input"
              value={checkOut}
              min={getNextDayStr(checkIn) || today}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Rooms & Guests */}
        <div className="booking-field">
          <label className="booking-field-label">Rooms & Guests</label>
          <div className="booking-input-wrapper">
            <Users size={18} />
            <select 
              className="booking-input"
              value={guestOption}
              onChange={(e) => setGuestOption(e.target.value)}
            >
              <option value="1 Adult, 1 Room">1 Adult, 1 Room</option>
              <option value="2 Adults, 1 Room">2 Adults, 1 Room</option>
              <option value="3 Adults, 1 Room">3 Adults, 1 Room</option>
              <option value="4 Adults, 1 Family Suite">4 Adults, 1 Family Suite</option>
              <option value="Family Group (5+ Guests)">Family Group (5+ Guests)</option>
            </select>
          </div>
        </div>

        {/* CTA Button */}
        <div>
          <button type="submit" className="btn btn-primary booking-btn">
            Check Availability
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
