import React, { Component } from 'react';
import InventoryList from './InventoryList';
import LoginControl from './LoginControl';
import Account from './Account';
class InventoryManagement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin : false,
        token : ''
      };
      this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(isLogin, token) {
      this.setState({
        isLogin : isLogin,
        token : token
      });
    }
   render() {
    return (
      <div>
        <LoginControl onLoginButton={this.handleLogin}/>
        <InventoryList isLogin={this.state.isLogin} token={this.state.token}/>
      </div>
    );
  }
}

export default InventoryManagement;
