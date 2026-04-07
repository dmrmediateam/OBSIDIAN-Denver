'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import SiteFooter from './components/SiteFooter';
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
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="home-service-cards-section">
        <div className="container">
          <div className="service-cards-grid">
            <Link href="/home-valuation" className="service-card">
              <div className="service-card-image-wrapper">
                <Image
                  src="/new/aspen-metzger-K39ncY0WmDY-unsplash.jpg"
                  alt="Denver home exterior — get your free home valuation"
                  width={600}
                  height={400}
                  className="service-card-image"
                />
                <div className="service-card-overlay"></div>
              </div>
              <div className="service-card-content">
                <h3 className="service-card-title">Home Valuation</h3>
                <p className="service-card-description">Find out what your Denver home is really worth — from experts, not algorithms.</p>
                <span className="service-card-link">Get Your Valuation →</span>
              </div>
            </Link>
            <Link href="/find-your-local-realtor" className="service-card">
              <div className="service-card-image-wrapper">
                <Image
                  src="/new/sebastian-kurpiel-vAGFcyJN5B4-unsplash.jpg"
                  alt="Denver neighborhood street — find your local realtor"
                  width={600}
                  height={400}
                  className="service-card-image"
                />
                <div className="service-card-overlay"></div>
              </div>
              <div className="service-card-content">
                <h3 className="service-card-title">Find Your Realtor</h3>
                <p className="service-card-description">Get matched with a vetted, top-performing Denver agent in your neighborhood.</p>
                <span className="service-card-link">Get Matched →</span>
              </div>
            </Link>
            <Link href="/moving" className="service-card">
              <div className="service-card-image-wrapper">
                <Image
                  src="/new/jason-hawke--xm0FxM5Bfo-unsplash.jpg"
                  alt="Colorado mountains — relocating to Denver guide"
                  width={600}
                  height={400}
                  className="service-card-image"
                />
                <div className="service-card-overlay"></div>
              </div>
              <div className="service-card-content">
                <h3 className="service-card-title">Moving to Denver</h3>
                <p className="service-card-description">Relocating with family? We handle the housing so you can focus on the move.</p>
                <span className="service-card-link">Start Your Relocation →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Form + Team Combined Row */}
      <section id="valuation-form" className="home-form-team-section">
        <div className="form-team-row">
            {/* Form Column */}
            <div className="form-column">
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

            {/* Team Column */}
            <div className="team-column">
              <h2 className="team-column-heading">Meet Your Team</h2>
              <div className="team-column-members">
                <div className="team-member">
                  <a href="#reviews" className="team-image-link">
                    <div className="team-image-wrapper">
                      <Image 
                        src="/KWUE_3%20(1).webp" 
                        alt="David — Co-Founder of Obsidian Denver" 
                        width={320}
                        height={320}
                        className="team-image"
                        priority
                      />
                    </div>
                  </a>
                  <h3 className="team-name">David</h3>
                  <p className="team-title">Co-Founder & Real Estate Expert</p>
                </div>
                <div className="team-member">
                  <a href="#reviews" className="team-image-link">
                    <div className="team-image-wrapper">
                      <Image 
                        src="/JHP_0162_S%20(1).webp" 
                        alt="Dax — Co-Founder of Obsidian Denver" 
                        width={320}
                        height={320}
                        className="team-image"
                        priority
                      />
                    </div>
                  </a>
                  <h3 className="team-name">Dax</h3>
                  <p className="team-title">Co-Founder & Real Estate Expert</p>
                </div>
              </div>
              <p className="team-column-tagline">
                Architectural + Historic Home Specialists<br />
                KW Urban Elite · Denver (80211)
              </p>
            </div>
          </div>
      </section>

      {/* Reviews Section — Elfsight All-in-One Reviews | Dax+David + Obsidian */}
      <section id="reviews" className="home-reviews-section">
        <div className="container">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-6a8fddef-b305-41ad-b4b2-85906d6fbbe2" data-elfsight-app-lazy></div>
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
                src="/rbc_wealth_management_logo.webp" 
                alt="RBC Wealth Management" 
                width={150}
                height={80}
                className="company-logo"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
