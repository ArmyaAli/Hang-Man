import '../../style/header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function Header() {
  return (
    <div className="header-container">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="header-text" align="center">
            Ali and Ringo's Hangman Game
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
