import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Users, CheckCircle, ShieldCheck, Phone, ArrowRight, Bed } from 'lucide-react';
import { roomsData, hotelInfo } from '../data/hotelData';
import { saveBooking } from '../services/firebase';

export default function BookingFlow() {
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get('room') || 'deluxe-room';
  const initialCheckIn = searchParams.get('checkIn') || new Date().toISOString().split('T')[0];
  const initialCheckOut = searchParams.get('checkOut') || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState(initialRoom);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guestsCount, setGuestsCount] = useState('2');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const selectedRoom = roomsData.find(r => r.id === selectedRoomId) || roomsData[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffTime) || diffTime <= 0 ? 1 : diffTime;
  const roomTotal = selectedRoom.price * nights;
  const gst = Math.round(roomTotal * 0.12);
  const finalTotal = roomTotal + gst;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const code = 'MKT-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);

    // Save to Firestore subcollection: websites/mkt-shanthi-nivas/bookings
    await saveBooking({
      bookingCode: code,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guestsCount,
      guestName,
      guestPhone,
      specialRequests: guestNotes || 'None',
      roomRate: selectedRoom.price,
      totalAmount: finalTotal,
      tariffEstimate: roomTotal,
      gstAmount: gst,
      currency: 'INR'
    });

    setLoading(false);
    setBookingConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <section className="page-hero-banner" style={{ paddingBottom: '3rem' }}>
        <img 
          src="/assets/images/hero-temple.jpg" 
          alt="Book Stay at MKT Shanthi Nivas" 
          className="page-hero-backdrop"
        />
        <div className="container page-hero-content">
          <span className="hero-eyebrow" style={{ color: '#F8D8A8' }}>DIRECT RESERVATION</span>
          <h1 className="page-hero-title">Book Your Stay</h1>
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Booking</span>
          </nav>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container container-narrow">
          {!bookingConfirmed ? (
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
                <span className="eyebrow">STEP 1 OF 1</span>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--dark)' }}>Guest & Reservation Details</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  No payment required today. Reserve your room and pay directly at the hotel front desk upon arrival.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Choose Room */}
                <div className="form-group">
                  <label className="form-label">Select Accommodation</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {roomsData.map((r) => (
                      <div 
                        key={r.id}
                        onClick={() => setSelectedRoomId(r.id)}
                        style={{
                          border: `2px solid ${selectedRoomId === r.id ? 'var(--primary)' : 'var(--border)'}`,
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem',
                          cursor: 'pointer',
                          backgroundColor: selectedRoomId === r.id ? 'rgba(0,109,111,0.03)' : 'var(--surface)',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--dark)' }}>{r.name}</span>
                          <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{r.priceFormatted}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {r.capacity} • {r.bedType}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Check-In Date</label>
                    <input 
                      type="date" 
                      className="input-control" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-Out Date</label>
                    <input 
                      type="date" 
                      className="input-control" 
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Guest Contact */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name of Primary Guest</label>
                    <input 
                      type="text" 
                      className="input-control" 
                      placeholder="Enter guest name" 
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input 
                      type="tel" 
                      className="input-control" 
                      placeholder="10-digit mobile number" 
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests (Optional)</label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="e.g. Ground floor preference for elderly parents, early morning holy bath" 
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                  />
                </div>

                {/* Bill Summary */}
                <div style={{
                  backgroundColor: 'var(--surface-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  fontSize: '0.95rem'
                }}>
                  <h4 style={{ marginBottom: '0.75rem', fontSize: '1.05rem', color: 'var(--dark)' }}>Fare Breakdown</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>{selectedRoom.name} ({nights} {nights > 1 ? 'nights' : 'night'})</span>
                    <span>₹{roomTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                    <span>Applicable Hotel GST (12%)</span>
                    <span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--dark)' }}>
                    <span>Net Payable at Hotel</span>
                    <span style={{ color: 'var(--primary)' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-secondary btn-full btn-lg"
                  disabled={loading}
                >
                  {loading ? 'Confirming Reservation...' : 'Confirm Reservation Now'}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            </div>
          ) : (
            /* Confirmation Screen */
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
              <CheckCircle size={56} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
              <span className="eyebrow" style={{ color: 'var(--primary)' }}>BOOKING CONFIRMED</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>Your Reservation is Secured</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                Thank you, <strong>{guestName}</strong>! We look forward to hosting you at {hotelInfo.name} in Rameswaram.
              </p>

              <div style={{
                display: 'inline-block',
                backgroundColor: 'var(--surface-alt)',
                border: '2px dashed var(--accent)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 2.5rem',
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: 'var(--primary-dark)',
                marginBottom: '2rem'
              }}>
                {bookingCode}
              </div>

              <div style={{
                maxWidth: '460px',
                margin: '0 auto 2rem',
                textAlign: 'left',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                fontSize: '0.92rem',
                lineHeight: '1.8'
              }}>
                <div><strong>Hotel:</strong> {hotelInfo.name}</div>
                <div><strong>Address:</strong> {hotelInfo.address.street}, {hotelInfo.address.city}, Tamil Nadu {hotelInfo.address.pincode}</div>
                <div><strong>Room:</strong> {selectedRoom.name}</div>
                <div><strong>Check-In:</strong> {checkIn} (from 12:00 PM)</div>
                <div><strong>Check-Out:</strong> {checkOut} (until 11:00 AM)</div>
                <div><strong>Total Amount:</strong> ₹{finalTotal.toLocaleString('en-IN')} (Pay on Arrival)</div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/" className="btn btn-primary">
                  Return to Home
                </Link>
                <a href={`tel:${hotelInfo.phone}`} className="btn btn-outline">
                  <Phone size={16} /> Call Front Desk ({hotelInfo.phone})
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
