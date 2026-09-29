import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Coffee, Leaf, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { diningData, hotelInfo } from '../data/hotelData';

export default function Dining({ onOpenBooking }) {
  return (
    <main>
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <img 
          src="/assets/images/restaurant-interior.jpg" 
          alt="MKT Shanthi Nivas Vegetarian Restaurant Dining" 
          className="page-hero-backdrop"
        />
        <div className="container page-hero-content">
          <span className="hero-eyebrow" style={{ color: '#F8D8A8' }}>AUTHENTIC SATVIK CULINARY TRADITION</span>
          <h1 className="page-hero-title">Dining at {hotelInfo.name}</h1>
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Dining</span>
          </nav>
        </div>
      </section>

      {/* Pure Vegetarian Dining Editorial (Blueprint 5) */}
      <section className="section-spacing">
        <div className="container">
          <div className="section-header flex-between" style={{ marginBottom: '2.5rem' }}>
            <div>
              <span className="eyebrow">HYGIENIC & WHOLESOME</span>
              <h2 className="section-title">{diningData.title}</h2>
              <p className="section-subtitle">{diningData.description}</p>
            </div>
            <div>
              <span className="badge badge-teal" style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}>
                <Leaf size={15} /> 100% Pure Vegetarian
              </span>
            </div>
          </div>

          {/* Dining Cards Grid (Blueprint 5) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {diningData.gallery.map((item) => (
              <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ aspectRatio: '16/11', overflow: 'hidden' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span className="eyebrow" style={{ fontSize: '0.72rem', marginBottom: '0.35rem' }}>{item.category}</span>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: 'auto' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dining Features 4-Grid */}
          <div style={{
            backgroundColor: 'var(--surface-alt)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
            {diningData.features.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700 }}>
                  <Leaf size={18} />
                  <span>{feat.title}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Specialties */}
      <section className="section-spacing-sm" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <SectionHeading 
            eyebrow="TASTE OF TAMIL NADU"
            title="Pilgrim Comfort Delicacies"
            subtitle="Wholesome nourishment prepared strictly in compliance with spiritual and dietary preferences."
            center={true}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <Coffee size={20} color="var(--primary)" />
                <h4 style={{ fontSize: '1.1rem' }}>Degree Filter Coffee</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Freshly brewed chicory-infused South Indian filter coffee in brass dabara sets to invigorate early mornings.
              </p>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <Utensils size={20} color="var(--primary)" />
                <h4 style={{ fontSize: '1.1rem' }}>Ghee Roast Crispy Dosas</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Golden fermented rice and lentil crepes drizzled with pure aromatic desi ghee, served with coconut and tomato chutneys.
              </p>
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <ShieldCheck size={20} color="var(--primary)" />
                <h4 style={{ fontSize: '1.1rem' }}>Satvik Temple Thali</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Pure vegetarian midday meal with freshly ground rasam, sambar, seasonal vegetable poriyals, curd, and warm payasam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
