// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255,255,255,0.98)';
      header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.background = 'rgba(255,255,255,0.95)';
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.benefit-card, .specialty-card, .testimonial-card');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Form validation and submission
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });

  // Scroll to top button
  createScrollToTopButton();

  // WhatsApp click tracking
  trackWhatsAppClicks();

  // Performance optimization - lazy loading
  implementLazyLoading();
});

// Form submission handler
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');

  // Show loading state
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
  }

  // Validate form
  if (!validateForm(form)) {
    resetSubmitButton(submitBtn);
    return;
  }

  // Simulate form submission (replace with actual endpoint)
  setTimeout(() => {
    showAlert('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.reset();
    resetSubmitButton(submitBtn);
  }, 2000);
}

// Form validation
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'Este campo é obrigatório');
      isValid = false;
    } else {
      clearFieldError(field);

      // Email validation
      if (field.type === 'email' && !isValidEmail(field.value)) {
        showFieldError(field, 'Email inválido');
        isValid = false;
      }

      // Phone validation
      if (field.type === 'tel' && !isValidPhone(field.value)) {
        showFieldError(field, 'Telefone inválido');
        isValid = false;
      }
    }
  });

  return isValid;
}

// Validation helpers
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone) || phone.replace(/\D/g, '').length >= 10;
}

function showFieldError(field, message) {
  clearFieldError(field);
  field.classList.add('error');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.color = '#dc3545';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';

  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

function resetSubmitButton(btn) {
  if (btn) {
    btn.innerHTML = btn.getAttribute('data-original-text') || 'Enviar';
    btn.disabled = false;
  }
}

// Alert system
function showAlert(type, message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Insert at top of page
  const main = document.querySelector('main') || document.body;
  main.insertAdjacentElement('afterbegin', alertDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Scroll to top button
function createScrollToTopButton() {
  const scrollBtn = document.createElement('div');
  scrollBtn.className = 'scroll-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.style.display = 'none';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// WhatsApp click tracking
function trackWhatsAppClicks() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Track with Google Analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'WhatsApp',
          'event_label': 'Contact Button'
        });
      }
    });
  });
}

// Lazy loading implementation
function implementLazyLoading() {
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
}

// Phone number formatter
function formatPhone(input) {
  let value = input.value.replace(/\D/g, '');

  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (value.length >= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (value.length >= 6) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (value.length >= 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  }

  input.value = value;
}

// Add phone formatting to tel inputs
document.addEventListener('DOMContentLoaded', function () {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => formatPhone(input));
  });
});

// Cookie consent (LGPD compliance)
function initCookieConsent() {
  if (!localStorage.getItem('cookieConsent')) {
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <a href="politica-privacidade.html">Política de Privacidade</a>.</p>
                <button class="btn btn-primary" onclick="acceptCookies()">Aceitar</button>
            </div>
        `;
    cookieBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--dark-navy);
            color: white;
            padding: 1rem;
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(cookieBanner);

    setTimeout(() => {
      cookieBanner.style.transform = 'translateY(0)';
    }, 1000);
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  const banner = document.querySelector('.cookie-banner');
  if (banner) {
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 300);
  }
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', initCookieConsent);

// Performance monitoring
window.addEventListener('load', function () {
  // Monitor page load time
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log('Page load time:', loadTime, 'ms');

  // Track with analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
      'name': 'page_load',
      'value': loadTime
    });
  }
});
