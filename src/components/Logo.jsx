import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ 
  light = false, 
  stacked = false, 
  taglineOnly = false,
  className = '',
  logoSrc = '/assets/images/mkt-logo-2.png'
}) {
  const goldColor = '#DA9B5A';
  const textColor = light ? '#FFFFFF' : '#1F2937';
  const subColor = light ? 'rgba(255, 255, 255, 0.85)' : '#4B5563';

  return (
    <Link 
      to="/" 
      className={`brand-logo ${stacked ? 'brand-logo-stacked' : ''} ${className}`} 
      aria-label="MKT Shanthi Nivas Homepage"
    >
      <img 
        src={logoSrc} 
        alt="MKT Shanthi Nivas Emblem" 
        className="brand-crest-img"
      />
      {(!taglineOnly || stacked) && (
        <div className="brand-text">
          {!taglineOnly && (
            <>
              <span className="brand-name" style={{ color: textColor }}>MKT</span>
              <span className="brand-sub" style={{ color: subColor }}>SHANTHI NIVAS</span>
            </>
          )}
          {stacked && (
            <span className="brand-tagline" style={{ color: goldColor }}>STAY BLESSED</span>
          )}
        </div>
      )}
    </Link>
  );
}
