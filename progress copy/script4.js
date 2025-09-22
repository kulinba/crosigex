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