import { motion } from "motion/react";
import Count from "../components/Count";
import useReveal from "../hooks/useReveal";

const skills = [
  { icon: "fab fa-html5", t: "Frontend", d: "HTML, CSS, JavaScript, React, Vue.js, Next.js" },
  { icon: "fab fa-node-js", t: "Backend", d: "Node.js, Express, Python, Django, REST APIs" },
  { icon: "fas fa-database", t: "Database", d: "MongoDB, PostgreSQL, MySQL, Firebase" },
  { icon: "fas fa-cloud", t: "DevOps", d: "AWS, Docker, CI/CD, Git, Linux" },
];

export default function About() {
  const ref = useReveal();
  return (
    <div ref={ref} className="page">
      <h1 className="display sm" data-panel>A developer who codes with passion.</h1>

      <div className="about-grid">
        <figure className="card photo" data-panel>
          <img src="/images/me.2.jpeg" alt="About Erolin Prince Dwayne" />
        </figure>
        <div className="about-text">
          <div className="card pad" data-panel>
            <p>I'm a full-stack developer with expertise in creating modern web applications. My journey in tech started years ago, and since then I've been constantly learning and evolving to stay at the cutting edge of technology.</p>
            <p>I specialize in building responsive, accessible, and performant websites that deliver exceptional user experiences. Every line of code I write is driven by a commitment to quality and innovation.</p>
          </div>
          <div className="bento tight">
            <div className="card stat accent" data-panel><b><Count to={2} /></b><span>Years experience</span></div>
            <div className="card stat" data-panel><b><Count to={5} /></b><span>Projects done</span></div>
            <div className="card stat" data-panel><b><Count to={1} /></b><span>Client</span></div>
          </div>
        </div>
      </div>

      <h2 className="h2" data-panel>What I work with</h2>
      <div className="skills">
        {skills.map((s) => (
          <motion.article key={s.t} className="card pad skill" data-panel whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <i className={s.icon} />
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
