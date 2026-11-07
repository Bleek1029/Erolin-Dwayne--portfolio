import { useEffect, useRef } from "react";
import gsap from "gsap";

const clamp = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// The portrait is sampled into ~thousands of ink dots. They orbit as a swarm,
// then each one flies to its place (with its own delay) and the photo rebuilds.
export default function SwarmPortrait({ src, alt }) {
  const wrap = useRef(null);
  const cvs = useRef(null);
  const img = useRef(null);
  const api = useRef({ play: () => {} });

  useEffect(() => {
    const canvas = cvs.current;
    const ctx = canvas.getContext("2d");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }
    let raf = 0, dead = false, parts = [], tl;
    const S = { p: 0 };
    const image = new Image();
    image.src = src;

    image.onload = () => {
      if (dead) return;
      const r = wrap.current.getBoundingClientRect();
      const w = r.width, h = r.height, d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * d; canvas.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);

      // sample with the same crop the CSS uses (cover, 50% 25%, scale 1.35)
      const cell = 5, gw = Math.round(w / cell), gh = Math.round(h / cell);
      const off = document.createElement("canvas");
      off.width = gw; off.height = gh;
      const o = off.getContext("2d", { willReadFrequently: true });
      const s0 = Math.max(gw / image.width, gh / image.height);
      o.fillStyle = "#fff"; o.fillRect(0, 0, gw, gh);
      o.translate(gw / 2, gh / 2); o.scale(1.35, 1.35); o.translate(-gw / 2, -gh / 2);
      o.drawImage(image, (gw - image.width * s0) / 2, (gh - image.height * s0) * 0.25, image.width * s0, image.height * s0);
      const px = o.getImageData(0, 0, gw, gh).data;

      for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
        const i = (y * gw + x) * 4;
        const lum = (px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11) / 255;
        if (lum > 0.8 || Math.random() > 1.15 - lum * 0.9 + 0.25) continue;
        parts.push({
          tx: (x + 0.5) * cell, ty: (y + 0.5) * cell,
          a: Math.random() * 6.283, rad: 0.25 + Math.random() * 0.75,
          spd: (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 1.6),
          delay: Math.random() * 0.4,
          size: cell * (0.55 + (1 - lum) * 0.7),
          blue: lum > 0.42,
        });
      }

      const draw = (now) => {
        const t = now / 1000;
        ctx.clearRect(0, 0, w, h);
        for (const pass of [false, true]) {
          ctx.fillStyle = pass ? "#2547ff" : "#0f1222";
          for (const q of parts) {
            if (q.blue !== pass) continue;
            const k = ease(clamp((S.p - q.delay) / (1 - q.delay)));
            const ang = q.a + t * q.spd;
            const sx = w / 2 + Math.cos(ang) * q.rad * w * 0.62 + Math.sin(t * 2 + q.a * 3) * 8;
            const sy = h / 2 + Math.sin(ang) * q.rad * h * 0.5 + Math.cos(t * 1.7 + q.a * 2) * 8;
            const x = sx + (q.tx - sx) * k, y = sy + (q.ty - sy) * k;
            ctx.fillRect(x - q.size / 2, y - q.size / 2, q.size, q.size);
          }
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);

      api.current.play = (scatterFirst) => {
        tl?.kill();
        tl = gsap.timeline();
        tl.set(canvas, { opacity: 1 });
        if (scatterFirst) {
          tl.to(img.current, { opacity: 0, duration: 0.25 });
          tl.to(S, { p: 0, duration: 0.9, ease: "power2.in" });
        } else {
          gsap.set(img.current, { opacity: 0 });
          S.p = 0;
        }
        tl.to({}, { duration: 1.2 }); // let the swarm circle for a beat
        tl.to(S, { p: 1, duration: 2.4, ease: "none" });
        tl.to(img.current, { opacity: 1, duration: 0.7 }, "-=0.3");
        tl.to(canvas, { opacity: 0, duration: 0.7 }, "<");
      };
      api.current.play(false);
    };

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      tl?.kill();
    };
  }, [src]);

  return (
    <div className="tone swarm" ref={wrap}>
      <img ref={img} src={src} alt={alt} />
      <canvas ref={cvs} className="swarm-cv" aria-hidden="true" />
      <button type="button" className="rebuild" onClick={() => api.current.play(true)}>
        <i className="fas fa-rotate" /> Rebuild
      </button>
    </div>
  );
}
