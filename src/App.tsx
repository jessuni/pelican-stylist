import './App.css'

import Header from '@/views/Header'
import Main from '@/views/Main'

function App() {
  document.documentElement.style.setProperty('--height', `${window.innerHeight}px`)
  return (
    <div className="app">
      <Header />
      <Main />
      <footer id="credits"></footer>
    </div>
  )
}

export default App
