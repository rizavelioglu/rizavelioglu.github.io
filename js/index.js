// Vanilla JS - no jQuery needed
document.addEventListener('DOMContentLoaded', function() {
    // Handle publication video hover effects
    document.querySelectorAll('.publication-mousecell').forEach(function(cell) {
        const video = cell.querySelector('video');
        const img = cell.querySelector('img');
        
        if (video && img) {
            cell.addEventListener('mouseenter', function() {
                img.style.display = 'none';
                video.style.display = 'block';
                video.currentTime = 0;
                video.play();
            });
            
            cell.addEventListener('mouseleave', function() {
                video.style.display = 'none';
                video.pause();
                img.style.display = 'block';
            });
        }
    });

    // Lazy load images that are below the fold
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
});
