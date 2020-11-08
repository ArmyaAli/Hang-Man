import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React from "react";

const heartIcon = <FavoriteIcon />;
const unHealthIcon = <FavoriteBorderIcon />;

class HealthBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            health: props.health
        };
        this.init();
    }

    init() {
        let hp = this.state.list.slice();

        for(let i = 0; i < this.state.health; ++i) {
            hp.push(heartIcon);
        }
        this.setState({list: hp})
        console.log('hp:', hp)
        console.log('internal: ', this.state.list)
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
        return(
            <div>
            Hello
            </div>
        );
    }
}

export default HealthBar;