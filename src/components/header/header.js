import "../../style/header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";

function HealthBar(props) {
  const lives = props.lives.map((Life, index) => {
    return <span key={index}>{Life}</span>;
  });
  return lives;
}

function AboutDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle className="center" id="simple-dialog-title">About</DialogTitle>
    <div className="diag center">
      <p>A couple of guys having a good time
      coding. Trying to learn Javascript
      via the React freamework.</p>
      <ul className="authors">
        <li>Ali the Anteater</li>
        <li>Paul the Parrot</li>
        <li>Ringo the Rabbit</li>
      </ul>
      <div className="center">Bitches</div>
    </div>
  </Dialog>
  );
}


function SettingsDiag(props) {
  const { onClose, selectedValue, open } = props;
  const [val, setVal]  = React.useState(6);
  const handleClose = () => {
    onClose(selectedValue);
  };

  console.log(props)

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle className="center" id="simple-dialog-title">About</DialogTitle>
    <div className="diag" >
    <Slider
        defaultValue={6}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={3}
        max={10}
        onChange={(e, val) => setVal(val)}
      />
      <Button
        onClick={(e)=> {props.updateLives(val)}}>
        Apply
      </Button>
    </div>
    
  </Dialog>
  );
}

// wrapper cause anchore1 is stupid 
function MenuWrapper(props) {
  return (
    <Menu
      id="simple-menu"
      anchorEl={props.anchorE1}
      keepMounted
      open={props.isMenuOpen}
      onClose={props.handleMenuClose}
    >
     <MenuItem onClick={props.handleAboutDiagClick}>About</MenuItem>
     <MenuItem onClick={props.handleSettingsDiagClick}>Settings</MenuItem>
     <MenuItem onClick={props.handleMenuClose}>Reset</MenuItem>
     <AboutDialog open = {props.isAboutDiagOpen} onClose={props.handleAboutDiagClose}/>
     <SettingsDiag updateHeaderLives={props.updateHeaderLives} updateLives={props.updateLives} open = {props.isSettingsDiagOpen} onClose={props.handleSettingsDiagClose}/>
   </Menu>
  );
  
}

class Header extends React.Component {
  // required property for Menu componenet
  constructor (props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      isAboutDiagOpen: false,
      health: props.health,
      lives: props.lives,
      anchorE1: null,
      isSettingsDiagOpen: false,
      updateLives: props.updateLives
    };
  }

  handleMenuClick = (e) => {
    this.setState({anchorE1: e.currentTarget})
    this.setState({isMenuOpen: true})
  };

  handleMenuClose = () => {
    this.setState({anchorE1: null})
    this.setState({isMenuOpen: false})
  };
 
   handleAboutDiagClick = () => {
    this.setState({isAboutDiagOpen: true});
  };

   handleAboutDiagClose = () => {
    this.setState({isAboutDiagOpen: false});
  };

  handleSettingsDiagClick = () => {
    this.setState({isSettingsDiagOpen: true});
  };

  handleSettingsDiagClose = () => {
    this.setState({isSettingsDiagOpen: false});
  };

  render() {
    console.log("Nigga 2", this.state.lives)
    console.log("Nigga 2", this.state.health)
    return (
      <div className="header-container">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="menu"
              onClick={(e) => this.handleMenuClick(e)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="header-text" align="center">
              Ali, Paul and Ringo's Hangman Game
            </Typography>
            <HealthBar lives={this.state.lives} />
          </Toolbar>
        </AppBar>
        <MenuWrapper 
          anchorE1={this.state.anchorE1} 
          isMenuOpen={this.state.isMenuOpen}
          isAboutDiagOpen={this.state.isAboutDiagOpen}
          lives={this.state.lives}
          handleMenuClose={this.handleMenuClose}
          handleAboutDiagClick={this.handleAboutDiagClick}
          handleAboutDiagClose={this.handleAboutDiagClose}
          isSettingsDiagOpen={this.state.isSettingsDiagOpen}
          handleSettingsDiagClick = {this.handleSettingsDiagClick}
          handleSettingsDiagClose= {this.handleSettingsDiagClose}
          updateLives={this.state.updateLives}
        />
      </div>
    )
  }
  }
 

export default Header;
