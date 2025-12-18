// Draggable Testimonial Band - Seamless marquee with momentum scrolling
document.addEventListener('DOMContentLoaded', () => {
    try {
        const band = document.querySelector('.testimonial-band');
        const track = document.querySelector('.testimonial-track');

        if (!band || !track) {
            console.warn('Testimonial elements not found - skipping carousel initialization');
            return;
        }

        // State
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationPaused = false;
        let resumeTimeout;

        // Momentum scrolling state
        let velocity = 0;
        let lastX = 0;
        let lastTime = 0;
        let momentumId = null;
        const friction = 0.95; // Smooth deceleration
        const minVelocity = 0.5;

        // Get current animation translate value
        function getCurrentTranslate() {
            const style = window.getComputedStyle(track);
            const matrix = new DOMMatrix(style.transform);
            return matrix.m41;
        }

        // Get track width for wrapping
        function getTrackWidth() {
            return track.scrollWidth / 2;
        }

        // Wrap translate value for seamless loop
        function wrapTranslate(value) {
            const trackWidth = getTrackWidth();
            if (value > 0) {
                return value - trackWidth;
            } else if (value < -trackWidth) {
                return value + trackWidth;
            }
            return value;
        }

        // Apply transform
        function setTransform(value) {
            currentTranslate = wrapTranslate(value);
            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        // Pause CSS animation
        function pauseAnimation() {
            if (animationPaused) return;

            currentTranslate = getCurrentTranslate();
            track.style.animation = 'none';
            track.style.transform = `translateX(${currentTranslate}px)`;
            animationPaused = true;
            band.classList.add('paused');
        }

        // Resume CSS animation after delay
        function resumeAnimation() {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                if (!isDragging && Math.abs(velocity) < minVelocity) {
                    track.style.animation = '';
                    track.style.transform = '';
                    animationPaused = false;
                    band.classList.remove('paused');
                }
            }, 3000);
        }

        // Momentum animation loop
        function momentumLoop() {
            if (Math.abs(velocity) < minVelocity) {
                cancelAnimationFrame(momentumId);
                momentumId = null;
                resumeAnimation();
                return;
            }

            currentTranslate += velocity;
            setTransform(currentTranslate);
            velocity *= friction;

            momentumId = requestAnimationFrame(momentumLoop);
        }

        // Start momentum scrolling
        function startMomentum() {
            if (momentumId) {
                cancelAnimationFrame(momentumId);
            }
            momentumId = requestAnimationFrame(momentumLoop);
        }

        // Stop momentum
        function stopMomentum() {
            if (momentumId) {
                cancelAnimationFrame(momentumId);
                momentumId = null;
            }
            velocity = 0;
        }

        // Mouse Events - Desktop
        band.addEventListener('mousedown', (e) => {
            isDragging = true;
            stopMomentum();
            band.classList.add('dragging');
            pauseAnimation();
            startX = e.pageX;
            lastX = e.pageX;
            lastTime = Date.now();
            prevTranslate = currentTranslate;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const now = Date.now();
            const dt = now - lastTime;

            if (dt > 0) {
                velocity = (e.pageX - lastX) / dt * 16; // Normalize to ~60fps
            }

            lastX = e.pageX;
            lastTime = now;

            const diff = e.pageX - startX;
            setTransform(prevTranslate + diff);
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                band.classList.remove('dragging');

                // Start momentum if velocity is significant
                if (Math.abs(velocity) > minVelocity) {
                    startMomentum();
                } else {
                    resumeAnimation();
                }
            }
        });

        band.addEventListener('mouseleave', () => {
            if (!isDragging) {
                resumeAnimation();
            }
        });

        // Touch Events - Mobile (with momentum)
        band.addEventListener('touchstart', (e) => {
            isDragging = true;
            stopMomentum();
            band.classList.add('dragging');
            pauseAnimation();
            startX = e.touches[0].pageX;
            lastX = e.touches[0].pageX;
            lastTime = Date.now();
            prevTranslate = currentTranslate;
        }, { passive: true });

        band.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const now = Date.now();
            const dt = now - lastTime;
            const touchX = e.touches[0].pageX;

            if (dt > 0) {
                velocity = (touchX - lastX) / dt * 16;
            }

            lastX = touchX;
            lastTime = now;

            const diff = touchX - startX;
            setTransform(prevTranslate + diff);
        }, { passive: true });

        band.addEventListener('touchend', () => {
            isDragging = false;
            band.classList.remove('dragging');

            // Start momentum with smooth deceleration
            if (Math.abs(velocity) > minVelocity) {
                startMomentum();
            } else {
                resumeAnimation();
            }
        }, { passive: true });

        // Wheel scroll with momentum
        let wheelTimeout;
        band.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                pauseAnimation();
                stopMomentum();

                // Add wheel delta to velocity for accumulation
                velocity += -e.deltaY * 0.3;
                velocity = Math.max(-50, Math.min(50, velocity)); // Clamp velocity

                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    startMomentum();
                }, 50);
            }
        }, { passive: false });

        // Pause on hover (for reading)
        band.addEventListener('mouseenter', () => {
            if (!isDragging) {
                pauseAnimation();
            }
        });
    } catch (error) {
        console.error('Failed to initialize testimonial carousel:', error);
        // Fail gracefully - carousel won't work but page continues
    }
});
