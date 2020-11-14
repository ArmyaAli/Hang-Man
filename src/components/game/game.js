import Header from "../header/header";
import React from "react";
import "../../style/game.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { lookForWords } from "./fetchData";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";


const heartIcon = <FavoriteIcon />;
const unHealthIcon = <FavoriteBorderIcon />;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function HealthBar(props) {
  const lives = props.lives.map((Life, index) => {
    return <span key={index}>{Life}</span>;
  });
  return lives;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lives: [],
      health: 10,
      category: null,
      word: null,
      url: "https://api.datamuse.com/words?sp=??????*&ml=",
    };
    this.state.lives = this.setLivesArray(this.state.health);
  }

  
  setLivesArray(health) {
    let hp = [];
    for (let i = 0; i < health; ++i) {
      hp.push(heartIcon);
    }
    // return a the literal array
    return [...hp];
  }

  loseHp() {
    let temp = this.state.lives;
    let health = this.state.health;
    temp[(health--)-1] = unHealthIcon;
    this.setState({lives: [...temp], health: health});
  }

  render() {
    return (
      <div className="page-container">
        <Header />
        <TextField
          id="outlined-basic"
          label="Enter your Synonym"
          variant="outlined"
          onChange={(e) => this.setState({ category: e.target.value })}
        />
        <Button
          variant="contained"
          onClick={() => {
            // API CALL
            console.log(this.state.url);
            lookForWords(this.state.url + this.state.category).then((data) => {
              this.setState({ word: data[getRandomInt(data.length)].word});
              console.log(this.state.word);
            });
          }}
        >
          Submit
        </Button>

        <TextField
          id="input"
          label="Letter: "
          variant="outlined"
          className="letter-input"
          inputProps={{ maxLength: 1, size: 2 }}/>
          <HealthBar lives={this.state.lives}/>
          <Button
          variant="contained"
          onClick={() => 
            this.loseHP()
          }  
        >
          Remove
        </Button>
      </div>
    );
  }
}

export default Game;
