import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AgeCal from './components/AgeCal'

function App() {

  return (
    <div className="App">
        <AgeCal />
        <div className="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="#">Nate Epp</a>.
        </div>
    </div>
  )
}

export default App
