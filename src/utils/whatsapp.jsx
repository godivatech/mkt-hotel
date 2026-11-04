import React from 'react';

export const CLIENT_WHATSAPP_NUMBER = '918300236666';
export const CLIENT_PHONE_DISPLAY = '+91 83002 36666';

export const WhatsAppIcon = ({ size = 20, color = 'currentColor', style = {} }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    fill={color} 
    style={{ flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <path d="M16.002 2C8.28 2 2.02 8.257 2.02 15.976c0 2.545.688 4.933 1.884 7.005L2 30l7.24-1.898a13.93 13.93 0 0 0 6.762 1.745h.006c7.72 0 13.98-6.257 13.98-13.976C29.988 8.257 23.722 2 16.002 2zm8.18 19.82c-.344.97-1.71 1.776-2.784 2.008-.737.16-1.7.288-4.945-1.055-4.15-1.717-6.822-5.962-7.03-6.237-.207-.275-1.688-2.247-1.688-4.286 0-2.038 1.07-3.042 1.45-3.454.38-.413.827-.517 1.103-.517.276 0 .552.003.793.014.255.012.597-.097.934.713.345.827 1.173 2.862 1.276 3.07.103.206.172.448.034.723-.138.276-.207.448-.414.69-.207.241-.435.538-.62.723-.207.207-.424.431-.183.845.241.414 1.073 1.77 2.302 2.865 1.58 1.408 2.91 1.844 3.324 2.051.414.207.655.172.896-.103.241-.276 1.034-1.206 1.31-1.62.276-.413.552-.344.93-.206.38.138 2.413 1.138 2.827 1.345.414.206.69.31.793.483.103.172.103 1.0-.241 1.97z"/>
  </svg>
);

/**
 * Builds direct WhatsApp URL with prefilled reservation request message
 */
export function buildBookingWhatsAppUrl({
  bookingCode,
  guestName,
  guestPhone,
  roomName,
  checkIn,
  checkOut,
  nights,
  guestsCount,
  totalAmount,
  specialRequests
}) {
  const lines = [
    `*NEW RESERVATION REQUEST - MKT SHANTHI NIVAS*`,
    ``,
    `*Booking Ref:* ${bookingCode}`,
    `*Guest Name:* ${guestName}`,
    `*Phone Number:* ${guestPhone}`,
    `*Room Type:* ${roomName}`,
    `*Check-In Date:* ${checkIn}`,
    `*Check-Out Date:* ${checkOut}`,
    `*Duration:* ${nights} ${nights > 1 ? 'nights' : 'night'}${guestsCount ? ` (${guestsCount})` : ''}`,
    `*Estimated Total:* ₹${Number(totalAmount).toLocaleString('en-IN')} (Inclusive Tax)`,
    `*Special Request:* ${specialRequests && specialRequests !== 'None' ? specialRequests : 'None'}`,
    ``,
    `Please confirm room availability and booking. Thank you!`
  ];

  return `https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/**
 * Builds direct WhatsApp URL for contact / service enquiries
 */
export function buildEnquiryWhatsAppUrl({
  name,
  phone,
  dates,
  message,
  service
}) {
  const lines = [
    `*NEW ENQUIRY - MKT SHANTHI NIVAS*`,
    ``,
    `*Name:* ${name}`,
    `*Phone Number:* ${phone}`,
    ...(service ? [`*Service:* ${service}`] : []),
    ...(dates ? [`*Planned Dates:* ${dates}`] : []),
    `*Message / Requirements:* ${message || 'I would like to enquire about a stay/services at MKT Shanthi Nivas.'}`,
    ``,
    `Please connect with me. Thank you!`
  ];

  return `https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/**
 * Safely opens WhatsApp in a new tab or triggers mobile app
 */
export function openWhatsAppUrl(url) {
  if (!url) return;
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      if (typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = url;
      }
    }
  } catch (err) {
    if (typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = url;
    }
  }
}

