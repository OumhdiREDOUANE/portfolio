"use client";

import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Tools", href: "#technologies" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
  <>
<a href="#"  className={`${styles.logo} ${
    scrolled ? styles.logoHidden : ""
  }`}  onClick={handleLinkClick}>
        RO.
      </a>

    <header
      className={`${styles.navbar} ${
        scrolled ? styles.navbarScrolled : ""
      }`}
    >
      
      <nav
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        aria-label="Main navigation"
      >
        <div className={styles.navInner}>
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              <span className={styles.number}>
                0{index + 1}
              </span>

              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
<div
  className={`${styles.status} ${
    scrolled ? styles.statusHidden : ""
  }`}
>
  <span>Casablanca, MA</span>
</div>

      <button
        className={`${styles.menuButton} ${
          menuOpen ? styles.menuButtonOpen : ""
        }`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>
    </header>
    </>
  );
}