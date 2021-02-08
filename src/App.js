import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Card from './Components/Card';
import Scoreboard from './Components/Scoreboard';

function App() {
  const [imagesSrc, setImagesSrc] = useState(getImagesSrc());
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedImages, setClickedImages] = useState([]);
  const [showWinMessage, setShowWinMessage] = useState(false);

  // Shuffle images on page load
  useEffect(() => {
    setImagesSrc(shuffleArray(imagesSrc));
  }, []);

  useEffect(() => {
    const maxScore = imagesSrc.length;

    if (currentScore === maxScore) {
      setShowWinMessage(true);
    }
  }, [currentScore]);

  function importAllImages(r) {
    return r.keys().map(r);
  }

  function getImagesSrc() {
    const imgModules = importAllImages(
      require.context('./images/', false, /\.(png|jpe?g|svg)$/)
    );

    return imgModules.map((imgModule) => imgModule.default);
  }

  function handleImageClick(e) {
    if (!showWinMessage) {
      // Shuffle images Src
      setImagesSrc(shuffleArray(imagesSrc));
      scoreboardUpdate(e.target.src);
    }
  }

  function closeWinMessage() {
    setShowWinMessage(false);
    resetCurrentScore();
  }

  function scoreboardUpdate(imgSrc) {
    const imgName = getImageName(imgSrc);

    if (clickedImages.includes(imgName)) {
      // Check if is the best score
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      // Reset current score/clicked images
      setCurrentScore(0);
      setClickedImages([]);
    } else {
      const newCurrentScore = currentScore + 1;

      // Add clicked image
      setClickedImages([...clickedImages, imgName]);

      setCurrentScore(newCurrentScore);
      if (newCurrentScore > bestScore) {
        setBestScore(newCurrentScore);
      }
    }
  }

  function resetCurrentScore() {
    setCurrentScore(0);
    setClickedImages([]);
  }

  function getImageName(imgSrc) {
    // Get image name by removing file full path and file extensions
    return imgSrc.replace(/^.*[\\\/]/, '').split('.')[0];
  }

  function shuffleArray(array) {
    console.log('shuffle');
    const newArray = [...array];
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }

    return newArray;
  }

  const cards = imagesSrc.map((imageSrc) => (
    <Card
      key={imageSrc}
      imgSrc={imageSrc}
      handleImageClick={handleImageClick}
    />
  ));

  return (
    <div>
      {showWinMessage ? (
        <div className="app-win-box">
          <div className="app-win-message">
            <p>Congratulations, you beat the game!</p>
          </div>
          <button onClick={closeWinMessage} className="app-win-close-btn">
            x
          </button>
        </div>
      ) : null}
      <header className="app-header">
        <h1>Memory Game</h1>
        <div className="app-scoreboard">
          <Scoreboard
            currentScore={currentScore}
            bestScore={bestScore}
            maxScore={imagesSrc.length}
          />
        </div>
      </header>
      <div className="app-imgDisplay">{cards}</div>
    </div>
  );
}

export default App;
