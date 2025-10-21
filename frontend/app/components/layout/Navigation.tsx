import { useEffect, useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import { Menu, X } from "react-feather";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setIsCollapsed(currentScrollY > 50);
    };

    handleScroll();

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  const isActivePath = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`minimal-header ${isScrolled ? "scrolled" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <div className="container">
          <Link to="/" className="minimal-logo">
            <img
              src="/assets/img/recraft_icon.svg"
              alt="reCraft Icon"
              style={{ height: "32px", width: "auto" }}
            />
            <img
              src="/assets/img/recraft_text.svg"
              alt="reCraft Text"
              style={{ height: "34px", width: "auto", marginLeft: "8px" }}
            />
          </Link>

          <nav className={`minimal-nav ${isCollapsed ? "collapsed" : ""}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = isActivePath(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={isActive ? "active" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            className={`minimal-menu-toggle ${
              isMobileMenuOpen ? "active" : ""
            } ${isCollapsed ? "show" : ""}`}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="minimal-mobile-navigation"
            type="button"
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={1.6} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div
        id="minimal-mobile-navigation"
        className={`minimal-mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
        aria-hidden={!isMobileMenuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsMobileMenuOpen(false);
          }
        }}
      >
        <nav className="minimal-mobile-menu-nav" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => {
            const isActive = isActivePath(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                data-number={String(index + 1).padStart(2, "0")}
                className={isActive ? "active" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
