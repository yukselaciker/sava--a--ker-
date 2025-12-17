// Draggable Testimonial Band - Marquee with user scroll/drag support
document.addEventListener('DOMContentLoaded', () => {
    const band = document.querySelector('.testimonial-band');
    const track = document.querySelector('.testimonial-track');

    if (!band || !track) return;

    // Drag state
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Mouse Events - Desktop
    band.addEventListener('mousedown', (e) => {
        isDragging = true;
        band.classList.add('dragging');
        startX = e.pageX - band.offsetLeft;
        scrollLeft = band.scrollLeft;
    });

    band.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            band.classList.remove('dragging');
        }
    });

    band.addEventListener('mouseup', () => {
        isDragging = false;
        band.classList.remove('dragging');
    });

    band.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - band.offsetLeft;
        const walk = (x - startX) * 2; // Speed multiplier
        band.scrollLeft = scrollLeft - walk;
    });

    // Touch Events - Mobile
    let touchTimeout;

    band.addEventListener('touchstart', (e) => {
        isDragging = true;
        band.classList.add('dragging');
        startX = e.touches[0].pageX - band.offsetLeft;
        scrollLeft = band.scrollLeft;
    }, { passive: true });

    band.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - band.offsetLeft;
        const walk = (x - startX) * 1.5;
        band.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    band.addEventListener('touchend', () => {
        isDragging = false;
        band.classList.remove('dragging');

        // Resume animation after 3 seconds of no interaction
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
            band.classList.remove('paused');
        }, 3000);
    }, { passive: true });

    // Wheel scroll support (horizontal scroll on vertical wheel)
    band.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            band.scrollLeft += e.deltaY;
            band.classList.add('paused');

            // Resume animation after scroll stops
            clearTimeout(touchTimeout);
            touchTimeout = setTimeout(() => {
                band.classList.remove('paused');
            }, 3000);
        }
    }, { passive: false });

    // Pause animation on any interaction, resume after idle
    band.addEventListener('scroll', () => {
        band.classList.add('paused');
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
            band.classList.remove('paused');
        }, 3000);
    }, { passive: true });
});
