import React, { Component } from 'react';
import {updateProfile } from './serviceCalls';
import Profile from './Profile';
class ProfileDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName,
            password: '',
            email: this.props.profile.email
        };
        this.handleUserNameInput = this.handleUserNameInput.bind(this);
        this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
        this.handleLastNameInput = this.handleLastNameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFirstNameInput (e) {
        this.setState({firstName: e.target.value});
    }
    handleLastNameInput (e) {
        this.setState({lastName: e.target.value});
    }
    handleUserNameInput (e) {
        this.setState({userName: e.target.value});
    }
    handleEmailInput (e) {
        this.setState({email: e.target.value});
    }
    handlePasswordInput (e) {
        this.setState({password: e.target.value});
    }
    handleSubmit () {
        const profile = {};
        profile.email = this.state.email;
        profile.firstName = this.state.firstName;
        profile.lastName = this.state.lastName;
        updateProfile({userName: this.state.userName, profile: profile, token: this.props.token});
        this.props.onSubmit();
    }
    render () {
        if (this.props.showDetail) {
            return (
                <div className='myProfile'>
                    <h2>My Profile</h2>
                    <div className='form'>
                        <div className='container'>
                            <Profile userName={this.state.userName}
                                firstName={this.state.firstName || this.props.profile.firstName}
                                lastName={this.state.lastName || this.props.profile.lastName}
                                email={this.state.email || this.props.profile.email}
                                handleUserNameInput={this.handleUserNameInput}
                                handleFirstNameInput={this.handleFirstNameInput}
                                handleLastNameInput={this.handleLastNameInput}
                                handleEmailInput={this.handleEmailInput}
                                handlePasswordInput={this.handlePasswordInput}
                            />
                            <div className='clearfix'>
                                <button type='submit' onClick={this.handleSubmit} className='signupbtn'>Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (<div />);
    }
}
export default ProfileDetail;
