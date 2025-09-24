document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scrolly-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.2 // Adjust as needed
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});