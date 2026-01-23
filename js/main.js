/**
 * Main Application Controller
 * Initializes and coordinates all modules
 * Handles navigation, form submission, and overall app logic
 */

class App {
    constructor() {
        this.dataLoaded = false;
        this.animationsReady = false;
        this.init();
    }

    init() {
        // Wait for everything to be ready
        document.addEventListener('dataLoaded', () => {
            this.dataLoaded = true;
            this.checkReady();
        });

        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.setupMobileMenu();
            this.setupSmoothScrolling();
            this.setupContactForm();
            this.setupTheme();
        });
    }

    checkReady() {
        if (this.dataLoaded && this.animationsReady) {
            this.onAppReady();
        }
    }

    onAppReady() {
        console.log('Portfolio app is ready!');
        this.removeLoadingScreen();
        this.initializeAnalytics();
    }

    removeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }

    setupEventListeners() {
        // Window resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle escape key for mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navToggle || !navMenu) return;

        // Toggle mobile menu
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only close if it's an internal link
                if (href.startsWith('#')) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update URL without triggering scroll
                    history.pushState(null, null, href);
                }
            });
        });

        // Handle initial hash in URL
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                setTimeout(() => {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            this.showFormLoading(form);
            
            try {
                // In a real implementation, you would send this to a server
                // For demo purposes, we'll simulate a successful submission
                await this.simulateFormSubmission(data);
                
                this.showFormSuccess(form);
                form.reset();
                
            } catch (error) {
                this.showFormError(form, error.message);
            }
        });

        // Add input validation feedback
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
            
            input.addEventListener('input', () => {
                this.clearInputError(input);
            });
        });
    }

    validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error state
        this.clearInputError(input);

        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (input.type === 'text' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Please enter at least 2 characters';
        }

        if (!isValid) {
            this.showInputError(input, errorMessage);
        }

        return isValid;
    }

    showInputError(input, message) {
        input.classList.add('error');
        
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            input.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearInputError(input) {
        input.classList.remove('error');
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Store original text for later
        submitBtn.dataset.originalText = originalText;
    }

    showFormSuccess(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.classList.add('success');
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.dataset.originalText;
            submitBtn.classList.remove('success');
        }, 3000);
    }

    showFormError(form, message) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        submitBtn.classList.add('error');
        
        // Show error message
        let errorElement = form.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            form.appendChild(errorElement);
        }
        errorElement.textContent = message;
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.dataset.originalText;
            submitBtn.classList.remove('error');
            errorElement.remove();
        }, 5000);
    }

    async simulateFormSubmission(data) {
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 1500);
        });
    }

    setupTheme() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);

        // Add theme toggle button if needed
        this.addThemeToggle();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }

    addThemeToggle() {
        // This is optional - you can add a theme toggle button
        // For now, we'll keep it simple with just light theme
    }

    handleResize() {
        // Refresh ScrollTrigger on resize
        if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
        }

        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    pauseAnimations() {
        if (window.animationController) {
            window.animationController.pauseAnimations();
        }
    }

    resumeAnimations() {
        if (window.animationController) {
            window.animationController.resumeAnimations();
        }
    }

    initializeAnalytics() {
        // Initialize analytics if needed
        // This is where you would add Google Analytics, etc.
        console.log('Analytics initialized');
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public API
    getPortfolioData() {
        return window.dataLoader ? window.dataLoader.getData() : null;
    }

    refreshAnimations() {
        if (window.animationController) {
            window.animationController.killScrollTriggers();
            window.animationController.setupScrollTrigger();
        }
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.collectMetrics();
        });

        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            this.observeLongTasks();
        }
    }

    collectMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        
        this.metrics = {
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            firstPaint: this.getMetric('first-paint'),
            firstContentfulPaint: this.getMetric('first-contentful-paint')
        };

        console.log('Performance Metrics:', this.metrics);
    }

    getMetric(name) {
        const entries = performance.getEntriesByName(name);
        return entries.length > 0 ? entries[0].startTime : 0;
    }

    observeLongTasks() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.warn('Long task detected:', entry.duration, 'ms');
            }
        });

        observer.observe({ entryTypes: ['longtask'] });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.performanceMonitor = new PerformanceMonitor();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});
