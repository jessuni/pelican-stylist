import './App.css'

import Header from '@/views/Header'
import Main from '@/views/Main'
import { AliveScope } from 'react-activation'

function App() {
  document.documentElement.style.setProperty('--height', `${window.innerHeight}px`)
  return (
    <AliveScope>
      <div className="app">
        <Header />
        <Main />
        <footer id="credits"></footer>
      </div>
    </AliveScope>
  )
}

export default App
