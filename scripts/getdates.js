// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('lastModified').textContent += document.lastModified;

// Hamburger menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth < 1024) {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});