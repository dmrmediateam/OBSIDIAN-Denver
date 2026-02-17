'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="(303) 555-1234"
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

      {/* Contrast Section */}
      <section className="contrast-section section">
        <div className="container">
          <div className="contrast-grid">
            <div className="contrast-column contrast-column-negative">
              <div className="contrast-header">
                <div className="contrast-icon contrast-icon-robot">🤖</div>
                <h3 className="contrast-title">The Algorithm Estimate</h3>
              </div>
              <ul className="contrast-list">
                <li className="contrast-item contrast-item-negative">
                  <span className="contrast-icon-x">✗</span>
                  <span>Uses county records that are 3-6 months old</span>
                </li>
                <li className="contrast-item contrast-item-negative">
                  <span className="contrast-icon-x">✗</span>
                  <span>Cannot see renovations, upgrades, or condition</span>
                </li>
                <li className="contrast-item contrast-item-negative">
                  <span className="contrast-icon-x">✗</span>
                  <span>Ignores micro-neighborhood pricing differences</span>
                </li>
                <li className="contrast-item contrast-item-negative">
                  <span className="contrast-icon-x">✗</span>
                  <span>Designed to capture your data, not give you accuracy</span>
                </li>
                <li className="contrast-item contrast-item-negative">
                  <span className="contrast-icon-x">✗</span>
                  <span>Error margin: up to 15% in Denver metro</span>
                </li>
              </ul>
            </div>
            <div className="contrast-column contrast-column-positive">
              <div className="contrast-header">
                <div className="contrast-icon contrast-icon-expert">👤</div>
                <h3 className="contrast-title">The Obsidian Valuation</h3>
              </div>
              <ul className="contrast-list">
                <li className="contrast-item contrast-item-positive">
                  <span className="contrast-icon-check">✓</span>
                  <span>Uses this week's closed and pending sales data</span>
                </li>
                <li className="contrast-item contrast-item-positive">
                  <span className="contrast-icon-check">✓</span>
                  <span>Factors in every upgrade, from kitchens to landscaping</span>
                </li>
                <li className="contrast-item contrast-item-positive">
                  <span className="contrast-icon-check">✓</span>
                  <span>Adjusted for your specific block and buyer demand</span>
                </li>
                <li className="contrast-item contrast-item-positive">
                  <span className="contrast-icon-check">✓</span>
                  <span>Prepared by hand by David & Dax, not a bot</span>
                </li>
                <li className="contrast-item contrast-item-positive">
                  <span className="contrast-icon-check">✓</span>
                  <span>Trusted by 400+ Denver homeowners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specificity-Driven Testimonials */}
      <section className="testimonials-section section">
        <div className="container">
          <h2 className="section-heading">Real Valuations, Real Results</h2>
          <div className="testimonials-grid-specificity">
            <div className="testimonial-card-large">
              <p className="testimonial-quote">
                "We did a luxury transaction with David and his team. We were pleased with his professionalism & calmness throughout the transaction. We would totally recommend Obsidian Denver to anyone looking to buy or sell a home!"
              </p>
              <p className="testimonial-author">Dae Jung</p>
              <p className="testimonial-context">Local Guide</p>
            </div>
            <div className="testimonial-card-large">
              <p className="testimonial-quote">
                "David has consistently gone above and beyond with the process of buying and selling our home. He was always quick to remediate any issues, always quick with responses to our questions and needs and gave us a clear understanding every step of the way."
              </p>
              <p className="testimonial-author">Rob Greenberg</p>
              <p className="testimonial-context">Denver</p>
            </div>
            <div className="testimonial-card-large">
              <p className="testimonial-quote">
                "David Heine is incredible! He helped us purchase our downtown Denver property and made the entire process seamless. His deep market knowledge, quick communication, and genuine care for our needs made us feel confident every step of the way."
              </p>
              <p className="testimonial-author">Chanell Cuellar</p>
              <p className="testimonial-context">Downtown Denver</p>
            </div>
            <div className="testimonial-card-large">
              <p className="testimonial-quote">
                "David was amazing helping us find our forever home! We looked for months and saw countless homes and never felt pressured or like we were an inconvenience. He had all the answers and the rare time he didn't, he found out for us!"
              </p>
              <p className="testimonial-author">Kelly Clendenin</p>
              <p className="testimonial-context">Local Guide</p>
            </div>
            <div className="testimonial-card-large">
              <p className="testimonial-quote">
                "I've been working with David for quite some time and was finally able to find my first home! He fought for me to get max seller credits and even got the seller to buy a home warranty for me!"
              </p>
              <p className="testimonial-author">Chris Burtschi</p>
              <p className="testimonial-context">First-Time Homebuyer</p>
            </div>
            <div className="testimonial-card-large">
              <p className="testimonial-quote">
                "David is my go to for anything real estate that I need or have questions on. I work with a lot of different real estate professionals and David is the best at getting the best deal for his clients."
              </p>
              <p className="testimonial-author">Nicholas Wanninger</p>
              <p className="testimonial-context">Local Guide</p>
            </div>
          </div>
        </div>
      </section>

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
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone-final"
                      name="phone"
                      className="form-input"
                      placeholder="(303) 555-1234"
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
    </main>
  );
}
