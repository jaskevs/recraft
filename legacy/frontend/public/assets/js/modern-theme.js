/**
 * Modern reCraft.Dev Theme JavaScript
 * Clean, minimal interactions with smooth page transitions
 */

(function() {
    'use strict';

    const ModernTheme = {
        
        init: function() {
            this.createPageTransitionOverlay();
            this.setupPageTransitions();
            this.setupScrollToTop();
            this.setupMobileMenu();
            this.setupSearchForm();
            this.setupSmoothScrolling();
            this.setupAnimations();
            this.setupHeaderCollapse();
        },

        createPageTransitionOverlay: function() {
            // Create transition overlay
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            overlay.innerHTML = '<div class="transition-logo">reCraft.Dev</div>';
            document.body.appendChild(overlay);
        },

        setupPageTransitions: function() {
            const overlay = document.querySelector('.page-transition-overlay');
            
            // Handle all internal navigation links
            const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="posts.html"], a[href^="post.html"], a[href^="contact.html"], a[href^="search.html"]');
            
            internalLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetUrl = link.getAttribute('href');
                    
                    // Show transition overlay
                    overlay.classList.add('active');
                    
                    // Navigate after transition
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 300);
                });
            });

            // Handle browser back/forward
            window.addEventListener('beforeunload', () => {
                overlay.classList.add('active');
            });

            // Hide overlay on page load
            window.addEventListener('load', () => {
                overlay.classList.remove('active');
            });

            // Initial page load fade in
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    overlay.classList.remove('active');
                }, 100);
            });
        },

        setupScrollToTop: function() {
            // Create scroll to top button
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 56px;
                height: 56px;
                background: var(--text-primary);
                color: var(--text-light);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                z-index: 9999;
                font-size: 18px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(10px);
            `;
            
            document.body.appendChild(scrollBtn);

            // Show/hide on scroll
            const toggleScrollButton = () => {
                if (window.pageYOffset > 500) {
                    scrollBtn.style.opacity = '1';
                    scrollBtn.style.visibility = 'visible';
                } else {
                    scrollBtn.style.opacity = '0';
                    scrollBtn.style.visibility = 'hidden';
                }
            };

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Smooth hover effects
            scrollBtn.addEventListener('mouseenter', () => {
                scrollBtn.style.transform = 'translateY(-2px) scale(1.05)';
            });

            scrollBtn.addEventListener('mouseleave', () => {
                scrollBtn.style.transform = 'translateY(0) scale(1)';
            });

            window.addEventListener('scroll', toggleScrollButton);
        },

        setupMobileMenu: function() {
            const sidebarButton = document.querySelector('.typology-action-sidebar');
            const sidebar = document.querySelector('.typology-sidebar');
            const overlay = document.querySelector('.typology-sidebar-overlay');
            const closeButton = document.querySelector('.typology-sidebar-close');
            
            if (!sidebarButton || !sidebar || !overlay) return;
            
            // Open sidebar with smooth animation
            sidebarButton.addEventListener('click', (e) => {
                e.preventDefault();
                sidebar.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add animation to menu items
                const menuItems = sidebar.querySelectorAll('.typology-nav li');
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 50 + 100);
                });
            });
            
            // Close functions
            const closeSidebar = () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset menu items
                const menuItems = sidebar.querySelectorAll('.typology-nav li');
                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                });
            };
            
            if (closeButton) {
                closeButton.addEventListener('click', closeSidebar);
            }
            
            overlay.addEventListener('click', closeSidebar);
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                    closeSidebar();
                }
            });

            // Initialize menu items styling
            const menuItems = sidebar.querySelectorAll('.typology-nav li');
            menuItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            });
        },

        setupSearchForm: function() {
            const searchForms = document.querySelectorAll('.typology-search-form');
            
            searchForms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    const input = this.querySelector('input[name="s"]');
                    if (!input.value.trim()) {
                        e.preventDefault();
                        input.focus();
                        
                        // Add shake animation for empty search
                        input.style.animation = 'shake 0.5s ease-in-out';
                        setTimeout(() => {
                            input.style.animation = '';
                        }, 500);
                        return;
                    }
                    
                    // Use page transition for search navigation
                    if (!window.location.pathname.includes('search.html')) {
                        e.preventDefault();
                        const overlay = document.querySelector('.page-transition-overlay');
                        overlay.classList.add('active');
                        
                        setTimeout(() => {
                            window.location.href = 'search.html?s=' + encodeURIComponent(input.value);
                        }, 300);
                    }
                });
            });

            // Handle search page functionality
            if (window.location.pathname.includes('search.html')) {
                const urlParams = new URLSearchParams(window.location.search);
                const searchTerm = urlParams.get('s');
                
                if (searchTerm) {
                    const searchInput = document.querySelector('.typology-search-form input[name="s"]');
                    if (searchInput) {
                        searchInput.value = searchTerm;
                    }
                    
                    // Update search results display
                    const searchTermSpan = document.querySelector('#search-term');
                    if (searchTermSpan) {
                        searchTermSpan.textContent = searchTerm;
                    }
                }
            }

            // Add CSS for shake animation
            if (!document.querySelector('#shake-animation')) {
                const style = document.createElement('style');
                style.id = 'shake-animation';
                style.textContent = `
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }
                `;
                document.head.appendChild(style);
            }
        },

        setupSmoothScrolling: function() {
            // Add smooth scrolling to all internal anchor links
            const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
            
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        const headerHeight = document.querySelector('.typology-header')?.offsetHeight || 80;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Scroll down arrow functionality
            const scrollDownBtn = document.querySelector('.typology-scroll-down-arrow');
            if (scrollDownBtn) {
                scrollDownBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector('.typology-fake-bg');
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            }
        },

        setupAnimations: function() {
            // Intersection Observer for scroll animations
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }, index * 100); // Stagger animations
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -30px 0px'
                });

                // Observe post elements with enhanced animations
                const posts = document.querySelectorAll('.typology-post');
                posts.forEach((post, index) => {
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(40px)';
                    post.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
                    observer.observe(post);
                });

                // Observe other elements
                const animatedElements = document.querySelectorAll('.contact-item, .typology-section-heading, .contact-form-section');
                animatedElements.forEach((element, index) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
                    observer.observe(element);
                });
            }

            // Add hover animations to buttons
            const buttons = document.querySelectorAll('.typology-button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    button.style.transform = 'translateY(-2px)';
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'translateY(0)';
                });
            });

            // Enhanced logo hover effect
            const logo = document.querySelector('.typology-logo a');
            if (logo) {
                logo.addEventListener('mouseenter', () => {
                    logo.style.transform = 'scale(1.05)';
                    logo.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                });
                
                logo.addEventListener('mouseleave', () => {
                    logo.style.transform = 'scale(1)';
                });
            }
        },

        setupHeaderCollapse: function() {
            const header = document.querySelector('.typology-header');
            if (!header) return;
            
            let lastScrollTop = 0;
            let ticking = false;
            
            const updateHeader = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Only apply collapse behavior on desktop screens
                if (window.innerWidth > 1024) {
                    if (scrollTop > 20) {
                        header.classList.add('header-collapsed');
                    } else {
                        header.classList.remove('header-collapsed');
                    }
                } else {
                    // Ensure header is not collapsed on mobile/tablet
                    header.classList.remove('header-collapsed');
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                ticking = false;
            };
            
            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            };
            
            // Handle scroll events with throttling
            window.addEventListener('scroll', requestTick, { passive: true });
            
            // Handle window resize to ensure proper behavior
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 1024) {
                    header.classList.remove('header-collapsed');
                }
            }, { passive: true });
            
            // Initial check
            updateHeader();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ModernTheme.init();
        });
    } else {
        ModernTheme.init();
    }

    // Expose to global scope
    window.ModernTheme = ModernTheme;

})();