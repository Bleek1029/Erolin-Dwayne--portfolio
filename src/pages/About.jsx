import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Who <span className="gradient-text">I Am</span>
          </h2>
          <p className="section-subtitle">
            A creative developer dedicated to building amazing digital
            experiences
          </p>
        </div>
        <div className="about-content">
          <p className="about-paragraph">
            I'm a full-stack developer with expertise in creating modern web
            applications. My journey in tech started a couple of years ago, and
            since then I've been constantly learning and evolving to stay at the
            cutting edge of technology.
          </p>
          <p className="about-paragraph">
            I specialize in building responsive, accessible, and performant
            websites that deliver exceptional user experiences. Every line of
            code I write is driven by a commitment to quality and innovation.
          </p>
          <h3 className="skills-title">Draft List of My Skills</h3>
          <ul className="skills-list">
            <li>React</li>
            <li>JavaScript (ES6+)</li>
            <li>HTML5 & CSS3</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>REST APIs</li>
            <li>MongoDB</li>
            <li>Git & GitHub</li>
            <li>Responsive Design</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;