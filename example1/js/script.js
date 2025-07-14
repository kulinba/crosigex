// Ensure GSAP and ScrollTrigger are loaded before using them
gsap.registerPlugin(ScrollTrigger);

// --- Disappearing Text Effect for First Three Sections ---

// Function to set up the disappearing text animation for a given section ID
function setupDisappearingText(sectionId) {
    gsap.to(`#${sectionId} .content`, {
        opacity: 0,
        y: -100, // Moves the text up as it fades out
        ease: "power1.out",
        scrollTrigger: {
            trigger: `#${sectionId}`,
            start: "top top",
            end: "bottom center",
            scrub: true,
            // markers: true, // Uncomment for visual debugging markers on the page
        }
    });
}

// Apply the disappearing text animation to your first three specific sections
setupDisappearingText("intro-section");
setupDisappearingText("disappearing-section-2");
setupDisappearingText("disappearing-section-3");


// --- Unified Photo Shading Reveal ---

// Target all ::before pseudo-elements of parallax-section
gsap.to(".parallax-section::before", {
    opacity: 0, // Target opacity: completely transparent
    ease: "power1.out",
    scrollTrigger: {
        trigger: "#intro-section", // The starting point for the fade is the beginning of the first section
        start: "top top",
        end: () => `top ${ScrollTrigger.getProperty("#disappearing-section-3", "top")}px`, // End when the last text section starts to disappear
        scrub: true,
        // markers: true, // Uncomment for debugging
    }
});


// --- Animated Callout Box ---

gsap.from("#myCallout", {
    opacity: 0,
    x: -200,
    ease: "power2.out",
    duration: 1,
    scrollTrigger: {
        trigger: "#myCallout",
        start: "top 80%",
        toggleActions: "play none none none",
        // markers: true,
    }
});