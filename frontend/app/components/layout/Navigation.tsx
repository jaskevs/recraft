import { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Enhanced scroll effect with collapse detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setIsCollapsed(currentScrollY > 50);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActivePath = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header className={`minimal-header ${isScrolled ? 'scrolled' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="container">
          <Link to="/" className="minimal-logo">
            <img 
              src="/assets/img/recraft_icon.svg" 
              alt="reCraft Icon" 
              style={{ height: '32px', width: 'auto' }}
            />
            <img 
              src="/assets/img/recraft_text.svg" 
              alt="reCraft Text" 
              style={{ height: '34px', width: 'auto', marginLeft: '8px' }}
            />
          </Link>

          <nav className={`minimal-nav ${isCollapsed ? 'collapsed' : ''}`}>
            <Link 
              to="/" 
              className={isActivePath("/") ? "active" : ""}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className={isActivePath("/blog") ? "active" : ""}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className={isActivePath("/about") ? "active" : ""}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={isActivePath("/contact") ? "active" : ""}
            >
              Contact
            </Link>
          </nav>

          <button 
            className={`minimal-menu-toggle ${isMobileMenuOpen ? 'active' : ''} ${isCollapsed ? 'show' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon">
              <span className="menu-icon-line"></span>
              <span className="menu-icon-line"></span>
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`minimal-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        {/* Navigation links */}
        <nav className="minimal-mobile-menu-nav">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </nav>
      </div>
    </>
  );
};