import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from '../../components/Logo';
import '../../styles/admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    if (localStorage.getItem('mkt_admin_logged_in') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Verification against requested admin credentials
    if (email.trim().toLowerCase() === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('mkt_admin_logged_in', 'true');
      localStorage.setItem('mkt_admin_email', email);
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin@gmail.com / admin123');
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@gmail.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
            <Logo />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--dark)', marginTop: '0.5rem' }}>
            Management Portal
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Sign in to manage bookings and guest enquiries
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={18} style={{ position: 'absolute', left: '0.85rem', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                className="input-control" 
                style={{ paddingLeft: '2.5rem' }}
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} style={{ position: 'absolute', left: '0.85rem', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="input-control" 
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Quick fill helper */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Demo: admin@gmail.com / admin123</span>
            <button 
              type="button" 
              onClick={handleQuickFill}
              style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}
            >
              Fill Credentials
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '0.5rem' }}>
            <ShieldCheck size={18} />
            Sign In to Dashboard
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowLeft size={14} /> Back to MKT Shanthi Nivas Website
          </Link>
        </div>
      </div>
    </div>
  );
}
