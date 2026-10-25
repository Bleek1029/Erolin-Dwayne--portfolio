import "./Contact.css";

function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's work together to make it happen.
          </p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>erolindwayneee@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <h4>Phone</h4>
                <p>09937944247</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Location</h4>
                <p>35, Ibarra East Bajac-Bajac</p>
              </div>
            </div>
          </div>
          <form className="contact-form">
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
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;