import React, { useEffect, useState } from 'react'

function TownSquare({ numberOfPlayers }: { numberOfPlayers: number }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const boardElement = document.querySelector('.game-board') as HTMLElement
    if (boardElement) {
      const { offsetWidth, offsetHeight } = boardElement
      setDimensions({ width: offsetWidth, height: offsetHeight })
    }
  }, [])

  const tokenSize = 50
  const offset = 40 // Space adjustment for tokens
  const additionalOffset = -60 // Additional offset to move the bottom center token further down
  const radius = (dimensions.width - tokenSize) / 2 // Fixed radius
  const perimeterRadius = radius + 20 // Increase the perimeter radius slightly
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  const tokens = []

  // Calculate and add the bottom center token if the number of players is odd
  if (numberOfPlayers % 2 !== 0) {
    tokens.push({
      x: centerX,
      y: centerY + perimeterRadius - tokenSize / 2 - additionalOffset, // Bottom center adjustment
    })
  }

  const perimeterTokens = numberOfPlayers - (numberOfPlayers % 2)

  if (perimeterTokens > 0) {
    const angleStep = (2 * Math.PI) / perimeterTokens

    for (let i = 0; i < perimeterTokens; i++) {
      const angle = i * angleStep

      // Calculate position
      let x = centerX + perimeterRadius * Math.cos(angle)
      let y = centerY + perimeterRadius * Math.sin(angle)

      // Adjust spacing between tokens near 0 and 180 degrees
      if (
        Math.abs(angle % (2 * Math.PI)) < 0.1 ||
        Math.abs((angle % (2 * Math.PI)) - Math.PI) < 0.1
      ) {
        // Bring the tokens near 0 and 180 degrees slightly closer
        x = centerX + (perimeterRadius - offset) * Math.cos(angle)
        y = centerY + (perimeterRadius - offset) * Math.sin(angle)
      }

      tokens.push({ x, y })
    }
  }

  return (
    <div className="game-board">
      {tokens.map((token, index) => (
        <div
          key={index}
          className="player-token"
          style={{
            left: `${token.x}px`,
            top: `${token.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

export default TownSquare
