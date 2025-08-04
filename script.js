
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

document.addEventListener('DOMContentLoaded', () => {
    const buttonsContainer = document.getElementById('project-buttons');
    const portfolioViewer = document.getElementById('portfolio-viewer');
    const projectButtons = document.querySelectorAll('.project-btn');

    buttonsContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.project-btn');

        if (!clickedButton) return;
        // Remove active class from all buttons
        projectButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the clicked button
        clickedButton.classList.add('active');
        const projectUrl = clickedButton.dataset.src;
        
        if (projectUrl) {
            portfolioViewer.src = projectUrl;
            portfolioViewer.classList.add('visible');
        }
    });
});