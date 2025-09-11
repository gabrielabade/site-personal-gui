document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const categoryCards = document.querySelectorAll('.category-card');
  const faqSections = document.querySelectorAll('.faq-section');
  const faqItems = document.querySelectorAll('.faq-item');
  const faqToggles = document.querySelectorAll('.faq-toggle');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  // Category switching with smooth scroll
  categoryCards.forEach(card => {
    card.addEventListener('click', function () {
      const category = this.dataset.category;

      // Update active category
      categoryCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      // Show corresponding section
      faqSections.forEach(section => {
        section.classList.remove('active');
        if (section.dataset.section === category) {
          section.classList.add('active');
        }
      });

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('faq-results').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    });
  });

  // FAQ toggle functionality
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const faqItem = this.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');

      // Close all FAQ items in current section
      const currentSection = faqItem.closest('.faq-section');
      const currentFaqItems = currentSection.querySelectorAll('.faq-item');

      currentFaqItems.forEach(item => {
        item.classList.remove('active');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add('active');

        // Smooth scroll to keep question in view
        setTimeout(() => {
          faqItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }, 300);
      }
    });
  });

  // Scroll indicator
  function updateScrollIndicator() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    scrollIndicator.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollIndicator);

  // Smooth reveal animation for FAQ items
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Initialize animations
  faqItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    faqObserver.observe(item);
  });

  // Category cards animation
  categoryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Auto-expand FAQ from URL hash
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement && targetElement.classList.contains('faq-item')) {
      // Find which section this FAQ belongs to
      const section = targetElement.closest('.faq-section');
      const sectionCategory = section.dataset.section;

      // Activate the correct category
      categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === sectionCategory) {
          card.classList.add('active');
        }
      });

      // Show the correct section
      faqSections.forEach(s => {
        s.classList.remove('active');
        if (s.dataset.section === sectionCategory) {
          s.classList.add('active');
        }
      });

      // Open the FAQ and scroll to it
      setTimeout(() => {
        targetElement.classList.add('active');
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 500);
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Close all open FAQs
      faqItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });

  // Analytics tracking (if available)
  function trackInteraction(action, category, label) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }

    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'FAQ_Interaction', {
        action: action,
        category: category,
        label: label
      });
    }
  }

  // Track category clicks
  categoryCards.forEach(card => {
    card.addEventListener('click', function () {
      const category = this.dataset.category;
      trackInteraction('Category_Select', 'FAQ', category);
    });
  });

  // Track FAQ opens
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const question = this.closest('.faq-item').querySelector('h3').textContent;
      const section = this.closest('.faq-section').dataset.section;
      trackInteraction('FAQ_Open', section, question);
    });
  });
});