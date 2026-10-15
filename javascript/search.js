// search.js - Enhanced site-wide search with page navigation and live filtering
document.addEventListener('DOMContentLoaded', () => {
    window.initLiveSearch = function(inputSelector, itemSelector, textSelector) {
        const searchInput = document.querySelector(inputSelector);
        if (!searchInput) return;

        // Detect current folder context to resolve relative links correctly
        const isInPages = window.location.pathname.includes('/pages/');
        const prefix = isInPages ? './' : './pages/';
        const rootPrefix = isInPages ? '../' : './';

        // Listen for the Enter key to navigate to pages based on keywords
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                
                if (query.includes('home') || query.includes('index')) {
                    window.location.href = rootPrefix + 'index.html';
                } else if (query.includes('about')) {
                    window.location.href = prefix + 'About.html';
                } else if (query.includes('service')) {
                    window.location.href = prefix + 'services.html';
                } else if (query.includes('enquir') || query.includes('inquir')) {
                    window.location.href = prefix + 'Enquiry.html';
                } else if (query.includes('contact')) {
                    window.location.href = prefix + 'ContactUs.html';
                }
            }
        });

        // Live filtering of cards/articles on the current page as you type
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const items = document.querySelectorAll(itemSelector);

            if (items.length > 0) {
                items.forEach(item => {
                    const textTarget = textSelector ? item.querySelector(textSelector) : item;
                    const textContent = textTarget ? textTarget.textContent.toLowerCase() : '';

                    if (textContent.includes(query) || query === '') {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    };

    // Auto-initialize search inputs found across pages
    const defaultSearchInput = document.querySelector('input[type="search"], input[placeholder*="Search" i], input[id*="Search" i]');
    if (defaultSearchInput && typeof window.initLiveSearch === 'function') {
        const searchId = '#' + (defaultSearchInput.id || defaultSearchInput.className.split(' ')[0]);
        window.initLiveSearch(searchId, 'article, .service-card, .about-card, .info-card');
    }
});