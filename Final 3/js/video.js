/**
 * ==============================================================================
 * CINEMATIC VIDEO CONTROLLER
 * ==============================================================================
 * Handles the full-screen video introduction:
 * - Autoplay (muted for mobile compliance)
 * - Audio toggle (unmute / mute)
 * - Video replay and skip functionality
 * - Automatic smooth transition to scroll story when video ends
 * - Robust error handling with interactive fallback play button
 * ==============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initVideoPlayer);

  function initVideoPlayer() {
    const video = document.getElementById('intro-cinematic-video');
    const soundToggle = document.getElementById('video-sound-toggle');
    const soundLabel = document.getElementById('video-sound-label');
    const soundIcon = document.getElementById('video-sound-icon');
    const replayBtn = document.getElementById('video-replay-btn');
    const skipBtn = document.getElementById('video-skip-btn');
    const scrollIndicator = document.getElementById('video-scroll-indicator');
    const fallbackOverlay = document.getElementById('video-fallback-overlay');
    const fallbackPlayBtn = document.getElementById('btn-manual-play');
    const nextSection = document.getElementById('story-reveal-section');

    if (!video) return;

    const vConfig = (window.CONFIG && window.CONFIG.video) || {};
    
    // Set video sources from config
    if (vConfig.videoUrl) video.src = vConfig.videoUrl;
    if (vConfig.posterUrl) video.poster = vConfig.posterUrl;

    const captionTagEl = document.querySelector('.video-tag');
    const captionTitleEl = document.querySelector('.video-title');
    if (captionTagEl && vConfig.captionTag) captionTagEl.textContent = vConfig.captionTag;
    if (captionTitleEl && vConfig.captionTitle) captionTitleEl.textContent = vConfig.captionTitle;

    // Set muted autoplay by default (required by iOS/Chrome)
    video.muted = true;

    // Attempt autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video is playing successfully
          if (fallbackOverlay) fallbackOverlay.classList.remove('active');
        })
        .catch(error => {
          console.warn('Autoplay prevented or network delay:', error);
          // Show clear manual play button overlay
          if (fallbackOverlay) fallbackOverlay.classList.add('active');
        });
    }

    // Manual fallback play button
    if (fallbackPlayBtn) {
      fallbackPlayBtn.addEventListener('click', () => {
        video.muted = false; // User initiated click allows unmuted playback
        video.play().then(() => {
          if (fallbackOverlay) fallbackOverlay.classList.remove('active');
          updateSoundUI(false);
        }).catch(err => {
          console.error('Play error:', err);
          // Fallback to muted
          video.muted = true;
          video.play();
          if (fallbackOverlay) fallbackOverlay.classList.remove('active');
          updateSoundUI(true);
        });
      });
    }

    // Sound Toggle Button
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        video.muted = !video.muted;
        updateSoundUI(video.muted);
      });
    }

    function updateSoundUI(isMuted) {
      if (!soundLabel) return;
      if (isMuted) {
        soundLabel.textContent = "Unmute";
        if (soundIcon) soundIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>`;
      } else {
        soundLabel.textContent = "Mute";
        if (soundIcon) soundIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
      }
    }

    // Replay Button
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        video.currentTime = 0;
        video.play();
      });
    }

    // Skip to Story / Scroll Down
    function scrollToStory() {
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (skipBtn) skipBtn.addEventListener('click', scrollToStory);
    if (scrollIndicator) scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToStory();
    });

    // When video ends, show the 'Scroll Down' text prompt to guide the user
    video.addEventListener('ended', () => {
      if (scrollIndicator) {
        scrollIndicator.classList.add('visible');
      }
      // Give the user a moment to see the prompt, then smoothly guide down if configured
      if (vConfig.autoTransitionOnEnd !== false) {
        setTimeout(scrollToStory, 2000);
      }
    });

    // Graceful error fallback
    video.addEventListener('error', () => {
      console.warn('Video failed to load from remote source. Enabling fallback.');
      if (fallbackOverlay) {
        fallbackOverlay.classList.add('active');
        const heading = fallbackOverlay.querySelector('.fallback-heading');
        const sub = fallbackOverlay.querySelector('.fallback-subtext');
        if (heading) heading.textContent = "Continue to Story";
        if (sub) sub.textContent = "Click below to begin the magical birthday walkthrough.";
      }
    });
  }
})();
