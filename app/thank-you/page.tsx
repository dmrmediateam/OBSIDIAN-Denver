import './styles.css';

export default function ThankYou() {
  return (
    <main className="thank-you-page">
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
