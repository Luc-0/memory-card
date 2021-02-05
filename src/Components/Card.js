import '../styles/Card.css';

function Card(props) {
  return (
    <div className="card">
      <img
        onClick={props.handleImageClick}
        className="card-img"
        src={props.imgSrc}
      ></img>
    </div>
  );
}

export default Card;
