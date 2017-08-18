import React, { Component } from 'react';
import ProfileDetail from './ProfileDetail';
import ProfileLink from './ProfileLink';
import './Account.css';

class Account extends Component {
    constructor (props) {
        super(props);
        this.state = {showDetail: this.props.showDetail};
        this.showProfile = this.showProfile.bind(this);
        this.hideDetail = this.hideDetail.bind(this);
    }
    hideDetail () {
        this.setState({showDetail: false});
    }
    showProfile () {
        this.setState((preState) => ({showDetail: !preState.showDetail}));
    }
    render () {
        if (this.props.isLogin) {
            return (<div className='width100'>
                <ProfileLink onLinkClick={this.showProfile} />
                <ProfileDetail className='width100' showDetail={this.state.showDetail} profile={this.props.profile} userName={this.props.userName} token={this.props.token} onSubmit={this.hideDetail} />
            </div>);
        } else return (<div />);
    }
}
export default Account;
