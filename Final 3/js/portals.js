/**
 * ==============================================================================
 * ROMANTIC SURPRISE PORTALS CONTROLLER
 * ==============================================================================
 * Handles the interaction for the two special buttons:
 * 1. "Our Video Memories 🎬" -> cinematic sparkle burst -> navigates to videos.html
 * 2. "A Letter From My Heart 💌" -> romantic heart burst -> navigates to letter.html
 * 
 * Features:
 * - Single-click protection against repeated clicks
 * - Beautiful dynamic particle explosion matching each button's theme
 * - Smooth transition delay (550ms) for high-end cinematic feel
 * ==============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initSurprisePortals);

  function initSurprisePortals() {
    const videoBtn = document.getElementById('btn-portal-videos');
    const letterBtn = document.getElementById('btn-portal-letter');

    let isNavigating = false;

    // Button 1: Our Video Memories 🎬
    if (videoBtn) {
      videoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isNavigating) return;
        isNavigating = true;

        videoBtn.classList.add('clicked-cinema');
        spawnBurstParticles(videoBtn, ['✨', '⭐', '💫', '🎬', '✨']);

        setTimeout(() => {
          window.location.href = videoBtn.getAttribute('data-href') || 'videos.html';
        }, 550);
      });
    }

    // Button 2: A Letter From My Heart 💌
    if (letterBtn) {
      letterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isNavigating) return;
        isNavigating = true;

        letterBtn.classList.add('clicked-heart');
        spawnBurstParticles(letterBtn, ['❤️', '💖', '💗', '🌸', '💌']);

        setTimeout(() => {
          window.location.href = letterBtn.getAttribute('data-href') || 'letter.html';
        }, 550);
      });
    }

    /**
     * Spawns floating particles around the clicked button
     */
    function spawnBurstParticles(btnEl, emojis) {
      const rect = btnEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 14; i++) {
        const particle = document.createElement('span');
        particle.className = 'burst-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        // Random trajectory angle and distance
        const angle = (Math.PI * 2 * i) / 14 + (Math.random() * 0.4 - 0.2);
        const distance = 80 + Math.random() * 100;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);

        document.body.appendChild(particle);

        // Remove element after animation ends
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 800);
      }
    }
  }
})();
