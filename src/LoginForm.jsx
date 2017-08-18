import React, { Component } from 'react';
import {login} from './serviceCalls';
class LoginForm extends Component {
    constructor (props) {
        super(props);
        this.state = {errorMsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserNameInput = this.handleUserNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }
    handleSubmit () {
        if (this.props.userName.trim() === '') {
            this.setState({errorMsg: 'please enter user name'});
            return;
        }
        if (this.props.password.trim() === '') {
            this.setState({errorMsg: 'please enter password'});
            return;
        }
        login({userName: (this.props.userName).toLowerCase(), password: this.props.password})
            .then((response) => {
                if (response.error) {
                    return Promise.reject(response);
                }
                this.props.onSubmit(true, this.props.userName, response.token);
            })
            .catch((error) => {
                this.setState({errorMsg: error.error});
                console.warn('wrong user name or password');
            });
    }
    handleUserNameInput (e) {
        this.props.onUserNameInput(e.target.value);
    }
    handlePasswordInput (e) {
        this.props.onPasswordInput(e.target.value);
    }
    render () {
        return (
            <div>
                <h2>Login</h2>
                <div className='form'>
                    <div className='container'>
                        <label><b>Username*</b></label>
                        <input type='text' placeholder='Enter Username' name='uname' value={this.props.userName} onChange={this.handleUserNameInput} required />
                        <label><b>Password*</b></label>
                        <input type='password' placeholder='Enter Password' name='psw' value={this.props.password} onChange={this.handlePasswordInput} required />
                        <button onClick={this.handleSubmit} type='submit'>Login</button>
                        <br />
                        <label className='errorMsg'>{this.state.errorMsg}</label>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginForm;
