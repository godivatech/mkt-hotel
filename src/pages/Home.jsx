import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Bed, Users, Tag, Landmark, Maximize, Utensils, Clock, ArrowRight, ShieldCheck 
} from 'lucide-react';
import BookingBar from '../components/BookingBar';
import SectionHeading from '../components/SectionHeading';
import RoomCard from '../components/RoomCard';
import ExploreSection from '../components/ExploreSection';
import TestimonialSection from '../components/TestimonialSection';
import { hotelInfo, roomsData } from '../data/hotelData';

export default function Home({ onOpenBooking, onSearchBooking }) {
  return (
    <main>
      {/* -------------------------------------------------------------
          1. HERO SECTION (Exact Reference Blueprint)
      ------------------------------------------------------------- */}
      <section className="hero-section">
        <img 
          src="/assets/images/hero-temple.jpg" 
          alt="Ramanathaswamy Temple at Golden Dusk in Rameswaram"
          className="hero-backdrop"
        />
        <div className="hero-overlay"></div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="hero-content">
            <span className="hero-eyebrow">{hotelInfo.tagline}</span>
            <h1 className="hero-title">{hotelInfo.name}</h1>
            <p className="hero-subtitle">
              {hotelInfo.subtitle} — Peaceful ambiance, clean spacious rooms, and pure vegetarian hospitality just moments from Ramanathaswamy Temple.
            </p>

            {/* 4 Benefit Indicators (Matching Reference) */}
            <div className="hero-benefits-row">
              <div className="hero-benefit-item">
                <MapPin size={16} />
                <span>Prime Location</span>
              </div>
              <div className="hero-benefit-item">
                <Bed size={16} />
                <span>Clean & Spacious Rooms</span>
              </div>
              <div className="hero-benefit-item">
                <Users size={16} />
                <span>Family Friendly</span>
              </div>
              <div className="hero-benefit-item">
                <Tag size={16} />
                <span>Best Tariff</span>
              </div>
            </div>
          </div>

          {/* Floating Availability Search Panel */}
          <BookingBar onSearch={onSearchBooking} />
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. WHY CHOOSE SECTION (Blueprint 1, Section 2)
      ------------------------------------------------------------- */}
      <section className="section-spacing">
        <div className="container">
          <div className="why-choose-grid">
            {/* Left Editorial Text */}
            <div className="why-choose-editorial">
              <span className="eyebrow">EXPERIENCE DIVINE COMFORT</span>
              <h2 className="section-title">Why Choose {hotelInfo.name}</h2>
              <p className="section-subtitle">
                A perfect blend of spirituality and comfort. We offer clean, modern rooms with warm hospitality, situated at 93 Middle Street in Rameswaram, just minutes away from the Ramanathaswamy Temple.
              </p>
              <div style={{ marginTop: '1rem' }}>
                <Link to="/about" className="link-arrow">
                  Read Our Full Story
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right 2x2 Feature Boxes */}
            <div className="features-2x2-grid">
              <div className="feature-box">
                <div className="feature-icon-circle">
                  <Landmark size={22} />
                </div>
                <div>
                  <h3 className="feature-title">Near Temple</h3>
                  <p className="feature-desc">
                    Easy access to Ramanathaswamy Temple & Agni Theertham for morning rituals.
                  </p>
                </div>
              </div>

              <div className="feature-box">
                <div className="feature-icon-circle">
                  <Maximize size={22} />
                </div>
                <div>
                  <h3 className="feature-title">Spacious Rooms</h3>
                  <p className="feature-desc">
                    Comfortable stay for families with ergonomic beds and spotless private baths.
                  </p>
                </div>
              </div>

              <div className="feature-box">
                <div className="feature-icon-circle">
                  <Utensils size={22} />
                </div>
                <div>
                  <h3 className="feature-title">Vegetarian Dining</h3>
                  <p className="feature-desc">
                    Pure, authentic, and hygienic South Indian breakfast tiffins and meals.
                  </p>
                </div>
              </div>

              <div className="feature-box">
                <div className="feature-icon-circle">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="feature-title">24/7 Service</h3>
                  <p className="feature-desc">
                    Always here for you with round-the-clock front desk and travel guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. OUR ROOMS SECTION (Blueprint 1, Section 3)
      ------------------------------------------------------------- */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--surface-alt)' }}>
        <div className="container">
          <SectionHeading 
            eyebrow="COMFORTABLE STAY"
            title="Our Rooms"
            subtitle="Thoughtfully equipped with air conditioning, 24/7 hot water, high-speed WiFi, and plush bedding for a restful pilgrimage stay."
            rightAction={
              <Link to="/rooms" className="link-arrow">
                View All Rooms
                <ArrowRight size={16} />
              </Link>
            }
          />

          {/* 4 Room Cards Grid */}
          <div className="rooms-grid">
            {roomsData.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onQuickBook={() => onOpenBooking(room.id)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. EXPLORE RAMESWARAM SECTION (Blueprint 1, Section 4)
      ------------------------------------------------------------- */}
      <ExploreSection />

      {/* -------------------------------------------------------------
          5. TESTIMONIALS SECTION (Blueprint 1, Section 5)
      ------------------------------------------------------------- */}
      <TestimonialSection onOpenBooking={onOpenBooking} />
    </main>
  );
}
