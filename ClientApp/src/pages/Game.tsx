import React from 'react'
import TownSquare from '../components/TownSquare'

const Game = () => {
  const [newPlayerCount, setNewPlayerCount] = React.useState(NaN)

  function handleFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value

    const numericValue = Number(value)

    if (!isNaN(numericValue) && value.trim() !== '') {
      setNewPlayerCount(numericValue)
    }
  }

  return (
    <>
      <div className="player-count">
        <form action="#">
          <p className="form-input">
            <label htmlFor="count">Enter player count:</label>
            <input
              type="number"
              name="count"
              placeholder="Number of players"
              required
              onChange={handleFieldChange}
            />
          </p>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form>
      </div>
      <div className="town-square">
        <TownSquare numberOfPlayers={newPlayerCount} />
      </div>
    </>
  )
}

export default Game
