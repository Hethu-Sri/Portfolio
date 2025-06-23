
import { useEffect, useRef, useState } from 'react';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        const dotRect = dot.getBoundingClientRect();
        const dotX = dotRect.left - rect.left + dotRect.width / 2;
        const dotY = dotRect.top - rect.top + dotRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2)
        );

        const maxDistance = 150;
        const influence = Math.max(0, 1 - distance / maxDistance);

        if (influence > 0) {
          const angle = Math.atan2(dotY - mouseY, dotX - mouseX);
          const moveX = Math.cos(angle) * influence * 30;
          const moveY = Math.sin(angle) * influence * 30;

          dot.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + influence * 0.5})`;
          dot.style.opacity = `${0.2 + influence * 0.6}`;
        } else {
          dot.style.transform = 'translate(0px, 0px) scale(1)';
          dot.style.opacity = '0.2';
        }
      });
    };

    const handleMouseLeave = () => {
      dotsRef.current.forEach((dot) => {
        if (dot) {
          dot.style.transform = 'translate(0px, 0px) scale(1)';
          dot.style.opacity = '0.2';
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const generateDots = () => {
    const dots = [];
    const cols = 60;
    const rows = 40;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const delay = (i + j) * 0.1;
        const index = i * cols + j;
        dots.push(
          <div
            key={`${i}-${j}`}
            ref={(el) => {
              if (el) dotsRef.current[index] = el;
            }}
            className="w-1 h-1 bg-teal-400 rounded-full transition-all duration-200 ease-out"
            style={{
              position: 'absolute',
              left: `${(j / cols) * 100}%`,
              top: `${(i / rows) * 100}%`,
              opacity: 0.2,
              animationDelay: `${delay}s`,
              animationDuration: '3s'
            }}
          />
        );
      }
    }
    return dots;
  };

  const projects = [
    {
      title: "Education & Health Awareness Dashboard",
      description: "D3.js-based dashboard exploring healthcare access by education.",
      tech: "D3.js, JavaScript, HTML/CSS, Vercel"
    },
    {
      title: "Earthquake Data Visualization",
      description: "Global seismic explorer with filtering and animations.",
      tech: "D3.js, Leaflet, JavaScript"
    },
    {
      title: "Phineas & Ferb Sentiment Analysis",
      description: "Character sentiment storytelling using data viz.",
      tech: "Visual Analytics, Narrative Storytelling"
    },
    {
      title: "Retail Analytics Platform",
      description: "Azure ML-powered insights dashboard for retail.",
      tech: "Azure, Python, HTML/CSS/JS"
    },
    {
      title: "Land Registration via Blockchain",
      description: "Secure registry with React & MongoDB backend.",
      tech: "ReactJS, MongoDB, Blockchain"
    },
    {
      title: "Health Care Portal",
      description: "Patient booking + health services platform in Django.",
      tech: "Python, Django, JavaScript"
    }
  ];

  const skills = [
    "Python", "Java", "C", "ReactJS", "Django", "Azure",
    "MongoDB", "Node.js", "D3.js", "HTML", "CSS", "TypeScript"
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollCarousel = (direction: number) => {
    const newIndex = currentProjectIndex + direction * 2;
    if (newIndex >= 0 && newIndex < projects.length) {
      setCurrentProjectIndex(newIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-24 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 relative overflow-hidden cursor-none"
    >

      {/* Animated dots background */}
      <div className="absolute inset-0 pointer-events-none">
        {generateDots()}
      </div>

      {/* Navigation */}
      {/* <nav className="relative z-10 flex justify-between items-center p-6 text-white"> */}
      {/* <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md flex justify-between items-center p-6 text-white shadow-md">

        <div className="flex items-center space-x-8">
          <div className="text-lg font-semibold text-orange-400">Hethu Sri</div>
          <div className="hidden md:flex space-x-6 text-sm">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">Experience</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">Contact</button>
          </div>
        </div>
        <a href="/Hethu Sri Nadipudi_Resume.pdf" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer">
          Download Resume
        </a>
      </nav> */}

      <nav className="fixed top-0 left-0 w-full z-50 h-20 bg-slate-900/90 backdrop-blur-md shadow-md px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="text-xl font-bold text-orange-400 whitespace-nowrap">Hethu Sri</div>
          <div className="flex-1 flex justify-center space-x-10 ml-10">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-orange-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-orange-400 transition-colors">Projects</button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-300 hover:text-orange-400 transition-colors">Experience</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-orange-400 transition-colors">Skills</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-orange-400 transition-colors">Contact</button>
          </div>
          <a
            href="/Hethu Sri Nadipudi_Resume.pdf"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            Git Hub
          </a>
        </div>
      </nav>



      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent block transform hover:scale-105 transition-transform duration-500">
              Hi, I'm
            </span>
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent block transform hover:scale-105 transition-transform duration-500 delay-100">
              Hethu Sri
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto">
            Software Developer passionate about building Full Stack, Cloud, and Data Visualization solutions.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="/Hethu Sri Nadipudi_Resume.pdf" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-medium transition-colors duration-200 cursor-pointer">
              Download Resume
            </a>
            <button onClick={() => scrollToSection('projects')} className="border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-3 font-medium transition-colors duration-200 cursor-pointer">
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-10 tracking-tight">
            About Me
          </h2>
          <div className="text-gray-300 space-y-6 text-lg leading-relaxed text-justify">
            <p>
              I am a passionate Software Developer with a strong foundation in Computer Science. Currently pursuing a Master of Engineering degree in Computer Science at the University of Cincinnati.
              My core experience lies in full stack development, particularly with JavaScript, SAP UI5, Azure Cloud, and frontend technologies like React and D3.js.
              I am constantly driven by curiosity and strive to grow into higher software engineering roles.
              When I'm not coding, I enjoy exploring new tech trends and building side projects.
            </p>
          </div>
        </div>
      </section>


      {/* Projects Section */}

      <section id="projects" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* OUTER CARD */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
            <h2 className="text-4xl font-bold text-white mb-10 text-center">Projects</h2>

            {/* Arrow controls positioned OUTSIDE the cards */}
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scrollCarousel(-1)}
                className="absolute -left-9 top-1/2 transform -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
                disabled={currentProjectIndex === 0}
              >
                &#10094;
              </button>

              {/* Scrollable Project Cards */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out gap-6"
                  style={{ transform: `translateX(-${(currentProjectIndex / 2) * 100}%)` }}
                >
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="min-w-[calc(50%-12px)] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-orange-400 mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <p className="text-sm text-teal-400">Tech: {project.tech}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollCarousel(1)}
                className="absolute -right-9 top-1/2 transform -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
                disabled={currentProjectIndex >= projects.length - 2}
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      </section>





      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-20 px-6">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold text-white mb-12 text-center">Experience</h2>
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* Software Engineer */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">Software Engineer</h3>
        <p className="text-gray-300 mb-4">Agile Solutions, May 2022 – Aug 2024</p>
        <ul className="text-gray-300 space-y-2">
          <li>• Built full-stack SAP UI5 apps</li>
          <li>• Managed CI/CD pipelines</li>
        </ul>
      </div>

      {/* Intern Developer */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">Intern Developer</h3>
        <p className="text-gray-300 mb-4">Agile Solutions, May 2021 – Apr 2022</p>
        <ul className="text-gray-300 space-y-2">
          <li>• Resolved bugs & improved UX</li>
          <li>• Contributed to frontend optimizations</li>
        </ul>
      </div>

      {/* EPAM Systems - Pre-Education Program Trainee */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">Pre-Education Program Trainee (PEP-2021)</h3>
        <p className="text-gray-300 mb-4">EPAM Systems, Sep 2020 – Jun 2021</p>
        <ul className="text-gray-300 space-y-2">
          <li>• Completed a 10-month apprenticeship focused on Java and Computer Science fundamentals</li>
          <li>• Gained hands-on experience in OOP, algorithms, and software engineering principles</li>
        </ul>
      </div>

      {/* KL University - Peer Mentor */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">Peer Mentor</h3>
        <p className="text-gray-300 mb-4">KL University, Dec 2019 – May 2021</p>
        <ul className="text-gray-300 space-y-2">
          <li>• Mentored students in Cybersecurity-related courses</li>
          <li>• Co-authored a tutorial book for the Computer Networks and Security course</li>
        </ul>
      </div>

    </div>
  </div>
</section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-6">
  <div className="max-w-4xl mx-auto">
    {/* Outer Card */}
    <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10 text-center">
      <h2 className="text-4xl font-bold text-white mb-10">Skills</h2>

      {/* Skill Badges */}
      <div className="flex flex-wrap gap-3 justify-center">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-teal-500/20 border border-teal-400 text-teal-400 px-4 py-2 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Contact Me</h2>
          <div className="space-y-4 text-lg">
            <p className="text-gray-300">
              📧 <a href="mailto:hethusrinadipudi@gmail.com" className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">hethusrinadipudi@gmail.com</a>
            </p>
            <p className="text-gray-300">
              🔗 <a href="https://www.linkedin.com/in/hethusri-nadipudi" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">LinkedIn</a>
            </p>
          </div>
        </div>
      </section>

      {/* Custom cursor */}
      <div className="fixed w-4 h-4 bg-orange-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: 'var(--mouse-x, -100px)',
          top: 'var(--mouse-y, -100px)',
          transform: 'translate(-50%, -50%)'
        }}>
      </div>
    </div>
  );
};

export default Index;
