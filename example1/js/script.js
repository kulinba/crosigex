// Ensure GSAP and ScrollTrigger are loaded before using them.
// This is the only place registerPlugin should be called.


// Wrap all GSAP animations in a single DOMContentLoaded listener.
// This ensures all HTML elements are parsed and available before animations are set up.
document.addEventListener('DOMContentLoaded', () => { gsap.registerPlugin(ScrollTrigger);

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
                //markers: true, // ENABLED FOR DEBUGGING: See trigger lines for each text section
            }
        });
    }

    // Apply the disappearing text animation to your first three specific sections
    setupDisappearingText("intro-section");
    setupDisappearingText("disappearing-section-2");
    setupDisappearingText("disappearing-section-3");


    // --- Unified Photo Shading Reveal ---

    // Animate the CSS custom property --overlay-opacity on the .parallax-section elements
    gsap.to(".parallax-section", { // Target the parent element
        "--overlay-opacity": 0, // Animate the custom property to 0
        ease: "power1.out",
        scrollTrigger: {
            trigger: "#intro-section", // The starting point for the fade is the beginning of the first section
            start: "top top",         // Start fading when the top of the first section hits the viewport top
            // This is the robust way to define the end point relative to another element
            end: "#disappearing-section-3 top",
            scrub: true,
            //markers: true, // ENABLED FOR DEBUGGING: See trigger lines for the overlay fade
        }
    });


    // --- Animated Callout Box ---

    gsap.from("#myCallout", {
        opacity: 100,
        x: -200,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
            trigger: "#myCallout",
            start: "top 80%", // Adjusted start point
            toggleActions: "play none none none",
            //markers: true, // ENABLED FOR DEBUGGING: See trigger lines for the callout box
        }
    });

}); // End DOMContentLoaded