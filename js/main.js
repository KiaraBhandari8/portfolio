// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.style.left = mouseX + 'px';
  cursorGlow.style.top = mouseY + 'px';
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  updateActiveNav();
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Active Nav Link =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (navLink) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

// ===== Typing Effect =====
const typedText = document.getElementById('typedText');
const phrases = [
  'Student Developer',
  'Problem Solver',
  'Tech Enthusiast',
  'Creative Thinker',
  'Lifelong Learner'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typedText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger skill bar animations
      if (entry.target.classList.contains('skills-grid')) {
        animateSkillBars();
      }

      // Trigger stat counter animations
      if (entry.target.closest('.about-image')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.1 });

animateElements.forEach(el => observer.observe(el));

// ===== Skill Bar Animation =====
function animateSkillBars() {
  document.querySelectorAll('.skill-progress').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 200);
  });
}

// ===== Counter Animation =====
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    if (counter.dataset.animated) return;
    counter.dataset.animated = 'true';

    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// ===== Project Filters =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #00C851, #00D9FF)';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

// ===== Hero Particles =====
const heroParticles = document.getElementById('heroParticles');

function createParticle() {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: absolute;
    width: ${Math.random() * 6 + 2}px;
    height: ${Math.random() * 6 + 2}px;
    background: ${['#6C63FF', '#00D9FF', '#FF6584', '#FFD93D'][Math.floor(Math.random() * 4)]};
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    opacity: ${Math.random() * 0.5 + 0.1};
    pointer-events: none;
    animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
  `;
  heroParticles.appendChild(particle);
}

for (let i = 0; i < 50; i++) {
  createParticle();
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(${Math.random() * 100}px, ${Math.random() * 100}px) rotate(90deg); }
    50% { transform: translate(${Math.random() * -100}px, ${Math.random() * 100}px) rotate(180deg); }
    75% { transform: translate(${Math.random() * 100}px, ${Math.random() * -100}px) rotate(270deg); }
    100% { transform: translate(0, 0) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Tilt Effect on Cards =====
document.querySelectorAll('.project-card, .volunteer-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
