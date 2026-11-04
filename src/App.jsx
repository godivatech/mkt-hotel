import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import WelcomeVideoModal from './components/WelcomeVideoModal';
import VideoReplayButton from './components/VideoReplayButton';
import WhatsAppWidget from './components/WhatsAppWidget';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import About from './pages/About';
// import Dining from './pages/Dining';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import BookingFlow from './pages/BookingFlow';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Auto-open video popup whenever the site opens or is refreshed
  useEffect(() => {
    if (isAdminRoute) return;

    // Clear any previous session suppression so refresh always shows the popup
    sessionStorage.removeItem('mkt_welcome_video_shown');

    const timer = setTimeout(() => {
      setVideoModalOpen(true);
    }, 750); // Clean 750ms delay for smooth page paint before popup appears

    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
  };

  const handleOpenVideoModal = () => {
    setVideoModalOpen(true);
  };

  const handleOpenBooking = (roomId = 'executive-double', extraData = {}) => {
    setBookingInitialData({ roomId, ...extraData });
    setBookingModalOpen(true);
  };

  const handleSearchBooking = (searchCriteria) => {
    const params = new URLSearchParams();
    if (searchCriteria.checkIn) params.set('checkIn', searchCriteria.checkIn);
    if (searchCriteria.checkOut) params.set('checkOut', searchCriteria.checkOut);
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className="site-wrapper">
      {!isAdminRoute && <Navbar onOpenBooking={() => handleOpenBooking()} />}

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onOpenBooking={handleOpenBooking} 
              onSearchBooking={handleSearchBooking} 
              onOpenVideoTour={handleOpenVideoModal}
            />
          } 
        />
        <Route 
          path="/rooms" 
          element={<Rooms onOpenBooking={handleOpenBooking} />} 
        />
        <Route 
          path="/rooms/:slug" 
          element={<RoomDetail onOpenBooking={handleOpenBooking} />} 
        />
        <Route 
          path="/about" 
          element={<About onOpenBooking={handleOpenBooking} />} 
        />
        {/* <Route 
          path="/dining" 
          element={<Dining onOpenBooking={handleOpenBooking} />} 
        /> */}
        <Route 
          path="/services" 
          element={<Services onOpenBooking={handleOpenBooking} />} 
        />
        <Route 
          path="/gallery" 
          element={<Gallery />} 
        />
        <Route 
          path="/contact" 
          element={<Contact />} 
        />
        <Route 
          path="/booking" 
          element={<BookingFlow />} 
        />

        {/* Management & Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {!isAdminRoute && <Footer onOpenBooking={() => handleOpenBooking()} />}

      {/* Global Booking Modal */}
      {!isAdminRoute && (
        <BookingModal 
          isOpen={bookingModalOpen} 
          onClose={() => setBookingModalOpen(false)} 
          initialData={bookingInitialData} 
        />
      )}

      {/* Welcome Video Popup Modal */}
      {!isAdminRoute && (
        <WelcomeVideoModal 
          isOpen={videoModalOpen} 
          onClose={handleCloseVideoModal} 
          onOpenBooking={() => handleOpenBooking()} 
          videoSrc="/assets/videos/1104.mp4" 
        />
      )}

      {/* Floating Replay Tour Button (bottom-left, balances WhatsApp widget) */}
      {!isAdminRoute && !videoModalOpen && (
        <VideoReplayButton onClick={handleOpenVideoModal} />
      )}

      {/* Floating WhatsApp Widget */}
      {!isAdminRoute && <WhatsAppWidget />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
