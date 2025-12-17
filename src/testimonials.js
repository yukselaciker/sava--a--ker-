// Draggable Testimonial Band - Seamless marquee with drag support
document.addEventListener('DOMContentLoaded', () => {
    const band = document.querySelector('.testimonial-band');
    const track = document.querySelector('.testimonial-track');

    if (!band || !track) return;

    // Drag state
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationPaused = false;
    let resumeTimeout;

    // Get current animation translate value
    function getCurrentTranslate() {
        const style = window.getComputedStyle(track);
        const matrix = new DOMMatrix(style.transform);
        return matrix.m41; // translateX value
    }

    // Pause animation and switch to manual control
    function pauseAnimation() {
        if (animationPaused) return;

        currentTranslate = getCurrentTranslate();
        track.style.animation = 'none';
        track.style.transform = `translateX(${currentTranslate}px)`;
        animationPaused = true;
        band.classList.add('paused');
    }

    // Resume CSS animation
    function resumeAnimation() {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            if (!isDragging) {
                // Reset to CSS animation
                track.style.animation = '';
                track.style.transform = '';
                animationPaused = false;
                band.classList.remove('paused');
            }
        }, 2000); // Resume after 2 seconds of no interaction
    }

    // Mouse Events - Desktop
    band.addEventListener('mousedown', (e) => {
        isDragging = true;
        band.classList.add('dragging');
        pauseAnimation();
        startX = e.pageX;
        prevTranslate = currentTranslate;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const diff = e.pageX - startX;
        currentTranslate = prevTranslate + diff;

        // Get track width for wrapping
        const trackWidth = track.scrollWidth / 2; // Half because content is duplicated

        // Wrap around seamlessly
        if (currentTranslate > 0) {
            currentTranslate = -trackWidth + currentTranslate;
        } else if (currentTranslate < -trackWidth) {
            currentTranslate = currentTranslate + trackWidth;
        }

        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            band.classList.remove('dragging');
            resumeAnimation();
        }
    });

    band.addEventListener('mouseleave', () => {
        if (!isDragging) {
            resumeAnimation();
        }
    });

    // Touch Events - Mobile
    band.addEventListener('touchstart', (e) => {
        isDragging = true;
        band.classList.add('dragging');
        pauseAnimation();
        startX = e.touches[0].pageX;
        prevTranslate = currentTranslate;
    }, { passive: true });

    band.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].pageX - startX;
        currentTranslate = prevTranslate + diff;

        const trackWidth = track.scrollWidth / 2;

        if (currentTranslate > 0) {
            currentTranslate = -trackWidth + currentTranslate;
        } else if (currentTranslate < -trackWidth) {
            currentTranslate = currentTranslate + trackWidth;
        }

        track.style.transform = `translateX(${currentTranslate}px)`;
    }, { passive: true });

    band.addEventListener('touchend', () => {
        isDragging = false;
        band.classList.remove('dragging');
        resumeAnimation();
    }, { passive: true });

    // Wheel scroll support
    band.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            pauseAnimation();

            currentTranslate -= e.deltaY;
            const trackWidth = track.scrollWidth / 2;

            if (currentTranslate > 0) {
                currentTranslate = -trackWidth + currentTranslate;
            } else if (currentTranslate < -trackWidth) {
                currentTranslate = currentTranslate + trackWidth;
            }

            track.style.transform = `translateX(${currentTranslate}px)`;
            resumeAnimation();
        }
    }, { passive: false });

    // Pause on hover (optional - for reading)
    band.addEventListener('mouseenter', () => {
        pauseAnimation();
    });
});
