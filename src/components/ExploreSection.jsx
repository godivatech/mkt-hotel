import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { destinationsData } from '../data/hotelData';

export default function ExploreSection() {
  return (
    <section className="section-spacing-sm">
      <div className="container">
        <div className="explore-banner">
          {/* Panoramic Pamban Bridge Background with Deep Teal Fade */}
          <img 
            src="/assets/images/pamban-bridge.jpg" 
            alt="Pamban Bridge Sea Waters Rameswaram" 
            className="explore-banner-bg" 
          />
          <div className="explore-banner-overlay"></div>

          <div className="explore-layout">
            {/* Left Editorial Info */}
            <div className="explore-editorial">
              <h3 className="explore-heading">Explore Rameswaram</h3>
              <p className="explore-desc">
                Stay close to divine experiences, beautiful beaches and iconic landmarks.
              </p>
              <Link to="/about" className="explore-btn-pill">
                Know More
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right Attraction Vertical Photo Cards */}
            <div className="explore-attractions-row">
              {destinationsData.map((item) => (
                <div key={item.id} className="attraction-item-wrap">
                  <div className="attraction-photo-card">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                  <span className="attraction-caption">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
