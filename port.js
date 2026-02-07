// Mobile Navigation Toggle

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========================================
// Smooth Scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Active Navigation Link
// ========================================

const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (correspondingLink) {
        correspondingLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// Navbar Hide/Show on Scroll
// ========================================

let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Don't hide nav at the very top
  if (currentScroll <= 0) {
    nav.style.transform = 'translateY(0)';
    return;
  }

  // Scrolling down - hide nav
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = 'translateY(-100%)';
  } 
  // Scrolling up - show nav
  else {
    nav.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements that should fade in
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .about-text, .about-stats');

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========================================
// Project Cards Stagger Animation
// ========================================

const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, index * 200);
    }
  });
}, {
  threshold: 0.1
});

projectCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(-50px)';
  card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  projectObserver.observe(card);
});

// ========================================
// Skill Cards Stagger Animation
// ========================================

const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, {
  threshold: 0.1
});

skillCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  skillObserver.observe(card);
});

// ========================================
// Parallax Effect for Hero
// ========================================

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  if (scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// ========================================
// Typing Effect for Hero Tagline (Optional Enhancement)
// ========================================

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing effect
// const tagline = document.querySelector('.hero-tagline');
// const taglineText = tagline.textContent;
// window.addEventListener('load', () => {
//   setTimeout(() => typeWriter(tagline, taglineText, 30), 1500);
// });

// ========================================
// Add Custom Cursor (Optional Enhancement)
// ========================================

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const ease = 0.15;
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
  });
});

// Add cursor styles
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
  .custom-cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.2s ease;
    transform: translate(-50%, -50%);
  }
  
  * {
    cursor: none;
  }
  
  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
    
    * {
      cursor: auto;
    }
  }
`;
document.head.appendChild(cursorStyles);

// ========================================
// Performance Optimization
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateActiveLink = debounce(updateActiveLink, 50);
window.removeEventListener('scroll', updateActiveLink);
window.addEventListener('scroll', debouncedUpdateActiveLink);

// ========================================
// Console Easter Egg
// ========================================

console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #dc2626;');
console.log('%cLooking for a developer? Let\'s talk!', 'font-size: 14px; color: #a0a0a0;');
console.log('%cimuktar437@gmail.com', 'font-size: 14px; color: #dc2626; text-decoration: underline;');

// ========================================
// Load Performance Metrics (Optional)
// ========================================

window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
  
  // Log Core Web Vitals if available
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`📊 ${entry.name}: ${Math.round(entry.value)}ms`);
        }
      });
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    } catch (e) {
      // Performance Observer not supported
    }
  }
});