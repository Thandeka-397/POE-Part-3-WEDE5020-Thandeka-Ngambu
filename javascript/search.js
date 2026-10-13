// search.js - Site-wide search/filtering utility
document.addEventListener('DOMContentLoaded', () => {
    // Check if a search input exists on the page, or create a helper function
    window.initLiveSearch = function(inputSelector, itemSelector, textSelector) {
        const searchInput = document.querySelector(inputSelector);
        const items = document.querySelectorAll(itemSelector);

        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            items.forEach(item => {
                const textTarget = textSelector ? item.querySelector(textSelector) : item;
                const textContent = textTarget ? textTarget.textContent.toLowerCase() : '';

                if (textContent.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    };
});