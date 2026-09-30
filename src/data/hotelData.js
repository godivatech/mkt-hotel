// Centralized Hotel Data & Configuration
// Verified Business Information:
// Business Name: MKT Shanthi Nivas
// Address: 93 Middle Street, Rameswaram, Tamil Nadu 623526
// Phone: +91 83002 36666 / 04573-223666

export const hotelInfo = {
  name: "MKT Shanthi Nivas",
  shortName: "MKT",
  tagline: "STAY BLESSED",
  subtitle: "A comfortable stay in the heart of Rameswaram",
  concept: "A peaceful and comfortable stay near the sacred Ramanathaswamy Temple. Modern amenities with spiritual essence.",
  description: "MKT Shanthi Nivas welcomes pilgrims, families, and leisure travelers to experience serene hospitality in Rameswaram. Located centrally at 93 Middle Street, our hotel offers impeccably clean, spacious air-conditioned rooms, pure vegetarian dining, and thoughtful guest services designed to make your sacred pilgrimage and coastal vacation smooth and memorable.",
  address: {
    street: "93 Middle Street",
    city: "Rameswaram",
    state: "Tamil Nadu",
    pincode: "623526",
    landmark: "Near Ramanathaswamy Temple (East & North Gate proximity)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.560647895123!2d79.314811!3d9.288223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01b3a5a415a77b%3A0x6b1e5a51a8d0526e!2sMiddle%20St%2C%20Rameswaram%2C%20Tamil%20Nadu%20623526!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  phone: "83002 36666",
  phoneFormatted: "+91 83002 36666",
  phoneTel: "+918300236666",
  landline: "04573-223666",
  landlineFormatted: "04573-223666",
  landlineTel: "04573223666",
  whatsapp: "83002 36666",
  whatsappFormatted: "+91 83002 36666",
  whatsappUrl: "https://wa.me/918300236666?text=Hello%20MKT%20Shanthi%20Nivas%2C%20I%20would%20like%20to%20enquire%20about%20room%20booking.",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  benefits: [
    { id: "location", title: "Prime Location", desc: "Walking distance to temple", icon: "MapPin" },
    { id: "cleanliness", title: "Clean & Spacious Rooms", desc: "Spotless hygienic interiors", icon: "Bed" },
    { id: "family", title: "Family Friendly", desc: "Comfortable for all ages", icon: "Users" },
    { id: "tariff", title: "Best Tariff", desc: "Transparent, honest pricing", icon: "Tag" }
  ],
  whyChooseUs: [
    {
      id: "temple",
      title: "Near Temple",
      desc: "Easy access to Ramanathaswamy Temple and Agni Theertham for morning holy baths and darshan.",
      icon: "Landmark"
    },
    {
      id: "spacious",
      title: "Spacious Rooms",
      desc: "Thoughtfully laid out rooms with comfortable bedding, ample storage, and quiet ventilation.",
      icon: "Maximize"
    },
    {
      id: "dining",
      title: "Vegetarian Dining",
      desc: "Pure, wholesome, and hygienic vegetarian South Indian meals and filter coffee served daily.",
      icon: "Utensils"
    },
    {
      id: "service",
      title: "24/7 Service",
      desc: "Round-the-clock front desk assistance, temple timing guidance, and travel support.",
      icon: "Clock"
    }
  ]
};

export const roomsData = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    slug: "deluxe-room",
    tagline: "Comfortable, serene haven for couples & solo pilgrims",
    capacity: "2 Guests",
    guestsCount: 2,
    bedType: "1 King Bed",
    bedsCount: 1,
    size: "250 sq ft",
    price: 2499,
    priceFormatted: "₹2,499",
    featured: true,
    image: "/assets/images/mkt-room-deluxe.png",
    gallery: [
      "/assets/images/mkt-room-deluxe.png",
      "/assets/images/mkt-room-executive.png",
      "/assets/images/mkt-room-amenities.png",
      "/assets/images/mkt-bathroom-shower.png"
    ],
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "Television",
      "Attached Bathroom",
      "Complimentary Water",
      "Daily Housekeeping",
      "24/7 Hot Water",
      "Intercom Facility"
    ],
    overview: "Enjoy a comfortable stay in our Deluxe Room with modern amenities and a peaceful ambiance, perfect for families and pilgrims visiting Rameswaram. Featuring a plush king-size bed, soothing earth and teal tones, spotless ensuite bathroom with 24-hour hot water, and silent air conditioning to ensure you wake up rejuvenated for early morning temple darshan.",
    policies: [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Government photo ID required at check-in for all adult guests",
      "100% Non-smoking room environment",
      "Early check-in subject to room availability upon request"
    ]
  },
  {
    id: "family-suite",
    name: "Family Suite",
    slug: "family-suite",
    tagline: "Spacious two-bed accommodation tailored for family yatras",
    capacity: "4 Guests",
    guestsCount: 4,
    bedType: "2 Double Beds",
    bedsCount: 2,
    size: "420 sq ft",
    price: 4499,
    priceFormatted: "₹4,499",
    featured: true,
    image: "/assets/images/mkt-room-family.png",
    gallery: [
      "/assets/images/mkt-room-family.png",
      "/assets/images/mkt-room-suite.png",
      "/assets/images/mkt-corridor.png",
      "/assets/images/mkt-bathroom-shower.png"
    ],
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "Television",
      "Attached Bathroom",
      "Dual Wardrobes",
      "Complimentary Water",
      "Daily Housekeeping",
      "Spacious Luggage Area",
      "24/7 Hot Water"
    ],
    overview: "Travelling with family or elderly parents for sacred rituals? Our Family Suite offers generous floor space, two double beds with posture-friendly mattresses, abundant wardrobe room, and convenient seating so all family members can relax together in complete harmony.",
    policies: [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Ideal for up to 4 adults and 2 children under 6 years",
      "Government photo ID required for all adult guests",
      "Pure vegetarian room dining service available"
    ]
  },
  {
    id: "suite-room",
    name: "Suite Room",
    slug: "suite-room",
    tagline: "The premier signature suite with living lounge & refined decor",
    capacity: "4 Guests",
    guestsCount: 4,
    bedType: "2 Queen Beds",
    bedsCount: 2,
    size: "480 sq ft",
    price: 5499,
    priceFormatted: "₹5,499",
    featured: true,
    image: "/assets/images/mkt-room-suite.png",
    gallery: [
      "/assets/images/mkt-room-suite.png",
      "/assets/images/mkt-waiting-lounge.png",
      "/assets/images/mkt-room-family.png",
      "/assets/images/mkt-bathroom-wc.png",
      "/assets/images/mkt-bathroom-vanity.png"
    ],
    amenities: [
      "Air Conditioning",
      "Free WiFi",
      "Smart Television",
      "Attached Luxury Bathroom",
      "Separate Living Lounge",
      "Coffee Table & Sofa",
      "Complimentary Water",
      "Daily Housekeeping",
      "Premium Toiletries"
    ],
    overview: "Our premier accommodation at MKT Shanthi Nivas. The Suite Room combines a lavish master bedroom with an attached living and receiving salon. Embellished with deep teal upholstery, gold accents, marble-finish flooring, and supreme acoustic insulation for deep rest after pilgrimage rituals.",
    policies: [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Government photo ID required at check-in",
      "Complimentary welcome beverage on arrival",
      "Non-smoking luxury environment"
    ]
  }
];

export const destinationsData = [
  {
    id: "temple",
    name: "Ramanathaswamy Temple",
    distance: "300 meters (4 min walk)",
    image: "/assets/images/hero-temple.jpg",
    tagline: "Sacred Jyotirlinga & Iconic 1000-Pillar Hall",
    description: "One of the 12 sacred Jyotirlinga temples in India, renowned for having the longest corridor of intricately carved stone pillars in the world and 22 holy theerthams (water wells) where pilgrims take ritual purification baths."
  },
  {
    id: "pamban",
    name: "Pamban Bridge",
    distance: "11 km (18 min drive)",
    image: "/assets/images/pamban-bridge.jpg",
    tagline: "Engineering Marvel Over Azure Ocean Waters",
    description: "India's iconic century-old cantilever railway sea bridge that connects the mainland of Mandapam with the island of Rameswaram, offering breathtaking ocean views of the Palk Strait."
  },
  {
    id: "dhanushkodi",
    name: "Dhanushkodi Beach & Ghost Town",
    distance: "18 km (25 min drive)",
    image: "/assets/images/dhanushkodi.jpg",
    tagline: "Where the Bay of Bengal Meets the Indian Ocean",
    description: "The mystical tip of Rameswaram Island where Rama built the Ram Setu bridge to Lanka. Enjoy pristine sandbars, turquoise waters, the ancient church ruins, and tranquil sea breezes."
  }
];

export const diningData = {
  title: "Pure Vegetarian Dining",
  tagline: "Satvik, wholesome, and authentic flavors prepared with love and hygiene",
  description: "Enjoy delicious and hygienic vegetarian meals prepared with fresh ingredients. Our dining area offers a comfortable and peaceful ambiance for families and pilgrim groups visiting Rameswaram.",
  features: [
    { title: "Pure Vegetarian Kitchen", desc: "Strictly vegetarian culinary practice adhering to religious sentiments." },
    { title: "Fresh Local Ingredients", desc: "Locally sourced grains, authentic spices, and crisp vegetables." },
    { title: "Filter Coffee & Tiffins", desc: "Piping hot South Indian filter coffee with crispy dosas and fluffy idlis." },
    { title: "Hygienic Family Dining", desc: "Spacious, air-conditioned seating suitable for large yatra groups." }
  ],
  gallery: [
    {
      id: "breakfast",
      title: "Traditional South Indian Breakfast",
      category: "Morning Tiffin",
      image: "/assets/images/dining-spread.jpg",
      description: "Golden roast masala dosa, steamed idlis, crunchy medu vada, accompanied by coconut, tomato, and mint chutneys with hot sambar."
    },
    {
      id: "thali",
      title: "Grand South Indian Vegetarian Thali",
      category: "Lunch & Dinner",
      image: "/assets/images/dining-thali.jpg",
      description: "Wholesome feast including hot steamed rice, aromatic sambar, rasam, kootu, vegetable poriyal, crisp appalam, fresh curd, and sweet payasam."
    },
    {
      id: "interior",
      title: "Air-Conditioned Dining Hall",
      category: "Ambiance",
      image: "/assets/images/restaurant-interior.jpg",
      description: "Warm wooden furnishings, pleasant ambient lighting, and welcoming hospitality catering to both quick meals and leisurely family dinners."
    }
  ]
};

export const testimonialsData = [
  {
    id: 1,
    name: "Suresh Kumar",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    comment: "Very clean rooms, convenient location near the temple, and helpful staff. Highly recommended for families visiting Rameswaram for the 22 Theertham baths and darshan."
  },
  {
    id: 2,
    name: "Rajeshwari & Family",
    location: "Bengaluru, Karnataka",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    comment: "We stayed in the Family Suite with my parents. The beds were remarkably comfortable, AC was silent, and the 24/7 hot water was essential for our early 4:30 AM temple darshan. Peaceful stay!"
  },
  {
    id: 3,
    name: "K. Venkatachalam",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    comment: "MKT Shanthi Nivas provides genuine hospitality. Middle Street location made it easy to reach both temple gates and local shops on foot without needing autos. The pure vegetarian breakfast was delicious."
  }
];

export const galleryItems = [
  { id: 1, title: "MKT Shanthi Nivas Exterior Facade", category: "Hotel & Reception", image: "/assets/images/mkt-exterior-day.png" },
  { id: 2, title: "Illuminated Golden Night Facade", category: "Hotel & Reception", image: "/assets/images/mkt-exterior-night.png" },
  { id: 3, title: "Grand Reception & Murugan Sanctum", category: "Hotel & Reception", image: "/assets/images/mkt-reception.png" },
  { id: 4, title: "Guest Waiting Lounge", category: "Hotel & Reception", image: "/assets/images/mkt-waiting-lounge.png" },
  { id: 5, title: "Polished Guest Floor Marble Corridor", category: "Hotel & Reception", image: "/assets/images/mkt-corridor.png" },
  { id: 6, title: "Deluxe King Bedroom with Ambient Glow", category: "Rooms", image: "/assets/images/mkt-room-deluxe.png" },
  { id: 7, title: "Executive Room Entrance & King Bed", category: "Rooms", image: "/assets/images/mkt-room-executive.png" },
  { id: 8, title: "Family Quad Suite Two Double Beds", category: "Rooms", image: "/assets/images/mkt-room-family.png" },
  { id: 9, title: "Signature Suite Swan Towel Art", category: "Rooms", image: "/assets/images/mkt-room-suite.png" },
  { id: 10, title: "Room Amenities, TV & Work Desk", category: "Rooms", image: "/assets/images/mkt-room-amenities.png" },
  { id: 11, title: "Full-Length Backlit Vanity Mirror", category: "Rooms", image: "/assets/images/mkt-room-mirror.png" },
  { id: 12, title: "Sparkling Restroom & Rain Shower", category: "Restrooms", image: "/assets/images/mkt-bathroom-shower.png" },
  { id: 13, title: "Granite Vanity with Smart Touch Mirror", category: "Restrooms", image: "/assets/images/mkt-bathroom-vanity.png" },
  { id: 14, title: "Modern Restroom with Wall-Hung WC", category: "Restrooms", image: "/assets/images/mkt-bathroom-wc.png" },
  { id: 15, title: "Traditional South Indian Breakfast Tiffin", category: "Dining", image: "/assets/images/dining-spread.jpg" },
  { id: 16, title: "Wholesome South Indian Vegetarian Thali", category: "Dining", image: "/assets/images/dining-thali.jpg" },
  { id: 17, title: "Vegetarian Dining Hall", category: "Dining", image: "/assets/images/restaurant-interior.jpg" },
  { id: 18, title: "Ramanathaswamy Temple at Dusk", category: "Nearby Places", image: "/assets/images/hero-temple.jpg" },
  { id: 19, title: "Iconic Pamban Cantilever Sea Bridge", category: "Nearby Places", image: "/assets/images/pamban-bridge.jpg" },
  { id: 20, title: "Dhanushkodi Coastal Sands & Beach", category: "Nearby Places", image: "/assets/images/dhanushkodi.jpg" }
];

export const faqData = [
  {
    q: "How far is MKT Shanthi Nivas from Ramanathaswamy Temple?",
    a: "We are located at 93 Middle Street, which is just about 250 to 300 meters from the Ramanathaswamy Temple — approximately a convenient 3-minute walking distance. You can easily walk to the temple gates without relying on transport."
  },
  {
    q: "Is 24-hour hot water available for early morning holy bath rituals?",
    a: "Yes, all our rooms are equipped with reliable 24/7 hot water facilities, allowing pilgrims to bathe comfortably before proceeding to Agni Theertham and the 22 Kundam holy theertham snanam."
  },
  {
    q: "What are your check-in and check-out timings?",
    a: "Our standard check-in time is 12:00 PM and check-out is 11:00 AM. Early check-in or late check-out is subject to room availability upon prior request."
  },
  {
    q: "Is pure vegetarian food available?",
    a: "Yes! We cater exclusively to vegetarian travelers and pilgrims with hygienic South Indian breakfast tiffins and traditional thali meals."
  },
  {
    q: "How can I book or enquire about room availability?",
    a: "You can book directly on this website using our availability checker, chat with us on WhatsApp at +91 83002 36666, or call our reception desk directly at 83002 36666 / 04573-223666 for immediate assistance."
  }
];
