import React, { Component } from 'react';
class FavoriteLink extends Component {
    constructor (props) {
        super(props);
        this.showFavorite = this.showFavorite.bind(this);
    }
    showFavorite () {
        this.props.onFavoriteClick();
    }
    render () {
        return (<a className='profile'
            href='#myFavorite'
            onClick={this.showFavorite}
        >My Favorite</a>);
    }
}
export default FavoriteLink;
