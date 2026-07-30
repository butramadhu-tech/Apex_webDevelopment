// task2/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle & Local Storage
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            let theme = 'light';
            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggleBtn.textContent = '☀️';
            } else {
                themeToggleBtn.textContent = '🌙';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // 2. Responsive Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle nav
            navLinks.classList.toggle('nav-active');
            // Burger Animation
            hamburger.classList.toggle('toggle');
        });
    }

    // 3. Back to Top Button (Scroll Events)
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Modal Popup (DOM Manipulation, Click Events)
    const modalBtns = document.querySelectorAll('.open-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeBtn = document.querySelector('.close-modal');

    if (modalBtns && modalOverlay && closeBtn) {
        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Close when clicking on overlay background
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // 5. Image Slider/Carousel
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (sliderWrapper && slides.length > 0) {
        let currentIndex = 0;
        let sliderInterval;

        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Auto Play
        function startInterval() {
            sliderInterval = setInterval(nextSlide, 3000);
        }

        function resetInterval() {
            clearInterval(sliderInterval);
            startInterval();
        }

        startInterval();
    }

    // 6. Form Validation (Keyup, Click/Submit Events)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const msgInput = document.getElementById('message');

        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        const checkInput = (input, validator, errorMsgEl) => {
            if (!validator(input.value)) {
                input.classList.add('error');
                if (errorMsgEl) errorMsgEl.style.display = 'block';
                return false;
            } else {
                input.classList.remove('error');
                if (errorMsgEl) errorMsgEl.style.display = 'none';
                return true;
            }
        };

        // Keyup event validation
        if (nameInput) {
            nameInput.addEventListener('keyup', () => {
                checkInput(nameInput, val => val.trim().length > 0, document.getElementById('name-error'));
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('keyup', () => {
                checkInput(emailInput, validateEmail, document.getElementById('email-error'));
            });
        }

        if (msgInput) {
            msgInput.addEventListener('keyup', () => {
                checkInput(msgInput, val => val.trim().length > 10, document.getElementById('msg-error'));
            });
        }

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
});
