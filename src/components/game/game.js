import Header from "../header/header";
import React from "react";
import "../../style/game.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { lookForWords } from "./fetchData";
import Chip from '@material-ui/core/Chip';
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";


const heartIcon = <FavoriteIcon />;
const unHealthIcon = <FavoriteBorderIcon />;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function ChipsLetter(props) {
  const picksArr = [...props.picks]
  const letters = picksArr.map((letter, index) => {

    return <Chip
            key={index} 
            label={letter.toUpperCase()}
            size="medium"
            color="primary"
            className="picks-container"
            />;
  });
  return letters;
}

function DisplayLetters(props) {
  const letters = props.displayed.map((letter, index) => {
    return <span
          key={index}
          className={letter === "_" || letter === "-" ? "noLetter" : "letter"}

        >{letter}</span>
  });
  return letters;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lives: [],
      health: 6,
      category: null,
      word: null,
      url: "https://api.datamuse.com/words?sp=??????*&ml=",
      picks: new Set(),
      displayed: [],
      submitted: false,
    };
    this.state.lives = this.setLivesArray(this.state.health);
  }

  grabWord() {
    // API CALL
    console.log(this.state.url);
    lookForWords(this.state.url + this.state.category).then((data) => {
      let foundWord = data[getRandomInt(data.length)].word.toLowerCase();
      this.setState({ word: foundWord });
      this.setState({displayed: this.setBlanksArray(foundWord) })
      console.log(this.state.word);
      console.log(this.state.displayed)
    });
  }
  
  setLivesArray(health) {
    let hp = [];
    for (let i = 0; i < health; ++i) {
      hp.push(heartIcon);
    }
    // return a the literal array
    return hp
  }

  setBlanksArray(word) {
    let temp = [];
    for (let i = 0; i < word.length; ++i) {
      if (word[i] === ' ') {
        temp.push(' ')
      }
      else if (word[i] === '-') {
        temp.push('-')
      }
      else {
        temp.push('_')
      }
    }
    return temp;
  }

  loseHP(shouldILoseHP) {
    if (!shouldILoseHP){
      let temp = this.state.lives;
      let health = this.state.health;
      if(health > 0) {
        temp[(health--)-1] = unHealthIcon;
        this.setState({lives: [...temp], health: health});
      }
      if (health === 0){
        alert('LOST ALL HP, YOU LOSE!!!')
        window.location.reload();
      }
    }
  }

  isDisplayed(shouldIDisplay, letter) {
    if (shouldIDisplay){
      let word = this.state.word;
      let displayed = this.state.displayed;
  
      for (let i = 0; i < word.length; ++i) {
        if (word[i] === letter) {
          displayed[i] = letter
        }
      }
      this.setState({displayed: [...displayed]})
    }
  }

  isWord(letter) {
    let word = this.state.word;
    return word.includes(letter)
  }

  onEnter(key, letter) {
    let temp = this.state.picks
    console.log(!temp.has(letter))
    if(key === "Enter" && !temp.has(letter) && isLetter(letter)) {
      this.loseHP(this.isWord(letter))
      this.isDisplayed(this.isWord(letter), letter)
      temp.add(letter)
      this.setState({picks : temp})
      console.log(this.state.displayed)
    }
    this.checkWin()
  }

  checkWin() {
    let win = this.state.displayed.length
    for(const i in this.state.displayed) {
      if(!(this.state.displayed[i] === '_')) {
        win--;
      }
    }
    if(win === 0) {
      alert(('YOU GUESSED THE WORD "' + this.state.word + '" CONGRATS!!!'))
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="page-container">
        <Header lives={this.state.lives}/>
        <div className="userInputs">
          <TextField
            id="outlined-basic"
            label="Enter your Synonym"
            variant="outlined"
          />
          <Button
            variant="contained"
            disabled={this.state.submitted}
            onClick={() => {
            this.grabWord()
            this.setState({submitted: true})
            }}>
            Submit
          </Button>
          <TextField
            id="input"
            label="Letter: "
            variant="outlined"
            className="letter-input"
            inputProps={{ maxLength: 1, size: 2 }}
            onKeyDown={(e) => {
              this.onEnter(e.key, e.target.value.toLowerCase());
              e.target.value = ""
            }}/>
        </div>
        <div className="displayed">
          <DisplayLetters displayed={this.state.displayed}/>
        </div>
        <div className="chips">
          <ChipsLetter picks={this.state.picks}/>
        </div>
      </div>
    );
  }
}

export default Game;
