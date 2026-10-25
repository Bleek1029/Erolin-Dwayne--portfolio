import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    if (!cursor || !follower) return;
    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        follower.style.left = e.clientX + "px";
        follower.style.top = e.clientY + "px";
      }, 50);
    };
    document.addEventListener("mousemove", move);
    const hoverEls = document.querySelectorAll("a, button, .project-card, .skill-card");
    const enter = () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.background = "transparent";
      cursor.style.border = "2px solid var(--accent-1)";
    };
    const leave = () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      cursor.style.background = "var(--accent-1)";
      cursor.style.border = "none";
    };
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      document.removeEventListener("mousemove", move);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [location.pathname]);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-follower"></div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">Erolin Prince Dwayne</Link>
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link ${location.pathname === item.to ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <h3>Erolin Prince Dwayne</h3>
            <p>Building the future, one line of code at a time.</p>
            <p className="footer-copyright">&copy; 2026 Erolin Prince Dwayne. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}