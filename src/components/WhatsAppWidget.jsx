import React from 'react';
import { hotelInfo } from '../data/hotelData';

export default function WhatsAppWidget() {
  return (
    <a
      href={hotelInfo.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Connect with MKT Reception on WhatsApp"
      title="Chat with MKT Reception on WhatsApp"
    >
      <svg 
        viewBox="0 0 32 32" 
        width="28" 
        height="28" 
        fill="currentColor"
        style={{ flexShrink: 0 }}
      >
        <path d="M16.002 2C8.28 2 2.02 8.257 2.02 15.976c0 2.545.688 4.933 1.884 7.005L2 30l7.24-1.898a13.93 13.93 0 0 0 6.762 1.745h.006c7.72 0 13.98-6.257 13.98-13.976C29.988 8.257 23.722 2 16.002 2zm8.18 19.82c-.344.97-1.71 1.776-2.784 2.008-.737.16-1.7.288-4.945-1.055-4.15-1.717-6.822-5.962-7.03-6.237-.207-.275-1.688-2.247-1.688-4.286 0-2.038 1.07-3.042 1.45-3.454.38-.413.827-.517 1.103-.517.276 0 .552.003.793.014.255.012.597-.097.934.713.345.827 1.173 2.862 1.276 3.07.103.206.172.448.034.723-.138.276-.207.448-.414.69-.207.241-.435.538-.62.723-.207.207-.424.431-.183.845.241.414 1.073 1.77 2.302 2.865 1.58 1.408 2.91 1.844 3.324 2.051.414.207.655.172.896-.103.241-.276 1.034-1.206 1.31-1.62.276-.413.552-.344.93-.206.38.138 2.413 1.138 2.827 1.345.414.206.69.31.793.483.103.172.103 1.0-.241 1.97z"/>
      </svg>
      <span className="whatsapp-float-label">
        <strong>WhatsApp</strong>
        <small>{hotelInfo.whatsapp}</small>
      </span>
    </a>
  );
}
