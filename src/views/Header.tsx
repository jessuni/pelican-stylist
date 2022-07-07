import React from 'react'
import './Header.css'
import { ReactComponent as HeroImg } from '../assets/nyanko.svg'
import logo_large from '../assets/title@2x.png'
import logo_small from '../assets/title@1x.png'

function Header() {
  return(
    <header className="Header" id="cover">
    <div className="Header-bg"><div></div></div>
    <div className="Header-content">
      <a className="Header-logo"
        href="/"
        rel="noopener noreferrer"
        title="Pelican Stylist"
      >
        <img alt="logo"
          srcSet={`${logo_large} 658w, ${logo_small} 296w`}
          sizes="(max-width: 600px) 90vw, 60vw"
          src={logo_large} />
      </a>
      <div className="Header-button">
        {/* TODO: smooth scroll with el.scrollIntoView({ behavior: 'smooth' }) */}
        <a className="Button" href="#customize">explore</a>
      </div>
      <div className="Header-hero">
      <HeroImg />
      </div>
    </div>
  </header>
  )
}

export default Header
