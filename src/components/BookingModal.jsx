import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Users, Phone, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { roomsData, hotelInfo } from '../data/hotelData';
import { saveBooking } from '../services/firebase';
import { WhatsAppIcon, buildBookingWhatsAppUrl, openWhatsAppUrl, CLIENT_PHONE_DISPLAY } from '../utils/whatsapp';

const getNextDayStr = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = getNextDayStr(today);

  const [step, setStep] = useState(1); // 1: details, 2: confirmed
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState(initialData.checkIn || today);
  const [checkOut, setCheckOut] = useState(initialData.checkOut || tomorrow);
  const [selectedRoomId, setSelectedRoomId] = useState(initialData.roomId || 'executive-double');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Validation error states
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (initialData.roomId) {
      setSelectedRoomId(initialData.roomId);
    }
    if (initialData.checkIn) setCheckIn(initialData.checkIn);
    if (initialData.checkOut) setCheckOut(initialData.checkOut);
  }, [initialData]);

  if (!isOpen) return null;

  const selectedRoom = roomsData.find(r => 
    r.id === selectedRoomId || 
    r.slug === selectedRoomId ||
    ((selectedRoomId === 'deluxe-queen-room' || selectedRoomId === 'deluxe-room') && r.id === 'executive-double') ||
    ((selectedRoomId === 'quadruple-room' || selectedRoomId === 'family-quadruple-room') && r.id === 'executive-four-fold') ||
    ((selectedRoomId === 'family-room' || selectedRoomId === 'suite-room' || selectedRoomId === 'family-studio-suite') && r.id === 'family-suite')
  ) || roomsData[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(1, Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffTime) || diffTime <= 0 ? 1 : diffTime;
  const totalPrice = selectedRoom.price * nights;
  // Room rates are inclusive of tax
  const finalAmount = totalPrice;

  // Validation handlers
  const handleCheckInChange = (newDate) => {
    setCheckIn(newDate);
    setDateError('');
    if (checkOut <= newDate) {
      setCheckOut(getNextDayStr(newDate));
    }
  };

  const handleCheckOutChange = (newDate) => {
    setCheckOut(newDate);
    if (newDate <= checkIn) {
      setDateError('Check-out date must be after check-in date');
    } else {
      setDateError('');
    }
  };

  const handleNameChange = (val) => {
    setGuestName(val);
    if (!val.trim()) {
      setNameError('Primary guest name is required');
    } else if (!/^[a-zA-Z\s.']{2,50}$/.test(val.trim())) {
      setNameError('Please enter a valid name (alphabets only, min 2 characters)');
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (val) => {
    // Strictly numbers only, max 10 digits
    const digitsOnly = val.replace(/\D/g, '').slice(0, 10);
    setGuestPhone(digitsOnly);

    if (digitsOnly.length === 0) {
      setPhoneError('Mobile number is required');
    } else if (digitsOnly.length < 10) {
      setPhoneError(`Please enter a 10-digit mobile number (${digitsOnly.length}/10 entered)`);
    } else if (!/^[6-9]/.test(digitsOnly)) {
      setPhoneError('Indian mobile numbers must start with 6, 7, 8, or 9');
    } else {
      setPhoneError('');
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();

    let hasError = false;

    // Validate Guest Name
    if (!guestName.trim() || !/^[a-zA-Z\s.']{2,50}$/.test(guestName.trim())) {
      setNameError('Please enter a valid guest name (alphabets only, min 2 characters)');
      hasError = true;
    }

    // Validate Phone Number
    const cleanedPhone = guestPhone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setPhoneError('Please enter a valid 10-digit mobile number starting with 6-9');
      hasError = true;
    }

    // Validate Dates
    if (checkOut <= checkIn) {
      setDateError('Check-out date must be after check-in date');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    const code = 'MKT-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);

    // Build direct WhatsApp link with all booking details for client number 83002 36666
    const waLink = buildBookingWhatsAppUrl({
      bookingCode: code,
      guestName: guestName.trim(),
      guestPhone: cleanedPhone,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      totalAmount: finalAmount,
      specialRequests: specialRequests.trim()
    });
    setWhatsappUrl(waLink);

    // Open WhatsApp directly without delay
    openWhatsAppUrl(waLink);

    // Save to Firestore in background safely without blocking UI
    saveBooking({
      bookingCode: code,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guestName: guestName.trim(),
      guestPhone: cleanedPhone,
      specialRequests: specialRequests.trim() || 'None',
      roomRate: selectedRoom.price,
      totalAmount: finalAmount,
      tariffEstimate: totalPrice,
      taxNote: 'Inclusive Tax',
      currency: 'INR'
    }).catch(err => console.warn('[Firebase] saveBooking error:', err));

    setLoading(false);
    setStep(2);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setNameError('');
    setPhoneError('');
    setDateError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          onClick={handleResetAndClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {step === 1 ? (
          <div>
            <div className="modal-header">
              <span className="eyebrow">RESERVATION REQUEST</span>
              <h3 className="modal-title">Book Your Peaceful Stay</h3>
              <p className="modal-subtitle">
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
                      {r.name} — {r.priceFormatted}/night (Inclusive Tax)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Inputs */}
              <div>
                <div className="form-row form-row-2col">
                  <div className="form-group">
                    <label className="form-label">Check-In Date</label>
                    <input 
                      type="date" 
                      className={`input-control ${dateError ? 'has-error' : ''}`}
                      value={checkIn}
                      min={today}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-Out Date</label>
                    <input 
                      type="date" 
                      className={`input-control ${dateError ? 'has-error' : ''}`}
                      value={checkOut}
                      min={getNextDayStr(checkIn) || today}
                      onChange={(e) => handleCheckOutChange(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {dateError && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} /> {dateError}
                  </div>
                )}
              </div>

              {/* Guest Details */}
              <div className="form-row form-row-2col">
                <div className="form-group">
                  <label className="form-label">Primary Guest Name</label>
                  <input 
                    type="text" 
                    className={`input-control ${nameError ? 'has-error' : ''}`}
                    placeholder="e.g. Ramesh Sharma" 
                    value={guestName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={() => handleNameChange(guestName)}
                    required
                  />
                  {nameError && (
                    <div className="form-error-msg">
                      <AlertCircle size={14} /> {nameError}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    inputMode="numeric"
                    maxLength={10}
                    className={`input-control ${phoneError ? 'has-error' : ''}`}
                    placeholder="10-digit mobile number" 
                    value={guestPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => handlePhoneChange(guestPhone)}
                    required
                  />
                  {phoneError && (
                    <div className="form-error-msg">
                      <AlertCircle size={14} /> {phoneError}
                    </div>
                  )}
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
              <div className="fare-summary-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span>{selectedRoom.name} × {nights} {nights > 1 ? 'nights' : 'night'}</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Taxes & GST (12%)</span>
                  <span style={{ backgroundColor: 'rgba(0, 109, 111, 0.1)', color: 'var(--primary)', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                    Inclusive Tax
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--dark)' }}>
                  <span>Estimated Total</span>
                  <span style={{ color: 'var(--primary)' }}>₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.35rem' }}>
                  *All taxes included. Pay directly at hotel reception during check-in. No advance card required.
                </span>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="btn btn-secondary btn-full btn-lg" 
                style={{ 
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
                disabled={loading}
              >
                <WhatsAppIcon size={20} color="#FFFFFF" />
                {loading ? 'Opening WhatsApp...' : 'Confirm Reservation via WhatsApp'}
              </button>
              <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Direct booking request sent to Client WhatsApp ({CLIENT_PHONE_DISPLAY})
              </div>
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

            {/* Direct WhatsApp Action Card */}
            <div style={{
              backgroundColor: 'rgba(37, 211, 102, 0.08)',
              border: '1px solid rgba(37, 211, 102, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 700, color: '#128C7E', fontSize: '1rem', marginBottom: '0.35rem' }}>
                Connect with Hotel on WhatsApp
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.9rem' }}>
                Your reservation details are ready for Client WhatsApp ({CLIENT_PHONE_DISPLAY}). If WhatsApp did not open automatically, tap below:
              </p>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.96rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)'
                }}
              >
                <WhatsAppIcon size={20} color="#FFFFFF" />
                Open in WhatsApp ({CLIENT_PHONE_DISPLAY})
              </a>
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

            <div className="modal-btn-row">
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
