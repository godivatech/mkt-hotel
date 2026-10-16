import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Wifi, Tv, Car, Coffee, Sparkles, Shirt, ArrowRight } from 'lucide-react';

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

        {/* Amenity Icons Row (Matching User Requirements) */}
        <div className="room-card-amenities">
          <div className="room-amenity-tag" title="Air Conditioning">
            <Wind size={13} />
            <span>AC</span>
          </div>
          <div className="room-amenity-tag" title="High-Speed Free WiFi">
            <Wifi size={13} />
            <span>WiFi</span>
          </div>
          <div className="room-amenity-tag" title="Smart TV">
            <Tv size={13} />
            <span>TV</span>
          </div>
          <div className="room-amenity-tag" title="Dedicated Parking Space">
            <Car size={13} />
            <span>Parking</span>
          </div>
          <div className="room-amenity-tag" title="Complimentary Welcome Drink">
            <Coffee size={13} />
            <span>Welcome Drink</span>
          </div>
          <div className="room-amenity-tag" title="Hair Dryer on Request">
            <Sparkles size={13} />
            <span>Hair Dryer</span>
          </div>
          <div className="room-amenity-tag" title="Paid Laundry Services">
            <Shirt size={13} />
            <span>Paid Laundry</span>
          </div>
        </div>

        {/* Card Footer: Price & View Room Button */}
        <div className="room-card-footer">
          <div className="room-card-price-row">
            <div className="room-card-price-wrap">
              <span className="room-card-price">{room.priceFormatted}</span>
              <span className="room-card-unit">/ night</span>
            </div>
            <span className="room-card-tax-pill">Inclusive Tax</span>
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
