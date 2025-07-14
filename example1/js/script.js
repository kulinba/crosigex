// Ensure GSAP and ScrollTrigger are loaded first
gsap.registerPlugin(ScrollTrigger);

// Example: Fade out the title as you scroll past the intro section
gsap.to("#intro-section .content", {
    opacity: 0,
    y: -100, // Move up slightly as it fades
    scrollTrigger: {
        trigger: "#intro-section",
        start: "top top", // When the top of the intro section hits the top of the viewport
        end: "bottom center", // Ends when the bottom of the intro section hits the center of the viewport
        scrub: true, // Smoothly links animation to scroll position
        // markers: true, // Uncomment for visual debugging markers
    }
});

// Example: Pin an element or animate others
// You can add more ScrollTrigger animations here for other sections.