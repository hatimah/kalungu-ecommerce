// src/pages/Contact.jsx
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">
        Email: info@kalungu.com | Phone: +256 700 000 000
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Your name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea rows={5} placeholder="How can we help?" />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
