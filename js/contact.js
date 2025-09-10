document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('#contactForm');
  const successMessage = document.querySelector('#successMessage');
  const submitBtn = document.querySelector('#submitBtn');
  const charCount = document.querySelector('#char-count');

  const formFields = {
    nome: document.querySelector('#nome'),
    email: document.querySelector('#email'),
    telefone: document.querySelector('#telefone'),
    idade: document.querySelector('#idade'),
    objetivo: document.querySelector('#objetivo'),
    disponibilidade: document.querySelectorAll('input[name="disponibilidade[]"]'),
    mensagem: document.querySelector('#mensagem')
  };

  // Mascarar telefone
  formFields.telefone.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length <= 11) {
      if (value.length <= 10) value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      else value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    this.value = value;
  });

  // Contador de caracteres
  formFields.mensagem.addEventListener('input', function () {
    let length = this.value.length;
    if (length > 500) this.value = this.value.substring(0, 500);
    charCount.textContent = this.value.length;
  });

  // Validação simples
  function validateField(field) {
    if (!field.value.trim()) {
      field.classList.add('error');
      return false;
    } else {
      field.classList.remove('error');
      return true;
    }
  }

  function validateDisponibilidade() {
    const checked = Array.from(formFields.disponibilidade).some(cb => cb.checked);
    const errorElement = document.getElementById('disponibilidade-error');
    if (!checked) {
      errorElement.textContent = 'Selecione pelo menos uma opção';
      errorElement.style.display = 'block';
      return false;
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      return true;
    }
  }

  // Submissão
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    ['nome', 'email', 'telefone', 'objetivo', 'mensagem'].forEach(name => {
      if (!validateField(formFields[name])) valid = false;
    });
    if (!validateDisponibilidade()) valid = false;

    if (!valid) {
      alert('Por favor, corrija os erros no formulário.');
      return;
    }

    // Exibir sucesso
    contactForm.style.display = 'none';
    successMessage.classList.add('show');

    // Montar mensagem do WhatsApp
    const data = {
      nome: formFields.nome.value,
      email: formFields.email.value,
      telefone: formFields.telefone.value,
      idade: formFields.idade.value || 'Não informado',
      objetivo: formFields.objetivo.options[formFields.objetivo.selectedIndex].text,
      disponibilidade: Array.from(formFields.disponibilidade).filter(cb => cb.checked).map(cb => cb.value).join(', '),
      mensagem: formFields.mensagem.value
    };

    const message = `🏋️‍♂️ *Nova Solicitação de Contato*\n\n` +
      `👤 *Nome:* ${data.nome}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📱 *Telefone:* ${data.telefone}\n` +
      `🎂 *Idade:* ${data.idade}\n` +
      `📋 *Objetivo:* ${data.objetivo}\n` +
      `📅 *Disponibilidade:* ${data.disponibilidade}\n` +
      `💬 *Mensagem:*\n${data.mensagem}\n\n---\n*Enviado através do site*`;

    // Abrir WhatsApp
    window.open(`https://wa.me/5517982126171?text=${encodeURIComponent(message)}`, '_blank');
  });

  // Botão "Nova Mensagem"
  document.querySelector('.btn-new-message').addEventListener('click', function () {
    contactForm.reset();
    contactForm.style.display = 'block';
    successMessage.classList.remove('show');
    charCount.textContent = 0;
    document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
    document.querySelectorAll('input, select, textarea').forEach(f => f.classList.remove('error'));
  });
});
