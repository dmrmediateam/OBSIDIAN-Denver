'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function FindYourLocalRealtor() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formStep, setFormStep] = useState<'neighborhood' | 'full'>('neighborhood');
  const [neighborhood, setNeighborhood] = useState('');

  const scrollToForm = () => {
    const formElement = document.getElementById('realtor-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNeighborhoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const neighborhoodValue = formData.get('neighborhood') as string;
    if (neighborhoodValue) {
      setNeighborhood(neighborhoodValue);
      setFormStep('full');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      location: neighborhood || formData.get('location'),
      timeline: formData.get('timeline'),
    };

    try {
      const response = await fetch('/api/submit-realtor', {
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
    <main className="realtor-page">
      {/* Hero Section */}
      <section className="hero-section section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-heading">
              Denver's Top Realtors Are in Demand. We Have 7 Matching Slots Left This Month.
            </h1>
            <p className="hero-subheadline">
              Join 350+ Denver families who skipped the guesswork and got matched with a vetted, top-performing agent through our exclusive process.
            </p>
            
            {/* Scarcity Bar */}
            <div className="scarcity-bar-container">
              <div className="scarcity-bar-label">February Availability</div>
              <div className="scarcity-bar">
                <div className="scarcity-bar-fill" style={{ width: '93%' }}></div>
              </div>
              <div className="scarcity-bar-text">Only 7 slots remaining</div>
            </div>
            
            {/* Above-the-Fold Form (Micro-Commitment Design) */}
            <div className="form-wrapper-top" id="realtor-form">
              <div className="form-content">
                {formStep === 'neighborhood' ? (
                  <form className="realtor-form-step1" onSubmit={handleNeighborhoodSubmit}>
                    <h2 className="form-heading">Check Availability in Your Neighborhood</h2>
                    <div className="form-group">
                      <label htmlFor="neighborhood" className="form-label">
                        What Denver neighborhood are you searching in?
                      </label>
                      <input
                        type="text"
                        id="neighborhood"
                        name="neighborhood"
                        className="form-input"
                        placeholder="Wash Park, Highlands, LoHi, Sloan's Lake..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="submit-button submit-button-large"
                    >
                      Check Availability
                    </button>
                  </form>
                ) : (
                  <form className="realtor-form" onSubmit={handleSubmit}>
                    <h2 className="form-heading">Claim Your Matching Spot</h2>
                    <input type="hidden" name="location" value={neighborhood} />
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
                    </div>

                    <div className="form-group">
                      <label htmlFor="timeline" className="form-label">
                        Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        className="form-input"
                        required
                      >
                        <option value="">Select timeline</option>
                        <option value="immediately">Immediately</option>
                        <option value="1-3-months">1-3 Months</option>
                        <option value="3-6-months">3-6 Months</option>
                        <option value="6-12-months">6+ Months</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Claim My Matching Spot'}
                    </button>
                    
                    {submitStatus === 'error' && (
                      <p className="form-error-message">
                        There was an error submitting your request. Please try again or contact us directly.
                      </p>
                    )}
                    
                    <p className="trust-microcopy">
                      No spam. No obligation. Matches are personal and confidential.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Social Proof Ticker */}
            <div className="social-proof-ticker">
              <div className="ticker-stat">
                <div className="ticker-number">357+</div>
                <div className="ticker-label">Families Matched</div>
              </div>
              <div className="ticker-stat">
                <div className="ticker-number">5.0 ★</div>
                <div className="ticker-label">on Zillow & Google</div>
              </div>
              <div className="ticker-stat">
                <div className="ticker-number">Avg. 14 Days</div>
                <div className="ticker-label">to Match</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <div className="container">
          <h2 className="section-heading">Real Matches, Real Results</h2>
          <div className="testimonials-carousel">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "We did a luxury transaction with David and his team. We were pleased with his professionalism & calmness throughout the transaction. We would totally recommend Obsidian Denver to anyone looking to buy or sell a home!"
              </p>
              <p className="testimonial-author">Dae Jung</p>
              <p className="testimonial-context">Local Guide</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Dax helped me find my home in Arvada. He was very knowledgable, great negotiator and very communicative. As a first time home buyer, I am so glad I found Dax and I highly recommend him."
              </p>
              <p className="testimonial-author">Daisy Galo</p>
              <p className="testimonial-context">First-Time Homebuyer in Arvada</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "David was there for everything I needed! Great business 10/10 recommend"
              </p>
              <p className="testimonial-author">Kyle Rupert</p>
              <p className="testimonial-context">Denver</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "As a first-time homebuyer, I was nervous going into the process, but David made it feel manageable every step of the way. He worked relentlessly for my family, and the result was securing our first home."
              </p>
              <p className="testimonial-author">Kyle Boten</p>
              <p className="testimonial-context">First-Time Homebuyer</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "David Heine is incredible! He helped us purchase our downtown Denver property and made the entire process seamless. His deep market knowledge, quick communication, and genuine care for our needs made us feel confident every step of the way."
              </p>
              <p className="testimonial-author">Chanell Cuellar</p>
              <p className="testimonial-context">Downtown Denver</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "David was amazing helping us find our forever home! We looked for months and saw countless homes and never felt pressured or like we were an inconvenience. He had all the answers."
              </p>
              <p className="testimonial-author">Kelly Clendenin</p>
              <p className="testimonial-context">Local Guide</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "David has consistently gone above and beyond with the process of buying and selling our home. He was always quick to remediate any issues, always quick with responses to our questions and needs."
              </p>
              <p className="testimonial-author">Rob Greenberg</p>
              <p className="testimonial-context">Denver</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "I just completed my first home purchase and couldn't have done it without David by my side. He worked with me to understand the market, home buying process, and put forth a plan."
              </p>
              <p className="testimonial-author">Sarah Muha</p>
              <p className="testimonial-context">First-Time Homebuyer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain/Problem Section (Loss Aversion Focus) */}
      <section className="pain-section section">
        <div className="container">
          <h2 className="section-heading">The Hidden Cost of Choosing the Wrong Realtor</h2>
          <div className="pain-content">
            <p className="pain-paragraph">
              A weak negotiator can cost you $15,000–$40,000 on a single transaction. That's real money that could have gone toward your down payment, closing costs, or home improvements. But it's not just about the price tag.
            </p>
            <p className="pain-paragraph">
              A realtor who doesn't know the micro-market in Highlands vs. LoHi can steer you into a home that loses value. They might miss red flags that a neighborhood expert would catch immediately. You could end up in a property that doesn't appreciate the way you expected—or worse, loses value over time.
            </p>
            <p className="pain-paragraph">
              And a poor communicator? They'll cost you weekends, stress, and potentially the home you actually wanted. While you're waiting for callbacks, other buyers are making offers. While you're trying to schedule showings, properties are going under contract. Time is money, and wasted time is wasted opportunity.
            </p>
            <p className="pain-paragraph">
              Most homebuyers only get one chance to get it right. Getting matched with the wrong realtor doesn't just cost you money—it costs you peace of mind, time, and the home that could have been yours.
            </p>
            <div className="pain-cta">
              <a href="#realtor-form" onClick={scrollToForm} className="pain-cta-link">
                Don't risk it. Get matched with a vetted expert.
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="how-it-works-section section">
        <div className="container">
          <h2 className="section-heading">How We Match You With the Right Realtor</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Tell Us Your Priorities</h3>
              <p className="step-description">
                Share your neighborhood, timeline, and what matters most to you in an agent. Takes 30 seconds.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3 className="step-title">We Vet & Match</h3>
              <p className="step-description">
                We don't just assign you someone. We cross-reference your needs against our network of pre-vetted, top-performing Denver agents.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3 className="step-title">Start Winning</h3>
              <p className="step-description">
                Your matched agent gets to work immediately. No ramp-up time. No wasted showings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section">
        <div className="container">
          <h2 className="section-heading">Meet Your Matchmakers</h2>
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
                12+ years of Denver real estate experience. 400+ successful transactions across West Highland, LoHi, Sloan's Lake, and Wash Park. Specializes in architectural and historic homes.
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
                10+ years serving Denver homebuyers. 350+ transactions in Arvada, Highlands, and surrounding neighborhoods. Known for exceptional negotiation and client communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section section">
        <div className="container">
          <h2 className="final-cta-heading">Your Perfect Realtor Is One Click Away.</h2>
          <div className="final-cta-form-wrapper">
            <div className="form-content form-content-compact">
              {formStep === 'neighborhood' ? (
                <form className="realtor-form-step1" onSubmit={handleNeighborhoodSubmit}>
                  <div className="form-group">
                    <label htmlFor="neighborhood-final" className="form-label">
                      What Denver neighborhood are you searching in?
                    </label>
                    <input
                      type="text"
                      id="neighborhood-final"
                      name="neighborhood"
                      className="form-input"
                      placeholder="Wash Park, Highlands, LoHi, Sloan's Lake..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit-button submit-button-large"
                  >
                    Check Availability
                  </button>
                </form>
              ) : (
                <form className="realtor-form" onSubmit={handleSubmit}>
                  <input type="hidden" name="location" value={neighborhood} />
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
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email-final" className="form-label">
                        Email *
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="timeline-final" className="form-label">
                      Timeline *
                    </label>
                    <select
                      id="timeline-final"
                      name="timeline"
                      className="form-input"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-3-months">1-3 Months</option>
                      <option value="3-6-months">3-6 Months</option>
                      <option value="6-12-months">6+ Months</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Claim My Matching Spot'}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="form-error-message">
                      There was an error submitting your request. Please try again or contact us directly.
                    </p>
                  )}
                  <p className="trust-microcopy">
                    No spam. No obligation. Matches are personal and confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
          <p className="final-cta-tagline">
            Prepared locally. Backed by 350+ successful matches. Built for Denver.
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
