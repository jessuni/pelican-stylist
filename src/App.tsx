import React from 'react'
import Header from './views/Header'
import './App.css'


function App() {
  document.documentElement.style.setProperty('--height', `${window.innerHeight}px`)
  return (
    <div className="App">
      <Header />
      <main id="customize"></main>
      <footer id="credits"></footer>
    </div>
  )
}

export default App
