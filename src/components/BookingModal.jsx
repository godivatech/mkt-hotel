import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Users, Phone, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { roomsData, hotelInfo } from '../data/hotelData';
import { saveBooking } from '../services/firebase';

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [step, setStep] = useState(1); // 1: details, 2: confirmed
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(initialData.checkIn || today);
  const [checkOut, setCheckOut] = useState(initialData.checkOut || tomorrow);
  const [selectedRoomId, setSelectedRoomId] = useState(initialData.roomId || 'deluxe-room');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (initialData.roomId) {
      setSelectedRoomId(initialData.roomId);
    }
    if (initialData.checkIn) setCheckIn(initialData.checkIn);
    if (initialData.checkOut) setCheckOut(initialData.checkOut);
  }, [initialData]);

  if (!isOpen) return null;

  const selectedRoom = roomsData.find(r => r.id === selectedRoomId) || roomsData[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffTime) || diffTime <= 0 ? 1 : diffTime;
  const totalPrice = selectedRoom.price * nights;
  const gst = Math.round(totalPrice * 0.12);
  const finalAmount = totalPrice + gst;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    const code = 'MKT-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);

    // Save to Firestore subcollection: websites/mkt-shanthi-nivas/bookings
    await saveBooking({
      bookingCode: code,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guestName,
      guestPhone,
      specialRequests: specialRequests || 'None',
      roomRate: selectedRoom.price,
      totalAmount: finalAmount,
      tariffEstimate: totalPrice,
      gstAmount: gst,
      currency: 'INR'
    });

    setLoading(false);
    setStep(2);
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          onClick={handleResetAndClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-muted)' }}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {step === 1 ? (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="eyebrow">RESERVATION REQUEST</span>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--dark)' }}>Book Your Peaceful Stay</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {hotelInfo.name} • {hotelInfo.address.street}, Rameswaram
              </p>
            </div>

            <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Select Room */}
              <div className="form-group">
                <label className="form-label">Select Room Type</label>
                <select 
                  className="select-control"
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                >
                  {roomsData.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.priceFormatted}/night ({r.capacity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Check-In Date</label>
                  <input 
                    type="date" 
                    className="input-control" 
                    value={checkIn}
                    min={today}
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
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Guest Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Primary Guest Name</label>
                  <input 
                    type="text" 
                    className="input-control" 
                    placeholder="e.g. Ramesh Sharma" 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
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

              {/* Special Requests */}
              <div className="form-group">
                <label className="form-label">Special Request / Pilgrimage Notes</label>
                <input 
                  type="text" 
                  className="input-control" 
                  placeholder="e.g. Early morning darshan hot water, ground floor room for elders" 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              {/* Fare Summary Box */}
              <div style={{
                backgroundColor: 'var(--surface-alt)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                fontSize: '0.9rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span>{selectedRoom.name} × {nights} {nights > 1 ? 'nights' : 'night'}</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  <span>Taxes & GST (12%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--dark)' }}>
                  <span>Estimated Total</span>
                  <span style={{ color: 'var(--primary)' }}>₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.35rem' }}>
                  *Pay directly at hotel reception during check-in. No advance card required.
                </span>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="btn btn-secondary btn-full btn-lg" 
                style={{ marginTop: '0.5rem' }}
                disabled={loading}
              >
                {loading ? 'Securing Reservation...' : 'Confirm Reservation Request'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Confirmed View */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 109, 111, 0.1)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle size={36} />
            </div>

            <span className="eyebrow" style={{ color: 'var(--primary)' }}>RESERVATION REGISTERED</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
              We Look Forward to Welcoming You
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              Your reservation request for <strong>{selectedRoom.name}</strong> has been logged under Booking Reference:
            </p>

            <div style={{
              display: 'inline-block',
              backgroundColor: 'var(--surface-alt)',
              border: '1px dashed var(--accent)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1.75rem',
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--primary-dark)',
              marginBottom: '1.5rem'
            }}>
              {confirmationCode}
            </div>

            <div style={{
              backgroundColor: '#F8FAF8',
              border: '1px solid #D1E7DD',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              textAlign: 'left',
              fontSize: '0.88rem',
              marginBottom: '1.5rem'
            }}>
              <p><strong>Guest:</strong> {guestName || 'Valued Guest'}</p>
              <p><strong>Dates:</strong> {checkIn} to {checkOut} ({nights} {nights > 1 ? 'nights' : 'night'})</p>
              <p><strong>Hotel Address:</strong> {hotelInfo.address.street}, {hotelInfo.address.city}, {hotelInfo.address.state} - {hotelInfo.address.pincode}</p>
              <p><strong>Reception Desk:</strong> {hotelInfo.phone}</p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button 
                type="button" 
                onClick={handleResetAndClose}
                className="btn btn-primary"
              >
                Done
              </button>
              <a 
                href={`tel:${hotelInfo.phone}`} 
                className="btn btn-outline"
              >
                <Phone size={16} />
                Call Reception ({hotelInfo.phone})
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
