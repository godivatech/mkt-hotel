import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ images, activeIndex, onClose, onNavigate }) {
  if (activeIndex === null || !images || images.length === 0) return null;

  const currentImage = images[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images, onClose, onNavigate]);

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <button 
        type="button" 
        className="lightbox-close" 
        onClick={onClose}
        aria-label="Close photo viewer"
      >
        <X size={32} />
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img 
          src={currentImage.image || currentImage} 
          alt={currentImage.title || 'MKT Shanthi Nivas Gallery Photo'} 
        />
        
        {currentImage.title && (
          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#FFFFFF' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>{currentImage.title}</h4>
            {currentImage.category && (
              <span className="badge" style={{ marginTop: '0.4rem', backgroundColor: 'var(--accent)', color: '#FFFFFF' }}>
                {currentImage.category}
              </span>
            )}
          </div>
        )}

        {/* Prev / Next controls */}
        {images.length > 1 && (
          <>
            <button 
              type="button" 
              onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
              style={{
                position: 'fixed',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '50%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate((activeIndex + 1) % images.length)}
              style={{
                position: 'fixed',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '50%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
