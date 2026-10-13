// lightbox.js - Handles image lightbox functionality site-wide
document.addEventListener('DOMContentLoaded', () => {
    // Create lightbox container elements dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;

    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 6px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.7);
    `;
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // Target service images and card images across pages (e.g., .service-image, .card-img)
    const images = document.querySelectorAll('.service-image, .card-img, .about-card img');
    
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.style.display = 'flex';
        });
    });

    // Close lightbox when clicked anywhere
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
});