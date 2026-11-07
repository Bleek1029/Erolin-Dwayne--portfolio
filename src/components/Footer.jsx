import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {year} Erolin Prince Dwayne. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;