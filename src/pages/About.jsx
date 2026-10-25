import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const els = document.querySelectorAll(".skill-card, .about-grid, .contact-container");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="about" className="about">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">Who <span className="gradient-text">I Am</span></h2>
            <p className="section-subtitle">A creative developer dedicated to building amazing digital experiences</p>
          </div>
          <div className="about-grid">
            <div className="about-image">
              <div className="about-img-wrapper">
                <img src="/images/me.2.jpeg" alt="About Erolin Prince Dwayne" id="aboutPhoto" />
              </div>
            </div>
            <div className="about-content">
              <h3>A Developer Who Codes with Passion</h3>
              <p>I'm a full-stack developer with expertise in creating modern web applications. My journey in tech started years ago, and since then I've been constantly learning and evolving to stay at the cutting edge of technology.</p>
              <p>I specialize in building responsive, accessible, and performant websites that deliver exceptional user experiences. Every line of code I write is driven by a commitment to quality and innovation.</p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number" data-target="2">2</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number" data-target="5">5</span>
                  <span className="stat-label">Projects Done</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number" data-target="1">1</span>
                  <span className="stat-label">Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">My Skills</span>
            <h2 className="section-title">What I <span className="gradient-text">Do Best</span></h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon"><i className="fab fa-html5"></i></div>
              <h3>Frontend</h3>
              <p>HTML, CSS, JavaScript, React, Vue.js, Next.js</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fab fa-node-js"></i></div>
              <h3>Backend</h3>
              <p>Node.js, Express, Python, Django, REST APIs</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-database"></i></div>
              <h3>Database</h3>
              <p>MongoDB, PostgreSQL, MySQL, Firebase</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-cloud"></i></div>
              <h3>DevOps</h3>
              <p>AWS, Docker, CI/CD, Git, Linux</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
