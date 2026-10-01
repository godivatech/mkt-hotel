import React from 'react';

// Custom precision SVG icons matching the reference image in gold
const WifiIcon = ({ size = 32, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <circle cx="12" cy="20" r="1" fill={color} />
  </svg>
);

const TvIcon = ({ size = 32, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="13" rx="2.5" />
    <path d="M8 21h8" />
    <path d="M12 19v2" />
    <path d="M10 3l2 3 2-3" />
  </svg>
);

const RoomServiceIcon = ({ size = 34, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {/* Cloche Dome */}
    <path d="M4 14a8 8 0 0 1 16 0H4z" />
    <circle cx="12" cy="5" r="1" />
    <line x1="12" y1="6" x2="12" y2="7" />
    {/* Serving Tray Plate */}
    <line x1="2" y1="16" x2="22" y2="16" />
    {/* Waiter hand / arm holding tray */}
    <path d="M6 18c3-0.5 5-2 6-2s3 1.5 6 1.5" />
  </svg>
);

const LuxuryBathIcon = ({ size = 32, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {/* Bottle Body */}
    <path d="M7 11a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8z" />
    {/* Pump Neck & Nozzle */}
    <path d="M12 8V5" />
    <path d="M10 5h4" />
    <path d="M11 5L8.5 4" />
    {/* Liquid Droplet */}
    <path d="M18.8 8c-.6.9-1.2 1.6-1.2 2.3a1.2 1.2 0 0 0 2.4 0c0-.7-.6-1.4-1.2-2.3z" />
  </svg>
);

const AcSnowflakeIcon = ({ size = 32, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="3.34" y1="7" x2="20.66" y2="17" />
    <line x1="3.34" y1="17" x2="20.66" y2="7" />
    <path d="M10 4.5l2 2 2-2" />
    <path d="M10 19.5l2-2 2 2" />
    <path d="M4.5 10l2.5 1.5-1 2.5" />
    <path d="M19.5 10l-2.5 1.5 1 2.5" />
  </svg>
);

const amenities = [
  {
    id: 'wifi',
    icon: WifiIcon,
    line1: 'High speed',
    line2: 'Wi-Fi'
  },
  {
    id: 'tv',
    icon: TvIcon,
    line1: 'Smart',
    line2: 'TV'
  },
  {
    id: 'room-service',
    icon: RoomServiceIcon,
    line1: '24/7 Room',
    line2: 'Service'
  },
  {
    id: 'bath',
    icon: LuxuryBathIcon,
    line1: 'Luxury Bath',
    line2: 'Amenities'
  },
  {
    id: 'ac',
    icon: AcSnowflakeIcon,
    line1: 'Air',
    line2: 'Conditioning'
  }
];

export default function RoomAmenitiesStrip({ className = "", style = {} }) {
  return (
    <section className={`room-amenities-strip ${className}`} style={style} aria-label="Room Highlights">
      <div className="amenities-strip-container">
        {amenities.map((item) => {
          const IconComp = item.icon;
          return (
            <div key={item.id} className="amenity-strip-item">
              <div className="amenity-strip-icon-wrap">
                <IconComp size={34} color="#C48E48" />
              </div>
              <div className="amenity-strip-text">
                <span>{item.line1}</span>
                <span>{item.line2}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
