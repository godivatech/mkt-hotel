import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Phone, Calendar, ArrowRight, PhoneCall, ChevronDown,
  Clock, MapPin, Car, Users, Ticket, Accessibility,
  CheckCircle2
} from 'lucide-react';
import { hotelInfo } from '../data/hotelData';
import { saveEnquiry } from '../services/firebase';

// Pixel-perfect custom SVG icons matching the reference image
const GopuramIcon = ({ size = 26, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v2" />
    <path d="M10 4h4" />
    <path d="M8 7h8" />
    <path d="M9 4l-2 3v13h10V7l-2-3" />
    <path d="M6 10h12" />
    <path d="M7 14h10" />
    <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
    <path d="M4 20h16" />
    <circle cx="12" cy="3" r="0.5" fill={color} />
  </svg>
);

const PalmTreeIcon = ({ size = 26, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M13 8c0-2.76-2.24-5-5-5 0 2.76 2.24 5 5 5z" />
    <path d="M13 8c2.76 0 5-2.24 5-5-2.76 0-5 2.24-5 5z" />
    <path d="M13 8c0 3-1.5 5.5-2 13" />
    <path d="M13 8c3 0 6 2 7 5-2.5 0-5.5-1.5-7-5z" />
    <path d="M13 8c-3 0-5.5 2-6.5 5 2.5 0 5-1.5 6.5-5z" />
    <path d="M6 21h12" />
  </svg>
);

const KalashIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="3" ry="1.5" />
    <path d="M9 5l-2-2m10 2l2-2" />
    <path d="M12 2v3" />
    <path d="M7.5 6.5h9c1 0 2 .8 2.5 2 1 2.5.5 6.5-2 9.5-1.2 1.5-3 2-5 2s-3.8-.5-5-2c-2.5-3-3-7-2-9.5.5-1.2 1.5-2 2.5-2z" />
    <path d="M7 11h10" />
    <path d="M9 20h6" />
  </svg>
);

const DiyaIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3c-1 2-2 3.5-2 5 0 1.1.9 2 2 2s2-.9 2-2c0-1.5-1-3-2-5z" fill={color} fillOpacity="0.25" />
    <path d="M12 3c-1 2-2 3.5-2 5 0 1.1.9 2 2 2s2-.9 2-2c0-1.5-1-3-2-5z" />
    <path d="M4 14c0 4 3.5 7 8 7s8-3 8-7c0-2-3-3-8-3s-8 1-8 3z" />
    <path d="M2 14c2 3 6 4 10 4s8-1 10-4" />
  </svg>
);

export default function Services() {
  const [activeTab, setActiveTab] = useState('temple');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    service: 'Temple Darshan Assistance'
  });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: '' });

    if (!formData.name || !formData.phone || !formData.date) {
      setFormStatus({ loading: false, success: false, error: 'Please fill all required fields.' });
      return;
    }

    try {
      const res = await saveEnquiry({
        ...formData,
        type: 'Service Enquiry',
        source: 'Services Page Form',
        createdAt: new Date().toISOString()
      });

      if (res && res.success) {
        setFormStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', phone: '', date: '', service: 'Temple Darshan Assistance' });
        setTimeout(() => setFormStatus(prev => ({ ...prev, success: false })), 6000);
      } else {
        setFormStatus({ loading: false, success: false, error: (res && res.error) || 'Failed to submit. Please call us directly.' });
      }
    } catch {
      setFormStatus({ loading: false, success: false, error: 'Error submitting enquiry. Please call us.' });
    }
  };

  const tabs = [
    { id: 'temple', label: 'Temple Services', icon: <GopuramIcon size={28} /> },
    { id: 'tour', label: 'Tour Packages', icon: <PalmTreeIcon size={28} /> },
    { id: 'ticket', label: 'Ticket Booking', icon: <Ticket size={26} /> },
    { id: 'transport', label: 'Transport Services', icon: <Car size={26} /> },
    { id: 'sightseeing', label: 'Local Sightseeing', icon: <MapPin size={26} /> },
    { id: 'guide', label: 'Tour Guide', icon: <Users size={26} /> },
    { id: 'assistance', label: 'Special Assistance', icon: <Accessibility size={26} /> }
  ];

  const helpCards = [
    {
      id: 'temple',
      title: 'Temple Darshan Assistance',
      icon: <GopuramIcon size={22} />,
      image: '/assets/images/services/card_temple.jpg',
      desc: 'Guidance for Ramanathaswamy Temple darshan, rituals and traditional procedures.'
    },
    {
      id: 'tour',
      title: 'Tour Packages',
      icon: <PalmTreeIcon size={22} />,
      image: '/assets/images/services/card_tour.jpg',
      desc: 'Customized tour packages to Rameswaram and nearby attractions for families and groups.'
    },
    {
      id: 'ticket',
      title: 'Ticket Booking',
      icon: <Ticket size={22} />,
      image: '/assets/images/services/card_train.jpg',
      desc: 'Assistance with train, bus and other ticket bookings for a hassle-free travel experience.'
    },
    {
      id: 'transport',
      title: 'Transport Services',
      icon: <Car size={22} />,
      image: '/assets/images/services/card_transport.jpg',
      desc: 'Car and van rental for local sightseeing and outstation trips with experienced drivers.'
    },
    {
      id: 'sightseeing',
      title: 'Local Sightseeing',
      icon: <MapPin size={22} />,
      image: '/assets/images/services/card_sightseeing.jpg',
      desc: 'Visit popular places like Dhanushkodi, Pamban Bridge, Agniatheertham and more.'
    },
    {
      id: 'guide',
      title: 'Tour Guide Services',
      icon: <Users size={22} />,
      image: '/assets/images/services/card_guide.jpg',
      desc: 'Experienced local guides to explain temple history, significance and nearby places.'
    }
  ];

  const popularPackages = [
    {
      id: 'pkg-temple',
      title: 'Rameswaram Temple Tour',
      image: '/assets/images/services/pkg_temple.jpg',
      meta: [
        { icon: <Clock size={14} />, text: 'Half Day' },
        { icon: <GopuramIcon size={14} />, text: 'Temple' },
        { icon: <Users size={14} />, text: 'Guide' }
      ]
    },
    {
      id: 'pkg-sightseeing',
      title: 'Rameswaram Sightseeing Tour',
      image: '/assets/images/services/pkg_sightseeing.jpg',
      meta: [
        { icon: <Clock size={14} />, text: 'Full Day' },
        { icon: <MapPin size={14} />, text: 'Multiple Places' },
        { icon: <Car size={14} />, text: 'Car' }
      ]
    },
    {
      id: 'pkg-dhanushkodi',
      title: 'Dhanushkodi Day Trip',
      image: '/assets/images/services/pkg_dhanushkodi.jpg',
      meta: [
        { icon: <Clock size={14} />, text: 'Full Day' },
        { icon: <MapPin size={14} />, text: 'Dhanushkodi' },
        { icon: <Car size={14} />, text: 'Car' }
      ]
    }
  ];

  return (
    <div className="services-exact-page">
      {/* 1. HERO SECTION */}
      <section className="services-exact-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-exact-container hero-layout-flex">
          {/* Left Hero Content */}
          <div className="hero-text-block">
            <span className="services-eyebrow-hero">OUR SERVICES</span>
            <h1 className="services-hero-heading">
              Explore Rameswaram<br />with Complete Support
            </h1>
            <p className="services-hero-desc">
              From temple darshan to local sightseeing, we help you plan a comfortable and memorable journey.
            </p>
            <nav className="services-breadcrumb-exact" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-current">Services</span>
            </nav>
          </div>

          {/* Right Floating Form Card */}
          <div className="hero-form-wrapper">
            <div className="exact-plan-card">
              <h3 className="plan-card-title">Plan Your Visit</h3>
              <p className="plan-card-subtitle">
                Get assistance with temple darshan, tours, tickets and local travel.
              </p>

              <form onSubmit={handleEnquirySubmit} className="plan-card-form">
                <div className="field-group">
                  <User size={18} className="field-icon-left" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="field-group">
                  <Phone size={18} className="field-icon-left" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="field-group">
                  <Calendar size={18} className="field-icon-left" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="field-group select-field-group">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                  >
                    <option value="Temple Darshan Assistance">Service Interested In</option>
                    <option value="Temple Darshan Assistance">Temple Darshan Assistance</option>
                    <option value="Tour Packages">Tour Packages</option>
                    <option value="Ticket Booking">Ticket Booking</option>
                    <option value="Transport Services">Transport Services</option>
                    <option value="Local Sightseeing">Local Sightseeing</option>
                    <option value="Tour Guide Services">Tour Guide Services</option>
                    <option value="Special Assistance">Special Assistance</option>
                  </select>
                  <ChevronDown size={18} className="field-icon-right" />
                </div>

                {formStatus.error && (
                  <div className="form-feedback-error">{formStatus.error}</div>
                )}
                {formStatus.success && (
                  <div className="form-feedback-success">
                    <CheckCircle2 size={16} /> Enquiry received! We will call you shortly.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-send-enquiry"
                  disabled={formStatus.loading}
                >
                  {formStatus.loading ? 'Sending...' : 'Send Enquiry'} <ArrowRight size={18} />
                </button>
              </form>

              {/* Immediate Assistance Box */}
              <div className="immediate-support-box">
                <div className="support-badge-icon">
                  <PhoneCall size={22} />
                </div>
                <div className="support-details">
                  <span className="support-heading-text">Need Immediate Assistance?</span>
                  <a href="tel:09442049359" className="support-main-phone">094420 49359</a>
                  <span className="support-sub-text">Call us for quick support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING TABS BAR */}
      <section className="services-tabs-shelf">
        <div className="services-exact-container">
          <div className="tabs-shelf-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`shelf-tab-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="tab-icon-wrap">{tab.icon}</div>
                <span className="tab-label-text">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW WE CAN HELP YOU */}
      <section className="how-help-section">
        <div className="services-exact-container">
          <div className="help-section-header">
            <div className="help-title-col">
              <span className="eyebrow-accent">OUR SERVICES</span>
              <h2 className="help-main-title">How We Can Help You</h2>
            </div>
            <div className="help-desc-col">
              <p className="help-desc-text">
                We offer a range of services to make your Rameswaram trip easy, comfortable and spiritually fulfilling. From temple darshan to sightseeing, everything is arranged for you with care and local expertise.
              </p>
            </div>
          </div>

          {/* 6 Cards Grid */}
          <div className="services-six-grid">
            {helpCards.map((card) => (
              <div className="service-micro-card" key={card.id}>
                <div className="micro-card-media">
                  <img src={card.image} alt={card.title} loading="lazy" />
                </div>
                <div className="micro-card-body">
                  <div className="micro-card-header">
                    <span className="micro-header-icon">{card.icon}</span>
                    <h4 className="micro-header-title">{card.title}</h4>
                  </div>
                  <p className="micro-card-desc">{card.desc}</p>
                  <Link to="/contact" className="micro-card-link">
                    Know More <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEMPLE GUIDANCE & POPULAR PACKAGES (SPLIT ROW) */}
      <section className="guidance-packages-split-section">
        <div className="services-exact-container split-layout-grid">
          {/* Left: Temple Guidance Banner Card */}
          <div className="temple-guidance-card">
            <div className="guidance-image-side">
              <img
                src="/assets/images/services/guidance_temple.jpg"
                alt="Ramanathaswamy Temple Gopuram"
              />
            </div>
            <div className="guidance-content-side">
              {/* Background temple watermark */}
              <div className="guidance-watermark-bg" aria-hidden="true">
                <svg width="260" height="280" viewBox="0 0 100 120" fill="none" stroke="#d5b98a" strokeWidth="0.8" opacity="0.22">
                  <path d="M50 10 L48 20 L52 20 Z" />
                  <path d="M44 20 L56 20 L58 35 L42 35 Z" />
                  <path d="M38 35 L62 35 L65 55 L35 55 Z" />
                  <path d="M32 55 L68 55 L72 80 L28 80 Z" />
                  <path d="M25 80 L75 80 L79 110 L21 110 Z" />
                  <path d="M43 110 L43 95 A7 7 0 0 1 57 95 L57 110" />
                  <line x1="20" y1="110" x2="80" y2="110" />
                </svg>
              </div>

              <div className="guidance-header-text">
                <span className="eyebrow-accent">TEMPLE GUIDANCE</span>
                <h3 className="guidance-title">Ramanathaswamy Temple Darshan</h3>
                <p className="guidance-paragraph">
                  Get complete guidance for Ramanathaswamy Temple darshan, including information on rituals, timings, dress code and important guidelines. Our team will assist you in planning a smooth and peaceful visit.
                </p>
              </div>

              {/* 4 Feature Items */}
              <div className="guidance-features-row">
                <div className="g-item">
                  <div className="g-icon-circle">
                    <GopuramIcon size={26} color="#475569" />
                  </div>
                  <span className="g-item-label">Darshan<br />Guidance</span>
                </div>
                <div className="g-item">
                  <div className="g-icon-circle">
                    <KalashIcon size={26} color="#475569" />
                  </div>
                  <span className="g-item-label">Ritual<br />Information</span>
                </div>
                <div className="g-item">
                  <div className="g-icon-circle">
                    <Clock size={24} color="#475569" />
                  </div>
                  <span className="g-item-label">Timings &amp;<br />Dress Code</span>
                </div>
                <div className="g-item">
                  <div className="g-icon-circle">
                    <DiyaIcon size={26} color="#475569" />
                  </div>
                  <span className="g-item-label">Special Pooja<br />Assistance</span>
                </div>
              </div>

              <div className="guidance-btn-wrap">
                <a href={`tel:${hotelInfo.phone}`} className="btn-guidance-gold">
                  Get Guidance <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Popular Tour Packages */}
          <div className="popular-packages-container">
            <div className="popular-packages-top">
              <div className="popular-heading-col">
                <span className="eyebrow-packages">POPULAR TOUR PACKAGES</span>
                <h3 className="popular-title">Popular Rameswaram Packages</h3>
              </div>
            </div>

            <div className="popular-cards-row">
              {popularPackages.map((pkg) => (
                <div className="mini-pkg-card" key={pkg.id}>
                  <div className="mini-pkg-media">
                    <img src={pkg.image} alt={pkg.title} />
                  </div>
                  <div className="mini-pkg-body">
                    <h4 className="mini-pkg-title" title={pkg.title}>{pkg.title}</h4>
                    <div className="mini-pkg-meta-row">
                      {pkg.meta.map((m, idx) => (
                        <span key={idx} className="meta-badge">
                          {m.icon}
                          <span>{m.text}</span>
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="btn-enquire-teal"
                      onClick={() => window.location.href = `tel:${hotelInfo.phone}`}
                    >
                      Enquire Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="services-bottom-cta-exact">
        <div className="services-exact-container">
          <div className="cta-banner-card">
            <div className="cta-banner-overlay"></div>
            <div className="cta-banner-content">
              <div className="cta-copy-side">
                <h2 className="cta-banner-heading">Plan Your Rameswaram Journey</h2>
                <p className="cta-banner-sub">
                  Let us take care of your temple darshan, travel arrangements and local sightseeing.<br className="cta-sub-break" />
                  Contact us for customized packages and assistance.
                </p>
              </div>
              <div className="cta-btn-side">
                <Link to="/contact" className="btn-contact-gold">
                  Contact Us <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
