
// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
// Disable common developer tool shortcuts
document.onkeydown = function(e) {
    // F12
    if (e.keyCode == 123) {
        return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    // Ctrl+U
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};

// --- Updated Portfolio Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Find the two empty <span> elements we just created in the HTML
    const basicPriceElement = document.getElementById('basic-price');
    const premiumPriceElement = document.getElementById('premium-price');

    // 2. Fetch the price data from our server's API endpoint
    fetch('/api/book/getPrice')
        .then(response => response.json())
        .then(priceInfo => {
            // This is the data from our server, e.g., { symbol: '₹', plans: { basic: 999, premium: 2000 } }

            // 3. Update the HTML elements with the correct prices
            if (basicPriceElement) {
                basicPriceElement.textContent = `(${priceInfo.symbol}${priceInfo.plans.basic})`;
            }

            if (premiumPriceElement) {
                premiumPriceElement.textContent = `(${priceInfo.symbol}${priceInfo.plans.premium})`;
            }
        })
        .catch(error => {
            // If there's an error, we'll log it to the console and the prices won't be displayed
            console.error('Failed to fetch prices:', error);
        });
    // -------------------------------------------------------- //
    // Select ALL buttons with the .project-btn class, across both tiers
    const allProjectButtons = document.querySelectorAll('.project-btn');
    const portfolioViewer = document.getElementById('portfolio-viewer');

    // Set the initial view on page load to the first button
    const defaultButton = allProjectButtons[0];
    if (defaultButton) {
        defaultButton.classList.add('active');
        portfolioViewer.src = defaultButton.getAttribute('data-src');
    }

    // Add a click listener TO EACH BUTTON
    allProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. When a button is clicked, first remove 'active' from ALL buttons
            allProjectButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // 2. Then, add 'active' ONLY to the one that was just clicked
            button.classList.add('active');

            // 3. Update the iframe to show the selected project
            const newSrc = button.getAttribute('data-src');
            if (newSrc) {
                portfolioViewer.src = newSrc;
            }
        });
    });
});

// This wrapper makes sure the code doesn't run until the HTML page is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

    // link that use for copy and share.
    const shareableLink = "https://klsmolay.github.io/PortfolioThemeView/";

    // --- ELEMENT REFERENCES ---
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const shareModal = document.getElementById('shareModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const copyButtonText = document.getElementById('copyButtonText');
    const shareToAppButton = document.getElementById('shareToAppButton');
    const shareToAppSection = document.getElementById('shareToAppSection');
    const divider = document.getElementById('divider');
    const linkInput = document.getElementById('linkInput');

    // Make sure all elements were found before proceeding
    if (!openModalButton || !closeModalButton || !shareModal || !linkInput) {
        console.error("Modal elements could not be found. Check your HTML IDs.");
        return; // Stop the script if essential elements are missing
    }

    // Set the input field to show the shareable link
    linkInput.value = shareableLink;

    // --- MODAL FUNCTIONS ---
    const openModal = () => {
        shareModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            modalOverlay.classList.add('modal-overlay-enter-active');
            shareModal.querySelector('.modal-card-enter').classList.add('modal-card-enter-active');
        });
    };
    
    const closeModal = () => {
        document.body.style.overflow = '';
        modalOverlay.classList.remove('modal-overlay-enter-active');
        shareModal.querySelector('.modal-card-enter').classList.remove('modal-card-enter-active');
        // Hide the modal after the animation finishes (200ms)
        setTimeout(() => shareModal.classList.add('hidden'), 200);
    };

    // --- EVENT LISTENERS ---
    openModalButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // "Copy Link" Button Logic
    copyLinkButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            copyButtonText.textContent = 'Copied!';
            setTimeout(() => { copyButtonText.textContent = 'Copy'; }, 2000);
        } catch (err) {
            console.error('Failed to copy link: ', err);
            copyButtonText.textContent = 'Error!';
        }
    });

    // "Share to App" Button Logic (only shows on supported devices like phones)
    if (navigator.share) {
        shareToAppSection.classList.remove('hidden');
        divider.classList.remove('hidden');

        shareToAppButton.addEventListener('click', async () => {
            const shareData = {
                title: 'Check out BroTech!',
                text: `I thought you might like this service. Check it out here: ${shareableLink}`,
                url: shareableLink
            };
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Share failed:', err);
            }
        });
    } else {
        shareToAppSection.classList.add('hidden');
        divider.classList.add('hidden');
    }

});
