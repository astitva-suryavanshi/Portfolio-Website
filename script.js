document.addEventListener('DOMContentLoaded', () => {
    // Scroll Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = ['Frontend Developer', 'Data Enthusiast', 'Computer Science Student', 'Designer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // ScrollReveal Config
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false
    });

    sr.reveal('.reveal', { interval: 200 });
    sr.reveal('.hero-content', { origin: 'left', distance: '100px' });
    sr.reveal('.hero-visual', { origin: 'right', distance: '100px' });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Generic Cursor-Driven Scroll Function (Desktop Only)
    const applyCursorScroll = (containerSelector, trackSelector) => {
        const container = document.querySelector(containerSelector);
        const track = document.querySelector(trackSelector);

        if (container && track) {
            container.addEventListener('mousemove', (e) => {
                // Skip if we are in mobile view (width <= 768)
                if (window.innerWidth <= 768) return;

                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;

                const trackWidth = track.scrollWidth;
                const visibleWidth = rect.width;
                const scrollDistance = trackWidth - visibleWidth;

                if (scrollDistance > 0) {
                    const move = -percent * scrollDistance;
                    track.style.transform = `translateX(${move}px)`;
                }
            });
        }
    };

    applyCursorScroll('.skills-container', '.skills-track');
    applyCursorScroll('.projects-container', '.projects-track');

    // Form submission feedback (Visual only)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent!';
            btn.style.background = '#28a745';
            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
});
