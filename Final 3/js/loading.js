/**
 * ==============================================================================
 * LOADING SCREEN CONTROLLER
 * ==============================================================================
 * Controls the initial entry loading animation:
 * - Smoothly increments percentage from 0% to 99%
 * - Pauses at 99% for 1–4 seconds (configured in config.js) to build suspense
 * - Completes smoothly from 99% to 100%
 * - Fades out gracefully into the main website
 * ==============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initLoader);

  function initLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    const percentEl = document.getElementById('loader-percentage-num');
    const barEl = document.getElementById('loader-bar-fill');
    const messageEl = document.getElementById('loader-message-text');

    if (!loadingScreen || !percentEl || !barEl) return;

    // Read loading configurations from CONFIG (defined in config.js)
    const cfg = (window.CONFIG && window.CONFIG.loading) || {
      pausePercentage: 99,
      pauseDurationMs: 2400,
      initialProgressDurationMs: 2600,
      messages: [
        "Curating our sweetest memories...",
        "Lighting up the stars...",
        "Almost ready for you..."
      ]
    };

    let currentPercent = 0;
    const targetPause = cfg.pausePercentage || 99;
    const pauseTime = cfg.pauseDurationMs || 2400;
    const messages = cfg.messages || ["Loading moments..."];
    let messageIdx = 0;

    // Rotate subtitle messages during loading
    const messageInterval = setInterval(() => {
      if (currentPercent < targetPause && messageEl) {
        messageIdx = (messageIdx + 1) % messages.length;
        messageEl.style.opacity = '0';
        setTimeout(() => {
          messageEl.textContent = messages[messageIdx];
          messageEl.style.opacity = '1';
        }, 200);
      }
    }, 900);

    // Initial smooth increment to 99%
    const startTime = performance.now();
    const durationTo99 = cfg.initialProgressDurationMs || 2600;

    function stepProgress(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationTo99, 1);
      
      // Ease-out cubic curve so it slows naturally as it nears 99%
      const eased = 1 - Math.pow(1 - progress, 2.5);
      currentPercent = Math.min(Math.floor(eased * targetPause), targetPause);

      updateUI(currentPercent);

      if (currentPercent < targetPause) {
        requestAnimationFrame(stepProgress);
      } else {
        // We have hit 99%! Trigger the dramatic pause here
        triggerSuspensePause();
      }
    }

    requestAnimationFrame(stepProgress);

    function updateUI(val) {
      percentEl.textContent = val;
      barEl.style.width = val + '%';
    }

    /**
     * Pauses at 99% for the configured duration (1-4 seconds)
     */
    function triggerSuspensePause() {
      clearInterval(messageInterval);
      if (messageEl) {
        messageEl.innerHTML = '<span class="loader-suspense-pulse">Unlocking your surprise... ✨</span>';
      }

      setTimeout(() => {
        // Complete the final step: 99% -> 100%
        updateUI(100);
        if (messageEl) {
          messageEl.textContent = "Welcome to your special day ❤️";
        }

        // Brief delay at 100% before smooth fade-out
        setTimeout(() => {
          completeLoading();
        }, 500);

      }, pauseTime);
    }

    /**
     * Smoothly hides loading screen and unlocks main experience
     */
    function completeLoading() {
      loadingScreen.classList.add('loaded');
      
      // Dispatch custom event so background and countdown can initiate entry animations
      window.dispatchEvent(new CustomEvent('websiteLoaded'));

      // Remove from DOM tree after fade transition finishes to save memory
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1200);
    }
  }
})();
