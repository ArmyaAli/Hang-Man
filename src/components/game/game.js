import Header from '../header/header'
import React from 'react';
import '../../style/game.css'
class Game extends React.Component {
    render() {
      return (
        <div class="page-container">
            <Header />
            <canvas className="game-canvas"></canvas>
        </div>
      );
    }
  }

export default Game;