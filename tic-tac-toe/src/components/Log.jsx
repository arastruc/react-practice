const Log = ({ gameTurns }) => {
  return (
    <ol id="log">
      {gameTurns.map(({ square: { row, col }, player }) => (
        <li key={`${col}-${row}`}>
          {player} is entered in case ({row},{col})
        </li>
      ))}
    </ol>
  );
};

export default Log;
