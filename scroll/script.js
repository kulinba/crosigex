document.addEventListener('DOMContentLoaded', () => {
    const parallaxSections = document.querySelectorAll('.parallax-content');

    parallaxSections.forEach(section => {
        const background = section.querySelector('.background');
        const contentWrapper = section.querySelector('.content-wrapper');

        if (!background || !contentWrapper) return;

        // Initial setup
        let startPosition = section.offsetTop;

        function update() {
            // Calculate scroll position relative to the section
            let scrollPosition = window.pageYOffset - startPosition;
            
            // Adjust the background scroll speed (0.5 is half the speed)
            background.style.transform = `translateY(${scrollPosition * 0.5}px) translateZ(-1px) scale(1.2)`;
            
            // Request next animation frame
            requestAnimationFrame(update);
        }
        
        // Initial call to update
        update();
        
        // Listen for scroll events
        window.addEventListener('scroll', () => {
            startPosition = section.offsetTop;
        });
    });

     const imageSections = document.querySelectorAll('.image-section');

    imageSections.forEach(section => {
        const contentBlocks = Array.from(section.querySelectorAll('.content'));
        
        contentBlocks.forEach(content => {
            content.classList.remove('active');
        })
        
        if(contentBlocks[0]){
            contentBlocks[0].classList.add('active')
        }
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                  contentBlocks.forEach(content => {
                    content.classList.remove('active');
                  })
                  
                  entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: "0px 0px -50% 0px",
        });

        contentBlocks.forEach((block, index) => {
           observer.observe(block);
        });
    });
});