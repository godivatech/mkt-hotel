import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Utensils, Users, Landmark, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { hotelInfo } from '../data/hotelData';

export default function About({ onOpenBooking }) {
  return (
    <main>
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <img 
          src="/assets/images/hotel-exterior.jpg" 
          alt="MKT Shanthi Nivas Hotel Facade in Rameswaram" 
          className="page-hero-backdrop"
        />
        <div className="container page-hero-content">
          <span className="hero-eyebrow" style={{ color: '#F8D8A8' }}>DISCOVER OUR HOSPITALITY</span>
          <h1 className="page-hero-title">About {hotelInfo.name}</h1>
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </nav>
        </div>
      </section>

      {/* Our Story Editorial Section (Blueprint 4) */}
      <section className="section-spacing">
        <div className="container">
          <div className="why-choose-grid" style={{ alignItems: 'center' }}>
            {/* Story Text */}
            <div className="why-choose-editorial">
              <span className="eyebrow">OUR STORY & COMMITMENT</span>
              <h2 className="section-title">A Peaceful Sanctuary for Rameswaram Yatris</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                {hotelInfo.name} is dedicated to providing a peaceful and comfortable stay for all devotees, families, and travelers. Located at <strong>{hotelInfo.address.street}</strong>, we offer modern comforts coupled with traditional warm hospitality to make your sacred visit truly memorable.
              </p>
              <p style={{ fontSize: '0.98rem', lineHeight: '1.65', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Whether you arrive for the sacred 22 Theertham snanam at Ramanathaswamy Temple, early morning sunrise prayers at Agni Theertham, or to explore the coastal wonders of Pamban and Dhanushkodi, our hotel provides an immaculate and restful haven.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/gallery" className="btn btn-primary">
                  View Photo Gallery
                  <ArrowRight size={16} />
                </Link>
                <button type="button" onClick={onOpenBooking} className="btn btn-secondary btn-pill">
                  Book Your Stay
                </button>
              </div>
            </div>

            {/* Story Image Composition */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img 
                  src="/assets/images/hotel-exterior.jpg" 
                  alt="MKT Shanthi Nivas Hotel Building" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.5rem',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Landmark size={28} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--dark)', fontSize: '0.95rem' }}>3-Min Walk</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>To Ramanathaswamy Temple</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Bar (Matching Blueprint 4) */}
      <section className="section-spacing-sm" style={{ backgroundColor: 'var(--surface-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="feature-icon-circle"><MapPin size={22} /></div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Prime Location</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>93 Middle Street</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="feature-icon-circle"><Bed size={22} /></div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Clean & Spacious Rooms</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Daily housekeeping</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="feature-icon-circle"><Utensils size={22} /></div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Vegetarian Dining</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Pure & hygienic food</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="feature-icon-circle"><Users size={22} /></div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--dark)' }}>Family Friendly</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Warm personalized care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rameswaram Pilgrim Convenience Tips */}
      <section className="section-spacing">
        <div className="container">
          <SectionHeading 
            eyebrow="PILGRIM ESSENTIALS"
            title="Designed for Your Sacred Journey"
            subtitle="We understand the special rhythm of a Rameswaram yatra — from early morning theertham baths to evening temple aarti."
            center={true}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
            <div className="card" style={{ padding: '1.75rem' }}>
              <Clock size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Early Morning Bath Hot Water</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Darshan begins as early as 5:00 AM. Our rooms feature uninterrupted 24-hour hot water so your family can refresh with ease before heading to the temple.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <ShieldCheck size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Safe & Peaceful Environment</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Located on tranquil Middle Street away from noisy bus corridors, yet literally steps from temple corridors and flower stalls.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem' }}>
              <MapPin size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Sightseeing Assistance</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Our 24/7 reception desk assists with reliable local cabs and autos for visiting Dhanushkodi, Pamban Bridge, and Dr. Kalam Memorial.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
