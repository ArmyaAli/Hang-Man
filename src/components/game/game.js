import Header from "../header/header";
import React from "react";
import "../../style/game.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { lookForWords } from "./fetchData";
import HealthBar from "../health/healthBar";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      word: null,
      url: "https://api.datamuse.com/words?sp=??????*&ml=",
    };
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
              this.setState({ word: data[getRandomInt(data.length)].word });
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
          inputProps={{ maxLength: 1, size: 2 }}
        />
          <HealthBar health="6" />
      </div>
    );
  }
}

export default Game;
