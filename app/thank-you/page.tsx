'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import './styles.css';

export default function ThankYou() {
  useEffect(() => {
    // Google tag (gtag.js) event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ads_conversion_Book_appointment_1', {
        // <event_parameters>
      });
    }
  }, []);

  return (
    <main className="thank-you-page">
      <Script id="google-conversion-event" strategy="afterInteractive">
        {`
          if (typeof gtag !== 'undefined') {
            gtag('event', 'ads_conversion_Book_appointment_1', {
              // <event_parameters>
            });
          }
        `}
      </Script>
      <div className="container">
        <div className="thank-you-content">
          <div className="thank-you-icon">✓</div>
          <h1 className="thank-you-heading">Thank You!</h1>
          <p className="thank-you-message">
            Your request has been received.
          </p>
          <div className="check-instructions">
            <p className="instruction-text">
              Please check your email and text messages.
            </p>
            <p className="instruction-subtext">
              We'll be in touch soon.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
