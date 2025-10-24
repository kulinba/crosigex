document.addEventListener('DOMContentLoaded', () => {
  // Select all the elements we want to animate
  const animatedElements = document.querySelectorAll('.overlay-text, .standard-section-content');

  if (!animatedElements.length) {
    return;
  }

  // Set up the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      // Check if the animated element is the one in our title section
      const isTitleOverlay = element.closest('#title-section');

      // If the element is on screen
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        
        // If it's the title, stop observing it so it stays visible forever
        if (isTitleOverlay) {
          observer.unobserve(element);
        }
      } else {
        // If it's NOT the title and it's scrolled out of view, make it disappear again
        if (!isTitleOverlay) {
          element.classList.remove('is-visible');
        }
      }
    });
  }, {
    // Trigger when 40% of the element is visible for a smoother feel
    threshold: 0.4 
  });

  // Tell the observer to watch each of our animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
});

document.addEventListener('DOMContentLoaded', () => {
    const desktopSource = 'images/zvjezdana.mp4';
    const mobileSource = 'images/zvjezdana11low.mp4';
    const mobileBreakpoint = 768;
    const videoElement = document.getElementById('background-video');
    
    let sourceElement = videoElement.querySelector('source');
    if (!sourceElement) {
        sourceElement = document.createElement('source');
        sourceElement.type = 'video/mp4';
        videoElement.appendChild(sourceElement);
    }

    // 🌟 1. Use a variable to track the last determined source type (mobile/desktop)
    let currentSourceIsMobile = window.innerWidth < mobileBreakpoint; 
    
    const setVideoSource = () => {
        const isMobile = window.innerWidth < mobileBreakpoint;
        const newSrc = isMobile ? mobileSource : desktopSource;

        // 🌟 2. Only proceed if the new screen state (mobile/desktop) is DIFFERENT
        // from the last state, preventing reloads on minor resizes/scrolls.
        if (isMobile !== currentSourceIsMobile) { 
            
            sourceElement.src = newSrc;
            
            // CRITICAL STEP: Reload and play the video
            videoElement.load();
            videoElement.play().catch(error => {
                console.warn('Video failed to autoplay after source change:', error);
            });
            
            // 🌟 3. Update the state tracker
            currentSourceIsMobile = isMobile;
        }
        // If isMobile == currentSourceIsMobile, no reload happens, solving the issue.
    };

    // Run on page load
    setVideoSource();

    // 🌟 4. Implement Debounce for performance/stability on true resizing.
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setVideoSource, 150); // wait 150ms before running
    });
});

 