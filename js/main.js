// Contact form — Formspree AJAX submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const isSpanish = document.documentElement.lang === 'es';
    const i18n = {
        sending: isSpanish ? 'Enviando...' : 'Sending...',
        success: isSpanish ? '¡Gracias! Nos pondremos en contacto pronto.' : 'Thank you! We\'ll be in touch shortly.',
        sent: isSpanish ? '¡Enviado!' : 'Sent!',
        error: isSpanish ? 'Algo salió mal. Escríbanos a ichscorp@gmail.com' : 'Something went wrong. Please email us at ichscorp@gmail.com',
        cta: isSpanish ? 'Contáctenos' : 'Get in Touch'
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = i18n.sending;

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                status.style.display = 'block';
                status.style.background = 'rgba(212, 175, 55, 0.15)';
                status.style.color = 'var(--color-gold)';
                status.style.border = '1px solid var(--color-gold)';
                status.textContent = i18n.success;
                form.reset();
                btn.textContent = i18n.sent;
            } else {
                throw new Error('Server error');
            }
        } catch {
            status.style.display = 'block';
            status.style.background = 'rgba(255,80,80,0.1)';
            status.style.color = '#ff6b6b';
            status.style.border = '1px solid #ff6b6b';
            status.textContent = i18n.error;
            btn.disabled = false;
            btn.textContent = i18n.cta;
        }
    });
});

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

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
});
