/**
 * ==============================================================================
 * COUNTDOWN TIMER CONTROLLER
 * ==============================================================================
 * Targets: 15 October 2026 at 12:00 AM Indian Standard Time (IST) (+05:30)
 * - Updates Days, Hours, Minutes, Seconds every second
 * - Automatically displays "Open Your Surprise ❤️" when timer hits 0
 * - Handles the Developer Demo Button according to config.js settings
 * ==============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initCountdown);

  function initCountdown() {
    const cfg = (window.CONFIG && window.CONFIG.countdown) || {};
    
    // Target date string with IST offset: "2026-10-15T00:00:00+05:30"
    const targetDateStr = cfg.targetDate || "2026-10-15T00:00:00+05:30";
    const targetTime = new Date(targetDateStr).getTime();

    // DOM Elements
    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minutesEl = document.getElementById('count-minutes');
    const secondsEl = document.getElementById('count-seconds');

    // Main Countdown Elements
    const countdownGrid = document.getElementById('countdown-cards-grid');
    const revealContainer = document.getElementById('countdown-reveal-container');
    const revealBtn = document.getElementById('btn-birthday-reveal');
    const headingEl = document.getElementById('countdown-title');
    const subtitleEl = document.getElementById('countdown-subtitle');

    // Bottom-Right Surprise Demo Widget Elements
    const demoWidget = document.getElementById('surprise-demo-widget');
    const demoDigitsEl = document.getElementById('demo-timer-digits');
    const demoSubEl = document.getElementById('demo-timer-sub');
    const demoWelcomeContainer = document.getElementById('demo-welcome-container');
    const demoWelcomeBtn = document.getElementById('btn-demo-welcome');
    const demoRestartBtn = document.getElementById('demo-restart-btn');

    // Populate dynamic text from config if available
    if (headingEl && cfg.heading) headingEl.textContent = cfg.heading;
    if (subtitleEl && cfg.subtitle) subtitleEl.textContent = cfg.subtitle;
    if (revealBtn && cfg.revealButtonText) {
      revealBtn.innerHTML = `<span>${cfg.revealButtonText}</span>`;
      revealBtn.href = cfg.revealButtonUrl || 'surprise.html';
    }

    // =========================================================================
    // STRICTLY BOTTOM-RIGHT SURPRISE DEMO TIMER LOGIC
    // =========================================================================
    const demoCfg = cfg.surpriseDemo || {
      enabled: true,
      durationSeconds: 8,
      welcomeButtonText: "Welcome",
      welcomeUrl: "surprise.html"
    };

    if (demoWidget) {
      if (demoCfg.enabled !== false && cfg.enableDemoButton !== false) {
        demoWidget.style.display = 'flex';
        initSurpriseDemoTimer();
      } else {
        demoWidget.style.display = 'none';
      }
    }

    function initSurpriseDemoTimer() {
      const initialSeconds = demoCfg.durationSeconds || 8;
      let remaining = initialSeconds;
      let demoInterval = null;

      function renderDemoTime(sec) {
        if (!demoDigitsEl) return;
        const mins = Math.floor(sec / 60);
        const s = sec % 60;
        demoDigitsEl.textContent = `${padZero(mins)}:${padZero(s)}`;
      }

      function startDemo() {
        if (demoInterval) clearInterval(demoInterval);
        remaining = initialSeconds;
        renderDemoTime(remaining);
        if (demoSubEl) demoSubEl.textContent = "Demo Countdown";
        if (demoWelcomeContainer) demoWelcomeContainer.classList.remove('active');

        demoInterval = setInterval(() => {
          remaining--;
          if (remaining <= 0) {
            remaining = 0;
            renderDemoTime(0);
            clearInterval(demoInterval);
            onDemoTimerEnded();
          } else {
            renderDemoTime(remaining);
          }
        }, 1000);
      }

      function onDemoTimerEnded() {
        if (demoSubEl) demoSubEl.textContent = "Surprise Ready! ✨";
        if (demoWelcomeContainer) {
          demoWelcomeContainer.classList.add('active');
        }
        if (demoWelcomeBtn) {
          demoWelcomeBtn.href = demoCfg.welcomeUrl || 'surprise.html';
          const btnSpan = demoWelcomeBtn.querySelector('span:first-child');
          if (btnSpan) btnSpan.textContent = demoCfg.welcomeButtonText || "Welcome";
        }
      }

      // Start the demo timer immediately upon page open
      startDemo();

      // Reset button allows testing the flow repeatedly
      if (demoRestartBtn) {
        demoRestartBtn.addEventListener('click', (e) => {
          e.preventDefault();
          startDemo();
        });
      }
    }

    // Run initial tick immediately
    updateTimer();

    // Interval to tick every second
    const timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        // Birthday has arrived!
        clearInterval(timerInterval);
        onTimerComplete();
        return;
      }

      // Calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Render with leading zero format
      if (daysEl) setDigit(daysEl, padZero(days));
      if (hoursEl) setDigit(hoursEl, padZero(hours));
      if (minutesEl) setDigit(minutesEl, padZero(minutes));
      if (secondsEl) setDigit(secondsEl, padZero(seconds));
    }

    function padZero(num) {
      return num < 10 ? '0' + num : String(num);
    }

    // Smooth digit update with subtle flip animation
    function setDigit(el, newText) {
      if (el.textContent !== newText) {
        el.textContent = newText;
        el.style.transform = 'scale(1.08)';
        setTimeout(() => {
          el.style.transform = 'scale(1)';
        }, 150);
      }
    }

    /**
     * Triggered when target date is reached:
     * - Hides countdown cards
     * - Displays the animated "Open Your Surprise ❤️" button
     */
    function onTimerComplete() {
      if (countdownGrid) {
        countdownGrid.classList.add('hidden-countdown');
      }

      if (headingEl) {
        headingEl.innerHTML = '<span class="rose-gradient-text">Happy Birthday!</span> ❤️';
      }

      if (subtitleEl) {
        subtitleEl.textContent = "The wait is over. Your grand surprise is finally here!";
      }

      if (revealContainer) {
        revealContainer.classList.add('active');
      }
    }
  }
})();
