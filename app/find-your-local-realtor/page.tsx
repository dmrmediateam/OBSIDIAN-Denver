'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function FindYourLocalRealtor() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToForm = () => {
    const formElement = document.getElementById('realtor-form');
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
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      location: formData.get('location'),
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
      {/* Hero Section with Form */}
      <section className="hero-section section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-heading">
              Find Your Perfect Local Realtor in Denver
            </h1>
            <p className="hero-subheadline">
              Connect with trusted, experienced real estate professionals who know Denver inside and out - matched to your specific needs and goals.
            </p>
            
            {/* Primary CTA Form */}
            <div className="form-wrapper-top" id="realtor-form">
              <div className="form-content">
                <h2 className="form-heading">Get Matched With Your Ideal Realtor</h2>
                
                <form className="realtor-form" onSubmit={handleSubmit}>
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
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">
                        Preferred Area *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-input"
                        placeholder="Denver, Arvada, Lakewood, etc."
                        required
                      />
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
                        <option value="6-12-months">6-12 Months</option>
                        <option value="just-looking">Just Looking</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Find My Realtor'}
                  </button>
                  
                  {submitStatus === 'error' && (
                    <p className="form-error-message">
                      There was an error submitting your request. Please try again or contact us directly.
                    </p>
                  )}
                  
                  <p className="trust-microcopy">
                    No spam. No pressure. We'll match you with the perfect realtor for your needs.
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
                    "David and Dax are amazing! They matched me with the perfect realtor who understood exactly what I was looking for. The whole process was seamless."
                  </p>
                  <p className="review-author">Misty Forde</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "I was nervous about finding the right realtor, but Obsidian Denver connected me with someone who was patient, knowledgeable, and really listened to my needs."
                  </p>
                  <p className="review-author">Sarah Chen</p>
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
                    "The realtor they matched me with was perfect. She understood my budget, my needs, and found me exactly what I was looking for."
                  </p>
                  <p className="review-author">Michael Rodriguez</p>
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
          <h2 className="section-heading">Why Finding the Right Realtor Matters</h2>
          <div className="problem-content">
            <div className="problem-list">
              <h3 className="problem-subheading">Common challenges when searching for a realtor:</h3>
              <ul className="problem-items">
                <li>Not knowing which realtor specializes in your area</li>
                <li>Finding someone who understands your specific needs</li>
                <li>Working with realtors who don't communicate well</li>
                <li>Getting matched with someone who lacks experience</li>
              </ul>
            </div>
            <div className="problem-consequences">
              <h3 className="problem-subheading">That's why homebuyers struggle with:</h3>
              <ul className="problem-items">
                <li>Missing out on great properties</li>
                <li>Overpaying due to poor negotiation</li>
                <li>Frustration from lack of communication</li>
                <li>Wasting time with the wrong realtor</li>
              </ul>
              <p className="problem-conclusion">
                The right realtor makes all the difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authority + Guide Section */}
      <section className="authority-section section">
        <div className="container">
          <h2 className="section-heading">Meet Your Local Denver Realtor Matchmakers</h2>
          <p className="authority-intro">
            When you work with Obsidian Denver, you're not getting a random realtor assignment.
          </p>
          <p className="authority-main">
            You're getting David & Dax - Denver real estate professionals who:
          </p>
          <ul className="authority-list">
            <li>Know every Denver neighborhood inside and out</li>
            <li>Match you with realtors who fit your specific needs</li>
            <li>Ensure you work with trusted, vetted professionals</li>
          </ul>
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
          <h2 className="section-heading">Find Your Perfect Realtor in 3 Simple Steps</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Tell Us What You Need</h3>
              <p className="step-description">
                Share your location preferences, timeline, and what you're looking for in a realtor.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3 className="step-title">We Match You Perfectly</h3>
              <p className="step-description">
                We connect you with a vetted realtor who specializes in your area and understands your needs.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3 className="step-title">Start Your Home Search</h3>
              <p className="step-description">
                Begin working with your matched realtor and find your perfect Denver home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heavy Social Proof Section */}
      <section className="social-proof-section section">
        <div className="container">
          <h2 className="section-heading">Denver Homebuyers Trust Our Realtor Matching</h2>
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
            <div className="testimonial-item">
              <p className="testimonial-text">
                "The realtor matching service was incredible. They found me someone who really understood what I wanted."
              </p>
              <p className="testimonial-author">Emily Johnson</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "We did a luxury transaction with David and his team. We were pleased with his professionalism and calmness throughout the process."
              </p>
              <p className="testimonial-author">Dae Jung, Local Guide</p>
            </div>
            <div className="testimonial-item">
              <p className="testimonial-text">
                "Whenever I transact with Obsidian, I know the deal will be handled with competence, professionalism, and integrity."
              </p>
              <p className="testimonial-author">Porter Ergon, Local Guide</p>
            </div>
          </div>
          <p className="social-proof-conclusion">
            This isn't hype.<br />
            This is repeatable trust, built match by match.
          </p>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="secondary-cta-section section">
        <div className="container">
          <h2 className="cta-heading">Ready to Find Your Perfect Realtor?</h2>
          <button className="cta-button" onClick={scrollToForm}>
            Find My Realtor
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section section">
        <div className="container">
          <h2 className="final-cta-heading">Start Your Home Search Today</h2>
          <p className="final-cta-subheading">
            If you're looking for a realtor who:
          </p>
          <ul className="final-cta-list">
            <li>Knows your Denver neighborhood inside and out</li>
            <li>Understands your specific needs and budget</li>
            <li>Communicates clearly and works tirelessly for you</li>
          </ul>
          <p className="final-cta-start">Start here.</p>
          <button className="final-cta-button" onClick={scrollToForm}>
            Find My Realtor
          </button>
          <p className="final-cta-tagline">
            Prepared locally. Backed by trust. Built for successful matches.
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
