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
    const movingFrom = formData.get('movingFrom') as string;
    const whatMattersMost = formData.get('whatMattersMost') as string;
    
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      reason: `Moving from: ${movingFrom}. What matters most: ${whatMattersMost}`,
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
      {/* Hero Section */}
      <section className="hero-section section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-heading">
              Your Family's Move to Denver Should Be the Start of Something Amazing — Not a Source of Stress.
            </h1>
            <p className="hero-subheadline">
              Moving with kids, pets, and a career to manage is hard enough. Don't add 'become a Denver real estate expert' to your to-do list. Let us handle the housing so you can focus on your family.
            </p>
            
            {/* Company Logos */}
            <div className="company-logos-section">
              <p className="logos-intro">Trusted by relocating families from:</p>
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
                <div className="logo-item">
                  <Image 
                    src="/Niagara-logo-color@2x.png" 
                    alt="Niagara" 
                    width={150}
                    height={80}
                    className="company-logo"
                  />
                </div>
                <div className="logo-item">
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
          </div>
        </div>
      </section>

      {/* Pain Section (Fear - Moved to the Top) */}
      <section className="pain-section-moving section">
        <div className="container">
          <h2 className="section-heading">What a Poorly Planned Relocation Actually Looks Like</h2>
          <div className="pain-scenarios">
            <div className="pain-scenario">
              <p className="scenario-text">
                It's your third weekend in Denver. You're still in a cramped Airbnb. The kids are asking when they'll have their own rooms again. You've lost two bidding wars. Your partner is frustrated. You start to wonder if this move was a mistake.
              </p>
            </div>
            <div className="pain-scenario">
              <p className="scenario-text">
                You picked a neighborhood based on a Google search. The commute is 50 minutes each way. The nearest park is a 20-minute drive. The school ratings aren't what the website said. You're locked into a lease.
              </p>
            </div>
            <div className="pain-scenario">
              <p className="scenario-text">
                You trusted an out-of-state agent who didn't know Denver. They showed you homes in areas that don't match your lifestyle. You wasted 3 weekends and still don't have a shortlist.
              </p>
            </div>
          </div>
          <p className="pain-relief-line">
            None of this has to happen.
          </p>
        </div>
      </section>

      {/* Relief Section (The Turn) */}
      <section className="relief-section section">
        <div className="container">
          <h2 className="section-heading">We Handle the Chaos. You Focus on Your Family.</h2>
          <div className="relief-content">
            <p className="relief-paragraph">
              Moving your family to a new city shouldn't feel like a crisis. At Obsidian Denver, we've helped 150+ families relocate to Denver smoothly. We know what you're going through, and we know exactly how to make it easier.
            </p>
            <p className="relief-paragraph">
              Before you even arrive, we pre-screen neighborhoods based on your family's specific needs. Great schools? We'll analyze districts, ratings, and programs. Short commute? We'll map out drive times from your office. Need parks and outdoor space? We'll show you neighborhoods where your kids can play safely. Safety concerns? We'll guide you to areas where families thrive.
            </p>
            <p className="relief-paragraph">
              We handle the logistics, the research, and the negotiations. You focus on packing, saying goodbye, and getting your family excited about their new adventure. Our job is to make sure your family feels safe, settled, and excited about their new home from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section-moving section" id="moving-form">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-content">
              <p className="form-priming">Let's build a plan to protect your family's move.</p>
              <form className="moving-form" onSubmit={handleSubmit}>
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
                  <label htmlFor="movingFrom" className="form-label">
                    Where are you moving from? *
                  </label>
                  <input
                    type="text"
                    id="movingFrom"
                    name="movingFrom"
                    className="form-input"
                    placeholder="City, State"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatMattersMost" className="form-label">
                    What matters most? *
                  </label>
                  <select
                    id="whatMattersMost"
                    name="whatMattersMost"
                    className="form-input"
                    required
                  >
                    <option value="">Select what matters most</option>
                    <option value="Great Schools">Great Schools</option>
                    <option value="Short Commute">Short Commute</option>
                    <option value="Family-Friendly Neighborhood">Family-Friendly Neighborhood</option>
                    <option value="Outdoor Access">Outdoor Access</option>
                    <option value="Budget-Friendly Options">Budget-Friendly Options</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : "Get My Family's Relocation Plan"}
                </button>
                
                {submitStatus === 'error' && (
                  <p className="form-error-message">
                    There was an error submitting your request. Please try again or contact us directly.
                  </p>
                )}
                
                <p className="trust-microcopy">
                  No spam. No pressure. We'll reach out personally to understand your family's needs.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Family-Focused Testimonials */}
      <section className="testimonials-section-moving section">
        <div className="container">
          <h2 className="section-heading">Families Who Found Their Place in Denver</h2>
          <div className="testimonials-grid-family">
            <div className="testimonial-card-emotional">
              <p className="testimonial-quote">
                "As a first-time homebuyer, I was nervous going into the process, but David made it feel manageable every step of the way. He worked relentlessly for my family, and the result was securing our first home, which is something I never thought possible."
              </p>
              <p className="testimonial-author">Kyle Boten</p>
              <p className="testimonial-context">First-Time Homebuyer</p>
            </div>
            <div className="testimonial-card-emotional">
              <p className="testimonial-quote">
                "Dax helped me find my home in Arvada. He was very knowledgable, great negotiator and very communicative. As a first time home buyer, I am so glad I found Dax and I highly recommend him."
              </p>
              <p className="testimonial-author">Daisy Galo</p>
              <p className="testimonial-context">First-Time Homebuyer in Arvada</p>
            </div>
            <div className="testimonial-card-emotional">
              <p className="testimonial-quote">
                "I just completed my first home purchase and couldn't have done it without David by my side. When I met him, I wasn't even looking to purchase a home, but he worked with me to understand the market, home buying process, and put forth a plan."
              </p>
              <p className="testimonial-author">Sarah Muha</p>
              <p className="testimonial-context">First-Time Homebuyer</p>
            </div>
            <div className="testimonial-card-emotional">
              <p className="testimonial-quote">
                "I've been working with David for quite some time and was finally able to find my first home! He fought for me to get max seller credits and even got the seller to buy a home warranty for me! I will definitely use him to buy and sell homes again!"
              </p>
              <p className="testimonial-author">Chris Burtschi</p>
              <p className="testimonial-context">First-Time Homebuyer</p>
            </div>
            <div className="testimonial-card-emotional">
              <p className="testimonial-quote">
                "David was fantastic throughout my entire home buying experience. Knowledgeable, patient, and always available to answer my questions. David helped me find the perfect home and made the closing process a breeze."
              </p>
              <p className="testimonial-author">Scott McCoy</p>
              <p className="testimonial-context">Local Guide</p>
            </div>
            <div className="testimonial-card-emotional">
              <p className="testimonial-quote">
                "David was amazing helping us find our forever home! We looked for months and saw countless homes and never felt pressured or like we were an inconvenience. He had all the answers and the rare time he didn't, he found out for us!"
              </p>
              <p className="testimonial-author">Kelly Clendenin</p>
              <p className="testimonial-context">Local Guide</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Your Family Gets Section */}
      <section className="family-benefits-section section">
        <div className="container">
          <h2 className="section-heading">What Your Family Gets When You Work With Us</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🏠</div>
              <h3 className="benefit-title">A curated shortlist of family-friendly neighborhoods</h3>
              <p className="benefit-description">Based on YOUR priorities, not generic recommendations.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📚</div>
              <h3 className="benefit-title">School district analysis</h3>
              <p className="benefit-description">Ratings, programs, and proximity — all researched for you.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📱</div>
              <h3 className="benefit-title">A dedicated relocation expert</h3>
              <p className="benefit-description">Answers your calls, texts, and emails — even on weekends.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📅</div>
              <h3 className="benefit-title">A move-in timeline that respects your family's schedule</h3>
              <p className="benefit-description">We work around your needs, not the other way around.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💚</div>
              <h3 className="benefit-title">Peace of mind</h3>
              <p className="benefit-description">Someone who's done this 150+ times is in your corner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section">
        <div className="container">
          <h2 className="section-heading">Meet Your Family's Relocation Team</h2>
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
                David understands what it means to relocate a family. With 12+ years helping families find their place in Denver, he's passionate about making sure every family feels safe, settled, and excited about their new home.
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
                Dax specializes in helping families navigate the complexities of relocation. His attention to detail and genuine care for families has made him a trusted partner for 150+ successful relocations to Denver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section section">
        <div className="container">
          <h2 className="final-cta-heading">Your Family Deserves a Smooth Start in Denver.</h2>
          <div className="final-cta-form-wrapper">
            <div className="form-content form-content-compact">
              <p className="form-priming">Let's build a plan to protect your family's move.</p>
              <form className="moving-form" onSubmit={handleSubmit}>
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
                  <label htmlFor="movingFrom-final" className="form-label">
                    Where are you moving from? *
                  </label>
                  <input
                    type="text"
                    id="movingFrom-final"
                    name="movingFrom"
                    className="form-input"
                    placeholder="City, State"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatMattersMost-final" className="form-label">
                    What matters most? *
                  </label>
                  <select
                    id="whatMattersMost-final"
                    name="whatMattersMost"
                    className="form-input"
                    required
                  >
                    <option value="">Select what matters most</option>
                    <option value="Great Schools">Great Schools</option>
                    <option value="Short Commute">Short Commute</option>
                    <option value="Family-Friendly Neighborhood">Family-Friendly Neighborhood</option>
                    <option value="Outdoor Access">Outdoor Access</option>
                    <option value="Budget-Friendly Options">Budget-Friendly Options</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : "Get My Family's Relocation Plan"}
                </button>
                
                {submitStatus === 'error' && (
                  <p className="form-error-message">
                    There was an error submitting your request. Please try again or contact us directly.
                  </p>
                )}
                
                <p className="trust-microcopy">
                  No spam. No pressure. We'll reach out personally to understand your family's needs.
                </p>
              </form>
            </div>
          </div>
          <p className="final-cta-tagline">
            Prepared locally. Backed by trust. Built for families.
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
