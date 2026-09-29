import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, Calendar, Clock, DollarSign, MessageSquare, CheckCircle, XCircle, 
  Trash2, Phone, Search, LogOut, ExternalLink, RefreshCw, Filter, AlertCircle 
} from 'lucide-react';
import Logo from '../../components/Logo';
import { 
  subscribeToBookings, 
  subscribeToEnquiries, 
  updateBookingStatus, 
  deleteBooking, 
  updateEnquiryStatus, 
  deleteEnquiry 
} from '../../services/firebase';
import '../../styles/admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Simple auth gate
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('mkt_admin_logged_in') === 'true';
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'enquiries'
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [enquiryFilter, setEnquiryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    setLoading(true);
    const unsubBookings = subscribeToBookings(
      (data) => {
        setBookings(data);
        setLoading(false);
      },
      () => setLoading(false)
    );

    const unsubEnquiries = subscribeToEnquiries(
      (data) => {
        setEnquiries(data);
      }
    );

    return () => {
      if (unsubBookings) unsubBookings();
      if (unsubEnquiries) unsubEnquiries();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mkt_admin_logged_in');
    localStorage.removeItem('mkt_admin_email');
    navigate('/admin/login');
  };

  // Booking Actions
  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id);
    await updateBookingStatus(id, newStatus);
    setActionLoading(null);
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking record?')) {
      setActionLoading(id);
      await deleteBooking(id);
      setActionLoading(null);
    }
  };

  // Enquiry Actions
  const handleEnquiryStatus = async (id, newStatus) => {
    setActionLoading(id);
    await updateEnquiryStatus(id, newStatus);
    setActionLoading(null);
  };

  const handleDeleteEnquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry message?')) {
      setActionLoading(id);
      await deleteEnquiry(id);
      setActionLoading(null);
    }
  };

  // KPI calculations
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter(b => (b.status || 'pending') === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const totalEnquiriesCount = enquiries.length;
  const unreadEnquiriesCount = enquiries.filter(e => (e.status || 'unread') === 'unread').length;
  const totalRevenueEstimate = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const status = b.status || 'pending';
    if (bookingFilter !== 'all' && status !== bookingFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.guestName?.toLowerCase().includes(q);
      const matchPhone = b.guestPhone?.includes(q);
      const matchCode = b.bookingCode?.toLowerCase().includes(q);
      const matchRoom = b.roomName?.toLowerCase().includes(q);
      return matchName || matchPhone || matchCode || matchRoom;
    }
    return true;
  });

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(e => {
    const status = e.status || 'unread';
    if (enquiryFilter !== 'all' && status !== enquiryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = e.name?.toLowerCase().includes(q);
      const matchPhone = e.phone?.includes(q);
      const matchMsg = e.message?.toLowerCase().includes(q);
      return matchName || matchPhone || matchMsg;
    }
    return true;
  });

  return (
    <div className="admin-dashboard-wrapper">
      {/* Top Navbar */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <Logo />
          <span className="admin-badge">Management Portal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" target="_blank" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ExternalLink size={14} /> View Hotel Website
          </Link>
          <button 
            type="button" 
            onClick={handleLogout}
            className="btn btn-sm"
            style={{ backgroundColor: '#FEE2E2', color: '#991B1B', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {/* KPI Cards Grid */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-label">
              <span>Total Bookings</span>
              <Calendar size={16} color="var(--primary)" />
            </div>
            <div className="admin-stat-val">{totalBookingsCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered reservations</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">
              <span>Pending Action</span>
              <Clock size={16} color="#B45309" />
            </div>
            <div className="admin-stat-val" style={{ color: '#B45309' }}>{pendingCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Awaiting confirmation</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">
              <span>Confirmed</span>
              <CheckCircle size={16} color="#065F46" />
            </div>
            <div className="admin-stat-val" style={{ color: '#065F46' }}>{confirmedCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ready for check-in</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">
              <span>Guest Inquiries</span>
              <MessageSquare size={16} color="var(--secondary)" />
            </div>
            <div className="admin-stat-val">{totalEnquiriesCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{unreadEnquiriesCount} unread</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">
              <span>Estimated Value</span>
              <DollarSign size={16} color="var(--accent)" />
            </div>
            <div className="admin-stat-val" style={{ fontSize: '1.45rem', color: 'var(--primary)' }}>
              ₹{totalRevenueEstimate.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active booking revenue</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs-nav">
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('bookings'); setSearchQuery(''); }}
          >
            <Calendar size={18} />
            Room Bookings ({totalBookingsCount})
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => { setActiveTab('enquiries'); setSearchQuery(''); }}
          >
            <MessageSquare size={18} />
            Guest Inquiries ({totalEnquiriesCount})
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-control" 
              style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
              placeholder={activeTab === 'bookings' ? "Search guest, phone, booking code..." : "Search name, phone, message..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === 'bookings' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status:</span>
              {['all', 'pending', 'confirmed', 'cancelled'].map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setBookingFilter(st)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: bookingFilter === st ? 'var(--primary)' : 'var(--surface)',
                    color: bookingFilter === st ? '#fff' : 'var(--text)',
                    border: '1px solid var(--border)',
                    textTransform: 'capitalize'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status:</span>
              {['all', 'unread', 'replied'].map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setEnquiryFilter(st)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: enquiryFilter === st ? 'var(--primary)' : 'var(--surface)',
                    color: enquiryFilter === st ? '#fff' : 'var(--text)',
                    border: '1px solid var(--border)',
                    textTransform: 'capitalize'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab 1: Bookings List */}
        {activeTab === 'bookings' && (
          <div className="admin-table-container">
            {loading ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <RefreshCw size={28} className="spin" style={{ margin: '0 auto 0.75rem', animation: 'spin 1s linear infinite' }} />
                <p>Loading bookings from Firestore database...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Calendar size={42} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                <h4 style={{ color: 'var(--dark)', marginBottom: '0.25rem' }}>No Bookings Found</h4>
                <p style={{ fontSize: '0.88rem' }}>
                  {searchQuery || bookingFilter !== 'all' ? 'Try changing your search query or status filter.' : 'When guests submit reservations on the website, they will appear here in real-time.'}
                </p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref Code</th>
                    <th>Guest Details</th>
                    <th>Room Type</th>
                    <th>Stay Dates</th>
                    <th>Total Tariff</th>
                    <th>Status</th>
                    <th>Special Requests</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: 'var(--primary)' }}>
                          {b.bookingCode || 'MKT-AUTO'}
                        </span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {b.createdAtFormatted || 'Just now'}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{b.guestName || 'Unnamed Guest'}</div>
                        <a href={`tel:${b.guestPhone}`} style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <Phone size={12} /> {b.guestPhone || 'No phone'}
                        </a>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{b.roomName || 'Room'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.guestsCount || 2} Guests</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>
                          <strong>{b.checkIn}</strong> to <strong>{b.checkOut}</strong>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {b.nights || 1} {b.nights > 1 ? 'nights' : 'night'}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--dark)' }}>
                          ₹{(b.totalAmount || 0).toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pay at Hotel</div>
                      </td>
                      <td>
                        <span className={`status-badge ${b.status || 'pending'}`}>
                          {b.status || 'pending'}
                        </span>
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text)', whiteSpace: 'normal', lineClamp: 2 }}>
                          {b.specialRequests && b.specialRequests !== 'None' ? b.specialRequests : '—'}
                        </div>
                      </td>
                      <td>
                        <div className="action-btn-group">
                          {b.status !== 'confirmed' && (
                            <button
                              type="button"
                              className="icon-action-btn success"
                              title="Mark Confirmed"
                              onClick={() => handleStatusChange(b.id, 'confirmed')}
                              disabled={actionLoading === b.id}
                            >
                              <CheckCircle size={14} /> Confirm
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              type="button"
                              className="icon-action-btn danger"
                              title="Cancel Booking"
                              onClick={() => handleStatusChange(b.id, 'cancelled')}
                              disabled={actionLoading === b.id}
                            >
                              <XCircle size={14} /> Cancel
                            </button>
                          )}
                          <button
                            type="button"
                            className="icon-action-btn danger"
                            title="Delete Record"
                            onClick={() => handleDeleteBooking(b.id)}
                            disabled={actionLoading === b.id}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: Enquiries List */}
        {activeTab === 'enquiries' && (
          <div className="admin-table-container">
            {filteredEnquiries.length === 0 ? (
              <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <MessageSquare size={42} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                <h4 style={{ color: 'var(--dark)', marginBottom: '0.25rem' }}>No Inquiries Found</h4>
                <p style={{ fontSize: '0.88rem' }}>Messages submitted on the Contact page will appear here.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Guest Name</th>
                    <th>Phone</th>
                    <th>Travel Dates</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((e) => (
                    <tr key={e.id}>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {e.createdAtFormatted || 'Recent'}
                      </td>
                      <td style={{ fontWeight: 600 }}>{e.name}</td>
                      <td>
                        <a href={`tel:${e.phone}`} style={{ fontSize: '0.85rem', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <Phone size={12} /> {e.phone}
                        </a>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {e.dates || 'Not specified'}
                      </td>
                      <td style={{ maxWidth: '320px' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--dark)', whiteSpace: 'normal' }}>
                          {e.message}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${e.status || 'unread'}`}>
                          {e.status || 'unread'}
                        </span>
                      </td>
                      <td>
                        <div className="action-btn-group">
                          {e.status !== 'replied' ? (
                            <button
                              type="button"
                              className="icon-action-btn success"
                              onClick={() => handleEnquiryStatus(e.id, 'replied')}
                              disabled={actionLoading === e.id}
                            >
                              <CheckCircle size={14} /> Mark Replied
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="icon-action-btn"
                              onClick={() => handleEnquiryStatus(e.id, 'unread')}
                              disabled={actionLoading === e.id}
                            >
                              Mark Unread
                            </button>
                          )}
                          <button
                            type="button"
                            className="icon-action-btn danger"
                            onClick={() => handleDeleteEnquiry(e.id)}
                            disabled={actionLoading === e.id}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
