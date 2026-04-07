'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import SiteFooter from '../components/SiteFooter';
import './styles.css';

export default function HomeValuation() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formStep, setFormStep] = useState<'address' | 'contact'>('address');
  const [propertyAddress, setPropertyAddress] = useState('');

  const scrollToForm = () => {
    const formElement = document.getElementById('valuation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const addressValue = formData.get('address') as string;
    if (addressValue) {
      setPropertyAddress(addressValue);
      setFormStep('contact');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    
    // Parse address to extract city/zip if possible, otherwise use defaults
    const fullAddress = propertyAddress || (formData.get('address') as string);
    const addressParts = fullAddress.split(',').map(s => s.trim());
    const city = addressParts.length > 1 ? addressParts[addressParts.length - 2] : 'Denver';
    const zipMatch = fullAddress.match(/\b\d{5}\b/);
    const zip = zipMatch ? zipMatch[0] : '';

    const data = {
      address: addressParts[0] || fullAddress,
      city: city,
      zip: zip,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
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
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event: 'lead_form_submit' });
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

  return (
    <main className="home-valuation-page">
      {/* Hero Section */}
      <section className="hero-section section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-heading">
              Zillow Says Your Home Is Worth $X. They're Probably Off by $74,000.
            </h1>
            <p className="hero-subheadline">
              Online algorithms use stale data and can't see your new kitchen, your quiet street, or the three buyers competing for homes on your block right now. We can. Get a valuation built by Denver experts, not robots.
            </p>
            
            {/* Two-Step Form */}
            <div className="form-wrapper-top" id="valuation-form">
              <div className="form-content">
                {formStep === 'address' ? (
                  <form className="valuation-form-step1" onSubmit={handleAddressSubmit}>
                    <h2 className="form-heading">Get Your True Home Value</h2>
                    <div className="form-group">
                      <label htmlFor="address" className="form-label">
                        Enter Your Property Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-input form-input-large"
                        placeholder="123 Main Street, Denver, CO 80202"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="submit-button submit-button-large"
                    >
                      Unlock My Valuation
                    </button>
                  </form>
                ) : (
                  <form className="valuation-form" onSubmit={handleSubmit}>
                    <h2 className="form-heading">
                      We're pulling the records for <span className="address-highlight">{propertyAddress}</span>. Where should we send your private valuation report?
                    </h2>
                    <input type="hidden" name="address" value={propertyAddress} />
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Full Name *
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
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address *
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
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="(303) 555-1234"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send My Free Valuation'}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews — Elfsight Widget */}
      <section className="testimonials-section section">
        <div className="container">
          <h2 className="section-heading">Real Valuations, Real Results</h2>
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-6a8fddef-b305-41ad-b4b2-85906d6fbbe2" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* Denver Market Context Section */}
      <section className="market-context-section section">
        <div className="container">
          <h2 className="section-heading">How We Calculate Your Denver Home Value</h2>
          <div className="market-context-content">
            <p className="market-context-text">
              Denver&apos;s real estate market moves fast. Median home prices in the metro area sit around $550,000, but that number means nothing for your specific property. A Victorian bungalow in West Highland (80211) prices very differently than a mid-century ranch in Arvada, even if they have the same square footage.
            </p>
            <p className="market-context-text">
              Our valuation process goes beyond the automated estimates that Zillow, Redfin, and Realtor.com provide. We analyze six key factors that algorithms consistently miss:
            </p>
            <div className="valuation-factors-grid">
              <div className="factor-item">
                <h3 className="factor-title">Micro-Market Pricing</h3>
                <p className="factor-description">We compare your home to sales within a 3-block radius — not a zip code average. In neighborhoods like LoHi and West Highland, one block can mean a $50K price difference.</p>
              </div>
              <div className="factor-item">
                <h3 className="factor-title">Pending & Off-Market Data</h3>
                <p className="factor-description">Zillow only sees closed sales from weeks ago. We see what&apos;s under contract right now, giving us a real-time picture of buyer demand on your street.</p>
              </div>
              <div className="factor-item">
                <h3 className="factor-title">Renovation & Condition Assessment</h3>
                <p className="factor-description">Your new kitchen, finished basement, or updated bathrooms aren&apos;t visible to algorithms. We account for every improvement that adds value.</p>
              </div>
              <div className="factor-item">
                <h3 className="factor-title">Architectural Character Premium</h3>
                <p className="factor-description">Denver&apos;s Craftsman bungalows, Victorians, and mid-century homes command premiums that algorithms don&apos;t understand. We know how to price character.</p>
              </div>
              <div className="factor-item">
                <h3 className="factor-title">Seasonal Demand Patterns</h3>
                <p className="factor-description">Denver&apos;s market has distinct seasonal cycles. Spring and early summer drive premium pricing in family neighborhoods like Sloan&apos;s Lake and Washington Park.</p>
              </div>
              <div className="factor-item">
                <h3 className="factor-title">Buyer Competition Analysis</h3>
                <p className="factor-description">We track how many active buyers are competing for homes like yours right now — not last quarter. Multiple offers mean pricing power.</p>
              </div>
            </div>
            <p className="market-context-text market-context-highlight">
              The result? A defensible price backed by real data, local expertise, and 22+ combined years of Denver market experience — not a computer&apos;s best guess.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods We Serve */}
      <section className="neighborhoods-served-section section">
        <div className="container">
          <h2 className="section-heading">Denver Neighborhoods We Value Daily</h2>
          <p className="neighborhoods-intro">We prepare expert valuations across Denver&apos;s most sought-after neighborhoods. Our deep local knowledge means more accurate pricing for your home.</p>
          <div className="neighborhoods-tag-grid">
            {['West Highland', 'LoHi (Lower Highlands)', "Sloan's Lake", 'Highland', 'Berkeley', 'Sunnyside', 'Jefferson Park', 'Tennyson', 'Downtown Denver', 'Cherry Creek', 'Washington Park', 'Congress Park', 'RiNo', 'Baker', 'Platt Park', 'Arvada', 'Wheat Ridge', 'Golden', 'Lakewood'].map((n) => (
              <span key={n} className="neighborhood-tag">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions About Denver Home Valuations</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary className="faq-question">How accurate is Zillow&apos;s Zestimate for Denver homes?</summary>
              <p className="faq-answer">Zillow&apos;s own data shows a median error rate of 6.9% nationally. In Denver, where micro-neighborhoods like West Highland, LoHi, and Sloan&apos;s Lake have block-by-block price variations, the error can be even higher — up to 15% on unique architectural or historic properties. That&apos;s a $60,000–$90,000 swing on a $600,000 home.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">How long does it take to get my valuation?</summary>
              <p className="faq-answer">We typically deliver your personalized valuation within 24–48 hours. Unlike automated estimates, we manually review recent comparable sales, pending transactions, and condition factors specific to your property before providing a number.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">Is the valuation really free? What&apos;s the catch?</summary>
              <p className="faq-answer">There&apos;s no catch. The valuation is 100% free with no obligation. We provide it because informed homeowners make better decisions. If you decide to sell, we&apos;d love to be your team — but there&apos;s zero pressure.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">What&apos;s the difference between a home valuation and an appraisal?</summary>
              <p className="faq-answer">A home valuation is a market-based estimate of what your home would sell for today, prepared by a real estate expert using comparable sales, market conditions, and local knowledge. An appraisal is a formal assessment required by lenders during a mortgage process, performed by a licensed appraiser. Our valuation gives you a realistic selling price before you commit to anything.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">Which Denver neighborhoods do you cover?</summary>
              <p className="faq-answer">We cover all of Denver and the surrounding metro area, with deep expertise in West Highland, LoHi (Lower Highlands), Sloan&apos;s Lake, Highland, Berkeley, Sunnyside, RiNo, Cherry Creek, Washington Park, Downtown Denver, Arvada, Wheat Ridge, Golden, and Lakewood. If your home is in the Denver metro, we can value it.</p>
            </details>
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How accurate is Zillow's Zestimate for Denver homes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Zillow's own data shows a median error rate of 6.9% nationally. In Denver, where micro-neighborhoods like West Highland, LoHi, and Sloan's Lake have block-by-block price variations, the error can be even higher — up to 15% on unique architectural or historic properties. That's a $60,000–$90,000 swing on a $600,000 home.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to get my valuation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We typically deliver your personalized valuation within 24–48 hours. Unlike automated estimates, we manually review recent comparable sales, pending transactions, and condition factors specific to your property before providing a number.",
                },
              },
              {
                "@type": "Question",
                name: "Is the valuation really free? What's the catch?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "There's no catch. The valuation is 100% free with no obligation. We provide it because informed homeowners make better decisions. If you decide to sell, we'd love to be your team — but there's zero pressure.",
                },
              },
              {
                "@type": "Question",
                name: "What's the difference between a home valuation and an appraisal?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A home valuation is a market-based estimate of what your home would sell for today, prepared by a real estate expert using comparable sales, market conditions, and local knowledge. An appraisal is a formal assessment required by lenders during a mortgage process, performed by a licensed appraiser. Our valuation gives you a realistic selling price before you commit to anything.",
                },
              },
              {
                "@type": "Question",
                name: "Which Denver neighborhoods do you cover?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We cover all of Denver and the surrounding metro area, with deep expertise in West Highland, LoHi (Lower Highlands), Sloan's Lake, Highland, Berkeley, Sunnyside, RiNo, Cherry Creek, Washington Park, Downtown Denver, Arvada, Wheat Ridge, Golden, and Lakewood.",
                },
              },
            ],
          }),
        }}
      />

      {/* Authority Section */}
      <section className="authority-section section">
        <div className="container">
          <h2 className="section-heading">Your Valuation Is Prepared by Denver's Most Trusted Team</h2>
          <div className="authority-content">
            <p className="authority-text">
              David & Dax have prepared over 400 expert valuations for Denver homeowners across West Highland, LoHi, Sloan's Lake, Wash Park, and surrounding neighborhoods. With 22+ combined years of Denver real estate experience and a deep understanding of micro-market dynamics, they don't rely on algorithms—they rely on real data, real expertise, and real results.
            </p>
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
                <p className="team-bio">
                  12+ years of Denver real estate experience. 400+ successful transactions. Specializes in architectural and historic homes across West Highland, LoHi, and Sloan's Lake.
                </p>
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
                <p className="team-bio">
                  10+ years serving Denver homeowners. 350+ transactions. Known for exceptional market analysis and accurate pricing strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section (Loss Aversion) */}
      <section className="loss-aversion-section section">
        <div className="container">
          <h2 className="section-heading">Most Homeowners Only Price Their Home Once. Getting It Wrong Costs Tens of Thousands.</h2>
          <div className="loss-content">
            <p className="loss-paragraph">
              Price your home too high, and it sits on the market. Every week it sits, buyers wonder what's wrong. Price reductions signal desperation, and you end up selling for less than you could have gotten with the right price from day one.
            </p>
            <p className="loss-paragraph">
              Price it too low, and you leave money on the table permanently. That first offer might feel like a win, but if you underpriced by $30,000, that's $30,000 you'll never see again. There's no "do-over" in real estate.
            </p>
            <p className="loss-paragraph">
              Most homeowners rely on Zillow or Redfin estimates, which are wrong 15% of the time in Denver. On a $600,000 home, that's a $90,000 margin of error. Get it wrong, and you're either stuck with a home that won't sell or walking away from tens of thousands of dollars.
            </p>
            <p className="loss-cta">
              A 15-minute valuation from our team can be the difference between a $50,000 mistake and a confident, profitable sale.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="how-it-works-section section">
        <div className="container">
          <h2 className="section-heading">Your Home Valuation in 3 Simple Steps</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Submit Your Address</h3>
              <p className="step-description">
                Tell us where your home is. That's all we need to start.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3 className="step-title">We Analyze Everything</h3>
              <p className="step-description">
                We review this week's sales, your specific block, condition factors, and real buyer demand. No averages. No shortcuts.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3 className="step-title">You Get a Defensible Number</h3>
              <p className="step-description">
                A valuation you can trust, whether you're selling tomorrow or just want to know.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section section">
        <div className="container">
          <h2 className="final-cta-heading">Your Home's True Value Is One Address Away.</h2>
          <div className="final-cta-form-wrapper">
            <div className="form-content form-content-compact">
              {formStep === 'address' ? (
                <form className="valuation-form-step1" onSubmit={handleAddressSubmit}>
                  <div className="form-group">
                    <label htmlFor="address-final" className="form-label">
                      Enter Your Property Address
                    </label>
                    <input
                      type="text"
                      id="address-final"
                      name="address"
                      className="form-input form-input-large"
                      placeholder="123 Main Street, Denver, CO 80202"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit-button submit-button-large"
                  >
                    Unlock My Valuation
                  </button>
                </form>
              ) : (
                <form className="valuation-form" onSubmit={handleSubmit}>
                  <h2 className="form-heading form-heading-compact">
                    We're pulling the records for <span className="address-highlight">{propertyAddress}</span>. Where should we send your private valuation report?
                  </h2>
                  <input type="hidden" name="address" value={propertyAddress} />
                  <div className="form-group">
                    <label htmlFor="name-final" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name-final"
                      name="name"
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-final" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email-final"
                      name="email"
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone-final" className="form-label">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone-final"
                      name="phone"
                      className="form-input"
                      placeholder="(303) 555-1234"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send My Free Valuation'}
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Rating Badge */}
      <div className="rating-badge">
        <div className="rating-content">
          <div className="rating-stars">★★★★★</div>
          <div className="rating-text">5-Star Rated on</div>
          <div className="rating-platforms">Zillow & Google</div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
