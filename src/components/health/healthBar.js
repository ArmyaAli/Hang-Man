import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React from "react";

const heartIcon = <FavoriteIcon />;
const unHealthIcon = <FavoriteBorderIcon />;

class HealthBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lives: this.setLivesArray(props),
            health: props.health
        };

        console.log(this.state.lives);
    }

    setLivesArray(props) {
        let hp = [];

        for(let i = 0; i < props.health; ++i) {
            hp.push(heartIcon);
        }
        return [...hp];
    }

    remove() {
        let hp = this.state.list;
        // grab its index
        let firstHeartFromTheRight = 0;
        for(let i = this.state.health; i > 0; --i) {
            if(hp[i] === heartIcon) {
                firstHeartFromTheRight = i;
            }
        }
        hp[firstHeartFromTheRight].push(unHealthIcon)
        this.setState({list: hp})
    }

    render() {
        const lives = this.state.lives.map((Life, index) => {
            return <span key={index}>{Life}</span>;
        });
        return(
            <div>
                {lives}
            </div>
        );
    }
}

export default HealthBar;