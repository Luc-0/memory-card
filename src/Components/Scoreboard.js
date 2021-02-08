import '../styles/Scoreboard.css';

function Scoreboard(props) {
  return (
    <div className="scoreboard">
      <div>Current score: {props.currentScore}</div>
      <div>Best score: {props.bestScore}</div>
      <div>Max score: {props.maxScore}</div>
    </div>
  );
}

export default Scoreboard;
