// Testimonial Slider (CSS Scroll-Snap + Minimal JS)
class TestimonialSlider {
    constructor(element) {
        this.slider = element;
        this.cards = [...element.querySelectorAll('.testimonial-card')];
        this.dots = [...document.querySelectorAll('.testimonial-nav .dot')];
        this.currentIndex = 0;

        if (this.cards.length === 0) return;

        this.init();
    }

    init() {
        this.initSwipe();
        this.initDots();
        this.initKeyboard();
        this.initScrollObserver();
    }

    initSwipe() {
        let startX = 0;
        let startTime = 0;

        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startTime = Date.now();
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
        }, { passive: true });
    }

    initDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goTo(index);
            });
        });
    }

    initKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
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
                            this.updateDots(index);
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        this.cards.forEach((card) => observer.observe(card));
    }

    next() {
        if (this.currentIndex < this.cards.length - 1) {
            this.goTo(this.currentIndex + 1);
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.goTo(this.currentIndex - 1);
        }
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
