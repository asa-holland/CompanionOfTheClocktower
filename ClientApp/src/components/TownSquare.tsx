import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Token } from '../types/types'

function TownSquare({ numberOfPlayers }: { numberOfPlayers: number }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [tokens, setTokens] = useState<Token[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  )
  const [isDragging, setIsDragging] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const boardElement = document.querySelector('.game-board') as HTMLElement
    if (boardElement) {
      const { offsetWidth, offsetHeight } = boardElement
      setDimensions({ width: offsetWidth, height: offsetHeight })
    }
  }, [])

  const tokenSize = 50
  const offset = 50 // Updated offset
  const additionalOffset = 120 // Updated additionalOffset
  const radius = (dimensions.width - tokenSize) / 2 + 20 // Fixed radius
  // SEPARATE TOKEN POSITIONING LOOP
  //   const radiusX = (dimensions.width - tokenSize) / 2 + 20; // Adjust the value for the horizontal radius
  // const radiusY = (dimensions.height - tokenSize) / 2 + 10; // Adjust the value for the vertical radius
  //
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  useEffect(() => {
    const newTokens: Token[] = []

    // Calculate and add the bottom center token if the number of players is odd
    if (numberOfPlayers % 2 !== 0) {
      newTokens.push({
        x: centerX,
        y: centerY + radius - tokenSize / 2 - offset, // Bottom center adjustment
        name: '',
      })
    }

    const perimeterTokens = numberOfPlayers - (numberOfPlayers % 2)

    if (perimeterTokens > 0) {
      const angleStep = (2 * Math.PI) / perimeterTokens

      for (let i = 0; i < perimeterTokens; i++) {
        const angle = i * angleStep

        // Calculate initial position
        let x = centerX + radius * Math.cos(angle)
        let y = centerY + radius * Math.sin(angle)

        // SEPARATE TOKEN POSITIONING LOOP
        // let x = centerX + radiusX * Math.cos(angle);
        // let y = centerY + radiusY * Math.sin(angle);
        //
        // Adjust spacing between tokens near 0 and 180 degrees
        if (
          Math.abs(angle % (2 * Math.PI)) < 0.1 ||
          Math.abs((angle % (2 * Math.PI)) - Math.PI) < 0.1
        ) {
          // Bring the tokens near 0 and 180 degrees slightly closer
          x = centerX + (radius - offset) * Math.cos(angle)
          y = centerY + (radius - offset) * Math.sin(angle)
        }

        newTokens.push({ x, y, name: '' }) // Initialize with an empty name
      }
    }

    // Adjust the bottom center token position if needed
    if (numberOfPlayers % 2 !== 0) {
      // Adjust the y position for the bottom center token without affecting others
      newTokens[0].y += additionalOffset // Move the bottom center token further down
    }

    setTokens(newTokens)
  }, [
    dimensions,
    numberOfPlayers,
    radius,
    centerX,
    centerY,
    tokenSize,
    offset,
    additionalOffset,
  ])

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    setDraggingIndex(index)
    setDragStart({ x: e.clientX, y: e.clientY })
    setIsDragging(false) // Reset dragging flag on mouse down
    localStorage.setItem('gameState', JSON.stringify(tokens))
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingIndex !== null && dragStart) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setIsDragging(true) // Set dragging flag if movement exceeds threshold
        const updatedTokens = [...tokens]
        updatedTokens[draggingIndex].x += dx
        updatedTokens[draggingIndex].y += dy
        setDragStart({ x: e.clientX, y: e.clientY })
        setTokens(updatedTokens)
      }
    }
  }

  useEffect(() => {
    retrieveGameState()
  }, [])

  // const handleMouseUp = () => {
  //   if (!isDragging && draggingIndex !== null) {
  //     // If no significant dragging occurred, treat as a click
  //     handleTokenClick(draggingIndex)
  //   }
  //   setDraggingIndex(null)
  // }

  // const handleTokenClick = (index: number) => {
  //   // Save state to localStorage
  //   localStorage.setItem('gameState', JSON.stringify(tokens))
  //   // Navigate to player page
  //   navigate(`/player/${index}`, { state: { tokens } })
  // }

  const retrieveGameState = () => {
    // Retrieve state from localStorage
    const savedState = localStorage.getItem('gameState')
    if (savedState) {
      setTokens(JSON.parse(savedState))
    }
  }

  const handleNameChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTokens = [...tokens]
    updatedTokens[index].name = e.target.value
    setTokens(updatedTokens)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    // document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      // document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggingIndex, dragStart, tokens, isDragging])

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
              onMouseDown={(e) => handleMouseDown(index, e)}
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
