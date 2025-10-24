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

    // 1. Ensure the <source> element exists in the DOM
    if (!sourceElement) {
        sourceElement = document.createElement('source');
        sourceElement.type = 'video/mp4';
        videoElement.appendChild(sourceElement); // MUST append before setting src/load
    }
    
    // 2. Initial Load Logic (Always runs once on page load)
    const isMobileInitial = window.innerWidth < mobileBreakpoint;
    const initialSrc = isMobileInitial ? mobileSource : desktopSource;
    
    // Set the source *after* the element is guaranteed to be attached
    sourceElement.src = initialSrc;

    // 3. Trigger the load and play
    // This tells the browser to process the newly set source.
    videoElement.load(); 
    
    videoElement.play().catch(error => {
        // This is normal if the browser strictly blocks autoplay, but necessary to try.
        console.warn('Initial video failed to autoplay (browser restriction likely):', error);
    });
    
    // Track the current state after the initial load
    let currentSourceIsMobile = isMobileInitial; 

    // --------------------------------------------------------------------------

    // 4. RESIZE/ORIENTATION CHANGE LOGIC (Only runs if a meaningful switch occurs)
    const setVideoSource = () => {
        const isMobile = window.innerWidth < mobileBreakpoint;
        
        // Only proceed if the screen crossed the breakpoint
        if (isMobile !== currentSourceIsMobile) { 
            
            const newSrc = isMobile ? mobileSource : desktopSource;
            
            // Apply new source
            sourceElement.src = newSrc;
            
            // CRITICAL STEP: Reload and play the video
            videoElement.load();
            videoElement.play().catch(error => {
                console.warn('Video failed to autoplay after source change:', error);
            });
            
            // Update the state tracker
            currentSourceIsMobile = isMobile;
        }
    };

    // 5. Implement Debounce for performance/stability on true resizing.
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setVideoSource, 150);
    });
});