import { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
class LoginShow extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loginOrReg: '',
            userName: '',
            password: '',
            rePassword: '',
            email: ''
        };
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this);
        this.handleUserNameInput = this.handleUserNameInput.bind(this);
        this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
        this.handleLastNameInput = this.handleLastNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleRePasswordInput = this.handleRePasswordInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }
    handleLoginButtonClick () {
        this.setState({
            loginOrReg: 'login'
        });
    }
    handleRegisterButtonClick () {
        this.setState({
            loginOrReg: 'register'
        });
    }
    handleUserNameInput (uname) {
        this.setState({
            userName: uname
        });
    }
    handleFirstNameInput (fname) {
        this.setState({
            firstName: fname
        });
    }
    handleLastNameInput (lname) {
        this.setState({
            lastName: lname
        });
    }
    handlePasswordInput (pwd) {
        this.setState({
            password: pwd
        });
    }
    handleRePasswordInput (pwd) {
        this.setState({
            rePassword: pwd
        });
    }
    handleEmailInput (email) {
        this.setState({
            email: email
        });
    }
    render () {
        const selection = this.state.loginOrReg;
        let form = '';
        if (selection === 'login') {
            form = <LoginForm userName={this.state.userName}
                password={this.state.password}
                onUserNameInput={this.handleUserNameInput}
                onPasswordInput={this.handlePasswordInput}
                onSubmit={this.props.onLoginButton}
            />;
        } else if (selection === 'register') {
            form = <RegisterForm userName={this.state.userName}
                password={this.state.password}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                rePassword={this.state.rePassword}
                onUserNameInput={this.handleUserNameInput}
                onFirstNameInput={this.handleFirstNameInput}
                onLastNameInput={this.handleLastNameInput}
                onPasswordInput={this.handlePasswordInput}
                onRePasswordInput={this.handleRePasswordInput}
                onEmailInput={this.handleEmailInput}
                onSubmit={this.props.onLoginButton}
            />;
        }
        return (
            <div className='loginControl'>
                <button onClick={this.handleLoginButtonClick}>login</button>
                <button onClick={this.handleRegisterButtonClick}>register</button>
                {form}
            </div>
        );
    }
}
export default LoginShow;
