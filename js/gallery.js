// Gallery JavaScript
document.addEventListener('DOMContentLoaded', function () {

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const loadMoreBtn = document.querySelector('.load-more-btn');

  // Modal elements
  const modal = document.getElementById('imageModal');
  const modalImage = modal.querySelector('.modal-image');
  const modalTitle = modal.querySelector('.modal-title');
  const modalClose = modal.querySelector('.modal-close');
  const modalPrev = modal.querySelector('.modal-prev');
  const modalNext = modal.querySelector('.modal-next');

  let currentImageIndex = 0;
  let currentFilter = 'all';
  let visibleImages = [];

  // Initialize gallery
  initGallery();

  function initGallery() {
    updateVisibleImages();
    setupEventListeners();
    // Initially show first 9 items
    showItems(9);
  }

  function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', handleFilter);
    });

    // View buttons
    document.querySelectorAll('.view-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => openModal(index));
    });

    // Modal controls
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', prevImage);
    modalNext.addEventListener('click', nextImage);

    // Load more button
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', loadMoreImages);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === modal.querySelector('.modal-overlay')) {
        closeModal();
      }
    });
  }

  function handleFilter(e) {
    const filter = e.target.getAttribute('data-filter');

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filter items
    currentFilter = filter;
    filterItems(filter);
    updateVisibleImages();

    // Reset load more
    showItems(9);
  }

  function filterItems(filter) {
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.classList.remove('hide');
          item.classList.add('show');
        }, 10);
      } else {
        item.classList.remove('show');
        item.classList.add('hide');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => {
      const category = item.getAttribute('data-category');
      return currentFilter === 'all' || category === currentFilter;
    });
  }

  function showItems(count) {
    const items = Array.from(galleryItems).filter(item => {
      const category = item.getAttribute('data-category');
      return currentFilter === 'all' || category === currentFilter;
    });

    items.forEach((item, index) => {
      if (index < count) {
        item.style.display = 'block';
        item.classList.add('show');
      } else {
        item.style.display = 'none';
      }
    });

    // Update load more button
    if (loadMoreBtn) {
      if (count >= items.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  }

  function loadMoreImages() {
    const visibleCount = Array.from(galleryItems)
      .filter(item => item.style.display !== 'none').length;

    showItems(visibleCount + 6);

    // Animate new items
    const newItems = Array.from(galleryItems)
      .slice(visibleCount, visibleCount + 6);

    newItems.forEach((item, index) => {
      if (item.style.display !== 'none') {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
          item.style.transition = 'all 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }

  function openModal(index) {
    const item = visibleImages[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.overlay-content h3').textContent;
    const subtitle = item.querySelector('.overlay-content p').textContent;

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = `${title} - ${subtitle}`;

    currentImageIndex = index;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Animate modal
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.transition = 'opacity 0.3s ease';
      modal.style.opacity = '1';
    }, 10);
  }

  function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }

  function prevImage() {
    currentImageIndex = currentImageIndex > 0 ?
      currentImageIndex - 1 :
      visibleImages.length - 1;
    updateModalImage();
  }

  function nextImage() {
    currentImageIndex = currentImageIndex < visibleImages.length - 1 ?
      currentImageIndex + 1 :
      0;
    updateModalImage();
  }

  function updateModalImage() {
    const item = visibleImages[currentImageIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.overlay-content h3').textContent;
    const subtitle = item.querySelector('.overlay-content p').textContent;

    // Fade out
    modalImage.style.opacity = '0';

    setTimeout(() => {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalTitle.textContent = `${title} - ${subtitle}`;

      // Fade in
      modalImage.style.opacity = '1';
    }, 150);
  }

  function handleKeyboard(e) {
    if (modal.style.display === 'block') {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    }
  }

  // Lazy loading for images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  // Observe all images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  // Smooth scroll for filter buttons
  const filterContainer = document.querySelector('.filter-buttons');
  if (filterContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    filterContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - filterContainer.offsetLeft;
      scrollLeft = filterContainer.scrollLeft;
    });

    filterContainer.addEventListener('mouseleave', () => {
      isDown = false;
    });

    filterContainer.addEventListener('mouseup', () => {
      isDown = false;
    });

    filterContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - filterContainer.offsetLeft;
      const walk = (x - startX) * 2;
      filterContainer.scrollLeft = scrollLeft - walk;
    });
  }

  // Auto-load more on scroll (infinite scroll)
  let loading = false;

  function handleInfiniteScroll() {
    if (loading) return;

    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 1000) {
      loading = true;

      setTimeout(() => {
        if (loadMoreBtn && loadMoreBtn.style.display !== 'none') {
          loadMoreImages();
        }
        loading = false;
      }, 500);
    }
  }

  window.addEventListener('scroll', handleInfiniteScroll);
});

// Gallery animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe gallery items for animation
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    galleryObserver.observe(item);
  });
});
