import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ light = false, className = '' }) {
  const goldColor = '#DA9B5A';
  const textColor = light ? '#FFFFFF' : '#1F2937';
  const subColor = light ? 'rgba(255, 255, 255, 0.85)' : '#4B5563';

  return (
    <Link to="/" className={`brand-logo ${className}`} aria-label="MKT Shanthi Nivas Homepage">
      <svg className="brand-crest" viewBox="0 0 54 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 3 Kalasams at the summit */}
        <circle cx="27" cy="4" r="2.2" fill={goldColor} />
        <circle cx="21" cy="6" r="1.6" fill={goldColor} />
        <circle cx="33" cy="6" r="1.6" fill={goldColor} />
        
        {/* Tier 1 (Apex) */}
        <path d="M22 9H32L29 13H25L22 9Z" fill={goldColor} />
        {/* Tier 2 */}
        <path d="M20 14H34V18H20V14Z" stroke={goldColor} strokeWidth="1.5" fill="none" />
        <line x1="24" y1="14" x2="24" y2="18" stroke={goldColor} strokeWidth="1.2" />
        <line x1="30" y1="14" x2="30" y2="18" stroke={goldColor} strokeWidth="1.2" />
        
        {/* Tier 3 */}
        <path d="M17 19H37V24H17V19Z" stroke={goldColor} strokeWidth="1.5" fill="none" />
        <line x1="22" y1="19" x2="22" y2="24" stroke={goldColor} strokeWidth="1.2" />
        <line x1="27" y1="19" x2="27" y2="24" stroke={goldColor} strokeWidth="1.2" />
        <line x1="32" y1="19" x2="32" y2="24" stroke={goldColor} strokeWidth="1.2" />
        
        {/* Tier 4 */}
        <path d="M14 25H40V31H14V25Z" stroke={goldColor} strokeWidth="1.5" fill="none" />
        <line x1="20" y1="25" x2="20" y2="31" stroke={goldColor} strokeWidth="1.2" />
        <line x1="27" y1="25" x2="27" y2="31" stroke={goldColor} strokeWidth="1.2" />
        <line x1="34" y1="25" x2="34" y2="31" stroke={goldColor} strokeWidth="1.2" />
        
        {/* Tier 5 (Base Gopuram) */}
        <path d="M11 32H43V40H11V32Z" stroke={goldColor} strokeWidth="1.5" fill="none" />
        <line x1="18" y1="32" x2="18" y2="40" stroke={goldColor} strokeWidth="1.2" />
        <line x1="36" y1="32" x2="36" y2="40" stroke={goldColor} strokeWidth="1.2" />

        {/* Foundation Plinth */}
        <path d="M8 41H46V46H8V41Z" fill={goldColor} />

        {/* Grand Temple Arched Portal Gateway */}
        <path d="M22 46V35C22 32.2386 24.2386 30 27 30C29.7614 30 32 32.2386 32 35V46H22Z" fill={goldColor} />
        <circle cx="27" cy="35" r="1.5" fill={light ? '#004D4F' : '#FFFFFF'} />
      </svg>
      <div className="brand-text">
        <span className="brand-name" style={{ color: textColor }}>MKT</span>
        <span className="brand-sub" style={{ color: subColor }}>SHANTHI NIVAS</span>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: goldColor, fontWeight: 700, marginTop: '-2px' }}>STAY BLESSED</span>
      </div>
    </Link>
  );
}
