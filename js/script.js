// =========================================================
// JAVASCRIPT COMPLETO - GUILHERME MATHEUS PERSONAL
// Versão Final com Active Link Corrigido
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // =====================================================
  // MENU MOBILE MELHORADO
  // =====================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-link');
  let isMenuOpen = false;

  // Criar overlay para fechar menu clicando fora
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    isMenuOpen = true;
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  }

  if (hamburger && navMenu) {
    // Toggle menu
    hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fechar menu clicando no overlay
    overlay.addEventListener('click', closeMenu);

    // Fechar menu com ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        // Se for um link interno (#), não fechar o menu
        if (!this.getAttribute('href').startsWith('#')) {
          closeMenu();
        }
      });
    });
  }

  // =====================================================
  // SISTEMA ACTIVE LINK SIMPLIFICADO E FUNCIONAL
  // =====================================================

  function getCurrentPage() {
    let currentPath = window.location.pathname;
    let currentFile = currentPath.split('/').pop();

    // Se não há arquivo ou é index.html, retornar 'home'
    if (!currentFile || currentFile === '' || currentFile === 'index.html') {
      return 'home';
    }

    // Remover extensão .html
    return currentFile.replace('.html', '');
  }

  function setActiveLink() {
    const currentPage = getCurrentPage();

    // Remover active de todos os links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Encontrar e ativar o link correto
    const activeLink = document.querySelector(`[data-page="${currentPage}"]`) ||
      document.querySelector(`[href="${currentPage}.html"]`) ||
      document.querySelector(`[href="index.html"]`);

    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // =====================================================
  // HEADER SCROLL EFFECT
  // =====================================================
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }
  });

  // =====================================================
  // SMOOTH SCROLLING MELHORADO
  // =====================================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();

        // Fechar menu se estiver aberto
        if (isMenuOpen) {
          closeMenu();
          setTimeout(() => scrollToTarget(target), 300);
        } else {
          scrollToTarget(target);
        }
      }
    });
  });

  function scrollToTarget(target) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  function getCurrentPage() {
    let currentPath = window.location.pathname;
    let currentFile = currentPath.split('/').pop();

    // Se não há arquivo ou é index.html, retornar 'home'
    if (!currentFile || currentFile === '' || currentFile === 'index.html') {
      return 'home';
    }

    // Remover extensão .html
    return currentFile.replace('.html', '');
  }

  function setActiveLink() {
    const currentPage = getCurrentPage();

    // Remover active de todos os links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Encontrar e ativar o link correto
    const activeLink = document.querySelector(`[data-page="${currentPage}"]`) ||
      document.querySelector(`[href="${currentPage}.html"]`) ||
      document.querySelector(`[href="index.html"]`);

    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  // =====================================================
  // INTERSECTION OBSERVER PARA ANIMAÇÕES
  // =====================================================
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

  const animateElements = document.querySelectorAll('.benefit-card, .specialty-card, .testimonial-card');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // =====================================================
  // FORMULÁRIOS MELHORADOS
  // =====================================================
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });

  function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');

    // Guardar texto original
    if (submitBtn && !submitBtn.hasAttribute('data-original-text')) {
      submitBtn.setAttribute('data-original-text', submitBtn.innerHTML);
    }

    // Loading state
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
    }

    // Validar
    if (!validateForm(form)) {
      resetSubmitButton(submitBtn);
      return;
    }

    // Simular envio (substituir por endpoint real)
    setTimeout(() => {
      showAlert('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.reset();
      resetSubmitButton(submitBtn);
    }, 2000);
  }

  function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        showFieldError(field, 'Este campo é obrigatório');
        isValid = false;
      } else {
        clearFieldError(field);

        if (field.type === 'email' && !isValidEmail(field.value)) {
          showFieldError(field, 'Email inválido');
          isValid = false;
        }

        if (field.type === 'tel' && !isValidPhone(field.value)) {
          showFieldError(field, 'Telefone inválido');
          isValid = false;
        }
      }
    });

    return isValid;
  }

  // =====================================================
  // VALIDAÇÃO HELPERS
  // =====================================================
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) || cleanPhone.length >= 10;
  }

  function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      font-weight: 500;
    `;

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

  // =====================================================
  // SISTEMA DE ALERTAS
  // =====================================================
  function showAlert(type, message) {
    // Remover alerta existente
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
      <div class="alert-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="alert-close" onclick="this.closest('.alert').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    // Estilos inline para garantir funcionamento
    alertDiv.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 10000;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 350px;
    `;

    document.body.appendChild(alertDiv);

    // Animar entrada
    setTimeout(() => {
      alertDiv.style.transform = 'translateX(0)';
    }, 100);

    // Auto remover
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.style.transform = 'translateX(400px)';
        setTimeout(() => alertDiv.remove(), 300);
      }
    }, 5000);
  }

  // =====================================================
  // BOTÃO SCROLL TO TOP
  // =====================================================
  const scrollBtn = document.createElement('div');
  scrollBtn.className = 'scroll-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.style.cssText = `
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary-blue);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  `;

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

  // =====================================================
  // WHATSAPP TRACKING
  // =====================================================
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'WhatsApp',
          'event_label': 'Contact Button'
        });
      }
      console.log('WhatsApp click tracked');
    });
  });

  // =====================================================
  // FORMATAÇÃO DE TELEFONE
  // =====================================================
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

  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => formatPhone(input));
  });

  // =====================================================
  // LAZY LOADING OTIMIZADO
  // =====================================================
  const images = document.querySelectorAll('img[data-src]');

  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // =====================================================
  // PERFORMANCE MONITORING
  // =====================================================
  window.addEventListener('load', function () {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime, 'ms');

    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        'name': 'page_load',
        'value': loadTime
      });
    }

    if (loadTime > 3000) {
      console.warn('Page load time is slow. Consider optimizing images and scripts.');
    }
  });

  console.log('Personal Trainer website initialized successfully!');
});

// =====================================================
// FUNÇÕES GLOBAIS (podem ser chamadas de qualquer lugar)
// =====================================================

// Para uso em formulários específicos se necessário
window.showAlert = function (type, message) {
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <div class="alert-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
      <button class="alert-close" onclick="this.closest('.alert').remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  alertDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 10000;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 350px;
  `;

  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.style.transform = 'translateX(0)', 100);
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.style.transform = 'translateX(400px)';
      setTimeout(() => alertDiv.remove(), 300);
    }
  }, 5000);
};
