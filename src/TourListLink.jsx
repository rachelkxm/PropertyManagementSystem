import { Component } from 'react';

class TourListLink extends Component {
    constructor (props) {
        super(props);
        this.showTourList = this.showTourList.bind(this);
    }
    showTourList () {
        this.props.onTourListClick();
    }
    render () {
        return (<a className='profile'
            href='#myTour'
            onClick={this.showTourList}
        >My Tour</a>);
    }
}
export default TourListLink;
