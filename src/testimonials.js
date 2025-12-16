// Editorial Testimonial Band - CSS Animation only, JS for touch pause
document.addEventListener('DOMContentLoaded', () => {
    const band = document.querySelector('.testimonial-band');
    const track = document.querySelector('.testimonial-track');

    if (!band || !track) return;

    // Pause on touch for mobile
    let touchTimeout;

    band.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    }, { passive: true });

    band.addEventListener('touchend', () => {
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
            track.style.animationPlayState = 'running';
        }, 2000);
    }, { passive: true });

    // Allow manual horizontal scroll on mobile
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

    band.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX;
        scrollLeft = band.scrollLeft;
    }, { passive: true });

    band.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        const x = e.touches[0].pageX;
        const walk = (startX - x);
        band.scrollLeft = scrollLeft + walk;
    }, { passive: true });

    band.addEventListener('touchend', () => {
        isScrolling = false;
    }, { passive: true });
});
