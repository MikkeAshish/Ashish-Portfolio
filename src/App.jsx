import React, { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';

// ---------------- Theme + Utility ----------------
const gradientText = 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-400';
const cardGrad = 'bg-white/5 dark:bg-white/10 border border-white/10 dark:border-white/20';

function useVisibleAnimation(selector) {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('animate-fade-in-up');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(selector).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

// ---------------- Nav ----------------
function Nav({ theme, toggleTheme }) {
  const scrollTo = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="fixed w-full z-40 top-0 bg-white/20 dark:bg-black/20 backdrop-blur border-b border-white/10 dark:border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        <div onClick={() => scrollTo('home')} className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 flex items-center justify-center text-white font-bold">AK</div>
          <div className="hidden sm:block">
            <div className={`font-semibold ${gradientText}`}>Ashish Kumar</div>
            <div className="text-xs text-gray-700 dark:text-white/70">MERN Stack Developer</div>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          {['home','skills','projects','education','contact'].map((s)=> (
            <button 
              key={s} 
              onClick={() => scrollTo(s)} 
              className="text-gray-800 dark:text-white/80 px-3 py-2 rounded-md hover:bg-black/10 dark:hover:bg-white/5"
            >
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}

          <a 
            href="/resume.pdf" 
            download 
            className="px-3 py-2 rounded-md bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/10 text-gray-900 dark:text-white"
          >
            Resume
          </a>

          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 rounded-md flex items-center justify-center border border-black/20 dark:border-white/20"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}

// ---------------- Hero ----------------
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h1 className={`text-5xl sm:text-6xl font-extrabold leading-tight ${gradientText}`}>Hi, I'm Ashish </h1>

          <p className="mt-4 text-lg text-gray-700 dark:text-white/80 max-w-xl">
            MERN Stack Developer (BCA, MCA) — building performant, responsive web apps with modern UI.
          </p>

          <div className="mt-6 flex gap-3">
            <a href="#projects" className="px-5 py-3 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md text-white font-medium">
              See Projects
            </a>

            <a href="/resume.pdf" download className="px-5 py-3 rounded-md border border-black/20 dark:border-white/20 text-gray-900 dark:text-white/90">
              Download Resume
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-white/70">
            <div>📍 Sikar, Rajasthan</div>
            <div>📧 kumawatmikke2003@gmail.com</div>
            <div>💼 Intern — Grras Solutions</div>
            <div>🛠️ React · Node · MongoDB · Tailwind</div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl bg-black/5 dark:bg-white/5">
            <img src="/profile.jpg" alt="Ashish" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
}

// ---------------- Skills ----------------
function Skills() {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 88 },
    { name: 'Node.js', level: 85 },
    { name: 'MongoDB', level: 80 },
    { name: 'Tailwind CSS', level: 86 },
    { name: 'HTML/CSS', level: 92 },
  ];

  useVisibleAnimation('.skill-card');

  return (
    <section id="skills" className="pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className={`text-3xl font-bold ${gradientText}`}>Skills</h2>
        <p className="text-gray-700 dark:text-white/70 mt-2">Technical skills with proficiency indicators.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map(s => (
            <div key={s.name} className={`skill-card p-4 rounded-xl ${cardGrad}`}>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-gray-900 dark:text-white">{s.name}</div>
                <div className="text-sm text-gray-700 dark:text-white/60">{s.level}%</div>
              </div>

              <div className="w-full h-3 bg-black/10 dark:bg-white/10 mt-3 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all" 
                  style={{ width: `${s.level}%`, background: 'linear-gradient(90deg,#6366f1,#ec4899)' }} 
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ---------------- Projects ----------------
function Projects() {
  const projects = [
    { title: 'TextUtil App', tech: 'React', desc: 'Text utility features…', link: '#' },
    { title: 'News App', tech: 'React API App', desc: 'Live news with filters…', link: '#' },
    { title: 'E-Commerce Website', tech: 'MERN', desc: 'Full Stack ecommerce…', link: '#' },
  ];

  const [i, setI] = useState(0);

  useEffect(() => { 
    const t = setInterval(() => setI(x => (x + 1) % projects.length), 6000); 
    return () => clearInterval(t); 
  }, []);

  return (
    <section id="projects" className="pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className={`text-3xl font-bold ${gradientText}`}>Projects</h2>
        <p className="text-gray-700 dark:text-white/70 mt-2">Selected projects demonstrating full-stack skills.</p>

        <div className="mt-6 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/20 dark:border-white/10">

          <div className="md:flex md:items-center md:gap-6">
            <div className="flex-1">

              <div className="text-2xl font-semibold text-gray-900 dark:text-white">{projects[i].title}</div>
              <div className="text-sm text-gray-700 dark:text-white/60">{projects[i].tech}</div>

              <p className="mt-3 text-gray-700 dark:text-white/70">{projects[i].desc}</p>

              <div className="mt-4 flex gap-3">
                <button onClick={() => setI((j) => (j - 1 + projects.length) % projects.length)} className="px-4 py-2 border rounded-md dark:border-white/10">
                  Prev
                </button>

                <button onClick={() => setI((j) => (j + 1) % projects.length)} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-md text-white">
                  Next
                </button>

                <a href={projects[i].link} className="ml-auto underline text-gray-700 dark:text-white/80">
                  View Code / Live
                </a>
              </div>
            </div>

            <div className="w-full md:w-56 h-40 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center">
              Preview
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ---------------- Timeline ----------------
function Timeline() {
  useVisibleAnimation('.timeline-item');

  const items = [
    { title: 'MCA - BTU', date: '2023 — 2025', desc: 'Master of Computer Application' },
    { title: 'BCA - SGI', date: '2021 — 2023', desc: 'Bachelor of Computer Application' },
    { title: 'Internship - Grras Solutions', date: '10 months', desc: 'Full Stack MERN Developer Intern' },
  ];

  return (
    <section id="education" className="pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className={`text-3xl font-bold ${gradientText}`}>Education & Experience</h2>

        <div className="mt-6 border-l border-black/20 dark:border-white/10 pl-6">
          {items.map((it, idx) => (
            <div key={idx} className="timeline-item relative mb-8">
              <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-amber-400 flex items-center justify-center text-black font-bold">
                {idx+1}
              </div>

              <div className="text-gray-900 dark:text-white font-semibold">{it.title}</div>
              <div className="text-sm text-gray-700 dark:text-white/60">{it.date}</div>
              <div className="mt-2 text-gray-700 dark:text-white/70">{it.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ---------------- Contact ----------------
function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    const SERVICE_ID = 'EMAILJS_SERVICE_ID';
    const TEMPLATE_ID = 'EMAILJS_TEMPLATE_ID';
    const PUBLIC_KEY = 'EMAILJS_PUBLIC_KEY';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => setStatus('sent'))
      .catch(() => setStatus('error'));
  };

  return (
    <section id="contact" className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">

        <h2 className={`text-3xl font-bold ${gradientText}`}>Contact</h2>
        <p className="text-gray-700 dark:text-white/70 mt-2">
          Want to hire or collaborate? Send a message — I'll reply soon.
        </p>

        <form ref={formRef} onSubmit={sendEmail} className="mt-6 grid grid-cols-1 gap-4">
          <input name="from_name" required placeholder="Your name" className="p-3 rounded-lg bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20" />
          <input name="reply_to" required placeholder="Email" type="email" className="p-3 rounded-lg bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20" />
          <input name="subject" placeholder="Subject" className="p-3 rounded-lg bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20" />
          <textarea name="message" required rows={6} placeholder="Message" className="p-3 rounded-lg bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20" />

          <div className="flex items-center gap-3">
            <button type="submit" className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-md text-white">
              Send Message
            </button>
            <div className="text-sm text-gray-700 dark:text-white/70">
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent ✅' : status === 'error' ? 'Failed to send' : null}
            </div>
          </div>
        </form>

      </div>
    </section>
  );
}

// ---------------- App ----------------
export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#030312] text-gray-900 dark:text-white transition-all">

      <Nav theme={theme} toggleTheme={toggleTheme} />

      <main className="pt-24">
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />

        <footer className="py-8 text-center text-gray-600 dark:text-white/60 border-t border-black/20 dark:border-white/10 mt-8">
          © {new Date().getFullYear()} Ashish Kumar — MERN Developer
        </footer>
      </main>

    </div>
  );
}
