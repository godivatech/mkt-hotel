import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Wifi, Tv, ArrowRight } from 'lucide-react';

export default function RoomCard({ room, onQuickBook }) {
  return (
    <article className="room-card">
      <div className="room-card-image-wrap">
        <img 
          src={room.image} 
          alt={`${room.name} at MKT Shanthi Nivas Rameswaram`}
          className="room-card-image"
          loading="lazy"
        />
      </div>

      <div className="room-card-body">
        <h3 className="room-card-title">{room.name}</h3>
        <p className="room-card-specs">
          {room.capacity} • {room.bedType}
        </p>

        {/* Amenity Icons Row (Matching Reference) */}
        <div className="room-card-amenities">
          <div className="room-amenity-tag" title="Air Conditioning">
            <Wind size={15} />
            <span>AC</span>
          </div>
          <div className="room-amenity-tag" title="High-Speed Free WiFi">
            <Wifi size={15} />
            <span>WiFi</span>
          </div>
          <div className="room-amenity-tag" title="Flat Screen TV">
            <Tv size={15} />
            <span>TV</span>
          </div>
        </div>

        {/* Card Footer: Price & View Room Button */}
        <div className="room-card-footer">
          <div className="room-card-price-row">
            <span className="room-card-price">{room.priceFormatted}</span>
            <span className="room-card-unit">/ night</span>
          </div>

          <Link to={`/rooms/${room.slug}`} className="room-card-btn">
            View Room
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
