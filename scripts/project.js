// Main JavaScript File for Uganda Tourism Website

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('mainNav');
const featuredParksContainer = document.getElementById('featuredParks');
const newsletterForm = document.getElementById('newsletterForm');
const subscriberCount = document.getElementById('subscriberCount');
const themeToggle = document.getElementById('themeToggle');
const fontSizeSelect = document.getElementById('fontSize');
const resetPrefsBtn = document.getElementById('resetPrefs');
const statNumbers = document.querySelectorAll('.stat-number');

// Parks Data
const parksData = [
  {
    id: 1,
    name: "Bwindi Impenetrable Forest",
    description: "Home to almost half of the world's remaining mountain gorillas.",
    image: "images/bwindi.webp",
    location: "Southwest Uganda",
    rating: 5,
    features: ["Gorilla Trekking", "Bird Watching", "Nature Walks"]
  },
  {
    id: 2,
    name: "Queen Elizabeth National Park",
    description: "Uganda's most popular savanna park with diverse wildlife.",
    image: "images/queen-elizabeth.webp",
    location: "Western Uganda",
    rating: 4,
    features: ["Tree-climbing Lions", "Boat Cruise", "Game Drives"]
  },
  {
    id: 3,
    name: "Murchison Falls National Park",
    description: "Uganda's largest national park with the mighty Nile River.",
    image: "images/murchison-falls.webp",
    location: "Northwest Uganda",
    rating: 4,
    features: ["Waterfall Viewing", "Wildlife Safari", "Nile Cruise"]
  }
];

// Subscribers Data
let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [
  { name: "John Smith", email: "john@example.com", interest: "gorilla", date: "2024-01-15" },
  { name: "Maria Garcia", email: "maria@example.com", interest: "safari", date: "2024-01-20" }
];

// Current Year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize the page
function init() {
  setupNavigation();
  loadFeaturedParks();
  setupNewsletterForm();
  setupPreferences();
  setupStatsCounter();
  updateSubscriberCount();
}

// Navigation Setup
function setupNavigation() {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      mainNav.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Load Featured Parks
function loadFeaturedParks() {
  if (!featuredParksContainer) return;

  const parksHTML = parksData.map(park => `
        <article class="park-card">
            <img src="${park.image}" 
                 alt="${park.name}" 
                 class="park-image"
                 loading="lazy"
                 onerror="this.src='images/placeholder.webp'">
            <div class="park-content">
                <h3>${park.name}</h3>
                <div class="park-meta">
                    <span class="park-location"><i class="fas fa-map-marker-alt"></i> ${park.location}</span>
                    <span class="park-rating">
                        ${generateStarRating(park.rating)}
                    </span>
                </div>
                <p>${park.description}</p>
                <div class="park-features">
                    ${park.features.map(feature =>
    `<span class="feature-tag">${feature}</span>`
  ).join('')}
                </div>
                <button class="btn btn-secondary view-details" 
                        data-park-id="${park.id}"
                        aria-label="View details for ${park.name}">
                    View Details
                </button>
            </div>
        </article>
    `).join('');

  featuredParksContainer.innerHTML = parksHTML;

  // Add event listeners to detail buttons
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
      const parkId = e.target.dataset.parkId;
      showParkDetails(parkId);
    });
  });
}

// Generate Star Rating HTML
function generateStarRating(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fas fa-star${i <= rating ? '' : '-half-alt'}"></i>`;
  }
  return stars;
}

// Show Park Details
function showParkDetails(parkId) {
  const park = parksData.find(p => p.id === parseInt(parkId));
  if (!park) return;

  const detailsHTML = `
        <div class="park-details-modal">
            <h3>${park.name}</h3>
            <p><strong>Location:</strong> ${park.location}</p>
            <p><strong>Rating:</strong> ${generateStarRating(park.rating)}</p>
            <p>${park.description}</p>
            <h4>Key Features:</h4>
            <ul>
                ${park.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="btn btn-primary close-details">Close</button>
        </div>
    `;

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = detailsHTML;
  document.body.appendChild(modal);

  // Add event listener to close button
  modal.querySelector('.close-details').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}