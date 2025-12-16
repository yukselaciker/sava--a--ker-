// Testimonial Slider - Continuous Smooth Auto-Scroll (Marquee Effect)
class TestimonialSlider {
    constructor(element) {
        this.slider = element;
        this.cards = [...element.querySelectorAll('.testimonial-card')];
        this.dots = [...document.querySelectorAll('.testimonial-nav .dot')];
        this.currentIndex = 0;
        this.isUserInteracting = false;
        this.scrollAnimation = null;

        if (this.cards.length === 0) return;

        this.init();
    }

    init() {
        this.duplicateCards(); // For seamless infinite scroll
        this.initSwipe();
        this.initDots();
        this.initKeyboard();
        this.initScrollObserver();
        this.initContinuousScroll();
        this.initPauseOnInteraction();
    }

    duplicateCards() {
        // Duplicate all cards for seamless infinite scroll
        const fragment = document.createDocumentFragment();
        this.cards.forEach(card => {
            const clone = card.cloneNode(true);
            fragment.appendChild(clone);
        });
        this.slider.appendChild(fragment);
    }

    initSwipe() {
        let startX = 0;

        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.pauseScroll();
        }, { passive: true });

        this.slider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                diff > 0 ? this.next() : this.prev();
            }

            setTimeout(() => this.resumeScroll(), 2000);
        }, { passive: true });
    }

    initDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.pauseScroll();
                this.goTo(index);
                setTimeout(() => this.resumeScroll(), 3000);
            });
        });
    }

    initKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.pauseScroll();
                this.prev();
                setTimeout(() => this.resumeScroll(), 2000);
            }
            if (e.key === 'ArrowRight') {
                this.pauseScroll();
                this.next();
                setTimeout(() => this.resumeScroll(), 2000);
            }
        });
    }

    initScrollObserver() {
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

    initContinuousScroll() {
        // Smooth, continuous auto-scroll
        const scroll = () => {
            if (!this.isUserInteracting) {
                // Scroll 1 pixel at a time for ultra-smooth effect
                this.slider.scrollLeft += 1;

                // Reset to beginning when reaching halfway (seamless loop)
                const maxScroll = this.slider.scrollWidth / 2;
                if (this.slider.scrollLeft >= maxScroll) {
                    this.slider.scrollLeft = 0;
                }
            }

            this.scrollAnimation = requestAnimationFrame(scroll);
        };

        scroll();
    }

    initPauseOnInteraction() {
        // Pause on hover (desktop)
        this.slider.addEventListener('mouseenter', () => {
            this.pauseScroll();
        });

        this.slider.addEventListener('mouseleave', () => {
            this.resumeScroll();
        });

        // Pause on manual scroll
        let scrollTimeout;
        this.slider.addEventListener('scroll', () => {
            this.pauseScroll();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.resumeScroll();
            }, 2000);
        }, { passive: true });
    }

    pauseScroll() {
        this.isUserInteracting = true;
    }

    resumeScroll() {
        this.isUserInteracting = false;
    }

    next() {
        const cardWidth = this.cards[0].offsetWidth + 16; // card width + gap
        this.slider.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    }

    prev() {
        const cardWidth = this.cards[0].offsetWidth + 16;
        this.slider.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    }

    goTo(index) {
        const cardWidth = this.cards[0].offsetWidth + 16;
        this.slider.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
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
