import React, { Component } from 'react';
import {login, register} from './ServiceCalls';
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
          this.props.onLoginStatusChange(validUser,this.props.userName);
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
             <label errorMessge={this.state.errorMsg}>{this.state.errorMsg}</label>
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
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }
  handleSubmit(){
      const profile = {};
      profile.password = this.props.password;
      profile.email = this.props.email;
      register({userName: this.props.userName, profile: profile})
      .then((response)=>{
          if(response.error){
             return Promise.reject(response);
          }
          const validUser = true;
          this.props.onSubmit(validUser);
          this.props.onLoginStatusChange(validUser,this.props.userName);
      })
      .catch((error) => {
          this.setState({errorMsg: error.error});
          console.warn('wrong user name or password')
      });
      this.props.onSubmit(true);
      this.props.onLoginStatusChange(true,this.props.userName);
  }
  handleUserNameInput(e){
     this.props.onUserNameInput(e.target.value);
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
              <label><b>User Name</b></label>
              <input type="text" placeholder="Enter User Name" name="uname" value={this.props.userName} onChange={this.handleUserNameInput} required/>

              <label><b>First Name</b></label>
              <input type="text" placeholder="Enter First Name" name="first" required/>

              <label><b>Last Name</b></label>
              <input type="text" placeholder="Enter Last Name" name="last" required/>


              <label><b>Email</b></label>
              <input type="text" placeholder="Enter Email" name="email" value={this.props.email} onChange={this.handleEmailInput} required/>

              <label><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" value={this.props.password} onChange={this.handlePasswordInput} required/>

              <label><b>Repeat Password</b></label>
              <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
              <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

              <div class="clearfix">
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
         form = <LoginForm userName={this.state.userName} password={this.state.password} onUserNameInput={this.handleUserNameInput} onPasswordInput={this.handlePasswordInput} onSubmit={this.props.onLoginButton} onLoginStatusChange={this.props.changeLoginStatus}/>;
      }else if(selection === 'register'){
         form = <SignupForm userName={this.state.userName}
                            password={this.state.password}
                            onUserNameInput={this.handleUserNameInput}
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
      user : ''
    };
    this.handleLoginStatus = this.handleLoginStatus.bind(this);
  }
  handleLoginStatus(status, user) {
    this.setState({
      alreadyLogin: status,
      user : user
    });
  }
  render() {
      const loginStatus = this.state.alreadyLogin;
      if(!loginStatus){
         return(<LoginShow onLoginButton={this.props.onLoginButton} changeLoginStatus={this.handleLoginStatus}/>);
      }else{
         return(<LogoutShow userName={this.state.user} onLogoutButton={this.props.onLoginButton} changeLoginStatus={this.handleLoginStatus}/>);
      }
  }
}
export default LoginControl;
