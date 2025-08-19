document.addEventListener('DOMContentLoaded', () => {
    // --- Setup ---
    const reviewsPerPage = 6;
    const allReviews = document.querySelectorAll('.review-card');
    const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
    let currentPage = 1;

    // Get the buttons and page indicator from the HTML
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageIndicator = document.getElementById('page-indicator');

    // --- Core Function ---
    function showPage(page) {
        // Calculate the start and end index for the reviews on the current page
        const startIndex = (page - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;

        // Loop through all reviews and hide/show them
        allReviews.forEach((review, index) => {
            if (index >= startIndex && index < endIndex) {
                review.style.display = 'block'; // Or 'grid', 'flex', etc., depending on your CSS
            } else {
                review.style.display = 'none';
            }
        });

        // Update the page indicator text
        if (pageIndicator) {
            pageIndicator.textContent = `Page ${page} of ${totalPages}`;
        }
        
        // --- Button State Logic ---
        // Disable 'Previous' button if on the first page
        if (prevButton) {
            prevButton.disabled = page === 1;
        }
        // Disable 'Next' button if on the last page
        if (nextButton) {
            nextButton.disabled = page === totalPages;
        }
    }

    // --- Event Listeners ---
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
    }

    // --- Initial Load ---
    // Show the first page of reviews when the website loads
    showPage(currentPage);
});