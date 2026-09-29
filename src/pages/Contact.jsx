import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Send, CheckCircle, Landmark, ShieldCheck, AlertCircle } from 'lucide-react';
import { hotelInfo, faqData } from '../data/hotelData';
import SectionHeading from '../components/SectionHeading';
import { saveEnquiry } from '../services/firebase';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dates: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleNameChange = (val) => {
    setFormData((prev) => ({ ...prev, name: val }));
    if (!val.trim()) {
      setErrors((prev) => ({ ...prev, name: 'Full name is required' }));
    } else if (!/^[a-zA-Z\s.']{2,50}$/.test(val.trim())) {
      setErrors((prev) => ({ ...prev, name: 'Please enter a valid name (alphabets only, min 2 characters)' }));
    } else {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handlePhoneChange = (val) => {
    const digitsOnly = val.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));

    if (digitsOnly.length === 0) {
      setErrors((prev) => ({ ...prev, phone: 'Mobile number is required' }));
    } else if (digitsOnly.length < 10) {
      setErrors((prev) => ({ ...prev, phone: `Please enter a 10-digit mobile number (${digitsOnly.length}/10 entered)` }));
    } else if (!/^[6-9]/.test(digitsOnly)) {
      setErrors((prev) => ({ ...prev, phone: 'Indian mobile numbers must start with 6, 7, 8, or 9' }));
    } else {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleMessageChange = (val) => {
    setFormData((prev) => ({ ...prev, message: val }));
    if (!val.trim()) {
      setErrors((prev) => ({ ...prev, message: 'Message is required' }));
    } else if (val.trim().length < 10) {
      setErrors((prev) => ({ ...prev, message: 'Please describe your query in at least 10 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { name: '', phone: '', message: '' };

    if (!formData.name.trim() || !/^[a-zA-Z\s.']{2,50}$/.test(formData.name.trim())) {
      newErrors.name = 'Please enter a valid full name (min 2 letters)';
      hasError = true;
    }

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number starting with 6-9';
      hasError = true;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please describe your requirements in at least 10 characters';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Save to Firestore subcollection: websites/mkt-shanthi-nivas/enquiries
    await saveEnquiry({
      name: formData.name.trim(),
      phone: cleanedPhone,
      dates: formData.dates.trim() || 'Not specified',
      message: formData.message.trim()
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main>
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <img 
          src="/assets/images/hotel-exterior.jpg" 
          alt="Contact MKT Shanthi Nivas Rameswaram" 
          className="page-hero-backdrop"
        />
        <div className="container page-hero-content">
          <span className="hero-eyebrow" style={{ color: '#F8D8A8' }}>WE ARE HERE TO ASSIST YOU</span>
          <h1 className="page-hero-title">Contact Us</h1>
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </nav>
        </div>
      </section>

      {/* Contact Main Section (Blueprint 7) */}
      <section className="section-spacing">
        <div className="container">
          <div className="contact-layout">
            {/* Left Column: Verified Business Information & Enquiry Form */}
            <div className="contact-info-panel">
              <div>
                <span className="eyebrow">GET IN TOUCH</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--dark)' }}>
                  Connect with {hotelInfo.name}
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Have questions about your upcoming pilgrimage, room availability, or temple darshan guidelines? Reach out directly to our 24/7 reception desk.
                </p>
              </div>

              {/* Verified Contact Details Cards */}
              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Hotel Location</h3>
                  <p style={{ fontWeight: 600, color: 'var(--dark)' }}>{hotelInfo.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    {hotelInfo.address.street},<br />
                    {hotelInfo.address.city}, {hotelInfo.address.state} - {hotelInfo.address.pincode}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.4rem' }}>
                    <Landmark size={14} /> 250m to Ramanathaswamy Temple (3-min walk)
                  </span>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Direct Phone Support</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Call us anytime for room bookings and enquiry:
                  </p>
                  <a 
                    href={`tel:${hotelInfo.phone}`} 
                    style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', display: 'inline-block', marginTop: '0.25rem' }}
                  >
                    {hotelInfo.phone}
                  </a>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Front Desk Hours</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    24 Hours / 7 Days a week<br />
                    Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}
                  </p>
                </div>
              </div>

              {/* Interactive Enquiry Form */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Send an Enquiry</h3>
                
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <CheckCircle size={40} color="var(--primary)" style={{ margin: '0 auto 0.75rem' }} />
                    <h4 style={{ color: 'var(--dark)', marginBottom: '0.25rem' }}>Thank You!</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                      Your message has been received. Our team will contact you shortly on {formData.phone || 'your phone'}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className={`input-control ${errors.name ? 'has-error' : ''}`}
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        onBlur={() => handleNameChange(formData.name)}
                        required
                      />
                      {errors.name && (
                        <div className="form-error-msg">
                          <AlertCircle size={14} /> {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Contact Phone</label>
                      <input 
                        type="tel" 
                        inputMode="numeric"
                        maxLength={10}
                        className={`input-control ${errors.phone ? 'has-error' : ''}`}
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onBlur={() => handlePhoneChange(formData.phone)}
                        required
                      />
                      {errors.phone && (
                        <div className="form-error-msg">
                          <AlertCircle size={14} /> {errors.phone}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Planned Travel Dates (Optional)</label>
                      <input 
                        type="text" 
                        className="input-control" 
                        placeholder="e.g. Next weekend, 3 days"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message or Requirements</label>
                      <textarea 
                        className={`input-control ${errors.message ? 'has-error' : ''}`}
                        rows="3" 
                        placeholder="Tell us your requirements, group size, or questions (min 10 characters)..."
                        value={formData.message}
                        onChange={(e) => handleMessageChange(e.target.value)}
                        onBlur={() => handleMessageChange(formData.message)}
                        required
                      ></textarea>
                      {errors.message && (
                        <div className="form-error-msg">
                          <AlertCircle size={14} /> {errors.message}
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-full"
                      disabled={loading}
                    >
                      <Send size={16} /> {loading ? 'Sending Enquiry...' : 'Send Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Real Google Map & Hotel Exterior card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Hotel Location & Map</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Conveniently situated at <strong>93 Middle Street</strong> in the central spiritual precinct of Rameswaram.
                </p>

                <div className="contact-map-frame">
                  <iframe 
                    title="MKT Shanthi Nivas Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.560647895123!2d79.314811!3d9.288223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01b3a5a415a77b%3A0x6b1e5a51a8d0526e!2sMiddle%20St%2C%20Rameswaram%2C%20Tamil%20Nadu%20623526!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Photo preview of hotel exterior with verified location badge */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1rem' }}>
                  <img src="/assets/images/hotel-exterior.jpg" alt="MKT Shanthi Nivas Hotel Entrance" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>{hotelInfo.name}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>93 Middle Street, Rameswaram</p>
                  </div>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent('93 Middle Street, Rameswaram, Tamil Nadu 623526')}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-spacing-sm" style={{ backgroundColor: 'var(--surface-alt)' }}>
        <div className="container container-narrow">
          <SectionHeading 
            eyebrow="HELPFUL ANSWERS"
            title="Pilgrim FAQs"
            subtitle="Common questions about staying at MKT Shanthi Nivas and visiting the temple."
            center={true}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            {faqData.map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--dark)', marginBottom: '0.4rem' }}>{faq.q}</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
