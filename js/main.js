/**
 * AYUSH VERMA — PORTFOLIO INTERACTIVE CONTROLLER
 * Handles Theme Engine, Project Drawer, Category Filtering, and Copy-to-Clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initNavigation();
  initProjectDrawer();
  initProjectFilters();
  initCopyActions();
});

/* --------------------------------------------------------------------------
   1. THEME ENGINE (DARK DEFAULT WITH LIGHT TOGGLE & LOCALSTORAGE)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('ayush_portfolio_theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ayush_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-regular fa-sun';
    icon.setAttribute('title', 'Switch to Light Mode');
  } else {
    icon.className = 'fa-regular fa-moon';
    icon.setAttribute('title', 'Switch to Dark Mode');
  }
}

/* --------------------------------------------------------------------------
   2. STICKY NAV & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = 'var(--nav-height)';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = 'var(--bg-surface)';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid var(--border-medium)';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. PROJECT DATA & SIDE-DRAWER MODAL
   -------------------------------------------------------------------------- */
const PROJECT_DATABASE = {
  eoscarbon: {
    title: "EosCarbon — Blue Carbon MRV Solution",
    subtitle: "Spring Boot Microservices & AI Integration for Environmental Verification",
    problem: "Environmental carbon projects face slow, manual verification workflows and fragmented data collection across remote field sites.",
    solution: "Engineered scalable Spring Boot backend services for project registration, evidence uploads, and verification workflows.",
    techStack: ["Spring Boot", "MongoDB", "JWT", "Microservices", "Python AI/ML", "REST APIs"],
    bullets: [
      "Designed and deployed 6+ REST APIs for project registration, evidence processing, and verification pipelines.",
      "Developed AI/ML models to process drone and satellite data, automating biomass & carbon estimation with 90%+ accuracy.",
      "Built a unified platform for NGOs and local communities to submit field data via mobile integration, raising submission volume by 40%.",
      "Integrated AI-verified restoration data to accelerate carbon credit generation workflows, improving verification efficiency by 30%.",
      "Implemented MongoDB schemas, role-based access control (RBAC), JWT security, pagination, sorting, and global exception handlers."
    ],
    github: "https://github.com/ayush-verma-004",
    liveDemo: "#"
  },
  helixcare: {
    title: "HelixCare — Healthcare Platform Architecture",
    subtitle: "Distributed Microservices Ecosystem with Spring Boot, Kafka & Docker",
    problem: "Monolithic healthcare systems struggle with synchronous service bottlenecks and tight database coupling during high patient load.",
    solution: "Architected a decoupled microservices platform with asynchronous messaging and containerized deployment.",
    techStack: ["Spring Boot", "Apache Kafka", "Docker", "PostgreSQL", "JUnit", "TestContainers"],
    bullets: [
      "Engineered 6+ backend microservices communicating asynchronously over Apache Kafka event streams.",
      "Containerized all microservices using Docker for consistent local and production deployment pipelines.",
      "Built isolated PostgreSQL database schemas per service to maintain domain boundaries.",
      "Wrote 200+ unit and integration tests using JUnit and TestContainers, raising code coverage by 30% and system uptime by 25%."
    ],
    github: "https://github.com/ayush-verma-004"
  },
  auz: {
    title: "Auz — Personal AI Desktop Assistant",
    subtitle: "Voice-Controlled Desktop Automation in Python",
    problem: "Daily repetitive system administration tasks require manual application switching and context switching.",
    solution: "Created an intelligent Python voice assistant automating operating system commands and media controls.",
    techStack: ["Python", "Speech Recognition", "Text-to-Speech", "OS Automation", "PyQt"],
    bullets: [
      "Automated 10+ daily tasks using real-time speech recognition and text-to-speech feedback.",
      "Implemented direct system integration for launching applications (YouTube, IDEs), playing media, and controlling power states.",
      "Cut manual desktop system control effort by 70% for daily repetitive developer workflows."
    ],
    github: "https://github.com/ayush-verma-004"
  },
  sap_abap: {
    title: "SAP ABAP Cloud & S/4HANA Technical Portfolio",
    subtitle: "Enterprise Data Modeling & Clean ABAP Development",
    problem: "Modern enterprise SAP environments require clean core ABAP Cloud practices and high-performance CDS data views.",
    solution: "Practiced and documented Object-Oriented ABAP, Open SQL, Internal Tables, Data Dictionary, and S/4HANA CDS concepts.",
    techStack: ["SAP ABAP", "ABAP Cloud", "OOP ABAP", "S/4HANA", "CDS Views", "Open SQL"],
    bullets: [
      "Earned SAP Certified Back-End Developer – ABAP Cloud credential.",
      "Documented S/4HANA data modeling patterns, Core Data Services (CDS), and internal table performance optimization.",
      "Built clean OOP ABAP modules for enterprise backend transaction management."
    ],
    github: "https://github.com/ayush-verma-004"
  },
  shinobi: {
    title: "Shinobi-Verse Web Platform",
    subtitle: "Frontend Architecture & Bug Resolution",
    problem: "Cross-browser CSS bugs and JavaScript state errors degraded user interaction flow.",
    solution: "Led primary debugging and code refactoring, identifying and fixing core HTML, CSS, and JS errors.",
    techStack: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
    bullets: [
      "Identified and resolved UI execution bugs, improving interface responsiveness.",
      "Refactored component layouts and stylesheet rules for uniform cross-browser performance."
    ],
    github: "https://github.com/ayush-verma-004"
  },
  prompt_ui: {
    title: "AI-Driven Prompt Engineering Frontend",
    subtitle: "Rapid UI Prototype Generation",
    problem: "Rapidly prototyping web applications requires tight feedback loops between specification and execution.",
    solution: "Built a fully functional frontend application using structured AI prompts in under 40 minutes.",
    techStack: ["Prompt Engineering", "HTML5/CSS3", "AI Tools"],
    bullets: [
      "Demonstrated advanced prompt engineering and AI-driven UI component synthesis.",
      "Built responsive interface layouts with streamlined workflow execution."
    ],
    github: "https://github.com/ayush-verma-004"
  }
};

function initProjectDrawer() {
  const overlay = document.getElementById('modal-overlay');
  const drawer = document.getElementById('modal-drawer');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!overlay || !drawer) return;

  document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Don't open drawer if user clicked a direct external link icon
      if (e.target.closest('a') && !e.target.closest('.drawer-trigger-link')) return;

      const projectId = trigger.getAttribute('data-project');
      const project = PROJECT_DATABASE[projectId];
      if (project) {
        populateDrawer(project);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

function populateDrawer(project) {
  const container = document.getElementById('modal-content-container');
  if (!container) return;

  const techChips = project.techStack.map(t => `<span class="chip chip-primary">${t}</span>`).join('');
  const bulletItems = project.bullets.map(b => `<li class="timeline-bullet">${b}</li>`).join('');

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <span class="chip" style="width: fit-content;">TECHNICAL CASE STUDY</span>
      <h2 style="font-size: 1.75rem; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${project.title}</h2>
      <p style="font-size: 1rem; color: var(--accent-sage); font-family: var(--font-mono);">${project.subtitle}</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div>
        <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 0.375rem;">Problem Statement</h4>
        <p style="font-size: 0.9375rem; color: var(--text-secondary);">${project.problem}</p>
      </div>

      <div>
        <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 0.375rem;">Engineered Solution</h4>
        <p style="font-size: 0.9375rem; color: var(--text-secondary);">${project.solution}</p>
      </div>
    </div>

    <div>
      <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 0.75rem;">Technology Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${techChips}</div>
    </div>

    <div>
      <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 0.75rem;">Key Technical Achievements</h4>
      <ul style="display: flex; flex-direction: column; gap: 0.75rem;">${bulletItems}</ul>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
      ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-secondary btn-sm"><i class="fa-brands fa-github"></i> GitHub Repository</a>` : ''}
      ${project.liveDemo ? `<a href="${project.liveDemo}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   4. PROJECT FILTERS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. COPY-TO-CLIPBOARD ACTIONS
   -------------------------------------------------------------------------- */
function initCopyActions() {
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        button.style.color = 'var(--accent-sage)';

        setTimeout(() => {
          button.innerHTML = originalText;
          button.style.color = '';
        }, 2000);
      });
    });
  });
}
