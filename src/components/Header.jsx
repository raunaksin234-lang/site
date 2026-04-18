import { useState } from 'react'
import './Header.css'

export default function Header({ scrollPosition }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <header className={`header ${scrollPosition > 50 ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <img src="/oscorp-logo.svg" alt="OScorp Creatives" className="logo-img" />
          <span className="logo-text">OScorp</span>
        </div>
        
        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.name}
            </a>
          ))}
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
