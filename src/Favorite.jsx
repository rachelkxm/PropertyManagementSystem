import { Component } from 'react';
import FavoriteLink from './FavoriteLink';
import FavoriteList from './FavoriteList';
class Favorite extends Component {
    constructor (props) {
        super(props);
        this.state = {showDetail: this.props.showDetail};
        this.showFavorite = this.showFavorite.bind(this);
        this.hideDetail = this.hideDetail.bind(this);
    }
    hideDetail () {
        this.setState({showDetail: false});
    }
    showFavorite () {
        this.setState((preState) => ({showDetail: !preState.showDetail}));
    }
    render () {
        return (
            <div>
                <FavoriteLink onFavoriteClick={this.showFavorite} />
                <FavoriteList showDetail={this.state.showDetail}
                    profile={this.props.profile}
                    onSubmit={this.hideDetail} />
            </div>
        );
    }
}
export default Favorite;
