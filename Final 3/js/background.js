/**
 * ==============================================================================
 * ANIMATED BACKGROUND WALL CONTROLLER
 * ==============================================================================
 * Distributes 50+ photos across vertical columns with:
 * - Alternating vertical directions (up / down)
 * - Independent animation speeds for parallax depth
 * - Seamless 1:1 cloned tracks for gapless infinite scrolling
 * - Automatic image error handling with graceful fallback styling
 * ==============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initBackgroundWall);

  function initBackgroundWall() {
    const gridContainer = document.getElementById('photo-columns-grid');
    if (!gridContainer) return;

    const bgConfig = (window.CONFIG && window.CONFIG.backgroundWall) || {};
    const photos = bgConfig.photos || [];
    const speeds = bgConfig.columnSpeeds || [52, 68, 44, 60, 48, 64];
    const directions = bgConfig.columnDirections || ['up', 'down', 'up', 'down', 'up', 'down'];

    // Determine column count based on viewport width
    const columnCount = getResponsiveColumnCount();

    // Distribute photos into columns
    const columnsData = Array.from({ length: columnCount }, () => []);
    photos.forEach((photoUrl, index) => {
      const colIdx = index % columnCount;
      columnsData[colIdx].push(photoUrl);
    });

    // Clear existing content
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

    // Aspect ratio patterns for dynamic portfolio look
    const ratioPatterns = ['ratio-portrait', 'ratio-landscape', 'ratio-square', 'ratio-portrait', 'ratio-square'];

    // Build DOM for each column
    columnsData.forEach((colPhotos, colIndex) => {
      const columnEl = document.createElement('div');
      columnEl.className = 'photo-column';

      const trackEl = document.createElement('div');
      const dirClass = directions[colIndex % directions.length] === 'down' ? 'scroll-down' : 'scroll-up';
      trackEl.className = `photo-column-track ${dirClass}`;

      // Set individual speed (duration in seconds)
      const duration = speeds[colIndex % speeds.length] || 50;
      trackEl.style.animationDuration = `${duration}s`;

      // Helper to generate photo cards
      function createCard(url, imgIndex) {
        const card = document.createElement('div');
        const ratioClass = ratioPatterns[(colIndex + imgIndex) % ratioPatterns.length];
        card.className = `bg-photo-card ${ratioClass}`;

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Memory moment ${imgIndex + 1}`;
        img.loading = 'lazy';

        // Error fallback in case of network issue
        img.onerror = function () {
          this.onerror = null;
          // Gradient placeholder fallback with romantic heart icon
          this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23191b26'/%3E%3Cstop offset='50%25' stop-color='%23281c2d'/%3E%3Cstop offset='100%25' stop-color='%2313141f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='38' fill='%23f4d068'%3E%E2%99%A5%3C/text%3E%3C/svg%3E";
        };

        card.appendChild(img);
        return card;
      }

      // 1. Append original sequence
      colPhotos.forEach((url, i) => {
        trackEl.appendChild(createCard(url, i));
      });

      // 2. Append cloned sequence to ensure 100% gapless infinite loop
      colPhotos.forEach((url, i) => {
        trackEl.appendChild(createCard(url, i + colPhotos.length));
      });

      columnEl.appendChild(trackEl);
      gridContainer.appendChild(columnEl);
    });

    // Helper: Column count based on viewport
    function getResponsiveColumnCount() {
      const w = window.innerWidth;
      if (w <= 640) return bgConfig.columnCountMobile || 3;
      if (w <= 1024) return bgConfig.columnCountTablet || 4;
      return bgConfig.columnCountDesktop || 6;
    }

    // Debounced resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newCount = getResponsiveColumnCount();
        if (newCount !== columnCount) {
          initBackgroundWall();
        }
      }, 250);
    });
  }
})();
