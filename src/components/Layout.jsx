import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ink from "./Ink";

gsap.registerPlugin(ScrollTrigger);

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <Ink />
      <header className="nav">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <i className="dot" /> Dwayne
        </Link>
        <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`} />
        </button>
        <nav className={`nav-menu ${open ? "open" : ""}`}>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={pathname === n.to ? "active" : ""} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* route change: a color sheet sweeps up and away */}
      <motion.div
        key={`wipe-${pathname}`}
        className="wipe"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.4 }}>
        <Outlet />
      </motion.main>

      <footer className="foot">
        <p>© 2026 Erolin Prince Dwayne</p>
        <p>Building the future, one line of code at a time.</p>
      </footer>
    </>
  );
}
