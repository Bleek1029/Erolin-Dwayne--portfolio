import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-badge">Welcome to my portfolio</span>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Erolin Prince Dwayne</span>
          </h1>
          <p className="hero-subtitle">Full-Stack Developer & Backend Architecture</p>
          <p className="hero-description">
            Building digital experiences that blend creativity with technology.
            Passionate about crafting sleek, performant, and user-centric
            applications.
          </p>
          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;