import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryItems, hotelInfo } from '../data/hotelData';
import LightboxModal from '../components/LightboxModal';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Rooms', 'Dining', 'Temple', 'Nearby Places'];

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  return (
    <main>
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <img 
          src="/assets/images/pamban-bridge.jpg" 
          alt="Rameswaram Scenic Views" 
          className="page-hero-backdrop"
        />
        <div className="container page-hero-content">
          <span className="hero-eyebrow" style={{ color: '#F8D8A8' }}>VISUAL JOURNEY</span>
          <h1 className="page-hero-title">Photo Gallery</h1>
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Gallery</span>
          </nav>
        </div>
      </section>

      {/* Gallery Filter & Grid (Blueprint 6) */}
      <section className="section-spacing">
        <div className="container">
          {/* Category Filter Pills (Blueprint 6) */}
          <div className="gallery-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Gallery Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="gallery-card"
                onClick={() => handleOpenLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
                onKeyDown={(e) => e.key === 'Enter' && handleOpenLightbox(index)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                />
                <div className="gallery-card-overlay">
                  <span className="badge" style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                    {item.category}
                  </span>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Viewer */}
      {lightboxIndex !== null && (
        <LightboxModal 
          images={filteredItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </main>
  );
}
