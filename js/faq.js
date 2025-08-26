// FAQ JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {

  // FAQ Toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const faqItem = this.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach(item => {
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

  // Category filtering
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
    card.addEventListener('click', function () {
      const category = this.dataset.category;

      // Update active category
      categoryCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      // Filter FAQ items
      filterFAQs(category);
    });
  });

  function filterFAQs(category) {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const itemCategory = item.dataset.category;

      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
        // Trigger animation
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  // Search functionality
  const searchInput = document.querySelector('#faq-search');
  const searchBtn = document.querySelector('.search-btn');
  const searchSuggestions = document.querySelector('.search-suggestions');

  if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        handleSearch(this.value);
      }, 300);
    });

    searchInput.addEventListener('focus', function () {
      showPopularSearches();
    });

    searchInput.addEventListener('blur', function () {
      setTimeout(() => {
        hideSuggestions();
      }, 200);
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', function () {
        handleSearch(searchInput.value);
      });
    }

    // Handle Enter key
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        handleSearch(this.value);
      }
    });
  }

  function handleSearch(query) {
    if (!query.trim()) {
      showAllFAQs();
      return;
    }

    const faqItems = document.querySelectorAll('.faq-item');
    const searchTerm = query.toLowerCase();
    let foundResults = false;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
      const answer = item.querySelector('.answer-content').textContent.toLowerCase();

      if (question.includes(searchTerm) || answer.includes(searchTerm)) {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';

        // Highlight search terms
        highlightSearchTerm(item, searchTerm);
        foundResults = true;
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
      }
    });

    // Show no results message if needed
    if (!foundResults) {
      showNoResults(query);
    } else {
      hideNoResults();
    }

    hideSuggestions();
  }

  function highlightSearchTerm(item, term) {
    const question = item.querySelector('.faq-question h3');
    const answer = item.querySelector('.answer-content');

    // Remove previous highlights
    question.innerHTML = question.textContent;

    // Add new highlights
    const regex = new RegExp(`(${term})`, 'gi');
    question.innerHTML = question.innerHTML.replace(regex, '<mark>$1</mark>');
  }

  function showAllFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      item.style.display = 'block';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';

      // Remove highlights
      const question = item.querySelector('.faq-question h3');
      if (question.querySelector('mark')) {
        question.innerHTML = question.textContent;
      }
    });

    hideNoResults();
  }

  function showPopularSearches() {
    const popularSearches = [
      'preço personal trainer',
      'como funciona treino online',
      'resultados em quanto tempo',
      'treino em casa',
      'avaliação física'
    ];

    const suggestionsHTML = popularSearches.map(search =>
      `<div class="suggestion-item" data-search="${search}">
                <i class="fas fa-search"></i>
                <span>${search}</span>
            </div>`
    ).join('');

    searchSuggestions.innerHTML = `
            <div class="suggestions-header">Pesquisas populares:</div>
            ${suggestionsHTML}
        `;

    searchSuggestions.style.display = 'block';

    // Add click handlers to suggestions
    document.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', function () {
        const searchTerm = this.dataset.search;
        searchInput.value = searchTerm;
        handleSearch(searchTerm);
      });
    });
  }

  function hideSuggestions() {
    if (searchSuggestions) {
      searchSuggestions.style.display = 'none';
    }
  }

  function showNoResults(query) {
    let noResultsDiv = document.querySelector('.no-results');

    if (!noResultsDiv) {
      noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'no-results';
      document.querySelector('.faq-items').appendChild(noResultsDiv);
    }

    noResultsDiv.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>Nenhum resultado encontrado</h3>
                <p>Não encontramos nenhuma pergunta para "<strong>${query}</strong>"</p>
                <div class="no-results-actions">
                    <button class="btn-clear-search" onclick="clearSearch()">
                        <i class="fas fa-times"></i>
                        Limpar busca
                    </button>
                    <a href="https://wa.me/5517982126171?text=Olá! Tenho uma dúvida sobre: ${encodeURIComponent(query)}" 
                       class="btn-ask-question" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                        Fazer pergunta
                    </a>
                </div>
            </div>
        `;

    noResultsDiv.style.display = 'block';
  }

  function hideNoResults() {
    const noResultsDiv = document.querySelector('.no-results');
    if (noResultsDiv) {
      noResultsDiv.style.display = 'none';
    }
  }

  // Smooth scrolling for popular questions
  const popularItems = document.querySelectorAll('.popular-item');

  popularItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Open the FAQ item
        targetElement.classList.add('active');

        // Scroll to it
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Add highlight effect
        targetElement.style.border = '2px solid var(--accent-orange)';
        setTimeout(() => {
          targetElement.style.border = '';
        }, 2000);
      }
    });
  });

  // Analytics tracking for FAQ interactions
  function trackFAQInteraction(action, question) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': 'FAQ',
        'event_label': question,
        'value': 1
      });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'FAQ_Interaction', {
        action: action,
        question: question
      });
    }
  }

  // Track FAQ opens
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const question = this.closest('.faq-item').querySelector('h3').textContent;
      trackFAQInteraction('FAQ_Open', question);
    });
  });

  // Track searches
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        trackFAQInteraction('FAQ_Search', this.value);
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Close all open FAQs
      faqItems.forEach(item => {
        item.classList.remove('active');
      });

      // Clear search
      if (searchInput && searchInput.value) {
        searchInput.value = '';
        showAllFAQs();
      }
    }
  });

  // Auto-expand FAQ from URL hash
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement && targetElement.classList.contains('faq-item')) {
      setTimeout(() => {
        targetElement.classList.add('active');
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 500);
    }
  }

  // Intersection Observer for animations
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

  // Initialize FAQ items for animation
  faqItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    faqObserver.observe(item);
  });

  // Category cards animation
  categoryCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    faqObserver.observe(card);
  });

  // Initialize first category as active
  if (categoryCards.length > 0) {
    categoryCards[0].classList.add('active');
  }

  // Print functionality (optional)
  function printFAQ(faqId) {
    const faqItem = document.getElementById(faqId);
    if (faqItem) {
      const printContent = faqItem.outerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
                <html>
                    <head>
                        <title>FAQ - Personal Trainer Guilherme Matheus</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .faq-item { border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
                            .faq-question h3 { color: #1e40af; margin-bottom: 15px; }
                            .answer-content { line-height: 1.6; }
                        </style>
                    </head>
                    <body>
                        ${printContent}
                    </body>
                </html>
            `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  // Share FAQ functionality
  function shareFAQ(faqId) {
    const faqItem = document.getElementById(faqId);
    if (faqItem) {
      const question = faqItem.querySelector('h3').textContent;
      const url = `${window.location.origin}${window.location.pathname}#${faqId}`;

      if (navigator.share) {
        navigator.share({
          title: question,
          text: `Confira esta pergunta frequente: ${question}`,
          url: url
        });
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(url).then(() => {
          showToast('Link copiado para a área de transferência!');
        });
      }
    }
  }

  // Toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-blue);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInUp 0.3s ease;
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Export functions to global scope for inline handlers
  window.clearSearch = function () {
    if (searchInput) {
      searchInput.value = '';
      showAllFAQs();
      searchInput.focus();
    }
  };

  window.printFAQ = printFAQ;
  window.shareFAQ = shareFAQ;
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .faq-item mark {
        background: #fef08a;
        color: #374151;
        padding: 2px 4px;
        border-radius: 3px;
    }
    
    .no-results {
        text-align: center;
        padding: 3rem;
        background: #f8fafc;
        border-radius: 15px;
        margin: 2rem 0;
    }
    
    .no-results i {
        font-size: 3rem;
        color: #9ca3af;
        margin-bottom: 1rem;
    }
    
    .no-results h3 {
        color: #374151;
        margin-bottom: 0.5rem;
    }
    
    .no-results p {
        color: #6b7280;
        margin-bottom: 2rem;
    }
    
    .no-results-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .btn-clear-search,
    .btn-ask-question {
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .btn-clear-search {
        background: #e5e7eb;
        color: #374151;
        border: none;
        cursor: pointer;
    }
    
    .btn-clear-search:hover {
        background: #d1d5db;
    }
    
    .btn-ask-question {
        background: #25d366;
        color: white;
    }
    
    .btn-ask-question:hover {
        background: #20c55e;
        transform: translateY(-2px);
    }
    
    .search-suggestions {
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        padding: 1rem;
        max-height: 300px;
        overflow-y: auto;
    }
    
    .suggestions-header {
        font-weight: 600;
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .suggestion-item {
        padding: 0.8rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        color: #374151;
    }
    
    .suggestion-item:hover {
        background: #f3f4f6;
    }
    
    .suggestion-item i {
        color: #9ca3af;
        font-size: 0.9rem;
    }
`;

document.head.appendChild(style);
