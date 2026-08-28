const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
    });
});

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

const setActiveLink = () => {
    let currentId = sections[0]?.id;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) currentId = section.id;
    });
    navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Reveal-on-scroll animation
const revealTargets = document.querySelectorAll(
    '.about-grid, .skill-card, .project-card, .creative-card, .contact-box'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    },
    { threshold: 0.15 }
);

revealTargets.forEach(el => observer.observe(el));