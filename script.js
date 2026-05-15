// Initialize Lucide Icons
lucide.createIcons();

// ==================== TERMINAL LOADING SCREEN ====================
const terminalLines = [
  { text: 'Initializing Mostafa OS v2.0...', color: 'text-gray-500' },
  { text: 'Loading backend modules (Laravel 10.x)...', color: 'text-white' },
  { text: 'Injecting React.js hydration layers...', color: 'text-primary' },
  { text: 'Establishing secure MySQL handshake...', color: 'text-green-500' },
  { text: 'Optimizing V8 engine performance...', color: 'text-yellow-500' },
  { text: 'Starting Portfolio interface...', color: 'text-white' },
  { text: 'Done! Welcome, visitor.', color: 'text-green-500 font-bold' },
];

const termBody = document.getElementById('terminal-output');

function typeTerminal() {
  let lineIdx = 0;
  
  function addLine() {
    if (lineIdx >= terminalLines.length) {
      setTimeout(() => {
        document.getElementById('loading-screen').classList.add('fade-out');
        setTimeout(() => {
          document.getElementById('loading-screen').style.display = 'none';
        }, 800);
      }, 1000);
      return;
    }
    
    const line = terminalLines[lineIdx];
    const div = document.createElement('div');
    div.className = `mb-2 font-mono ${line.color || ''}`;
    div.innerHTML = `<span class="text-primary mr-2">➜</span> ${line.text}`;
    termBody.appendChild(div);
    
    lineIdx++;
    setTimeout(addLine, 200 + Math.random() * 300);
  }
  
  addLine();
}

typeTerminal();

// ==================== SCROLL REVEAL ====================
const revealEls = document.querySelectorAll('.reveal');
function checkReveal() {
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('active');
    }
  });
}

// ==================== NAVIGATION ACTIVE STATE ====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function activeNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
}

// ==================== EVENT LISTENERS ====================
window.addEventListener('scroll', () => {
  checkReveal();
  activeNav();
});

// Initial check
checkReveal();
activeNav();

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    btn.innerHTML = 'Sending... <i data-lucide="loader" class="animate-spin w-4 h-4"></i>';
    btn.disabled = true;
    lucide.createIcons();

    setTimeout(() => {
      alert('Message sent successfully! Mostafa will get back to you soon.');
      btn.innerHTML = 'Send Message <i data-lucide="send"></i>';
      btn.disabled = false;
      contactForm.reset();
      lucide.createIcons();
    }, 2000);
  });
}

// ==================== SMOOTH MOUSE ORB EFFECT (OPTIONAL) ====================
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.glow-orb');
  orbs.forEach((orb, idx) => {
    const speed = (idx + 1) * 0.05;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});
// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  updateIcon(true);
}

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateIcon(isLight);
});

function updateIcon(isLight) {
  themeToggle.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
  lucide.createIcons();
}
