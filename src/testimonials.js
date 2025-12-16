// Testimonial Slider (CSS Scroll-Snap + Auto-Scroll)
class TestimonialSlider {
    constructor(element) {
        this.slider = element;
        this.cards = [...element.querySelectorAll('.testimonial-card')];
        this.dots = [...document.querySelectorAll('.testimonial-nav .dot')];
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        this.isUserInteracting = false;
        this.scrollTimeout = null;

        if (this.cards.length === 0) return;

        this.init();
    }

    init() {
        this.initSwipe();
        this.initDots();
        this.initKeyboard();
        this.initScrollObserver();
        this.initAutoScroll();
        this.initPauseOnInteraction();
    }

    initSwipe() {
        let startX = 0;
        let startTime = 0;

        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startTime = Date.now();
            this.pauseAutoScroll();
        }, { passive: true });

        this.slider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            const duration = Date.now() - startTime;
            const velocity = Math.abs(diff) / duration;

            // Swipe threshold: 50px or fast swipe
            if (Math.abs(diff) > 50 || velocity > 0.3) {
                diff > 0 ? this.next() : this.prev();
            }

            this.resumeAutoScroll();
        }, { passive: true });
    }

    initDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.pauseAutoScroll();
                this.goTo(index);
                this.resumeAutoScroll();
            });
        });
    }

    initKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.pauseAutoScroll();
                this.prev();
                this.resumeAutoScroll();
            }
            if (e.key === 'ArrowRight') {
                this.pauseAutoScroll();
                this.next();
                this.resumeAutoScroll();
            }
        });
    }

    initScrollObserver() {
        // Update dots based on scroll position
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = this.cards.indexOf(entry.target);
                        if (index !== -1) {
                            this.currentIndex = index;
                            this.updateDots(index);
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        this.cards.forEach((card) => observer.observe(card));
    }

    initAutoScroll() {
        // Start auto-scroll (5 seconds per testimonial - calm, readable pacing)
        this.autoScrollInterval = setInterval(() => {
            if (!this.isUserInteracting) {
                this.next();
            }
        }, 5000);
    }

    initPauseOnInteraction() {
        // Pause on hover (desktop)
        this.slider.addEventListener('mouseenter', () => {
            this.pauseAutoScroll();
        });

        this.slider.addEventListener('mouseleave', () => {
            this.resumeAutoScroll();
        });

        // Pause on manual scroll
        this.slider.addEventListener('scroll', () => {
            this.pauseAutoScroll();
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.resumeAutoScroll();
            }, 2000);
        }, { passive: true });
    }

    pauseAutoScroll() {
        this.isUserInteracting = true;
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }

    resumeAutoScroll() {
        this.isUserInteracting = false;
        if (!this.autoScrollInterval) {
            this.autoScrollInterval = setInterval(() => {
                if (!this.isUserInteracting) {
                    this.next();
                }
            }, 5000);
        }
    }

    next() {
        // Infinite loop: go back to first when reaching the end
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.goTo(this.currentIndex);
    }

    prev() {
        // Infinite loop: go to last when going before first
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goTo(this.currentIndex);
    }

    goTo(index) {
        this.currentIndex = index;
        this.cards[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
        this.updateDots(index);
    }

    updateDots(index) {
        this.dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        new TestimonialSlider(slider);
    }
});
