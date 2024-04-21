import { useState } from "react";

const Player = ({ symbol, isActive, initialName, updatePlayerNames }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [playerName, setPlayerName] = useState(initialName);

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            placeholder="Give your name before playing"
            value={playerName}
            onChange={({ target: { value } }) => setPlayerName(value)}
            required
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        onClick={() => {
          updatePlayerNames(symbol, playerName);
          setIsEditing((isEditing) => !isEditing);
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
};

export default Player;
