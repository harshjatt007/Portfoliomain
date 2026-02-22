'use client';

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle,
  ChevronUp,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
  XCircle,
  Zap,
} from 'lucide-react';

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Portfoliomain' : '';
const withBasePath = (path: string) => `${BASE_PATH}${path}`;

/* ============================================
   DATA
   ============================================ */
const ROLES = ['Creative Coder', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];

const SKILLS = [
  { name: 'C++', desc: 'Data structures, algorithms, OOP', pct: 90, icon: '💎' },
  { name: 'Python', desc: 'Scripting, automation, AI/ML', pct: 85, icon: '🐍' },
  { name: 'JavaScript', desc: 'ES6+, DOM, async programming', pct: 80, icon: '⚡' },
  { name: 'React / Next.js', desc: 'Modern frontend, SSR/SSG', pct: 75, icon: '⚛️' },
  { name: 'HTML5 & CSS3', desc: 'Semantic markup, animations', pct: 92, icon: '🎨' },
  { name: 'Git & GitHub', desc: 'Version control, CI/CD', pct: 85, icon: '🔀' },
  { name: 'SQL', desc: 'Database design, queries', pct: 78, icon: '🗄️' },
  { name: 'Problem Solving', desc: 'DSA, competitive coding', pct: 82, icon: '🧩' },
];

const PROFILE = {
  name: 'Abhishek Choudhary',
  email: 'abhishek1161.be22@chitkara.edu.in',
  github: 'harshjatt007',
  photo: 'https://res.cloudinary.com/da7byuahh/image/upload/v1707041908/jatt_dejnrp.jpg',
};

const PROJECTS = [
  {
    type: 'Web Platform',
    title: 'Latent',
    description:
      'A talent showcase platform where creators can upload videos, compete in battles, and get rated by the community.',
    tech: ['React', 'JavaScript', 'CSS'],
    image: withBasePath('/image.png'),
    github: 'https://github.com/harshjatt007/Latent',
    imageAlt: 'Latent project preview',
  },
  {
    type: 'Cybersecurity Tool',
    title: 'Trojan Trap',
    description:
      'A malware-scanning project with an upload-based scanning flow, report area, and live status updates for threat checks.',
    tech: ['Python', 'Security', 'Web UI'],
    image: withBasePath('/trojan-trap.png'),
    github: 'https://github.com/harshjatt007/Trojan-Trap',
    imageAlt: 'Trojan Trap project preview',
  },
];

/* ============================================
   ANIMATION VARIANTS
   ============================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const } }),
};

/* ============================================
   TYPING HOOK
   ============================================ */
function useTyping(words: string[]) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === word) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setText(isDeleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, isDeleting, wordIdx, words]);

  return text;
}

/* ============================================
   SCROLL NAVBAR HOOK
   ============================================ */
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [threshold]);

  return scrolled;
}

/* ============================================
   INTERSECTION OBSERVER HOOK
   ============================================ */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ============================================
   COMPONENTS
   ============================================ */
function SkillCard({ skill, visible }: { skill: typeof SKILLS[0]; visible: boolean }) {
  return (
    <div className="skill-card">
      <div className="skill-top">
        <div className="skill-icon-box">{skill.icon}</div>
        <span className="skill-pct">{skill.pct}%</span>
      </div>
      <h3>{skill.name}</h3>
      <p>{skill.desc}</p>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{ width: visible ? `${skill.pct}%` : '0%' }} />
      </div>
    </div>
  );
}

/* ============================================
   PAGE
   ============================================ */
export default function Home() {
  const typed = useTyping(ROLES);
  const scrolled = useScrolled();
  const showTop = useScrolled(400);
  const skills = useInView();
  const [mobileNav, setMobileNav] = useState(false);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNav ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileNav]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitNote, setSubmitNote] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitNote('');
    setSubmitStatus('');

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setSubmitNote('Form key missing. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.');
        setSubmitStatus('error');
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: 'Portfolio Contact Form',
          subject: `[Portfolio] ${formData.subject}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        setSubmitNote(result?.error || 'Failed to send message. Please try again.');
        setSubmitStatus('error');
        return;
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitNote('Message sent successfully!');
      setSubmitStatus('success');
      setTimeout(() => { setSubmitNote(''); setSubmitStatus(''); }, 5000);
    } catch {
      setSubmitNote('Unable to send message right now. Please try again shortly.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper">
      {/* Ambient Background */}
      <div className="ambient">
        <div className="ambient-orb" />
        <div className="ambient-orb" />
        <div className="ambient-orb" />
      </div>

      {/* Mobile nav overlay */}
      <div
        className={`nav-overlay${mobileNav ? ' active' : ''}`}
        onClick={() => setMobileNav(false)}
      />

      {/* Navbar */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#hero" className="logo">AC<span className="logo-dot">.</span></a>
          <div className={`nav-links${mobileNav ? ' active' : ''}`}>
            <a href="#hero" onClick={() => setMobileNav(false)}>Home</a>
            <a href="#about" onClick={() => setMobileNav(false)}>About</a>
            <a href="#skills" onClick={() => setMobileNav(false)}>Skills</a>
            <a href="#projects" onClick={() => setMobileNav(false)}>Projects</a>
            <a href="#contact" onClick={() => setMobileNav(false)}>Contact</a>
          </div>
          <button
            className={`nav-toggle${mobileNav ? ' active' : ''}`}
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Toggle menu"
          >
            <span className="hamburger" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="container hero-grid">
          <motion.div className="hero-text" initial="hidden" animate="show">
            <motion.div variants={fadeUp} custom={0.1}>
              <span className="badge">
                <span className="badge-dot" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.p className="hero-greeting" variants={fadeUp} custom={0.2}>
              Hello, I&apos;m
            </motion.p>

            <motion.h1 className="hero-name" variants={fadeUp} custom={0.3}>
              Abhishek{' '}
              <span className="hero-name-highlight">Choudhary</span>
            </motion.h1>

            <motion.div className="typing-line" variants={fadeUp} custom={0.4}>
              I&apos;m a{' '}
              <span className="typing-role">{typed}</span>
              <span className="typing-cursor">|</span>
            </motion.div>

            <motion.p className="hero-desc" variants={fadeUp} custom={0.5}>
              B.Tech CSE student at Chitkara University passionate about building innovative
              solutions and turning complex problems into elegant, efficient code.
            </motion.p>

            <motion.div className="hero-buttons" variants={fadeUp} custom={0.6}>
              <a className="btn-main" href="#projects">
                <Code2 size={18} /> View Projects
              </a>
              <a className="btn-outline" href="#contact">
                <Mail size={18} /> Contact Me
              </a>
            </motion.div>

            <motion.div className="social-row" variants={fadeUp} custom={0.7}>
              <a className="social-icon" href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a className="social-icon" href={`mailto:${PROFILE.email}`} aria-label="Email">
                <Mail size={20} />
              </a>
              <a className="social-icon" href="https://linkedin.com/in/harshjatt007" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="hero-img-wrapper">
              <div className="hero-img-glow" />
              <div className="hero-img-ring" />
              <div className="hero-img-ring-2" />
              <img
                className="hero-img"
                src={PROFILE.photo}
                alt="Abhishek Choudhary"
              />
              <div className="float-badge">
                <Zap size={20} color="#00e5c3" />
              </div>
              <div className="float-badge">
                <span className="float-badge-text">&lt;/&gt;</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="scroll-hint">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
            <span className="section-label">// about me</span>
            <h2 className="section-title">Who I Am</h2>
            <p className="section-sub">A passionate developer with a love for clean code and creative problem-solving.</p>
          </motion.div>

          <div className="about-grid">
            <motion.div className="about-text" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.1}>
              <p>
                I&apos;m a <strong>B.Tech Computer Science</strong> student at Chitkara University, Punjab,
                with a deep passion for software development and problem-solving.
              </p>
              <p>
                My journey in programming started with C++ and has since expanded to include Python,
                JavaScript, and modern web technologies. I love the process of turning complex problems
                into elegant, efficient solutions.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m exploring new technologies, contributing to open-source projects,
                or working on personal projects that challenge my skills.
              </p>
              <div className="about-tags">
                <div className="about-tag"><GraduationCap size={16} /> B.Tech CSE Student</div>
                <div className="about-tag"><MapPin size={16} /> Chitkara University, Punjab</div>
                <div className="about-tag"><Sparkles size={16} /> Full Stack Enthusiast</div>
              </div>
            </motion.div>

            <motion.div className="stats-column" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.2}>
              <div className="stat-box">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">5+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">500+</div>
                <div className="stat-label">GitHub Commits</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
            <span className="section-label">// skills</span>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-sub">Technologies I work with to bring ideas to life.</p>
          </motion.div>

          <div className="skills-grid" ref={skills.ref}>
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.08}
              >
                <SkillCard skill={skill} visible={skills.inView} />
              </motion.div>
            ))}
          </div>

          <motion.p
            style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem', fontSize: '0.875rem' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.5}
          >
            <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.35rem', color: 'var(--cyan)' }} />
            Continuously learning and exploring new technologies
          </motion.p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
            <span className="section-label">// projects</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-sub">Showcasing work that I&apos;m proud of.</p>
          </motion.div>

          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-wrapper"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.1 + index * 0.08}
            >
              <div className="project-card">
                <div className="project-img-area">
                  <img src={project.image} alt={project.imageAlt} />
                  <div className="project-overlay">
                    <a
                      className="project-overlay-link"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
                <div className="project-info">
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <a
                    className="project-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container">
          <motion.div className="section-header" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
            <span className="section-label">// contact</span>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-sub">Have a question or want to work together? Let&apos;s connect.</p>
          </motion.div>

          <div className="contact-grid">
            <motion.div className="contact-left" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.1}>
              <h3>Let&apos;s work together</h3>
              <p>
                I&apos;m currently looking for new opportunities and my inbox is always open.
                Whether you have a question, want to collaborate on a project, or just want to
                say hi — I&apos;ll get back to you!
              </p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-item-icon"><Mail size={18} /></div>
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><MapPin size={18} /></div>
                  <span>Punjab, India</span>
                </div>
              </div>
            </motion.div>

            <motion.form
              className="contact-form"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.2}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                <label htmlFor="email">Your Email</label>
              </div>
              <div className="form-group">
                <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} />
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} />
                <label htmlFor="message">Your Message</label>
              </div>
              <button type="submit" className="form-submit" disabled={isSubmitting}>
                <Send size={18} /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitNote && (
                <div className={`form-status ${submitStatus}`}>
                  {submitStatus === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  <span>{submitNote}</span>
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* Back to top */}
      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <h3>Abhishek Choudhary</h3>
              <p>Creative Coder & Developer</p>
            </div>
            <div className="footer-socials">
              <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail size={18} /></a>
              <a href="https://linkedin.com/in/harshjatt007" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
          <p className="footer-copy">
            Designed & Built by <span className="highlight">Abhishek Choudhary</span> · © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
