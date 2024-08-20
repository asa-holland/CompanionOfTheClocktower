import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Token } from '../types/types'

const Player = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const tokens = (location.state?.tokens as Token[]) || []

  return (
    <div>
      <button onClick={() => navigate(-1)}>Return to Game</button>
      <div>
        {tokens.map((token, index) => (
          <div key={index}>
            <p>
              Token {index + 1}: {token.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Player
