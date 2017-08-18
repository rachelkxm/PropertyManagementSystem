import { Component } from 'react';
import {register, updateProfile} from './serviceCalls';
import Profile from './Profile';

class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.state = {errorMsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserNameInput = this.handleUserNameInput.bind(this);
        this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
        this.handleLastNameInput = this.handleLastNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleRePasswordInput = this.handleRePasswordInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }
    handleSubmit () {
        if (!this.props.userName || this.props.userName.trim() === '') {
            this.setState({errorMsg: 'please enter userName'});
            return;
        }
        if (!this.props.firstName || this.props.firstName.trim() === '') {
            this.setState({errorMsg: 'please enter first name'});
            return;
        }
        if (!this.props.lastName || this.props.lastName.trim() === '') {
            this.setState({errorMsg: 'please enter last name'});
            return;
        }
        if (!this.props.email || this.props.email.trim() === '') {
            this.setState({errorMsg: 'please enter email'});
            return;
        }
        if (this.props.email.indexOf('@') === -1) {
            this.setState({errorMsg: 'invalid email'});
            return;
        }
        if (!this.props.password || this.props.password.trim() === '') {
            this.setState({errorMsg: 'please enter passwords'});
            return;
        }
        if (!this.props.rePassword || this.props.rePassword !== this.props.password) {
            this.setState({errorMsg: 'the passwords do not match'});
            return;
        }
        const profile = {};
        profile.firstName = this.props.firstName;
        profile.lastName = this.props.lastName;
        profile.password = this.props.password;
        profile.email = this.props.email;
        register({userName: this.props.userName, password: this.props.password})
            .then((response) => {
                if (response.error) {
                    return Promise.reject(response);
                } else {
                    this.props.onSubmit(true, this.props.userName, response.token);
                    updateProfile({userName: this.props.userName, profile: profile, token: response.token});
                }
            })
            .catch((error) => {
                this.setState({errorMsg: error.error});
                console.warn('wrong user name or password');
            });
    }
    handleUserNameInput (e) {
        this.props.onUserNameInput(e.target.value);
    }
    handleFirstNameInput (e) {
        this.props.onFirstNameInput(e.target.value);
    }
    handleLastNameInput (e) {
        this.props.onLastNameInput(e.target.value);
    }
    handlePasswordInput (e) {
        this.props.onPasswordInput(e.target.value);
    }
    handleRePasswordInput (e) {
        this.props.onRePasswordInput(e.target.value);
    }
    handleEmailInput (e) {
        this.props.onEmailInput(e.target.value);
    }
    render () {
        return (
            <div>
                <h2>Signup</h2>
                <div className='form'>
                    <div className='container'>
                        <Profile userName={this.props.userName}
                            password={this.props.password}
                            rePassword={this.props.rePassword}
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            email={this.props.email}
                            handleUserNameInput={this.handleUserNameInput}
                            handleFirstNameInput={this.handleFirstNameInput}
                            handleLastNameInput={this.handleLastNameInput}
                            handleEmailInput={this.handleEmailInput}
                            handlePasswordInput={this.handlePasswordInput}
                            handleRePasswordInput={this.handleRePasswordInput}
                        />
                        <p>By creating an account you agree to our <a href='#Terms&Privacy'>Terms & Privacy</a>.</p>
                        <div className='clearfix'>
                            <button type='submit' onClick={this.handleSubmit} className='signupbtn'>Sign Up</button>
                        </div>
                        <br />
                        <label className='errorMsg'>{this.state.errorMsg}</label>
                    </div>
                </div>
            </div>
        );
    }
}
export default RegisterForm;
