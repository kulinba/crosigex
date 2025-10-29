gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- Scrollytelling Parallax Animation (remains the same) ---
    const scrollyContainers = document.querySelectorAll(".scrolly-container");
    // ... existing scrollytelling code ...
    scrollyContainers.forEach(container => {
        const graphic = container.querySelector(".scrolly-graphic");
        const steps = container.querySelectorAll(".step");

        gsap.to(graphic, {
            scale: 1.1,
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

        steps.forEach(step => {
            const stepContent = step.querySelector(".step-content");
            gsap.set(stepContent, { autoAlpha: 0, y: 30 });
            ScrollTrigger.create({
                trigger: step,
                start: "top 65%",
                end: "bottom 35%",
                onEnter: () => gsap.to(stepContent, { autoAlpha: 1, y: 0, duration: 0.5 }),
                onEnterBack: () => gsap.to(stepContent, { autoAlpha: 1, y: 0, duration: 0.5 }),
                onLeave: () => gsap.to(stepContent, { autoAlpha: 0, y: -30, duration: 0.5 }),
                onLeaveBack: () => gsap.to(stepContent, { autoAlpha: 0, y: 30, duration: 0.5 })
            });
        });
    });
    
    // --- NEW FOOTER SLIDE-OVER ANIMATION ---
    const finalWrapper = document.querySelector('.final-sequence-wrapper');
    const footer = finalWrapper.querySelector('.footer-section');
    const footerTitle = footer.querySelector('.footer-title');
    const photoCards = gsap.utils.toArray(".photo-card");
    const footerCredits = footer.querySelector('.footer-credits');

    // Set the initial state of the elements to be animated
    gsap.set([footer-Section,footerTitle, photoCards, footerCredits], { autoAlpha: 0, y: 50 });

    // Create a timeline that is controlled by scrolling through the wrapper
    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: finalWrapper,
            start: "bottom bottom", // Starts when the wrapper hits the top of the viewport
            end: "bottom bottom", // Ends when the wrapper leaves the viewport
            scrub: 1          // Smoothly link animation to scrollbar
        }
    });

    // The "slide over" effect is handled by CSS (position: sticky).
    // This timeline ONLY animates the contents of the footer as it appears.

    // 1. Animate the title fading and sliding up.
    footerTl.to(footerTitle, { 
        autoAlpha: 1, 
        y: 0,
        ease: "power2.out" 
    });

    // 2. Animate the photo cards, starting shortly after the title.
    footerTl.to(photoCards, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.2, // Creates the "one by one" effect
        ease: "power2.out"
    }, "-=0.3"); // Overlap with the previous animation

    // 3. Animate the credits at the end.
    footerTl.to(footerCredits, { 
        autoAlpha: 1, 
        y: 0, 
        ease: "power2.out" 
    }, "-=0.3"); // Overlap with the previous animation
});
