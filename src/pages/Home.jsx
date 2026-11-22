import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { Button, GlyphStrip, TypedLine, Count, Card } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const roles = ['UI/UX DESIGNER', 'FRONTEND DEVELOPER', 'STUDENT AT GORDON COLLEGE', 'PROBLEM SOLVER'];

export default function Home() {
  const [time, setTime] = useState('');
  const heroNameRef = useRef(null);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  // Animate hero name - letter by letter
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const elements = heroNameRef.current?.querySelectorAll('[data-w]');
      elements?.forEach((el, n) => {
        const txt = el.textContent;
        const tail = el.querySelector('em');
        const plain = tail ? txt.slice(0, -1) : txt;
        el.innerHTML = '';
        plain.split('').forEach((ch, i) => {
          const s = document.createElement('span');
          s.textContent = ch;
          s.style.cssText = 'display:inline-block;opacity:0;transition:opacity .01s';
          el.appendChild(s);
          setTimeout(() => { s.style.opacity = 1 }, 300 + n * 500 + i * 70);
        });
        if (tail) {
          const e = document.createElement('em');
          e.className = 'red';
          e.style.fontStyle = 'normal';
          e.textContent = '.';
          e.style.opacity = 0;
          el.appendChild(e);
          setTimeout(() => { e.style.opacity = 1 }, 300 + n * 500 + plain.length * 70);
        }
      });
    }
  }, []);

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.rise').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Animate stats on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-stat]', {
        start: 'top 85%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page hero" style={{ paddingTop: '120px', paddingBottom: 'var(--space-20)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Grid */}
      <div className="hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--space-12)',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        <div>
          {/* Location & Time Stamp */}
          <p className="mono" id="stamp" style={{ marginBottom: 'var(--space-4)' }}>
            Olongapo City · {time || '--:--'}
          </p>

          {/* Hero Name - Dot Matrix Style */}
          <h1 ref={heroNameRef} className="display-hero" aria-label="Dwayne Erolin">
            <span><b data-w>Dwayne</b></span>
            <span><b data-w>Erolin<em className="red" style={{ fontStyle: 'normal' }}>.</em></b></span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="sub"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            I design apps that explain themselves: clear fares, clear routes, clear next steps. Student designer and developer at Gordon College.
          </motion.p>

          {/* Pill Badges */}
          <motion.div
            className="row"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="pill"><i></i>Open for internships</span>
            <span className="pill">UI/UX · Front end</span>
          </motion.div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <motion.div
        className="bento grid grid-cols-6"
        initial={{ opacity: 1, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: '100%',
          maxWidth: '1120px',
          margin: 'var(--space-12) auto 0',
          padding: '0 20px',
        }}
        role="list"
      >
        <Card className="card rise s3" data-stat style={{ background: 'var(--surface)', border: 'none' }} role="listitem">
          <div>
            <p className="mono" style={{ color: 'var(--mute)' }}>Local time</p>
            <div className="clock" style={{ position: 'relative', marginTop: 'var(--space-4)' }}>
              <div className="t" id="clock">{time || '00:00'}</div>
              <div className="ring" aria-hidden="true" />
            </div>
          </div>
        </Card>

        <Card className="card rise s3" data-stat style={{ background: 'var(--surface)', border: 'none' }} role="listitem">
          <div>
            <h2 className="h1">About</h2>
            <p style={{ marginTop: '10px', color: 'var(--mute)' }}>BSIT student who likes interfaces with one clear job. I research the problem first, sketch second, and build last.</p>
            <div className="stack">
              <span>Figma</span>
              <span>React</span>
              <span>GSAP</span>
              <span>Motion</span>
            </div>
          </div>
        </Card>

        <Card className="card-case rise s6" id="besttrack" data-stat style={{ minHeight: 'auto', padding: 'var(--space-6)' }} role="listitem">
          <div>
            <p className="mono" style={{ color: 'inherit', opacity: .6 }}>Case study · Research and concept</p>
            <h2 className="big" style={{ marginTop: '14px' }}>Best<br />Track</h2>
          </div>
          <div>
            <p style={{ margin: '18px 0', opacity: .7 }}>A fare computation and route tool for tricycles in Olongapo City. My thesis assesses whether commuters, drivers and city offices are ready to adopt it.</p>
            <div className="bars" aria-hidden="true">
              <i style={{ '--h': '40%', '--i': 0 }}></i>
              <i style={{ '--h': '70%', '--i': 1 }}></i>
              <i style={{ '--h': '55%', '--i': 2 }}></i>
              <i style={{ '--h': '90%', '--i': 3 }}></i>
              <i style={{ '--h': '65%', '--i': 4 }}></i>
              <i style={{ '--h': '100%', '--i': 5 }}></i>
              <i style={{ '--h': '50%', '--i': 6 }}></i>
              <i style={{ '--h': '80%', '--i': 7 }}></i>
              <i style={{ '--h': '35%', '--i': 8 }}></i>
              <i style={{ '--h': '60%', '--i': 9 }}></i>
            </div>
            <div className="meta">
              <span>GPS fare matrix</span>
              <span>A* routing</span>
              <span>Readiness survey</span>
            </div>
          </div>
        </Card>

        <Card className="card rise s6" data-stat style={{ background: 'var(--surface)', border: 'none' }} role="listitem">
          <h2 className="h1">Selected work</h2>
          <ul className="list">
            <li><b>Best Track</b><span className="mono">Thesis · 2026</span></li>
          </ul>
        </Card>

        <Card className="card-contact rise s6" id="contact" data-stat role="listitem">
          <div className="dot">Let's<br />build it.</div>
          <div style={{ marginTop: '22px' }}>
            <p>Looking for a team that cares about people who actually use the product.</p>
            <p style={{ marginTop: '12px' }}><a href="mailto:erolindwayneee@gmail.com">erolindwayneee@gmail.com</a></p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}