// Main JavaScript file for Personal Gui website
document.addEventListener('DOMContentLoaded', function () {

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  });

  // WhatsApp tooltip
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  const whatsappTooltip = document.querySelector('.whatsapp-tooltip');

  if (whatsappBtn && whatsappTooltip) {
    let tooltipTimeout;

    whatsappBtn.addEventListener('mouseenter', function () {
      clearTimeout(tooltipTimeout);
      whatsappTooltip.style.opacity = '1';
      whatsappTooltip.style.visibility = 'visible';
      whatsappTooltip.style.transform = 'translateX(-100%) scale(1)';
    });

    whatsappBtn.addEventListener('mouseleave', function () {
      tooltipTimeout = setTimeout(() => {
        whatsappTooltip.style.opacity = '0';
        whatsappTooltip.style.visibility = 'hidden';
        whatsappTooltip.style.transform = 'translateX(-100%) scale(0.8)';
      }, 300);
    });
  }

  // Form validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[\d\s\(\)\-\+]{10,}$/;
    return re.test(phone);
  }

  // Make validation functions global
  window.validateEmail = validateEmail;
  window.validatePhone = validatePhone;

  // Loading animation for buttons
  function addLoadingToButton(button, text = 'Carregando...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<span class="loading-spinner"></span> ${text}`;
    button.disabled = true;

    return function () {
      button.innerHTML = originalText;
      button.disabled = false;
    };
  }

  window.addLoadingToButton = addLoadingToButton;

  // Image lazy loading
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => elementObserver.observe(el));

  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  // Counter animation
  function animateCounter(element, start, end, duration = 2000) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = current;

      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Animate counters when they come into view
  const counters = document.querySelectorAll('.stat-number, .counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = entry.target;
        const endValue = parseInt(target.textContent.replace(/[^\d]/g, ''));

        if (endValue) {
          animateCounter(target, 0, endValue);
          target.classList.add('counted');
        }
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
});

// Utility functions
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  // Auto hide after 5 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    hideNotification(notification);
  });
}

function hideNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    if (notification.parentNode) {
      document.body.removeChild(notification);
    }
  }, 300);
}

// Make utility functions global
window.showNotification = showNotification;
window.hideNotification = hideNotification;

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--white);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-left: 4px solid var(--primary-blue);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    min-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification.notification-success {
    border-left-color: #10b981;
}

.notification.notification-error {
    border-left-color: #ef4444;
}

.notification.notification-warning {
    border-left-color: #f59e0b;
}

.notification-content {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.notification-message {
    flex: 1;
    margin-right: 1rem;
    color: var(--text-dark);
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--text-light);
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    color: var(--text-dark);
}

.loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        min-width: auto;
    }
}
`;

document.head.appendChild(notificationStyles);
