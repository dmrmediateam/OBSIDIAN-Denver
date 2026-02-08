'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

  return (
    <main className="home-page">
      <div className="home-page-container">
        {/* Hero Section */}
        <div className="home-hero-section">
          <h1 className="home-hero-heading">
            Get Your True Denver Home Value - Not a Guess From an Algorithm
          </h1>
          <p className="home-hero-subheadline">
            A local, agent-built home valuation by David & Dax at Obsidian Denver - trusted by buyers, sellers, and Denver locals who want accuracy, not estimates.
          </p>
        </div>

        {/* Form Section */}
        <div className="home-valuation-form-section">
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
        </div>
      </div>
    </main>
  );
}
