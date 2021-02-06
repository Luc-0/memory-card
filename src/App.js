import React, { useState } from 'react';
import Card from './Components/Card';
import './styles/App.css';

function App() {
  const [imagesSrc, setImagesSrc] = useState(getImagesSrc());

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
    // Shuffle images Src
    setImagesSrc(shuffleArray(imagesSrc));
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
      <header className="header">
        <h1>Memory Game</h1>
      </header>
      <div className="imgDisplay">{cards}</div>
    </div>
  );
}

export default App;
