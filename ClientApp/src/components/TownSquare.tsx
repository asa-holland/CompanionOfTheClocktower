import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Token } from '../types/types'

function TownSquare({ numberOfPlayers }: { numberOfPlayers: number }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [tokens, setTokens] = useState<Token[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const boardElement = document.querySelector('.game-board') as HTMLElement
    if (boardElement) {
      const { offsetWidth, offsetHeight } = boardElement
      setDimensions({ width: offsetWidth, height: offsetHeight })
    }
  }, [])

  const tokenSize = 50
  const horizontalMargin = 40 // Horizontal margin from the edges
  const verticalMargin = 40 // Vertical margin from the edges
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  // Calculate the radius dynamically based on the number of players and screen dimensions
  const radius = Math.min(
    (dimensions.width - 2 * horizontalMargin - tokenSize) / 2,
    (dimensions.height - 2 * verticalMargin - tokenSize) / 2
  )

  const layouts: Record<number, Token[]> = {
    1: [{ x: centerX - tokenSize / 2, y: centerY - tokenSize / 2, name: '' }],
    2: [
      {
        x: centerX + radius * Math.cos(0) - tokenSize / 2,
        y: centerY + radius * Math.sin(0) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos(Math.PI) - tokenSize / 2,
        y: centerY + radius * Math.sin(Math.PI) - tokenSize / 2,
        name: '',
      },
    ],
    3: [
      {
        x: centerX + radius * Math.cos(0) - tokenSize / 2,
        y: centerY + radius * Math.sin(0) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos((2 * Math.PI) / 3) - tokenSize / 2,
        y: centerY + radius * Math.sin((2 * Math.PI) / 3) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos((4 * Math.PI) / 3) - tokenSize / 2,
        y: centerY + radius * Math.sin((4 * Math.PI) / 3) - tokenSize / 2,
        name: '',
      },
    ],
    4: [
      {
        x: centerX + radius * Math.cos(0) - tokenSize / 2,
        y: centerY + radius * Math.sin(0) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos(Math.PI / 2) - tokenSize / 2,
        y: centerY + radius * Math.sin(Math.PI / 2) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos(Math.PI) - tokenSize / 2,
        y: centerY + radius * Math.sin(Math.PI) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos((3 * Math.PI) / 2) - tokenSize / 2,
        y: centerY + radius * Math.sin((3 * Math.PI) / 2) - tokenSize / 2,
        name: '',
      },
    ],
    5: [
      {
        x: centerX + radius * Math.cos(0) - tokenSize / 2,
        y: centerY + radius * Math.sin(0) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos((2 * Math.PI) / 5) - tokenSize / 2,
        y: centerY + radius * Math.sin((2 * Math.PI) / 5) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos((4 * Math.PI) / 5) - tokenSize / 2,
        y: centerY + radius * Math.sin((4 * Math.PI) / 5) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos((6 * Math.PI) / 5) - tokenSize / 2,
        y: centerY + radius * Math.sin((6 * Math.PI) / 5) - tokenSize / 2,
        name: '',
      },
      {
        x: centerX + radius * Math.cos((8 * Math.PI) / 5) - tokenSize / 2,
        y: centerY + radius * Math.sin((8 * Math.PI) / 5) - tokenSize / 2,
        name: '',
      },
    ],
  }

  useEffect(() => {
    if (numberOfPlayers >= 1 && numberOfPlayers <= 5) {
      setTokens(layouts[numberOfPlayers])
    } else {
      setTokens([]) // Clear tokens for unsupported number of players
    }
  }, [numberOfPlayers, dimensions])

  const handleNameChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTokens = [...tokens]
    updatedTokens[index].name = e.target.value
    setTokens(updatedTokens)
  }

  return (
    <div className="play-area">
      <div className="game-board">
        {tokens.map((token, index) => (
          <Link to={`/player/${index}`} state={{ tokens }} key={index}>
            <div
              className="player-token"
              style={{
                left: `${token.x}px`,
                top: `${token.y}px`,
              }}
            >
              <input
                type="text"
                value={token.name}
                onChange={(e) => handleNameChange(index, e)}
                className="input-name"
                placeholder="Name"
                onClick={(e) => e.preventDefault()}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TownSquare
