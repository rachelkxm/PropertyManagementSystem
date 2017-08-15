import React, { Component } from 'react';
import {login, register, updateProfile, logout} from './ServiceCalls';
import Profile from './Profile';

class RegisterForm extends React.Component{
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
              this.props.onSubmit(true, this.props.userName, response.token);
              updateProfile({userName : this.props.userName, profile : profile, token : response.token});
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
export default RegisterForm;
