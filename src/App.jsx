import './App.css';
import { useRef, useState } from 'react';
import CommissionForm from './CommissionForm';

function App() {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const commissionsRef = useRef(null);

  const [showDiscordPopup, setShowDiscordPopup] = useState(false);
  const [commissionType, setCommissionType] = useState('');
  const [commissionDescription, setCommissionDescription] = useState('');
  const [commissionEmail, setCommissionEmail] = useState('');
  const [commissionBudget, setCommissionBudget] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCommissionSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    
    try {
      const response = await fetch('https://portfolio-d8qf.onrender.com/api/commission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: commissionType,
          description: commissionDescription,
          email: commissionEmail,
          budget: commissionBudget
        }),
      });
      
      if (response.ok) {
        setSubmissionStatus('success');
        setCommissionType('');
        setCommissionDescription('');
        setCommissionEmail('');
        setCommissionBudget('');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting commission:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <main className="showcase-root">
      <nav className="showcase-navbar">
        <ul className="showcase-nav-list">
          <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button></li>
          <li><button onClick={() => scrollTo(aboutRef)}>About</button></li>
          <li><button onClick={() => scrollTo(projectsRef)}>Projects</button></li>
          <li><button onClick={() => scrollTo(contactRef)}>Contact</button></li>
        </ul>
      </nav>
      <section className="showcase-hero" id="home">
        <div className="showcase-hero-bg" style={{ background: 'inherit' }} />
        <div className="showcase-hero-content minimal-hero-content">
          <span className="minimal-hero-text">
            Hello, I'm <span className="hero-purple">Tobin</span>
          </span>
        </div>
      </section>
      <section className="showcase-section showcase-about" ref={aboutRef} id="about">
        <h2>About Me</h2>
        <p>
          I’m Tobin, a developer with over 9 years of experience building advanced applications for games, enterprises, and startups. Ever since I first touched a computer, I’ve been fascinated by the ability to turn ideas into reality and build things that make a difference. My passion is sharing this journey, whether by teaching others how to develop anything they dream of, or bringing someone’s dream to life myself.
        </p>
      </section>
      <section className="showcase-section showcase-skills" id="skills">
        <h2>Skills</h2>
        <div className="skills-list">
          <span className="skill-badge">Java</span>
          <span className="skill-badge">Python</span>
          <span className="skill-badge">C#</span>
          <span className="skill-badge">C</span>
          <span className="skill-badge">C++</span>
          <span className="skill-badge">React</span>
          <span className="skill-badge">Vite</span>
          <span className="skill-badge">HTML/CSS</span>
          <span className="skill-badge">SQL</span>
          <span className="skill-badge">Ruby</span>
          <span className="skill-badge">OpenGL</span>
          <span className="skill-badge">Lua</span>
          <span className="skill-badge">FishScript</span>
        </div>
      </section>
      <section className="showcase-section showcase-projects" ref={projectsRef} id="projects">
        <h2>Projects</h2>
        <div className="redesigned-projects centered-projects">
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://github.com/12-Volt-Bolt/12VB-DrivePractice', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open FRC Robot"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>FRC Robotics Club</h3>
            </div>
            <p>Singlehandedly programmed a full FRC robot using Java.</p>
            <div className="project-langs">
              <span className="lang-badge">Java</span>
            </div>
          </div>
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://aurora-gold-seven.vercel.app/', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open Aurora Detector"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>Aurora Detector</h3>
            </div>
            <p>Web application that detects Minecraft utility mods.</p>
            <div className="project-langs">
              <span className="lang-badge">Python</span>
              <span className="lang-badge">Javascript</span>
              <span className="lang-badge">HTML</span>
              <span className="lang-badge">CSS</span>
            </div>
          </div>
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://github.com/11VZ/Zoomies-Client', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open Zoomies"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>Zoomies Client</h3>
            </div>
            <p>Client-side modification for Minecraft that includes many utilities.</p>
            <div className="project-langs">
              <span className="lang-badge">Java</span>
              <span className="lang-badge">OpenGL</span>
              <span className="lang-badge">Bukkit API</span>
            </div>
          </div>
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://github.com/11VZ/AuroraBot', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open Discord Bot"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>Discord Queue/Ticket Bot</h3>
            </div>
            <p>Multi-use discord bot for queue and ticket management.</p>
            <div className="project-langs">
              <span className="lang-badge">Python</span>
              <span className="lang-badge">SQL</span>
              <span className="lang-badge">Discord.js</span>
            </div>
          </div>
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://bitcoin-wallet-site.vercel.app/', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open Wallet"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>Wallet Manager</h3>
            </div>
            <p>Advanced wallet manager for managing virtual currency.</p>
            <div className="project-langs">
              <span className="lang-badge">React</span>
              <span className="lang-badge">Vite</span>
              <span className="lang-badge">SQL</span>
              <span className="lang-badge">Javascript</span>
            </div>
          </div>
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://github.com/11VZ/Code-Organizer', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open Code Organizer"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>Code Organizer</h3>
            </div>
            <p>Code organizer for managing code files.</p>
            <div className="project-langs">
              <span className="lang-badge">React</span>
              <span className="lang-badge">Vite</span>
              <span className="lang-badge">Javascript</span>
              <span className="lang-badge">HTML/CSS</span>

            </div>
          </div>
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://github.com/11VZ/FishScript', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open FishScript"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>FishScript Language</h3>
            </div>
            <p>Custom programing language based on Python and Java.</p>
            <div className="project-langs">
              <span className="lang-badge">Python</span>
              <span className="lang-badge">Batch</span>
              <span className="lang-badge">FishScript</span>
            </div>
          </div>
          <div
            className="redesigned-project centered-project-card"
            onClick={() => window.open('https://filehost-alpha.vercel.app/', '_blank')}
            tabIndex={0}
            role="button"
            aria-label="Open Filehost"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-header centered-header">
              <h3>Filehost Website</h3>
            </div>
            <p>Host files for free using my website. One of my more complex projects.</p>
            <div className="project-langs">
              <span className="lang-badge">SQL</span>
              <span className="lang-badge">Vite</span>
              <span className="lang-badge">Javascript</span>
              <span className="lang-badge">HTML/CSS</span>

            </div>
          </div>
        </div>
      </section>
      <section className="showcase-section showcase-commissions" ref={commissionsRef} id="commissions">
        <h2>Commissions</h2>
        <p>Interested in working with me? Fill out the form below to request a commission.</p>
        <CommissionForm />
      </section>
      <section className="showcase-section showcase-contact" ref={contactRef} id="contact">
        <h2>Contact</h2>
        <div className="social-links">
          <a href="https://github.com/11VZ" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" onClick={e => { e.preventDefault(); setShowDiscordPopup(true); }}>Discord</a>
          <a href="mailto:totorp12@hotmail.com">Email</a>
        </div>
        {showDiscordPopup && (
          <div className="discord-popup-overlay" onClick={() => setShowDiscordPopup(false)}>
            <div className="discord-popup" onClick={e => e.stopPropagation()}>
              <span className="discord-popup-title">Discord</span>
              <span className="discord-popup-username">11vzmc</span>
              <p>Add or message me on Discord!</p>
              <button className="discord-popup-close" onClick={() => setShowDiscordPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </section>
      <footer className="showcase-footer">
        <span>&copy; 2025 Tobin. Made with love.</span>
      </footer>
    </main>
  );
}

export default App;
