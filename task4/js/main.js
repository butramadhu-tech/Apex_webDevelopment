/**
 * task4/js/main.js
 * Optimized, Modular JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initHamburgerMenu();
    initBackToTop();
    initScrollProgress();
    initModal();
    initSlider();
    initFormValidation();
    initActiveNavHighlight();
});

/* --- 1. Theme Toggle & Local Storage --- */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
        themeToggleBtn.setAttribute('aria-label', 'Toggle Light Mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('aria-label', isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

/* --- 2. Responsive Hamburger Menu --- */
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
        hamburger.setAttribute('aria-expanded', isActive);
    });
}

/* --- 3. Back to Top Button --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- 4. Scroll Progress Bar --- */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });
}

/* --- 5. Modal Popup --- */
function initModal() {
    const modalBtns = document.querySelectorAll('.open-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeBtn = document.querySelector('.close-modal');

    if (!modalBtns.length || !modalOverlay || !closeBtn) return;

    modalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            closeBtn.focus(); // Accessibility focus
        });
    });

    closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
}

/* --- 6. Image Slider/Carousel --- */
function initSlider() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!sliderWrapper || slides.length === 0) return;

    let currentIndex = 0;
    let sliderInterval;

    const updateSlider = () => {
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    };

    const startInterval = () => {
        sliderInterval = setInterval(nextSlide, 5000);
    };

    const resetInterval = () => {
        clearInterval(sliderInterval);
        startInterval();
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    startInterval();
}

/* --- 7. Form Validation --- */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const msgInput = document.getElementById('message');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

    const checkInput = (input, validator, errorMsgEl) => {
        if (!validator(input.value)) {
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            if (errorMsgEl) errorMsgEl.style.display = 'block';
            return false;
        } else {
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
            if (errorMsgEl) errorMsgEl.style.display = 'none';
            return true;
        }
    };

    if (nameInput) nameInput.addEventListener('keyup', () => checkInput(nameInput, val => val.trim().length > 0, document.getElementById('name-error')));
    if (emailInput) emailInput.addEventListener('keyup', () => checkInput(emailInput, validateEmail, document.getElementById('email-error')));
    if (msgInput) msgInput.addEventListener('keyup', () => checkInput(msgInput, val => val.trim().length > 10, document.getElementById('msg-error')));

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = checkInput(nameInput, val => val.trim().length > 0, document.getElementById('name-error'));
        const isEmailValid = checkInput(emailInput, validateEmail, document.getElementById('email-error'));
        const isMsgValid = checkInput(msgInput, val => val.trim().length > 10, document.getElementById('msg-error'));

        if (isNameValid && isEmailValid && isMsgValid) {
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
}

/* --- 8. Active Nav Highlight on Scroll (For one-page sections) --- */
function initActiveNavHighlight() {
    // This highlights based on scroll position if you have sections with IDs matching hrefs
    // Given the structure is multi-page, this mainly applies to highlighting index sections
    // Or we simply rely on the hardcoded 'active' class on page load (which is already done in HTML).
    
    // As a bonus enhancement for the index page if it had sections:
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if(sections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            if(current) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            }
        }, { passive: true });
    }
}
