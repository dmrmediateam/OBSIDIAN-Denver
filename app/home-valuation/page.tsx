'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function HomeValuation() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToForm = () => {
    const formElement = document.getElementById('valuation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
        // Redirect to thank-you page
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
      {/* Hero Section with Form */}
      <section className="hero-section section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-heading">
              Get Your True Denver Home Value - Not a Guess From an Algorithm
            </h1>
            <p className="hero-subheadline">
              A local, agent-built home valuation by David & Dax at Obsidian Denver - trusted by buyers, sellers, and Denver locals who want accuracy, not estimates.
            </p>
            
            {/* Primary CTA Form */}
            <div className="form-wrapper-top" id="valuation-form">
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
                  
                  {submitStatus === 'success' && (
                    <p className="form-success-message">
                      Thank you! Your request has been submitted successfully. We'll be in touch soon.
                    </p>
                  )}
                  
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
            </div>

            {/* Reviews Section - Below Form */}
            <div className="reviews-section-below">
              <h3 className="reviews-heading">What Our Clients Say</h3>
              <div className="reviews-scroll-container">
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "David and Dax are amazing! They are trustworthy and really know the industry inside and out. You are in great hands with Obsidian."
                  </p>
                  <p className="review-author">Misty Forde</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "David was there for everything I needed! Great business. 10/10 recommend."
                  </p>
                  <p className="review-author">Kyle Rupert</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "As a first-time homebuyer, I was nervous, but David made it feel manageable every step of the way. He worked relentlessly for my family."
                  </p>
                  <p className="review-author">Kyle Boten</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "We truly didn't think buying was possible for us, but David fought hard and worked tirelessly to make it happen."
                  </p>
                  <p className="review-author">Kelly Boten</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Dax helped me find my home in Arvada. Knowledgeable, great negotiator, and very communicative."
                  </p>
                  <p className="review-author">Daisy Galo</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Looking to buy a home? LOOK NO FURTHER. Our move to Denver was seamless and thorough."
                  </p>
                  <p className="review-author">Juan Cuellar</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Professional, efficient, and incredibly smooth to work with. 100% recommended."
                  </p>
                  <p className="review-author">Vanessa Sanchez</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "We did a luxury transaction with David and his team. We were pleased with his professionalism and calmness throughout the process."
                  </p>
                  <p className="review-author">Dae Jung, Local Guide</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Whenever I transact with Obsidian, I know the deal will be handled with competence, professionalism, and integrity."
                  </p>
                  <p className="review-author">Porter Ergon, Local Guide</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Working with David & Dax is always filled with honesty, guidance, and support every step of the way."
                  </p>
                  <p className="review-author">Jessalynn Romero</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section section">
        <div className="container">
          <h2 className="section-heading">Why Online Home Valuations Are Often Wrong</h2>
          <div className="problem-content">
            <div className="problem-list">
              <h3 className="problem-subheading">Most "instant" home value tools:</h3>
              <ul className="problem-items">
                <li>Ignore street-by-street pricing differences</li>
                <li>Miss recent off-market and private sales</li>
                <li>Don't account for condition, upgrades, or demand shifts</li>
                <li>Are designed to sell your data - not give you clarity</li>
              </ul>
            </div>
            <div className="problem-consequences">
              <h3 className="problem-subheading">That's why homeowners are shocked when:</h3>
              <ul className="problem-items">
                <li>Their home sits on the market</li>
                <li>It sells below expectations</li>
                <li>Or buyers push back on price immediately</li>
              </ul>
              <p className="problem-conclusion">
                Bad data leads to bad decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authority + Guide Section */}
      <section className="authority-section section">
        <div className="container">
          <h2 className="section-heading">Meet Your Local Denver Valuation Experts</h2>
          <p className="authority-intro">
            When you request a valuation from Obsidian Denver, you're not getting a bot.
          </p>
          <p className="authority-main">
            You're getting David & Dax - Denver real estate professionals known for:
          </p>
          <ul className="authority-list">
            <li>Deep market knowledge</li>
            <li>Calm, professional negotiation</li>
            <li>Accurate pricing in competitive and luxury transactions</li>
          </ul>
          
          <div className="authority-testimonials">
            <div className="authority-quote">
              <p className="authority-text">
                "We did a luxury transaction with David and his team. We were pleased with his professionalism and calmness throughout the process."
              </p>
              <p className="authority-author">Dae Jung, Local Guide</p>
            </div>
            <div className="authority-quote">
              <p className="authority-text">
                "Whenever I transact with Obsidian, I know the deal will be handled with competence, professionalism, and integrity."
              </p>
              <p className="authority-author">Porter Ergon, Local Guide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Team Section */}
      <section className="team-section section">
        <div className="container">
          <h2 className="section-heading text-center">Meet Your Team</h2>
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

      {/* How It Works Section */}
      <section className="how-it-works-section section">
        <div className="container">
          <h2 className="section-heading">Your Home Valuation in 3 Simple Steps</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Submit Your Address</h3>
              <p className="step-description">
                Tell us where your home is located.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3 className="step-title">We Analyze It Manually</h3>
              <p className="step-description">
                We review recent Denver sales, neighborhood trends, condition factors, and buyer demand - not just averages.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3 className="step-title">You Get a Realistic, Defensible Value</h3>
              <p className="step-description">
                A number you can actually trust, whether you plan to sell now or later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heavy Social Proof Section */}
      <section className="social-proof-section section">
        <div className="container">
          <h2 className="section-heading">Denver Homeowners Trust Obsidian</h2>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <p className="testimonial-text">
                "David was there for everything I needed! Great business. 10/10 recommend."
              </p>
              <p className="testimonial-author">Kyle Rupert</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "As a first-time homebuyer, I was nervous, but David made it feel manageable every step of the way. He worked relentlessly for my family."
              </p>
              <p className="testimonial-author">Kyle Boten</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "We truly didn't think buying was possible for us, but David fought hard and worked tirelessly to make it happen."
              </p>
              <p className="testimonial-author">Kelly Boten</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "Dax helped me find my home in Arvada. Knowledgeable, great negotiator, and very communicative."
              </p>
              <p className="testimonial-author">Daisy Galo</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "Looking to buy a home? LOOK NO FURTHER. Our move to Denver was seamless and thorough."
              </p>
              <p className="testimonial-author">Juan Cuellar</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "Professional, efficient, and incredibly smooth to work with. 100% recommended."
              </p>
              <p className="testimonial-author">Vanessa Sanchez</p>
            </div>
          </div>
          <p className="social-proof-conclusion">
            This isn't hype.<br />
            This is repeatable trust, built transaction by transaction.
          </p>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="differentiation-section section">
        <div className="container">
          <h2 className="section-heading">Why This Valuation Is More Accurate</h2>
          <div className="differentiation-grid">
            <div className="differentiation-item">
              <h3 className="differentiation-title">Built by local Denver experts, not national averages</h3>
            </div>
            <div className="differentiation-item">
              <h3 className="differentiation-title">Adjusted for real buyer behavior, not list prices</h3>
            </div>
            <div className="differentiation-item">
              <h3 className="differentiation-title">Backed by real transactions, not marketing tools</h3>
            </div>
            <div className="differentiation-item">
              <h3 className="differentiation-title">Zero obligation to sell</h3>
            </div>
          </div>
          <p className="differentiation-conclusion">
            Most homeowners only price their home once.<br />
            Getting it wrong costs tens of thousands.
          </p>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="secondary-cta-section section">
        <div className="container">
          <h2 className="cta-heading">Find Out What Your Home Is Worth Today</h2>
          <button className="cta-button" onClick={scrollToForm}>
            Get My Accurate Home Value
          </button>
        </div>
      </section>

      {/* Risk Reversal / Trust Section */}
      <section className="risk-reversal-section section">
        <div className="container">
          <h2 className="section-heading">No Pressure. No Sales Games.</h2>
          <div className="risk-content">
            <p className="risk-intro">
              You're not committing to list.<br />
              You're not entering a sales funnel.
            </p>
            <p className="risk-main">
              You're simply getting clarity from professionals who:
            </p>
            <ul className="risk-list">
              <li>Respect your timing</li>
              <li>Value transparency</li>
              <li>Build long-term relationships</li>
            </ul>
            <div className="risk-testimonial">
              <p className="risk-text">
                "Working with David & Dax is always filled with honesty, guidance, and support every step of the way."
              </p>
              <p className="risk-author">Jessalynn Romero</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section section">
        <div className="container">
          <h2 className="final-cta-heading">Ready for a Real Answer?</h2>
          <p className="final-cta-subheading">
            If you own a home in Denver and want to know:
          </p>
          <ul className="final-cta-list">
            <li>What it would realistically sell for</li>
            <li>How today's market affects your value</li>
            <li>Whether waiting or acting makes sense</li>
          </ul>
          <p className="final-cta-start">Start here.</p>
          <button className="final-cta-button" onClick={scrollToForm}>
            Get My Accurate Home Valuation
          </button>
          <p className="final-cta-tagline">
            Prepared locally. Backed by trust. Built for real decisions.
          </p>
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
