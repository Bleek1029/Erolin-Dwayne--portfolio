import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import TypedLine from "../components/TypedLine";
import Count from "../components/Count";
import SwarmPortrait from "../components/SwarmPortrait";
import useReveal from "../hooks/useReveal";

const roles = ["full-stack developer.", "backend architect.", "builder of business systems.", "fast learner."];

export default function Home() {
  const ref = useReveal();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 16 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div ref={ref} className="page hero">
      <div className="hero-grid">
        <div>
          <h1 className="display" data-panel>Erolin Prince Dwayne</h1>
          <p className="typed" data-panel>
            I'm a <TypedLine strings={roles} />
          </p>
          <p className="lead" data-panel>
            I build digital experiences that blend creativity with technology: sleek, performant, user-centric applications from the database to the interface.
          </p>
          <div className="cta" data-panel>
            <Link to="/projects" className="btn">View my work <i className="fas fa-arrow-right" /></Link>
            <Link to="/contact" className="btn ghost">Get in touch</Link>
          </div>
        </div>

        <motion.figure
          className="portrait card"
          data-panel
          onMouseMove={onMove}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        >
          <SwarmPortrait src="/images/me.2.jpeg" alt="Erolin Prince Dwayne" />
        </motion.figure>
      </div>

      <div className="bento">
        <div className="card stat accent" data-panel><b><Count to={5} /></b><span>Projects shipped</span></div>
        <div className="card stat" data-panel><b><Count to={2} suffix="+" /></b><span>Years of experience</span></div>
        <div className="card stat" data-panel><b><Count to={10} /></b><span>System modules built</span></div>
      </div>
    </div>
  );
}
