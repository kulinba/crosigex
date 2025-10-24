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
    // 1. Define video sources and mobile breakpoint
    const desktopSource = 'images/zvjezdana.mp4';
    const mobileSource = 'images/zvjezdana11.mp4';
    const mobileBreakpoint = 768; // Standard breakpoint for tablets/mobile

    // 2. Get the video and current source elements
    const videoElement = document.getElementById('background-video');

    // 3. Create a source element if it doesn't exist
    let sourceElement = videoElement.querySelector('source');
    if (!sourceElement) {
        sourceElement = document.createElement('source');
        sourceElement.type = 'video/mp4';
        videoElement.appendChild(sourceElement);
    }

    // 4. Function to check width and set source
    const setVideoSource = () => {
        const isMobile = window.innerWidth < mobileBreakpoint;
        const newSrc = isMobile ? mobileSource : desktopSource;

        // Only update if the source needs to change
        if (sourceElement.src !== newSrc) {
            sourceElement.src = newSrc;
            
            // 5. CRITICAL STEP: Reload the video to apply the new source
            videoElement.load();
            
            // 6. Attempt to restart playback (handles potential mobile restrictions)
            videoElement.play().catch(error => {
                // If play() fails (e.g., browser blocked it), you can log the error
                console.warn('Video failed to autoplay after source change:', error);
            });
        }
    };

    // Run on page load
    setVideoSource();

    // Run on browser resize to handle device rotation or window resizing
    window.addEventListener('resize', setVideoSource);
});

 