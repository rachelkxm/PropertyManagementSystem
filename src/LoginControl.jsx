import React, { Component } from 'react';
import LoginShow from './LoginShow';
import LogoutShow from './LogoutShow';
import './Login.css';
import './Register.css';
class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false,
      user : '',
      token : ''
    };
    this.handleLoginStatusChange = this.handleLoginStatusChange.bind(this);
  }
  handleLoginStatusChange(status, user, token) {
    this.setState({
      isLogin: status,
      user : user,
      token : token
    });
    this.props.onLoginButton(status, user, token);
  }
  render() {
      if(!this.state.isLogin){
         return(
           <div>
             <LoginShow onLoginButton={this.handleLoginStatusChange}/>);
           </div>
         );
      }else{
         return(
            <div>
               <LogoutShow userName={this.state.user} token={this.state.token} onLogoutButton={this.handleLoginStatusChange}/>
            </div>
         );
      }
  }
}
export default LoginControl;
