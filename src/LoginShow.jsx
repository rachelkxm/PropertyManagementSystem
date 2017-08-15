import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
class LoginShow extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        loginOrReg : '',
        userName : '',
        password : '',
        email : ''
      };
      this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
      this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this);
      this.handleUserNameInput = this.handleUserNameInput.bind(this);
      this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
      this.handleLastNameInput = this.handleLastNameInput.bind(this);
      this.handlePasswordInput = this.handlePasswordInput.bind(this);
      this.handleEmailInput = this.handleEmailInput.bind(this);
    }
    handleLoginButtonClick() {
      this.setState({
        loginOrReg: 'login'
      });
    }
    handleRegisterButtonClick() {
      this.setState({
        loginOrReg: 'register'
      });
    }
    handleUserNameInput(uname){
      this.setState({
        userName : uname
      });
    }
    handleFirstNameInput(fname){
      this.setState({
        firstName : fname
      });
    }
    handleLastNameInput(lname){
      this.setState({
        lastName : lname
      });
    }
    handlePasswordInput(pwd){
      this.setState({
        password : pwd
      });
    }
    handleEmailInput(email){
      this.setState({
        email : email
      });
    }
    render(){
      const selection = this.state.loginOrReg;
      let form = '';
      if(selection === 'login'){
         form = <LoginForm userName={this.state.userName}
                           password={this.state.password}
                           onUserNameInput={this.handleUserNameInput}
                           onPasswordInput={this.handlePasswordInput}
                           onSubmit={this.props.onLoginButton}
                           />;
      }else if(selection === 'register'){
         form = <RegisterForm userName={this.state.userName}
                            password={this.state.password}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            email={this.state.email}
                            onUserNameInput={this.handleUserNameInput}
                            onFirstNameInput={this.handleFirstNameInput}
                            onLastNameInput={this.handleLastNameInput}
                            onPasswordInput={this.handlePasswordInput}
                            onEmailInput={this.handleEmailInput}
                            onSubmit={this.props.onLoginButton}
                            />;
      }
      return (
        <div className="loginControl">
          <button onClick={this.handleLoginButtonClick}>login</button>
          <button onClick={this.handleRegisterButtonClick}>register</button>
          {form}
        </div>
      );
    }
}
export default LoginShow;