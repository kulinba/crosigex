document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let currentContentIndex = 0;
    let isScrolling = false;

    // Load initial conditions first
    function loadPage(sectionIndex, contentIndex = 0) {
        // Deactivate all contents
        sections.forEach(s => {
            s.classList.remove('active');
            s.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
        });
        // Load the first section
        const section = sections[sectionIndex];
        section.classList.add('active');

        if (section.classList.contains('image-section')) {
            const content = section.querySelectorAll('.content')[contentIndex];
            if (content) content.classList.add('active');
        }
    }

    loadPage(0, 0);

    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        isScrolling = true;

        const currentSection = sections[currentSectionIndex];
        const isImageSection = currentSection.classList.contains('image-section');
        let contentCount = 0;
        if (isImageSection) {
            contentCount = currentSection.querySelectorAll('.content').length;
        }

        // Actions for scrolling down
        if (e.deltaY > 0) {
            // Scroll through the content section
            if (isImageSection && currentContentIndex < contentCount - 1) {
                currentContentIndex++;
                loadPage(currentSectionIndex, currentContentIndex);
            }

            // If at the end of a scroll section - load the next section
            else if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                loadPage(currentSectionIndex, 0);
                currentContentIndex = 0;
            }
        }

        // Actions for scrolling up
        else {
            // If there is a lot of content in the same section
            if (isImageSection && currentContentIndex > 0) {
                currentContentIndex--;
                loadPage(currentSectionIndex, currentContentIndex);
            }
            // If load new section
            else if (currentSectionIndex > 0) {
                currentSectionIndex--;
                loadPage(currentSectionIndex, 0);

                const previousSection = sections[currentSectionIndex];
                if (previousSection.classList.contains('image-section')) {
                    currentContentIndex = previousSection.querySelectorAll('.content').length - 1;
                    loadPage(currentSectionIndex, currentContentIndex);
                } else {
                    currentContentIndex = 0;
                }
            }
        }

        // Set a Timeout for the actions of wheel events for the content
        setTimeout(() => {
            isScrolling = false;
        }, 600); // Prevent scroll spamming
    });
});