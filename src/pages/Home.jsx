import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Home() {
  useEffect(() => {
    const heroImage = document.querySelector(".hero-image");
    const heroBg = document.querySelector(".hero-bg");
    const move = (e) => {
      if (heroImage) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroImage.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (heroBg) {
        const x = e.clientX * 0.1;
        const y = e.clientY * 0.1;
        heroBg.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">Welcome to my portfolio</span>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Erolin Prince Dwayne</span>
          </h1>
          <p className="hero-subtitle">Full-Stack Developer &amp; Backend Architecture</p>
          <p className="hero-description">
            Building digital experiences that blend creativity with technology.
            Passionate about crafting sleek, performant, and user-centric
            applications.
          </p>
          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">
              View My Work <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get In Touch
            </Link>
          </div>
          <div className="hero-social">
            <a href="#" className="social-link"><i className="fab fa-github"></i></a>
            <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="hero-image">
          <div className="profile-frame">
            <div className="profile-img-wrapper">
              <img src="/images/me.jpeg" alt="Erolin Prince Dwayne" className="profile-img" id="profilePhoto" />
              <div className="profile-ring"></div>
            </div>
            <div className="floating-card card-1">
              <i className="fas fa-code"></i>
              <span>5 Projects</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-award"></i>
              <span>2+ Years</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll Down</p>
      </div>
    </section>
  );
}