// Contact page functionality
document.addEventListener('DOMContentLoaded', function () {

  // Form elements
  const contactForm = document.querySelector('.contact-form');
  const formWrapper = document.querySelector('.form-wrapper');
  const successMessage = document.querySelector('.success-message');
  const submitBtn = document.querySelector('.submit-btn');

  // Form validation
  const formFields = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    phone: document.querySelector('#phone'),
    subject: document.querySelector('#subject'),
    service: document.querySelector('#service'),
    message: document.querySelector('#message')
  };

  // Initialize form functionality
  initFormValidation();
  initCharacterCounters();
  initModals();
  initPhoneMask();

  // Form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Form validation initialization
  function initFormValidation() {
    Object.keys(formFields).forEach(fieldName => {
      const field = formFields[fieldName];
      if (field) {
        field.addEventListener('blur', () => validateField(fieldName));
        field.addEventListener('input', () => clearFieldError(fieldName));
      }
    });
  }

  // Validate individual field
  function validateField(fieldName) {
    const field = formFields[fieldName];
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Nome é obrigatório';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Nome deve ter pelo menos 2 caracteres';
          isValid = false;
        }
        break;

      case 'email':
        if (!value) {
          errorMessage = 'Email é obrigatório';
          isValid = false;
        } else if (!isValidEmail(value)) {
          errorMessage = 'Email inválido';
          isValid = false;
        }
        break;

      case 'phone':
        if (!value) {
          errorMessage = 'Telefone é obrigatório';
          isValid = false;
        } else if (!isValidPhone(value)) {
          errorMessage = 'Telefone inválido';
          isValid = false;
        }
        break;

      case 'subject':
        if (!value) {
          errorMessage = 'Assunto é obrigatório';
          isValid = false;
        }
        break;

      case 'service':
        if (!value) {
          errorMessage = 'Selecione um serviço';
          isValid = false;
        }
        break;

      case 'message':
        if (!value) {
          errorMessage = 'Mensagem é obrigatória';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
          isValid = false;
        }
        break;
    }

    showFieldError(fieldName, isValid ? '' : errorMessage);
    return isValid;
  }

  // Show field error
  function showFieldError(fieldName, message) {
    const field = formFields[fieldName];
    const formGroup = field.closest('.form-group');
    let errorElement = formGroup.querySelector('.form-error');

    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'form-error';
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;

    if (message) {
      field.classList.add('error');
      errorElement.classList.add('show');
    } else {
      field.classList.remove('error');
      errorElement.classList.remove('show');
    }
  }

  // Clear field error
  function clearFieldError(fieldName) {
    const field = formFields[fieldName];
    field.classList.remove('error');
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation
  function isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  // Phone mask
  function initPhoneMask() {
    const phoneField = formFields.phone;
    if (phoneField) {
      phoneField.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
          if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
          } else {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
          }
        }

        e.target.value = value;
      });
    }
  }

  // Character counters
  function initCharacterCounters() {
    const messageField = formFields.message;
    const subjectField = formFields.subject;

    if (messageField) {
      addCharacterCounter(messageField, 500);
    }

    if (subjectField) {
      addCharacterCounter(subjectField, 100);
    }
  }

  // Add character counter to field
  function addCharacterCounter(field, maxLength) {
    const formGroup = field.closest('.form-group');
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `0/${maxLength}`;
    formGroup.appendChild(counter);

    field.addEventListener('input', function () {
      const currentLength = this.value.length;
      counter.textContent = `${currentLength}/${maxLength}`;

      if (currentLength > maxLength) {
        counter.style.color = '#ef4444';
        this.value = this.value.substring(0, maxLength);
        counter.textContent = `${maxLength}/${maxLength}`;
      } else if (currentLength > maxLength * 0.9) {
        counter.style.color = '#f59e0b';
      } else {
        counter.style.color = '#6b7280';
      }
    });
  }

  // Form submission
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    Object.keys(formFields).forEach(fieldName => {
      if (!validateField(fieldName)) {
        isFormValid = false;
      }
    });

    // Check privacy policy agreement
    const privacyCheck = document.querySelector('#privacy');
    if (privacyCheck && !privacyCheck.checked) {
      showNotification('Você deve aceitar a política de privacidade', 'error');
      isFormValid = false;
    }

    if (!isFormValid) {
      showNotification('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    // Show loading state
    setSubmitButtonLoading(true);

    try {
      // Simulate form submission (replace with actual API call)
      await simulateFormSubmission();

      // Show success message
      showSuccessMessage();

      // Send to WhatsApp
      setTimeout(() => {
        sendToWhatsApp();
      }, 2000);

    } catch (error) {
      console.error('Form submission error:', error);
      showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
      setSubmitButtonLoading(false);
    }
  }

  // Simulate form submission
  function simulateFormSubmission() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  // Set submit button loading state
  function setSubmitButtonLoading(loading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (loading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  // Show success message
  function showSuccessMessage() {
    contactForm.style.display = 'none';
    successMessage.classList.add('show');

    // Add confetti effect
    createConfettiEffect();

    // Reset form after success
    const newMessageBtn = successMessage.querySelector('.btn-new-message');
    newMessageBtn.addEventListener('click', resetForm);
  }

  // Reset form
  function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'block';
    successMessage.classList.remove('show');
    setSubmitButtonLoading(false);

    // Clear all errors
    Object.keys(formFields).forEach(fieldName => {
      clearFieldError(fieldName);
    });

    // Reset character counters
    const counters = document.querySelectorAll('.char-counter');
    counters.forEach(counter => {
      const maxLength = counter.textContent.split('/')[1];
      counter.textContent = `0/${maxLength}`;
      counter.style.color = '#6b7280';
    });
  }

  // Send to WhatsApp
  function sendToWhatsApp() {
    const formData = {
      name: formFields.name.value,
      email: formFields.email.value,
      phone: formFields.phone.value,
      subject: formFields.subject.value,
      service: formFields.service.value,
      message: formFields.message.value
    };

    const whatsappMessage = formatWhatsAppMessage(formData);
    const whatsappURL = `https://wa.me/5517982126171?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');
  }

  // Format WhatsApp message
  function formatWhatsAppMessage(data) {
    return `🏋️‍♂️ *Nova Solicitação de Contato*

👤 *Nome:* ${data.name}
📧 *Email:* ${data.email}
📱 *Telefone:* ${data.phone}
📋 *Assunto:* ${data.subject}
💪 *Serviço:* ${data.service}

💬 *Mensagem:*
${data.message}

---
_Enviado através do site_`;
  }

  // Confetti effect
  function createConfettiEffect() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10000;
        `;
    document.body.appendChild(confettiContainer);

    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      createConfettiPiece(confettiContainer);
    }

    // Remove confetti after animation
    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 3000);
  }

  // Create individual confetti piece
  function createConfettiPiece(container) {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const confetti = document.createElement('div');

    confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        `;

    container.appendChild(confetti);
  }

  // Modal functionality
  function initModals() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');

    // Open modals
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          openModal(modal);
        }
      });
    });

    // Close modals
    modalCloses.forEach(close => {
      close.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
          closeModal(modal);
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          closeModal(openModal);
        }
      }
    });
  }

  // Open modal
  function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
      notification.remove();
    });

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      removeNotification(notification);
    });

    // Auto remove
    setTimeout(() => {
      removeNotification(notification);
    }, 5000);
  }

  // Remove notification
  function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Get notification icon
  function getNotificationIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-triangle',
      warning: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }

  // Get notification color
  function getNotificationColor(type) {
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return colors[type] || colors.info;
  }

  // Copy to clipboard functionality
  function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = element.innerHTML;
      element.innerHTML = '<i class="fas fa-check"></i> Copiado!';
      element.style.color = '#10b981';

      setTimeout(() => {
        element.innerHTML = originalText;
        element.style.color = '';
      }, 2000);
    }).catch(() => {
      showNotification('Erro ao copiar', 'error');
    });
  }

  // Add copy functionality to contact info
  const copyableElements = document.querySelectorAll('[data-copy]');
  copyableElements.forEach(element => {
    element.addEventListener('click', function () {
      const textToCopy = this.getAttribute('data-copy');
      copyToClipboard(textToCopy, this);
    });

    element.style.cursor = 'pointer';
    element.title = 'Clique para copiar';
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add confetti animation CSS
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 50%;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;

document.head.appendChild(confettiStyles);
