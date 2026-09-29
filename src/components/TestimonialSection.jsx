import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { testimonialsData, hotelInfo } from '../data/hotelData';

export default function TestimonialSection({ onOpenBooking }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="section-spacing">
      <div className="container">
        {/* Header with Nav Controls */}
        <div className="section-header flex-between" style={{ marginBottom: '2rem' }}>
          <div>
            <span className="eyebrow">TESTIMONIALS</span>
            <h2 className="section-title">What Our Guests Say</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              type="button" 
              onClick={prevTestimonial}
              className="btn btn-outline" 
              style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-pill)' }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button" 
              onClick={nextTestimonial}
              className="btn btn-outline" 
              style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-pill)' }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 2-Column Layout matching Reference */}
        <div className="testimonials-section-layout">
          {/* Left Testimonial Card */}
          <div className="testimonial-card-main">
            <blockquote className="testimonial-quote">
              "{current.comment}"
            </blockquote>

            <div className="testimonial-author-row">
              <div className="testimonial-author-info">
                <img 
                  src={current.avatar} 
                  alt={current.name} 
                  className="testimonial-avatar" 
                />
                <div>
                  <div className="testimonial-name">{current.name}</div>
                  <div className="testimonial-loc">{current.location}</div>
                </div>
              </div>

              <div className="rating-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#DA9B5A" color="#DA9B5A" />
                ))}
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark)', marginLeft: '4px' }}>
                  5.0
                </span>
              </div>
            </div>
          </div>

          {/* Right Divine Journey Closing CTA Card */}
          <div className="closing-cta-card">
            <img 
              src="/assets/images/hero-temple.jpg" 
              alt="Ramanathaswamy Temple"
              className="closing-cta-bg" 
            />
            <div className="closing-cta-content">
              <h3 className="closing-cta-title">Plan Your Divine Journey</h3>
              <p className="closing-cta-desc">
                Book your stay with MKT Shanthi Nivas and experience peace, hygiene, and comfort in the heart of Rameswaram.
              </p>
              <button 
                type="button" 
                onClick={onOpenBooking} 
                className="btn btn-secondary btn-pill"
                style={{ width: 'fit-content' }}
              >
                Book Now
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
