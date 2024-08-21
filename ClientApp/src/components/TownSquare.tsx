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
  const horizontalMargin = 200 // Horizontal margin from the edges
  const verticalMargin = 40 // Vertical margin from the edges
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  const radius = Math.min(
    (dimensions.width - 2 * horizontalMargin - tokenSize) / 2,
    (dimensions.height - 2 * verticalMargin - tokenSize) / 2
  )

  const generateLayout = (numPlayers: number): Token[] => {
    const tokens: Token[] = []
    for (let i = 0; i < numPlayers; i++) {
      const angle = (2 * Math.PI * i) / numPlayers
      const x = centerX + radius * Math.cos(angle) - tokenSize / 2
      const y = centerY + radius * Math.sin(angle) - tokenSize / 2
      tokens.push({ x, y, name: '' })
    }
    return tokens
  }

  useEffect(() => {
    if (numberOfPlayers >= 1 && numberOfPlayers <= 20) {
      setTokens(generateLayout(numberOfPlayers))
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
    <div className="game-board">
      <div className="play-area">
        <div style={{ height: '10%' }}></div>
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
