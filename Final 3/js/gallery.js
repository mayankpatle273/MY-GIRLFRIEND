/**
 * ==============================================================================
 * 3D ROTATING PHOTO GALLERY & INTERACTIVE MODAL CONTROLLER
 * ==============================================================================
 * Features:
 * - 3D Cylindrical Ring Carousel positioned via CSS 3D transforms
 * - Continuous smooth auto-rotation around central Y-axis (configurable speed)
 * - Desktop hover pause & momentum-based mouse drag
 * - Mobile touch drag / swipe support
 * - Rich Interactive Photo Details Modal with individual titles, dates,
 *   locations, personal memory messages, and prev/next memory navigation
 * ==============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init3DGallery);

  function init3DGallery() {
    const stage = document.getElementById('carousel-stage');
    const ring = document.getElementById('carousel-ring');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');

    // Modal elements
    const modal = document.getElementById('photo-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalImg = document.getElementById('modal-detail-img');
    const modalTitle = document.getElementById('modal-detail-title');
    const modalDate = document.getElementById('modal-detail-date');
    const modalLocation = document.getElementById('modal-detail-location');
    const modalStory = document.getElementById('modal-detail-story');
    const modalCounter = document.getElementById('modal-detail-counter');
    const modalPrev = document.getElementById('modal-step-prev');
    const modalNext = document.getElementById('modal-step-next');

    if (!stage || !ring) return;

    const gConfig = (window.CONFIG && window.CONFIG.gallery) || {};
    const items = gConfig.items || [];
    if (items.length === 0) return;

    const totalItems = items.length;
    const angleStep = 360 / totalItems;
    
    // Dynamic radius calculation based on viewport width
    function getRadius() {
      const w = window.innerWidth;
      if (w < 480) return 240;
      if (w < 768) return 320;
      return gConfig.carouselRadiusPx || 420;
    }

    let radius = getRadius();
    let currentRotation = 0;
    let targetRotation = 0;
    let isHovered = false;
    let isModalOpen = false;
    let isDragging = false;
    let startX = 0;
    let dragDelta = 0;
    let activeItemIndex = 0;

    // Configurable rotation speed (degrees per frame at 60fps)
    const durationSec = gConfig.rotationDurationSec || 28;
    const autoSpeed = (360 / (durationSec * 60));

    // Clear and build cards
    ring.innerHTML = '';

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'carousel-card';
      card.setAttribute('data-index', index);

      const angle = index * angleStep;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="card-overlay">
          <span class="card-date-badge">${item.date || ''}</span>
          <h4 class="card-title-text">${item.title}</h4>
        </div>
      `;

      // Click card to open detail modal
      card.addEventListener('click', (e) => {
        // Prevent click trigger if dragging
        if (Math.abs(dragDelta) > 5) return;
        openMemoryModal(index);
      });

      ring.appendChild(card);
    });

    // Resize listener to re-position cards with updated radius
    window.addEventListener('resize', () => {
      const newRadius = getRadius();
      if (newRadius !== radius) {
        radius = newRadius;
        const cards = ring.querySelectorAll('.carousel-card');
        cards.forEach((card, idx) => {
          const angle = idx * angleStep;
          card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });
      }
    });

    // Main animation loop
    function animate() {
      if (!isHovered && !isModalOpen && !isDragging) {
        targetRotation -= autoSpeed;
      }

      // Smooth interpolation for silky rotation
      currentRotation += (targetRotation - currentRotation) * 0.1;
      ring.style.transform = `rotateY(${currentRotation}deg)`;

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Desktop hover pause
    stage.addEventListener('mouseenter', () => { isHovered = true; });
    stage.addEventListener('mouseleave', () => { isHovered = false; });

    // Drag / Swipe Interactions (Mouse)
    stage.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      dragDelta = 0;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      dragDelta = e.clientX - startX;
      targetRotation += dragDelta * 0.25;
      startX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Drag / Swipe Interactions (Touch for Mobile)
    stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        dragDelta = 0;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      dragDelta = currentX - startX;
      targetRotation += dragDelta * 0.35;
      startX = currentX;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Carousel Navigation Buttons (Step rotation)
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        targetRotation += angleStep;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        targetRotation -= angleStep;
      });
    }

    // =========================================================================
    // INTERACTIVE MODAL DETAILS LOGIC
    // =========================================================================

    function openMemoryModal(index) {
      activeItemIndex = index;

      // Bring clicked photo forward into focused view:
      // Rotate ring so selected photo faces directly forward
      targetRotation = -index * angleStep;
      currentRotation = targetRotation;
      ring.style.transform = `rotateY(${currentRotation}deg)`;

      // Apply focused highlight to the selected card
      const cards = ring.querySelectorAll('.carousel-card');
      cards.forEach((card, idx) => {
        if (idx === index) {
          card.classList.add('focused');
        } else {
          card.classList.remove('focused');
        }
      });

      // Render custom details associated with this specific photo
      renderModalContent();

      // Open the focused popup container
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
      isModalOpen = true;
    }

    function closeMemoryModal() {
      // Remove focused highlight from carousel cards
      const cards = ring.querySelectorAll('.carousel-card');
      cards.forEach(card => card.classList.remove('focused'));

      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
      isModalOpen = false;
    }

    function renderModalContent() {
      const item = items[activeItemIndex];
      if (!item) return;

      if (modalImg) {
        modalImg.src = item.image;
        modalImg.alt = item.title;
      }
      if (modalTitle) modalTitle.textContent = item.title;
      if (modalDate) modalDate.textContent = item.date || 'Timeless Memory';
      if (modalLocation) {
        modalLocation.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span>${item.location || 'Special Location'}</span>
        `;
      }
      if (modalStory) modalStory.textContent = item.memory || '';
      if (modalCounter) {
        modalCounter.textContent = `${activeItemIndex + 1} of ${totalItems}`;
      }
    }

    // Step to Next / Previous Memory inside Modal
    if (modalPrev) {
      modalPrev.addEventListener('click', () => {
        activeItemIndex = (activeItemIndex - 1 + totalItems) % totalItems;
        renderModalContent();
      });
    }

    if (modalNext) {
      modalNext.addEventListener('click', () => {
        activeItemIndex = (activeItemIndex + 1) % totalItems;
        renderModalContent();
      });
    }

    // Modal Close Triggers
    if (modalClose) modalClose.addEventListener('click', closeMemoryModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeMemoryModal();
        }
      });
    }

    // Keyboard support: ESC to close, Left/Right arrow keys for navigation
    window.addEventListener('keydown', (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') {
        closeMemoryModal();
      } else if (e.key === 'ArrowRight') {
        activeItemIndex = (activeItemIndex + 1) % totalItems;
        renderModalContent();
      } else if (e.key === 'ArrowLeft') {
        activeItemIndex = (activeItemIndex - 1 + totalItems) % totalItems;
        renderModalContent();
      }
    });
  }
})();
