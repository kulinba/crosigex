document.addEventListener('DOMContentLoaded', () => {
    const imageSections = document.querySelectorAll('.image-section');

    imageSections.forEach(section => {
        const contentBlocks = Array.from(section.querySelectorAll('.content'));
        
        contentBlocks.forEach(content => {
            content.classList.remove('active');
        })
        
        if(contentBlocks[0]){
            contentBlocks[0].classList.add('active')
        }

        let currentBlockIndex = 0;
        
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