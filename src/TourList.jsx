import React, { Component } from 'react';
import TourListLink from './TourListLink';
import TourListDetail from './TourListDetail';

class TourList extends Component {
    constructor (props) {
        super(props);
        this.state = {showDetail: this.props.showDetail};
        this.showMyTour = this.showMyTour.bind(this);
        this.hideDetail = this.hideDetail.bind(this);
    }
    hideDetail () {
        this.setState({showDetail: false});
    }
    showMyTour () {
        this.setState((preState) => ({showDetail: !preState.showDetail}));
    }
    render () {
        return (
            <div>
                <TourListLink onTourListClick={this.showMyTour} />
                <TourListDetail showDetail={this.state.showDetail}
                    profile={this.props.profile}
                    onSubmit={this.hideDetail} />
            </div>
        );
    }
}
export default TourList;
