// document.addEventListener('DOMContentLoaded', function () {

//   // Seleção de tamanhos
//   const sizeButtons = document.querySelectorAll('.size-option');
//   const buyButtons = document.querySelectorAll('.buy-btn');

//   // Adicionar funcionalidade aos botões de tamanho
//   sizeButtons.forEach(button => {
//     button.addEventListener('click', function () {
//       const card = this.closest('.product-card');
//       const sizeOptions = card.querySelectorAll('.size-option');

//       // Remover seleção anterior
//       sizeOptions.forEach(btn => btn.classList.remove('active'));

//       // Adicionar seleção atual
//       this.classList.add('active');
//     });
//   });

//   // Funcionalidade dos botões de compra
//   buyButtons.forEach(button => {
//     button.addEventListener('click', function () {
//       const card = this.closest('.product-card');
//       const productName = this.dataset.product;
//       const productPrice = this.dataset.price;
//       const selectedSize = card.querySelector('.size-option.active');

//       let message = `Olá! Gostaria de comprar:\n\n*${productName}*\nPreço: R$ ${productPrice}`;

//       if (selectedSize) {
//         message += `\nTamanho: ${selectedSize.dataset.size}`;
//       } else if (card.querySelector('.size-option')) {
//         alert('Por favor, selecione um tamanho antes de comprar.');
//         return;
//       }

//       message += '\n\nPoderia me ajudar com o processo de compra?';

//       const whatsappUrl = `https://wa.me/555517982126171?text=${encodeURIComponent(message)}`;
//       window.open(whatsappUrl, '_blank');
//     });
//   });

//   // Animação de hover nos produtos
//   const productCards = document.querySelectorAll('.product-card');

//   productCards.forEach(card => {
//     card.addEventListener('mouseenter', function () {
//       this.style.transform = 'translateY(-10px)';
//     });

//     card.addEventListener('mouseleave', function () {
//       this.style.transform = 'translateY(0)';
//     });
//   });
// });
