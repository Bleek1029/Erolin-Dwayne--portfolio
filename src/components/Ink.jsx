import { memo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const options = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  fpsLimit: 60,
  particles: {
    number: { value: 46, density: { enable: true, area: 900 } },
    color: { value: "#2547ff" },
    opacity: { value: { min: 0.15, max: 0.4 } },
    size: { value: { min: 1.5, max: 3.5 } },
    links: { enable: true, distance: 150, color: "#2547ff", opacity: 0.12, width: 1 },
    move: { enable: true, speed: 0.5, outModes: "bounce" },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" } },
    modes: { repulse: { distance: 110, duration: 0.5 } },
  },
  detectRetina: true,
};

// A quiet constellation behind the page that reacts to the cursor.
function Ink() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);
  if (!ready) return null;
  return <Particles id="ink" className="ink" options={options} />;
}
export default memo(Ink);
