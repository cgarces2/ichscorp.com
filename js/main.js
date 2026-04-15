// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated if we don't want it to repeat
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
};

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger scroll event once to set initial navbar state
    window.dispatchEvent(new Event('scroll'));
    
    // Start observing tags for animations
    observeElements();
});
