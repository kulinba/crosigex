--- a/original.js
+++ b/suggestion.js
@@ -1,37 +1,46 @@
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
-
-    // --- Scrollytelling Parallax Animation ---
+    // --- Scrollytelling Animation ---
    const scrollyContainers = document.querySelectorAll(".scrolly-container");

    scrollyContainers.forEach(container => {
        const graphic = container.querySelector(".scrolly-graphic");
        const steps = container.querySelectorAll(".step");

-        // Animate the single graphic as the container scrolls
+        // --- 1. PARALLAX ANIMATION FOR THE BACKGROUND ---
+        // This part animates the single graphic as the entire container is scrolled through.
        gsap.to(graphic, {
-            // This creates a subtle zoom and vertical pan effect.
-            // Adjust these values to change the animation.
            scale: 1.1,
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
-                scrub: true // This links the animation directly to the scrollbar
+                scrub: true // Links the animation directly to the scrollbar
            }
        });

-        // Animate each text step to fade in as it enters the view
+        // --- 2. FADE-IN/FADE-OUT ANIMATION FOR THE TEXT ---
+        // This part handles each text block individually.
        steps.forEach(step => {
-            gsap.from(step.querySelector(".step-content"), {
-                autoAlpha: 0,
-                y: 50,
-                duration: 0.5,
-                ease: "power1.out",
-            scrollTrigger: {
-                    trigger: step,
-                    start: "top 70%", // Start animation when the step is 70% down the viewport
-                    toggleActions: "play none none reverse" // Fade in on enter, fade out on leave
-            }
+            const stepContent = step.querySelector(".step-content");
+
+            // Set the initial state of the text to be invisible and slightly down
+            gsap.set(stepContent, { autoAlpha: 0, y: 30 });
+
+            // Create a trigger for each text block
+            ScrollTrigger.create({
+                trigger: step,
+                start: "top 65%",   // When the top of the step is 65% down the viewport
+                end: "bottom 35%", // When the bottom of the step is 35% up the viewport
+
+                // Animate IN when the text block enters the trigger area
+                onEnter: () => gsap.to(stepContent, { autoAlpha: 1, y: 0, duration: 0.5 }),
+                onEnterBack: () => gsap.to(stepContent, { autoAlpha: 1, y: 0, duration: 0.5 }),
+
+                // Animate OUT when the text block leaves the trigger area
+                onLeave: () => gsap.to(stepContent, { autoAlpha: 0, y: -30, duration: 0.5 }),
+                onLeaveBack: () => gsap.to(stepContent, { autoAlpha: 0, y: 30, duration: 0.5 })
+            });
    });
});
 });


