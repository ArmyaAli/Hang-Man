import Header from '../header/header'
import React from 'react';
import '../../style/game.css'

class Game extends React.Component {

    render() {
      return (
        <div class="page-container">
            <Header />
            <canvas id="canvas" className="game-canvas" height="600" width="600"></canvas>
        </div>
      );
    }
  }

export default Game;