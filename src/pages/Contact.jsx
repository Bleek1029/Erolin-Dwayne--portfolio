import { useState } from "react";
import { motion } from "motion/react";
import useReveal from "../hooks/useReveal";

const info = [
  ["fa-envelope", "Email", "erolindwayneee@gmail.com"],
  ["fa-phone", "Phone", "09937944247"],
  ["fa-location-dot", "Location", "35, Ibarra East Bajac-Bajac"],
];

export default function Contact() {
  const ref = useReveal();
  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus(""), 3000);
    }, 800);
  };

  return (
    <div ref={ref} className="page">
      <h1 className="display sm" data-panel>Let's build something together.</h1>
      <p className="lead" data-panel>Have a project in mind? Send a message and let's make it happen.</p>

      <div className="contact-grid">
        <div className="contact-info">
          {info.map(([ic, t, v]) => (
            <div className="card pad row" data-panel key={t}>
              <i className={`fas ${ic}`} />
              <div><h4>{t}</h4><p>{v}</p></div>
            </div>
          ))}
        </div>
        <form className="card pad form" data-panel onSubmit={submit}>
          <input type="text" placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />
          <input type="text" placeholder="Subject" />
          <textarea rows="5" placeholder="Your message" required />
          <motion.button whileTap={{ scale: 0.95, rotate: 0 }} type="submit" className="btn" disabled={status === "sending"}>
            {status === "sent" ? "Sent. Thank you!" : status === "sending" ? "Sending…" : <>Send message <i className="fas fa-paper-plane" /></>}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
