import React, { Component } from 'react';
import {login, register, updateProfile, logout} from './ServiceCalls';
import Account from './Account';
import Profile from './Profile';
import './Login.css';
import './Register.css';
class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {errorMsg : ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }
  handleSubmit(){

      login({userName: this.props.userName, password: this.props.password})
      .then((response)=>{
          if(response.error){
             return Promise.reject(response);
          }
          const validUser = true;
          this.props.onSubmit(validUser);
          this.props.onLoginStatusChange(validUser,this.props.userName, response.token);
          console.log("*****");
          console.log(response.token);
      })
      .catch((error) => {
          this.setState({errorMsg: error.error});
          console.warn('wrong user name or password')
      });
  }
  handleUserNameInput(e){
     this.props.onUserNameInput(e.target.value);
  }
  handlePasswordInput(e){
     this.props.onPasswordInput(e.target.value);
  }
  render(){
     return(
       <div>
         <h2>Login</h2>
         <div className="form">
           <div className="container">
             <label><b>Username</b></label>
             <input type="text" placeholder="Enter Username" name="uname" value={this.props.userName} onChange={this.handleUserNameInput} required/>
             <label><b>Password</b></label>
             <input type="password" placeholder="Enter Password" name="psw" value={this.props.password} onChange={this.handlePasswordInput} required/>
             <button onClick={this.handleSubmit} type="submit">Login</button>
             <br></br>
             <label>{this.state.errorMsg}</label>
           </div>
         </div>
       </div>
     );
  }
}
class SignupForm extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }
  handleSubmit(){
      const profile = {};
      profile.firstName = this.props.firstName;
      profile.lastName = this.props.lastName;
      profile.password = this.props.password;
      profile.email = this.props.email;
      register({userName: this.props.userName, password: this.props.password})
      .then((response)=>{
          if(response.error){
              return Promise.reject(response);
          }else{
              const validUser = true;
              this.props.onSubmit(validUser);
              this.props.onLoginStatusChange(validUser,this.props.userName,response.token);
              updateProfile({userName : this.props.userName, profile : profile, token : response.token});
              console.log("***");
              console.log(response.token);
          }
      })
      .catch((error) => {
          this.setState({errorMsg: error.error});
          console.warn('wrong user name or password')
      });

  }
  handleUserNameInput(e){
     this.props.onUserNameInput(e.target.value);
  }
  handleFirstNameInput(e){
     this.props.onFirstNameInput(e.target.value);
  }
  handleLastNameInput(e){
     this.props.onLastNameInput(e.target.value);
  }
  handlePasswordInput(e){
     this.props.onPasswordInput(e.target.value);
  }
  handleEmailInput(e){
     this.props.onEmailInput(e.target.value);
  }
  render(){
     return(
       <div>
          <h2>Signup</h2>
          <div className="form">
            <div className="container">
              <Profile userName={this.props.userName}
                       password={this.props.password}
                       firstName={this.props.firstName}
                       lastName={this.props.lastName}
                       handleUserNameInput={this.handleUserNameInput}
                       handleFirstNameInput={this.handleFirstNameInput}
                       handleLastNameInput={this.handleLastNameInput}
                       handleEmailInput={this.handleEmailInput}
                       handlePasswordInput={this.handlePasswordInput}
                       />
              <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
              <div className="clearfix">
                <button type="submit" onClick={this.handleSubmit} className="signupbtn">Sign Up</button>
              </div>
            </div>
          </div>
       </div>
     );
  }
}

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
                           onLoginStatusChange={this.props.changeLoginStatus}/>;
      }else if(selection === 'register'){
         form = <SignupForm userName={this.state.userName}
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
                            onLoginStatusChange={this.props.changeLoginStatus}/>;
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
class LogoutShow extends React.Component{
    constructor(props) {
      super(props);
      this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
    }
    handleLogoutButtonClick(){
        this.props.changeLoginStatus(false);
        this.props.onLogoutButton(false);
        logout({userName : this.props.userName, token : this.props.token});
    }
    render(){
      return (
        <div className="loginControl">
          <div>Welcome {this.props.userName}</div>
          <button onClick={this.handleLogoutButtonClick}>Sign Out</button>
        </div>
      );
    }
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyLogin : false,
      user : '',
      token : ''
    };
    this.handleLoginStatus = this.handleLoginStatus.bind(this);
  }
  handleLoginStatus(status, user, token) {
    this.setState({
      alreadyLogin: status,
      user : user,
      token : token
    });
  }
  render() {
      const loginStatus = this.state.alreadyLogin;
      if(!loginStatus){
         return(
           <div>
             <LoginShow userName={this.state.user} onLoginButton={this.props.onLoginButton} changeLoginStatus={this.handleLoginStatus}/>);
             <Account isLogin={loginStatus}/>
           </div>
         );
      }else{
         return(
            <div>
               <LogoutShow userName={this.state.user} token={this.state.token} onLogoutButton={this.props.onLoginButton} changeLoginStatus={this.handleLoginStatus}/>
               <Account isLogin={loginStatus} userName={this.state.user} token={this.state.token}/>
            </div>
         );
      }
  }
}
export default LoginControl;
