// main.js - General site interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current active navigation link
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') && currentLocation.includes(link.getAttribute('href').replace('./', ''))) {
            link.classList.add('active');
        }
    });

    // Optional: Mobile navigation menu toggle support if a toggle button exists
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('open');
        });
    }
});