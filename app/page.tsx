'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './globals.css';

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      address: formData.get('address'),
      city: formData.get('city'),
      zip: formData.get('zip'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
    };

    try {
      const response = await fetch('/api/submit-valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/thank-you');
      } else {
        setSubmitStatus('error');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('valuation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="home-page">
      {/* Hero Section with Video Background */}
      <section className="hero-video-section">
        <div className="hero-video-wrapper">
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/Videos/denver-colorado-us-downtown-denver-colorado-trai-2025-12-18-01-02-38-utc.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            Architectural + Historic Home Specialists
          </div>
          
          <h1 className="hero-heading">
            Denver Real Estate for Distinctive Homes
          </h1>
          
          <p className="hero-subheadline">
            A boutique team specializing in architectural, historic, and luxury properties across West Highland, LoHi, and Sloan's Lake with tailored strategy and deep local market knowledge.
          </p>
          
          <div className="hero-ctas">
            <button 
              className="cta-primary"
              onClick={() => router.push('/home-valuation')}
            >
              Book a Seller Strategy Call
            </button>
            <button 
              className="cta-secondary"
              onClick={scrollToForm}
            >
              Get Curated Listings
            </button>
          </div>
          
          <p className="hero-trust-line">
            KW Urban Elite • Denver (80211) • West Highland • LoHi • Sloan's Lake
          </p>
          
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="valuation-form" className="home-valuation-form-section">
        <div className="form-content">
          <h2 className="form-heading">Find Out What Your Home Is Really Worth</h2>
          
          <form className="valuation-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-input"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-input"
                  placeholder="Denver"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="zip" className="form-label">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className="form-input"
                  placeholder="80202"
                  pattern="[0-9]{5}"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="(303) 555-1234"
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Get My Accurate Home Value'}
            </button>
            
            {submitStatus === 'error' && (
              <p className="form-error-message">
                There was an error submitting your request. Please try again or contact us directly.
              </p>
            )}
            
            <p className="trust-microcopy">
              No spam. No pressure. Your valuation is prepared personally by a Denver real estate expert.
            </p>
          </form>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="home-team-section">
        <div className="container">
          <h2 className="section-heading">Meet Your Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-image-wrapper">
                <Image 
                  src="/KWUE_3 (1).jpg" 
                  alt="David" 
                  width={320}
                  height={320}
                  className="team-image"
                  priority
                />
              </div>
              <h3 className="team-name">David</h3>
              <p className="team-title">Co-Founder & Real Estate Expert</p>
            </div>
            <div className="team-member">
              <div className="team-image-wrapper">
                <Image 
                  src="/JHP_0162_S (1).jpg" 
                  alt="Dax" 
                  width={320}
                  height={320}
                  className="team-image"
                  priority
                />
              </div>
              <h3 className="team-name">Dax</h3>
              <p className="team-title">Co-Founder & Real Estate Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="home-reviews-section">
        <div className="container">
          <h2 className="section-heading">What Our Clients Say</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <p className="review-quote">
                "David and Dax are amazing! They are trustworthy and really know the industry inside and out. You are in great hands with Obsidian."
              </p>
              <p className="review-author">Misty Forde</p>
            </div>
            <div className="review-card">
              <p className="review-quote">
                "David was there for everything I needed! Great business. 10/10 recommend."
              </p>
              <p className="review-author">Kyle Rupert</p>
            </div>
            <div className="review-card">
              <p className="review-quote">
                "As a first-time homebuyer, I was nervous, but David made it feel manageable every step of the way. He worked relentlessly for my family."
              </p>
              <p className="review-author">Kyle Boten</p>
            </div>
            <div className="review-card">
              <p className="review-quote">
                "We truly didn't think buying was possible for us, but David fought hard and worked tirelessly to make it happen."
              </p>
              <p className="review-author">Kelly Boten</p>
            </div>
            <div className="review-card">
              <p className="review-quote">
                "Dax helped me find my home in Arvada. Knowledgeable, great negotiator, and very communicative."
              </p>
              <p className="review-author">Daisy Galo</p>
            </div>
            <div className="review-card">
              <p className="review-quote">
                "Looking to buy a home? LOOK NO FURTHER. Our move to Denver was seamless and thorough."
              </p>
              <p className="review-author">Juan Cuellar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="home-companies-section">
        <div className="container">
          <h2 className="section-heading">Helped Relocate Employees From</h2>
          <p className="companies-subheading">Trusted by leading companies in Denver</p>
          <div className="companies-grid">
            <div className="company-logo-item">
              <Image 
                src="/Google_2015_logo.svg.webp" 
                alt="Google" 
                width={150}
                height={80}
                className="company-logo"
              />
            </div>
            <div className="company-logo-item">
              <Image 
                src="/Lockheed_Martin_logo_(2011–2022).svg.png" 
                alt="Lockheed Martin" 
                width={150}
                height={80}
                className="company-logo"
              />
            </div>
            <div className="company-logo-item">
              <Image 
                src="/Niagara-logo-color@2x.png" 
                alt="Niagara" 
                width={150}
                height={80}
                className="company-logo"
              />
            </div>
            <div className="company-logo-item">
              <Image 
                src="/rbc_wealth_management_logo.jpeg" 
                alt="RBC Wealth Management" 
                width={150}
                height={80}
                className="company-logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3 className="footer-brand">Obsidian Denver</h3>
              <p className="footer-address">
                4045 N Pecos St #201<br />
                Denver, CO 80211, United States
              </p>
              <p className="footer-phone">
                <a href="tel:+17207066768">+1 720-706-6768</a>
              </p>
            </div>
            <div className="footer-links">
              <a href="/home-valuation" className="footer-link">Home Valuation</a>
              <a href="/moving" className="footer-link">Moving to Denver</a>
              <a href="/find-your-local-realtor" className="footer-link">Find Your Realtor</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Obsidian Denver. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
