/**
 * Savaş Açıker - Premium Matematik Eğitimi
 * Main JavaScript Entry Point (Vite)
 */

// Import styles (Vite will process this)
import './styles.css';

// Mark CSS as loaded to show page (FOUC prevention)
document.documentElement.classList.add('css-ready');

// ===== ENVIRONMENT DETECTION (Vite) =====
const isDev = import.meta.env.DEV;

// ===== FORMSPREE CONFIGURATION =====
// Replace XXXXYYYY with your actual Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXYYYY';

// ===== UTILITY FUNCTIONS =====
// Throttle: limits function calls to at most once per 'limit' ms
const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Debounce: delays function call until 'wait' ms after last call
const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initProgramFilters();
    initFAQAccordion();
    initFAQSearch();
    initCounters();
    initScrollToTop();
    initScrollProgress();
    initContactForm();
    initSmoothScroll();
    initScrollspy();
    initTestimonialSlider();
    initTestimonialToggle();
    initFormDraft();
    initDarkMode();
    initMobileCTA();
    initStepsAnimation();
    initCertificateModal();
    initDevBadge();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    });
}

// ===== NAVBAR SHADOW ON SCROLL =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;

    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// ===== PROGRAM FILTER CHIPS =====
function initProgramFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const programCards = document.querySelectorAll('.program-card');
    const programCountEl = document.getElementById('programCount');

    if (!filterChips.length || !programCards.length) return;

    const updateProgramCount = () => {
        if (!programCountEl) return;
        const visibleCount = [...programCards].filter(c => c.style.display !== 'none').length;
        programCountEl.textContent = `${visibleCount} program listeleniyor`;
    };

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state
            filterChips.forEach(c => {
                c.classList.remove('active', 'bg-primary', 'text-white');
                c.classList.add('bg-gray-100', 'text-text-secondary');
            });
            chip.classList.add('active', 'bg-primary', 'text-white');
            chip.classList.remove('bg-gray-100', 'text-text-secondary');

            // Filter cards
            const filter = chip.dataset.filter;
            programCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });

            setTimeout(updateProgramCount, 50);
        });
    });
}

// ===== FAQ ACCORDION =====
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        if (!btn || !content) return;

        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', () => {
            const isOpen = content.classList.contains('open');

            // Close all other items
            faqItems.forEach(otherItem => {
                const otherContent = otherItem.querySelector('.faq-content');
                const otherIcon = otherItem.querySelector('.faq-icon');
                const otherBtn = otherItem.querySelector('.faq-btn');

                if (otherContent) otherContent.classList.remove('open');
                if (otherIcon) {
                    otherIcon.textContent = '+';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
                if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isOpen) {
                content.classList.add('open');
                if (icon) {
                    icon.textContent = '−';
                    icon.style.transform = 'rotate(180deg)';
                }
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ===== FAQ SEARCH =====
function initFAQSearch() {
    const faqSearch = document.getElementById('faqSearch');
    const faqNoResults = document.getElementById('faqNoResults');
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqSearch || !faqNoResults || !faqItems.length) return;

    const filterFAQ = debounce((query) => {
        const lowerQuery = query.toLowerCase().trim();
        let hasVisible = false;

        faqItems.forEach(item => {
            const questionEl = item.querySelector('.faq-btn span');
            const answerEl = item.querySelector('.faq-content p');
            const question = questionEl ? questionEl.textContent.toLowerCase() : '';
            const answer = answerEl ? answerEl.textContent.toLowerCase() : '';
            const matches = lowerQuery === '' || question.includes(lowerQuery) || answer.includes(lowerQuery);

            item.style.display = matches ? '' : 'none';
            if (matches) hasVisible = true;
        });

        faqNoResults.classList.toggle('hidden', hasVisible || lowerQuery === '');
    }, 200);

    faqSearch.addEventListener('input', (e) => filterFAQ(e.target.value));
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats');

    if (!counters.length || !statsSection) return;

    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    // Format based on target value
                    if (target === 95) {
                        counter.textContent = target + '%';
                    } else {
                        counter.textContent = target + '+';
                    }
                }
            };

            updateCounter();
        });
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;

    let scrollTicking = false;

    const updateScrollButton = () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.add('opacity-100');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.remove('opacity-100');
        }
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollButton);
            scrollTicking = true;
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    const updateScrollProgress = throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }, 50);

    window.addEventListener('scroll', updateScrollProgress);
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    if (!contactForm || !submitBtn || !formSuccess || !formError) return;

    // Rate limiting
    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = isDev ? 3000 : 15000;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check
        const honeypot = contactForm.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) {
            return false;
        }

        // Rate limiting check
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS && lastSubmitTime > 0) {
            formError.textContent = 'Lütfen birkaç saniye bekleyip tekrar deneyin.';
            formError.classList.remove('hidden');
            return false;
        }
        lastSubmitTime = now;

        // Hide previous messages
        formSuccess.classList.add('hidden');
        formError.classList.add('hidden');

        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Gönderiliyor...';

        // Collect form data
        const formData = new FormData(contactForm);

        try {
            if (isDev) {
                // DEV MODE: Simulate successful submission
                console.log('DEV MODE: Simulated form submission');
                await new Promise(resolve => setTimeout(resolve, 800));
                formSuccess.classList.remove('hidden');
                contactForm.reset();
                // Clear draft
                localStorage.removeItem('contactFormDraft');
            } else {
                // PRODUCTION MODE: Send real request to Formspree
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formSuccess.classList.remove('hidden');
                    contactForm.reset();
                    localStorage.removeItem('contactFormDraft');
                } else {
                    throw new Error('Form submission failed');
                }
            }
        } catch (error) {
            formError.classList.remove('hidden');
            if (!isDev) {
                console.error('Form error:', error);
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gönder ve Dönüş Al';
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== SCROLLSPY =====
function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const mobileNavLinks = document.querySelectorAll('#mobileMenu a[href^="#"]');

    if (!sections.length) return;

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;

                // Update desktop nav
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('text-primary', 'font-semibold');
                        link.classList.remove('text-text-secondary');
                    } else if (!link.classList.contains('bg-primary')) {
                        link.classList.remove('text-primary', 'font-semibold');
                        link.classList.add('text-text-secondary');
                    }
                });

                // Update mobile nav
                mobileNavLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('text-primary', 'font-semibold');
                    } else if (!link.classList.contains('bg-primary')) {
                        link.classList.remove('text-primary', 'font-semibold');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('#sliderDots span');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    if (!testimonialSlides.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    const totalSlides = testimonialSlides.length;

    const showSlide = (index) => {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.add('hidden');
            slide.classList.remove('active');
            if (sliderDots[i]) {
                sliderDots[i].classList.remove('bg-primary');
                sliderDots[i].classList.add('bg-gray-300');
            }
        });

        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.remove('hidden');
            testimonialSlides[index].classList.add('active');
        }
        if (sliderDots[index]) {
            sliderDots[index].classList.add('bg-primary');
            sliderDots[index].classList.remove('bg-gray-300');
        }
    };

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    // Auto-slide every 5 seconds
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);

    // Pause auto-slide on user interaction
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            }, 5000);
        });
    });
}

// ===== TESTIMONIAL TOGGLE =====
function initTestimonialToggle() {
    const toggleBtn = document.getElementById('toggleTestimonials');
    const moreTestimonials = document.getElementById('moreTestimonials');
    const toggleText = document.getElementById('toggleText');
    const toggleIcon = document.getElementById('toggleIcon');

    if (!toggleBtn || !moreTestimonials) return;

    let isExpanded = false;

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        if (isExpanded) {
            moreTestimonials.classList.remove('hidden');
            moreTestimonials.classList.add('fade-in');
            if (toggleText) toggleText.textContent = 'Daha Az Göster';
            if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
        } else {
            moreTestimonials.classList.add('hidden');
            moreTestimonials.classList.remove('fade-in');
            if (toggleText) toggleText.textContent = 'Tüm Yorumları Gör';
            if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
        }
    });
}

// ===== FORM DRAFT AUTO-SAVE =====
function initFormDraft() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    const DRAFT_KEY = 'contactFormDraft';

    // Restore saved draft
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
        try {
            const draft = JSON.parse(savedDraft);
            formInputs.forEach(input => {
                if (draft[input.name] && input.name !== 'website') {
                    input.value = draft[input.name];
                }
            });
        } catch (e) {
            // Silently fail
        }
    }

    // Save draft on input
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            const draft = {};
            formInputs.forEach(inp => {
                if (inp.name && inp.value && inp.name !== 'website') {
                    draft[inp.name] = inp.value;
                }
            });
            localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        });
    });
}

// ===== DARK MODE =====
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const darkModeIconMobile = document.getElementById('darkModeIconMobile');
    const DARK_MODE_KEY = 'darkMode';

    const updateDarkModeIcons = (isDark) => {
        const icon = isDark ? '☀️' : '🌙';
        if (darkModeIcon) darkModeIcon.textContent = icon;
        if (darkModeIconMobile) darkModeIconMobile.textContent = icon;
    };

    const toggleDarkMode = () => {
        // Add transitioning class
        document.documentElement.classList.add('theme-transitioning');

        const isDark = document.documentElement.classList.toggle('dark');
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem(DARK_MODE_KEY, isDark ? 'true' : 'false');
        updateDarkModeIcons(isDark);

        // Remove transitioning class after transition completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    };

    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);
    if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        updateDarkModeIcons(true);
    }

    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
    if (darkModeToggleMobile) darkModeToggleMobile.addEventListener('click', toggleDarkMode);
}

// ===== MOBILE STICKY CTA =====
function initMobileCTA() {
    const mobileCTA = document.getElementById('mobileCTA');
    const contactSection = document.getElementById('iletisim');

    if (!mobileCTA || !contactSection) return;

    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mobileCTA.classList.remove('visible');
            } else {
                mobileCTA.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    ctaObserver.observe(contactSection);

    // Show CTA after initial page load
    setTimeout(() => {
        if (window.scrollY > 100) {
            mobileCTA.classList.add('visible');
        }
    }, 500);
}

// ===== STEPS SECTION ANIMATION =====
function initStepsAnimation() {
    const stepCards = document.querySelectorAll('.step-card.fade-in-up');
    if (!stepCards.length) return;

    const stepsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    stepCards.forEach(card => stepsObserver.observe(card));
}

// ===== DEV MODE BADGE =====
// Disabled - no longer needed for production
function initDevBadge() {
    // Badge removed for production
}

// ===== CERTIFICATE MODAL =====
function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCertificateModal();
        }
    });
}

// Global functions for certificate modal (called from onclick in HTML)
window.openCertificateModal = function (imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateModalImg');

    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeCertificateModal = function () {
    const modal = document.getElementById('certificateModal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};
