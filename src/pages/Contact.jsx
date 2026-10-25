import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      e.target.reset();
      setTimeout(() => setStatus(""), 3000);
    }, 800);
  };

  return (
    <section id="contact" className="contact">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p className="section-subtitle">Have a project in mind? Let's work together to make it happen</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope"></i></div>
              <div>
                <h4>Email</h4>
                <p>erolindwayneee@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-phone"></i></div>
              <div>
                <h4>Phone</h4>
                <p>09937944247</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <h4>Location</h4>
                <p>35,Ibarra East Bajac-Bajac</p>
              </div>
            </div>
            <div className="contact-social">
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sent" ? (
                <><i className="fas fa-check"></i> Sent Successfully!</>
              ) : status === "sending" ? (
                "Sending..."
              ) : (
                <>Send Message <i className="fas fa-paper-plane"></i></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
