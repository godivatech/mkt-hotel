import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
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

  const handleOpenBooking = (roomId = 'deluxe-queen-room', extraData = {}) => {
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
