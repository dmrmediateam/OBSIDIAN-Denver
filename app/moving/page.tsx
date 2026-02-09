'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function Moving() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToForm = () => {
    const formElement = document.getElementById('moving-form');
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
      reason: formData.get('reason'),
    };

    try {
      const response = await fetch('/api/submit-moving', {
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
    <main className="moving-page">
      {/* Hero Section with Form */}
      <section className="hero-section section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-heading">
              Moving to Denver? Let Us Help You Find Your Perfect Home
            </h1>
            <p className="hero-subheadline">
              Trusted relocation experts by David & Dax at Obsidian Denver - helping professionals and families make seamless moves to the Mile High City.
            </p>
            
            {/* Company Logos Section */}
            <div className="company-logos-section">
              <p className="logos-intro">Trusted by employees at leading companies:</p>
              <div className="logos-grid">
                <div className="logo-item">
                  <Image 
                    src="/Google_2015_logo.svg.webp" 
                    alt="Google" 
                    width={150}
                    height={80}
                    className="company-logo"
                  />
                </div>
                <div className="logo-item">
                  <Image 
                    src="/Lockheed_Martin_logo_(2011–2022).svg.png" 
                    alt="Lockheed Martin" 
                    width={150}
                    height={80}
                    className="company-logo"
                  />
                </div>
              </div>
            </div>
            
            {/* Primary CTA Form */}
            <div className="form-wrapper-top" id="moving-form">
              <div className="form-content">
                <h2 className="form-heading">Get Started With Your Denver Move</h2>
                
                <form className="moving-form" onSubmit={handleSubmit}>
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

                  <div className="form-group">
                    <label htmlFor="reason" className="form-label">
                      Reason for Moving *
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      className="form-textarea"
                      placeholder="Tell us about your move - new job, relocation, family, etc."
                      rows={4}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Moving Assistance'}
                  </button>
                  
                  {submitStatus === 'error' && (
                    <p className="form-error-message">
                      There was an error submitting your request. Please try again or contact us directly.
                    </p>
                  )}
                  
                  <p className="trust-microcopy">
                    No spam. No pressure. We'll help you find the perfect Denver home for your needs.
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
                    "David and Dax made our move from California seamless. They understood exactly what we needed and found us the perfect home in Denver."
                  </p>
                  <p className="review-author">Sarah Chen</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Relocating for work was stressful, but Obsidian Denver made it easy. They helped us find a great neighborhood and handled everything professionally."
                  </p>
                  <p className="review-author">Michael Rodriguez</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "As a first-time homebuyer moving to Denver, I was overwhelmed. David guided me through every step and found me an amazing place."
                  </p>
                  <p className="review-author">Emily Johnson</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Moving with a family is never easy, but Obsidian made it feel manageable. They found us a home in a great school district."
                  </p>
                  <p className="review-author">James and Lisa Thompson</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Professional, efficient, and incredibly helpful. They understood the Denver market and helped us find exactly what we were looking for."
                  </p>
                  <p className="review-author">Robert Martinez</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "David was there for everything we needed during our relocation. Great service, great results. Highly recommend!"
                  </p>
                  <p className="review-author">Jennifer Lee</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "Moving from the East Coast was daunting, but Obsidian Denver made it smooth. They know the area inside and out."
                  </p>
                  <p className="review-author">Thomas Anderson</p>
                </div>
                <div className="review-item">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">
                    "We relocated for my new job at a major company, and Obsidian helped us find the perfect home near my office. Excellent service!"
                  </p>
                  <p className="review-author">Patricia Williams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section section">
        <div className="container">
          <h2 className="section-heading">Why Moving to Denver Can Be Overwhelming</h2>
          <div className="problem-content">
            <div className="problem-list">
              <h3 className="problem-subheading">Common challenges when relocating:</h3>
              <ul className="problem-items">
                <li>Not knowing which neighborhoods fit your lifestyle</li>
                <li>Navigating a competitive housing market</li>
                <li>Understanding local market trends and pricing</li>
                <li>Finding homes near work or good schools</li>
              </ul>
            </div>
            <div className="problem-consequences">
              <h3 className="problem-subheading">That's why relocating families struggle with:</h3>
              <ul className="problem-items">
                <li>Choosing the wrong neighborhood</li>
                <li>Overpaying for properties</li>
                <li>Missing out on great opportunities</li>
              </ul>
              <p className="problem-conclusion">
                The right guidance makes all the difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authority + Guide Section */}
      <section className="authority-section section">
        <div className="container">
          <h2 className="section-heading">Meet Your Denver Relocation Experts</h2>
          <p className="authority-intro">
            When you work with Obsidian Denver, you're not getting generic relocation advice.
          </p>
          <p className="authority-main">
            You're getting David & Dax - Denver real estate professionals known for:
          </p>
          <ul className="authority-list">
            <li>Deep knowledge of Denver neighborhoods</li>
            <li>Experience helping corporate relocations</li>
            <li>Personalized service tailored to your needs</li>
          </ul>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section section">
        <div className="container">
          <h2 className="section-heading">Your Denver Move in 3 Simple Steps</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3 className="step-title">Tell Us About Your Move</h3>
              <p className="step-description">
                Share your relocation needs, timeline, and preferences.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3 className="step-title">We Find Your Perfect Match</h3>
              <p className="step-description">
                We search Denver's market for homes that fit your lifestyle, budget, and location needs.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3 className="step-title">Seamless Transition</h3>
              <p className="step-description">
                We guide you through every step, from viewing to closing, making your move stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heavy Social Proof Section */}
      <section className="social-proof-section section">
        <div className="container">
          <h2 className="section-heading">Denver Relocations We've Made Successful</h2>
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
            This is repeatable trust, built relocation by relocation.
          </p>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="secondary-cta-section section">
        <div className="container">
          <h2 className="cta-heading">Ready to Make Your Denver Move?</h2>
          <button className="cta-button" onClick={scrollToForm}>
            Get My Moving Assistance
          </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section section">
        <div className="container">
          <h2 className="final-cta-heading">Start Your Denver Journey Today</h2>
          <p className="final-cta-subheading">
            If you're relocating to Denver and want:
          </p>
          <ul className="final-cta-list">
            <li>Expert guidance on Denver neighborhoods</li>
            <li>Help finding homes that fit your lifestyle</li>
            <li>A smooth, stress-free relocation experience</li>
          </ul>
          <p className="final-cta-start">Start here.</p>
          <button className="final-cta-button" onClick={scrollToForm}>
            Get My Moving Assistance
          </button>
          <p className="final-cta-tagline">
            Prepared locally. Backed by trust. Built for successful relocations.
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
