import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Game from './pages/Game'

export function App() {
  return (
    <div>
      <h1>Companion of the Clocktower</h1>

      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </div>
  )
}
