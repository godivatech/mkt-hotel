import React from 'react';

export default function SectionHeading({ 
  eyebrow, 
  title, 
  subtitle, 
  center = false, 
  rightAction = null,
  className = '' 
}) {
  if (rightAction) {
    return (
      <div className={`section-header flex-between ${className}`}>
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <div className="section-header-action">
          {rightAction}
        </div>
      </div>
    );
  }

  return (
    <div className={`section-header ${center ? 'center' : ''} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
