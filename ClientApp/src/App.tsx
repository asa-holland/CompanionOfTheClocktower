import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Game from './pages/Game'
import Player from './components/Player'

export function App() {
  return (
    <div>
      <header>
        <h1>Companion of the Clocktower</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </main>
    </div>
  )
}
