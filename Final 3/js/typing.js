/**
 * ==============================================================================
 * ANIMATED TYPING MESSAGE CONTROLLER
 * ==============================================================================
 * Renders the romantic birthday message character-by-character with:
 * - Natural typing rhythm and realistic timing variation
 * - Thoughtful pauses after punctuation marks (commas, periods, emojis)
 * - Animated blinking cursor
 * - Single-trigger guard to ensure smooth presentation during scroll
 * ==============================================================================
 */

(function () {
  'use strict';

  let hasStarted = false;

  window.startTypingAnimation = function () {
    if (hasStarted) return;
    hasStarted = true;

    const targetEl = document.getElementById('typing-message-target');
    const cursorEl = document.getElementById('typing-cursor');
    if (!targetEl) return;

    const cfg = (window.CONFIG && window.CONFIG.typingMessage) || {};
    const textToType = cfg.text || "Some people make ordinary moments feel extraordinary. Today is all about celebrating you, your smile, and every beautiful memory we share. Happy Birthday, my favourite person. ❤️";
    const baseSpeed = cfg.typingSpeedMs || 40;
    const punctPause = cfg.punctuationPauseMs || 260;
    const initialDelay = cfg.startDelayMs || 400;

    targetEl.textContent = "";

    setTimeout(() => {
      let charIndex = 0;

      function typeNextCharacter() {
        if (charIndex < textToType.length) {
          const char = textToType.charAt(charIndex);
          targetEl.textContent += char;
          charIndex++;

          // Natural cadence: variable speed
          let delay = baseSpeed + (Math.random() * 20 - 10);

          // Natural human pause after punctuation
          if (char === '.' || char === '!' || char === '?' || char === ',') {
            delay += punctPause;
          } else if (char === ' ') {
            delay += 25;
          }

          setTimeout(typeNextCharacter, delay);
        } else {
          // Completed typing!
          if (cursorEl) {
            cursorEl.classList.add('done');
          }
        }
      }

      typeNextCharacter();
    }, initialDelay);
  };
})();
