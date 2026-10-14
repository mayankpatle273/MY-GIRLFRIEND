/**
 * ==============================================================================
 * SCROLL-BASED PHOTO REVEAL & STORYTELLING ANIMATIONS
 * ==============================================================================
 * Uses GSAP & ScrollTrigger with native fallback:
 * 1. Photo smoothly rises from the bottom of the screen into the center.
 * 2. As scrolling progresses, shifts gently to the side.
 * 3. Accent floating cards bloom into view with parallax offsets.
 * 4. The romantic birthday message section fades in and triggers typing.
 * ==============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initScrollStory);

  function initScrollStory() {
    const heroWrapper = document.getElementById('hero-photo-wrapper');
    const heroCard = document.getElementById('hero-photo-card');
    const accent1 = document.getElementById('accent-card-1');
    const accent2 = document.getElementById('accent-card-2');
    const messageWrapper = document.getElementById('message-story-wrapper');
    const storySection = document.getElementById('story-reveal-section');

    if (!storySection || !heroWrapper || !messageWrapper) return;

    // Synchronize media and text dynamically from CONFIG (config.js)
    const storyConfig = (window.CONFIG && window.CONFIG.scrollStory) || {};
    const typingConfig = (window.CONFIG && window.CONFIG.typingMessage) || {};

    const heroImgEl = document.getElementById('hero-story-img');
    const heroCaptionEl = document.getElementById('hero-story-caption');
    const heroDateEl = document.getElementById('hero-story-date');
    const accent1Img = accent1 ? accent1.querySelector('img') : null;
    const accent2Img = accent2 ? accent2.querySelector('img') : null;
    const messageHeadingEl = messageWrapper.querySelector('.message-heading');
    const messageLabelEl = messageWrapper.querySelector('.message-label');
    const messageDateEl = messageWrapper.querySelector('.message-date');

    if (storyConfig.heroPhoto) {
      if (heroImgEl && storyConfig.heroPhoto.url) heroImgEl.src = storyConfig.heroPhoto.url;
      if (heroCaptionEl && storyConfig.heroPhoto.caption) heroCaptionEl.textContent = storyConfig.heroPhoto.caption;
      if (heroDateEl && storyConfig.heroPhoto.date) heroDateEl.textContent = storyConfig.heroPhoto.date;
    }

    if (storyConfig.accentPhotos && storyConfig.accentPhotos.length >= 2) {
      if (accent1Img && storyConfig.accentPhotos[0].url) accent1Img.src = storyConfig.accentPhotos[0].url;
      if (accent2Img && storyConfig.accentPhotos[1].url) accent2Img.src = storyConfig.accentPhotos[1].url;
    }

    if (typingConfig.heading && messageHeadingEl) messageHeadingEl.textContent = typingConfig.heading;
    if (typingConfig.dateStamp && messageDateEl) messageDateEl.textContent = typingConfig.dateStamp;

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      initGSAPAnimations();
    } else {
      // Fallback for offline or blocked CDN scenarios
      initIntersectionFallback();
    }

    function initGSAPAnimations() {
      // Mobile vs Desktop adjustments
      const isMobile = window.innerWidth <= 860;

      if (!isMobile) {
        // Desktop: Center offset to place the card in the dead center initially
        const stageWidth = storySection.offsetWidth || 1100;
        const centerOffset = Math.min(stageWidth * 0.25, 270);

        // Master storytelling timeline scrubbed with scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storySection,
            start: "top 70%",
            end: "bottom 110%",
            scrub: 1.2
          }
        });

        // 1. Image smoothly slides up into the center of the screen
        tl.fromTo(heroWrapper,
          {
            y: 260,
            x: centerOffset, // Centers the card initially
            opacity: 0,
            scale: 0.88
          },
          {
            y: 0,
            x: centerOffset,
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power2.out"
          }
        );

        // 2. Continuing to scroll moves that image to the left side
        tl.to(heroWrapper, {
          x: 0,
          rotation: -1.5,
          duration: 1.6,
          ease: "power2.inOut"
        });

        // 3. Message appears next to it and simulates typewriter text
        tl.fromTo(messageWrapper,
          {
            x: 60,
            opacity: 0,
            scale: 0.94
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: function() {
              if (this.progress() > 0.25 && window.startTypingAnimation) {
                window.startTypingAnimation();
              }
            }
          },
          "-=0.9" // Smoothly overlaps with the lateral movement
        );

        // Subtle accent card reveal
        if (accent1) {
          tl.fromTo(accent1,
            { y: 50, opacity: 0, rotation: -16 },
            { y: 0, opacity: 1, rotation: -8, duration: 0.8 },
            "-=0.6"
          );
        }
        if (accent2) {
          tl.fromTo(accent2,
            { y: 50, opacity: 0, rotation: 16 },
            { y: 0, opacity: 1, rotation: 8, duration: 0.8 },
            "-=0.6"
          );
        }

      } else {
        // Mobile Flow: Slide up to center, then reveal typewriter message directly underneath
        gsap.fromTo(heroWrapper,
          { y: 150, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: storySection,
              start: "top 75%",
              end: "top 35%",
              scrub: 1
            }
          }
        );

        gsap.fromTo(messageWrapper,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: messageWrapper,
              start: "top 80%",
              onEnter: () => {
                if (window.startTypingAnimation) {
                  window.startTypingAnimation();
                }
              }
            }
          }
        );
      }
    }

    /**
     * Fallback using IntersectionObserver if GSAP is unavailable
     */
    function initIntersectionFallback() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heroWrapper.style.transform = 'translateY(0) scale(1)';
            heroWrapper.style.opacity = '1';
            messageWrapper.style.transform = 'translateY(0) scale(1)';
            messageWrapper.style.opacity = '1';

            if (accent1) {
              accent1.style.opacity = '1';
              accent1.style.transform = 'rotate(-8deg)';
            }
            if (accent2) {
              accent2.style.opacity = '1';
              accent2.style.transform = 'rotate(8deg)';
            }

            if (window.startTypingAnimation) {
              window.startTypingAnimation();
            }
            observer.disconnect();
          }
        });
      }, { threshold: 0.25 });

      observer.observe(storySection);
    }
  }
})();
