/* Redwood Coast Rivian Club — Main JS */
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  initHeroImage();
  initMobileMenu();
  initScrollAnimations();
  initEventsLoader();
  initActiveNav();
  initNavScroll();
});

/* ====================================================================
   Random Hero Background Image
   ==================================================================== */
function initHeroImage() {
  var hero = document.querySelector('.hero');
  if (!hero) return;

  // Add image filenames to this array as you add photos to images/hero/
  var heroImages = [
    'images/hero/hero-1.jpg',
    'images/hero/hero-2.jpg',
    'images/hero/hero-3.jpg',
    'images/hero/hero-4.jpg',
    'images/hero/hero-5.jpg'
  ];

  var randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
  hero.style.backgroundImage = 'url(' + randomImage + ')';
  hero.style.backgroundSize = 'cover';
  hero.style.backgroundPosition = 'center';
}

/* ====================================================================
   Task 10: Mobile Menu
   ==================================================================== */
function initMobileMenu() {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  var navLinks = menu.querySelectorAll('.nav-link');

  function openMenu() {
    toggle.classList.add('active');
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');

    // Focus the first link when menu opens
    var firstLink = menu.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');

    // Return focus to toggle button when menu closes
    toggle.focus();
  }

  function isMenuOpen() {
    return menu.classList.contains('active');
  }

  // Toggle button click handler
  toggle.addEventListener('click', function() {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when any nav-link is clicked
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (isMenuOpen()) {
        closeMenu();
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen()) {
      closeMenu();
    }

    // Focus trap: Tab/Shift+Tab cycles through focusable elements inside #nav-menu
    if (e.key === 'Tab' && isMenuOpen()) {
      var focusableElements = menu.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements.length) return;

      var firstFocusable = focusableElements[0];
      var lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if focus is on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab: if focus is on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

/* ====================================================================
   Task 11: Scroll Animations (IntersectionObserver)
   ==================================================================== */
function initScrollAnimations() {
  var elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback for older browsers
    elements.forEach(function(el) { el.classList.add('is-visible'); });
  }
}

/* ====================================================================
   Task 12: Events Loader
   ==================================================================== */
function initEventsLoader() {
  var grid = document.getElementById('events-grid');
  var emptyState = document.getElementById('events-empty');
  if (!grid) return;

  fetch('data/events.json')
    .then(function(response) {
      if (!response.ok) throw new Error('Failed to load events');
      return response.json();
    })
    .then(function(events) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      // Filter out past events and sort by date ascending
      var upcoming = events.filter(function(event) {
        var eventDate = new Date(event.date + 'T00:00:00');
        return eventDate >= today;
      }).sort(function(a, b) {
        return new Date(a.date + 'T00:00:00') - new Date(b.date + 'T00:00:00');
      });

      if (upcoming.length === 0) {
        if (emptyState) emptyState.style.display = '';
        return;
      }

      upcoming.forEach(function(event) {
        var card = buildEventCard(event);
        grid.appendChild(card);
      });

      // Re-run scroll animations for newly added event cards
      initScrollAnimations();
    })
    .catch(function(err) {
      console.error('Events loader error:', err);
      if (emptyState) emptyState.style.display = '';
    });
}

function buildEventCard(event) {
  var eventDate = new Date(event.date + 'T00:00:00');

  // Card wrapper
  var card = document.createElement('div');
  card.className = 'event-card animate-on-scroll';

  // Date block
  var dateBlock = document.createElement('div');
  dateBlock.className = 'event-date';

  var monthSpan = document.createElement('span');
  monthSpan.className = 'event-month';
  monthSpan.textContent = eventDate.toLocaleDateString('en-US', { month: 'short' });

  var daySpan = document.createElement('span');
  daySpan.className = 'event-day';
  daySpan.textContent = eventDate.getDate();

  dateBlock.appendChild(monthSpan);
  dateBlock.appendChild(daySpan);

  // Details block
  var details = document.createElement('div');
  details.className = 'event-details';

  var title = document.createElement('h3');
  title.textContent = event.title;

  var location = document.createElement('p');
  location.className = 'event-location';
  var locationIcon = document.createElement('i');
  locationIcon.className = 'fa-solid fa-location-dot';
  location.appendChild(locationIcon);
  location.appendChild(document.createTextNode(' ' + event.location));

  var desc = document.createElement('p');
  desc.className = 'event-desc';
  desc.textContent = event.description;

  details.appendChild(title);
  details.appendChild(location);
  details.appendChild(desc);

  // Optional link
  if (event.url) {
    var link = document.createElement('a');
    link.className = 'event-link';
    link.href = event.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Learn More \u2192';
    details.appendChild(link);
  }

  card.appendChild(dateBlock);
  card.appendChild(details);

  return card;
}

/* ====================================================================
   Task 13: Active Nav Link Highlighting
   ==================================================================== */
function initActiveNav() {
  var sections = document.querySelectorAll('#about, #events, #join');
  var navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var sectionId = entry.target.getAttribute('id');

        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

  sections.forEach(function(section) { observer.observe(section); });
}

/* Nav scroll background */
function initNavScroll() {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Check on load
  updateNav();

  // Check on scroll
  window.addEventListener('scroll', updateNav, { passive: true });
}
