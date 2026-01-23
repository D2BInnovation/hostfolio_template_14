/**
 * GSAP Animations Module
 * Handles all animations using GSAP and ScrollTrigger
 * Implements premium motion design with smooth transitions
 */

class AnimationController {
    constructor() {
        this.tl = gsap.timeline();
        this.init();
    }

    init() {
        // Wait for data to be loaded before initializing animations
        document.addEventListener('dataLoaded', (event) => {
            this.setupAnimations();
            this.setupScrollTrigger();
            this.setupMicroInteractions();
        });
    }

    setupAnimations() {
        this.setupLoadingAnimation();
        this.setupNavbarAnimation();
        this.setupHeroAnimations();
        this.setupSectionAnimations();
        this.setupCounterAnimations();
        this.setupTextSplitAnimations();
    }

    setupLoadingAnimation() {
        // Loading screen animation
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        // Animate loading characters
        gsap.from('.loading-char', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Hide loading screen after data is loaded
        setTimeout(() => {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    loadingScreen.classList.add('hidden');
                    this.startIntroAnimation();
                }
            });
        }, 1500);
    }

    startIntroAnimation() {
        // Main intro animation when page loads
        const tl = gsap.timeline();

        // Animate navbar
        tl.from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Animate hero content
        tl.from('.greeting-word', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5');

        tl.from('.hero-name', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

        tl.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

        tl.from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

        tl.from('.hero-buttons .btn', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4');

        // Animate hero visual elements
        tl.from('.hero-bg-shapes .shape', {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.8');

        tl.from('.hero-image-placeholder', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6');

        tl.from('.scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');
    }

    setupNavbarAnimation() {
        // Navbar hide/show on scroll
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateNavbar() {
            const navbar = document.getElementById('navbar');
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                navbar.classList.add('scrolled');
                
                if (scrollY > lastScrollY && scrollY > 300) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }
            } else {
                navbar.classList.remove('scrolled', 'hidden');
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);

        // Active section highlighting
        this.setupActiveSectionHighlight();
    }

    setupActiveSectionHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const highlightActiveSection = () => {
            const scrollY = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection(); // Call once on load
    }

    setupHeroAnimations() {
        // Floating animation for shapes
        gsap.to('.shape-1', {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        gsap.to('.shape-2', {
            y: -15,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 0.5
        });

        gsap.to('.shape-3', {
            y: -25,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 1
        });

        // Scroll indicator animation
        gsap.to('.scroll-wheel', {
            y: 10,
            duration: 2,
            repeat: -1,
            ease: 'power2.inOut'
        });
    }

    setupSectionAnimations() {
        // About section animations
        gsap.from('.section-title', {
            scrollTrigger: {
                trigger: '.section-title',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.section-divider', {
            scrollTrigger: {
                trigger: '.section-divider',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scaleX: 0,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            transformOrigin: 'left center'
        });

        // About content
        gsap.from('.about-description p', {
            scrollTrigger: {
                trigger: '.about-description',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('.skill-tag', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.7)'
        });

        // Experience timeline
        gsap.from('.experience-item', {
            scrollTrigger: {
                trigger: '.experience-timeline',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: 'power3.out'
        });

        // Project cards
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Contact section
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.contact-form-container', {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    setupCounterAnimations() {
        // Animate statistics counters
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(counter, {
                        textContent: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            counter.textContent = Math.ceil(counter.textContent);
                        }
                    });
                }
            });
        });
    }

    setupTextSplitAnimations() {
        // Split text animations for headings
        const splitElements = document.querySelectorAll('[data-split-text]');
        
        splitElements.forEach(element => {
            const text = element.textContent;
            const chars = text.split('').map(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                return span;
            });
            
            element.innerHTML = '';
            chars.forEach(char => element.appendChild(char));
            
            // Animate characters on scroll
            gsap.from(chars, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.05,
                stagger: 0.02,
                ease: 'power2.out'
            });
        });
    }

    setupMicroInteractions() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Card hover effects
        const cards = document.querySelectorAll('.project-card, .experience-content');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Skill tag hover effects
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: 'back.out(1.7)'
                });
            });
            
            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });

        // Social link hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    rotation: 360,
                    scale: 1.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });

        // Form input focus effects
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input.parentElement, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(input.parentElement, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupScrollTrigger() {
        // Refresh ScrollTrigger after dynamic content is loaded
        ScrollTrigger.refresh();

        // Parallax effects
        gsap.to('.hero-image-placeholder', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.shape-1', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.shape-2', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.shape-3', {
            yPercent: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // Public methods for controlling animations
    pauseAnimations() {
        gsap.globalTimeline.pause();
    }

    resumeAnimations() {
        gsap.globalTimeline.resume();
    }

    killScrollTriggers() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}

// Initialize animation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});
