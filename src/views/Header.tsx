import React from 'react'
import ParallaxItem from '../components/ParallaxItem'

import './Header.css'
import { ReactComponent as HeroImg } from '../assets/nyanko.svg'
import logo_large from '../assets/title@2x.png'
import logo_small from '../assets/title@1x.png'
import purple_shorts from '../assets/purple_shorts.svg'

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
    <div className="Parallax">
      <ParallaxItem scale={2} value={-15} top="70%" left="70%" src={purple_shorts} alt="purple shorts" />
      <ParallaxItem scale={2} value={-15} top="20%" left="70%" src={purple_shorts} alt="purple shorts" />
      <ParallaxItem scale={0.8} value={5} top="60%" left="80%" src={purple_shorts} alt="purple shorts" />
      <ParallaxItem scale={1} value={30} top="40%" left="60%" src={purple_shorts} alt="purple shorts" />
      <ParallaxItem scale={2.5} value={15} top="70%" left="20%" src={purple_shorts} alt="purple shorts" />
      <ParallaxItem scale={1.5} value={15} top="80%" left="40%" src={purple_shorts} alt="purple shorts" />
      <ParallaxItem scale={1} value={5} top="40%" left="30%" src={purple_shorts} alt="purple shorts" />
    </div>
  </header>
  )
}

export default Header
