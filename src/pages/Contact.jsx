import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { GlyphStrip, Button, Input, Textarea } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const info = [
  { icon: 'mail', label: 'EMAIL', value: 'erolindwayneee@gmail.com', href: 'mailto:erolindwayneee@gmail.com' },
  { icon: 'phone', label: 'PHONE', value: '09937944247', href: 'tel:09937944247' },
  { icon: 'map-pin', label: 'LOCATION', value: '35, Ibarra East Bajac-Bajac', href: null },
];

const ContactIcons = {
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  'map-pin': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  // Animate contact items on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-contact]', {
        start: 'top 85%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08 }),
      });
    });
    return () => ctx.revert();
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

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'NAME REQUIRED';
    if (!formData.email.trim()) newErrors.email = 'EMAIL REQUIRED';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'INVALID EMAIL FORMAT';
    if (!formData.message.trim()) newErrors.message = 'MESSAGE REQUIRED';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('error');
      console.error('Submit error:', error);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="page" style={{ paddingTop: '120px', paddingBottom: 'var(--space-20)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="rise"
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <GlyphStrip active pattern="pulse" speed={1.5} style={{ width: '120px', height: '4px' }} />
            <span className="label" style={{ color: 'var(--red)' }}>COMMUNICATION CHANNEL OPEN</span>
          </div>

          <motion.h1
            className="display-lg"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Let&apos;s build something together.
          </motion.h1>

          <motion.p
            className="body-lg"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ maxWidth: '38rem', marginTop: 'var(--space-4)' }}
          >
            Have a project in mind? Send a message and let&apos;s make it happen.
          </motion.p>
        </motion.div>

        {/* Contact Grid - 6 column grid */}
        <motion.div
          className="grid grid-cols-6 rise"
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginTop: 'var(--space-8)', gap: '14px', alignItems: 'start' }}
        >
          {/* Contact Info - s3 */}
          <div className="card s3" style={{ display: 'grid', gap: 'var(--space-4)', minHeight: 'auto' }}>
            {info.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="card card-hover"
                data-contact
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  transition: 'border-color var(--transition-fast)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--red)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; }}
              >
                <div style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  color: 'var(--red)',
                  flexShrink: 0,
                }}>
                  {ContactIcons[item.icon]}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'var(--text-sm)', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-1)' }}>
                    {item.label}
                  </h4>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--mute)', wordBreak: 'break-word' }}>
                    {item.value}
                  </p>
                </div>
                {item.href && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mute)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'stroke var(--transition-fast), transform var(--transition-fast)' }} aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </a>
            ))}

            {/* Glyph Divider */}
            <div data-contact style={{ marginTop: 'var(--space-4)' }}>
              <GlyphStrip active pattern="wave" speed={0.8} style={{ width: '100%', height: '4px' }} />
            </div>

            {/* Status Indicators */}
            <div data-contact style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                <span style={{ color: 'var(--ink)' }}>SYSTEM ONLINE</span>
                <span style={{ marginLeft: 'auto', color: 'var(--mute)', fontFamily: 'var(--mono)' }}>v1.0.0</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 8px rgba(215, 25, 33, 0.5)', animation: 'blink 1.5s ease-in-out infinite' }} />
                <span style={{ color: 'var(--ink)' }}>PORT OPEN</span>
                <span style={{ marginLeft: 'auto', color: 'var(--mute)', fontFamily: 'var(--mono)' }}>PORT 443</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                <span style={{ color: 'var(--ink)' }}>STANDBY MODE</span>
                <span style={{ marginLeft: 'auto', color: 'var(--mute)', fontFamily: 'var(--mono)' }}>AWAITING INPUT</span>
              </div>
            </div>
          </div>

          {/* Contact Form & Red Card - s3 */}
          <div className="s3" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Red Contact Card */}
            <div className="card-contact" style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
              <div className="dot">Let's<br />build it.</div>
              <div style={{ marginTop: '22px' }}>
                <p style={{ opacity: .85 }}>Looking for a team that cares about people who actually use the product.</p>
                <p style={{ marginTop: '12px' }}><a href="mailto:erolindwayneee@gmail.com">erolindwayneee@gmail.com</a></p>
              </div>
            </div>

            {/* Form Card */}
            <form ref={formRef} className="card" data-contact onSubmit={submit} style={{ padding: '24px', display: 'grid', gap: 'var(--space-4)' }}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <Input
                  label="NAME"
                  id="name"
                  name="name"
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <Input
                  label="EMAIL"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>

              <Input
                label="SUBJECT"
                id="subject"
                name="subject"
                placeholder="PROJECT TYPE / INQUIRY"
                value={formData.subject}
                onChange={handleChange}
              />

              <Textarea
                label="MESSAGE"
                id="message"
                name="message"
                placeholder="DESCRIBE YOUR PROJECT..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                rows={6}
              />

              {/* Glyph Progress during sending */}
              {status === 'sending' && (
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <GlyphStrip active pattern="scan" speed={3} style={{ width: '100%', height: '4px' }} />
                  <p className="label" style={{ textAlign: 'center', marginTop: 'var(--space-2)', color: 'var(--red)' }}>TRANSMITTING...</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={status === 'sending'}
                style={{ justifySelf: 'start', minWidth: '160px' }}
              >
                {status === 'sent' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    SENT. THANK YOU
                  </>
                ) : status === 'sending' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>
                    SEND MESSAGE
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}