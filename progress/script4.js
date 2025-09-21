document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('scrolly-video');
  const standardSection = document.querySelector('.standard-section');

  // Ensure the video is ready to be controlled by the script
        video.pause();

  video.addEventListener('loadedmetadata', () => {
    if (!standardSection) {
      console.error('The .standard-section element was not found.');
      return;
      }

    // The total distance over which the video should scrub is from the top
    // of the page to the start of the standard content section.
    const scrollableHeight = standardSection.offsetTop;

    function scrubVideo() {
      // Don't do anything if the video duration isn't available
      if (video.duration) {
        // Calculate how far we've scrolled down the page
        const scrollTop = window.scrollY;

        // Calculate the scroll progress as a fraction from 0 to 1.
        // The video will be fully played once we scroll to the standard section.
        let scrollFraction = scrollTop / scrollableHeight;

        // Ensure the fraction stays between 0 and 1
        scrollFraction = Math.min(1, Math.max(0, scrollFraction));

        // Update the video's current time based on the scroll fraction
        video.currentTime = video.duration * scrollFraction;
      }
    }

    // Listen for scroll events on the window
    window.addEventListener('scroll', scrubVideo);
    });

  // This ensures our script has full control over playback.
  video.addEventListener('canplay', () => {
    video.pause();
  });
});


