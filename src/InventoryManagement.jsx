import React, { Component } from 'react';
import InventoryList from './InventoryList';
import LoginControl from './LoginControl';
import Account from './Account';
class InventoryManagement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: false
      };
      this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(isLogin) {
      this.setState({
        isLogin: isLogin
      });
    }
   render() {
    return (
      <div>
        <LoginControl onLoginButton={this.handleLogin}/>
        <Account isLogin={this.state.isLogin}/>
        <InventoryList isLogin={this.state.isLogin}/>
      </div>
    );
  }
}

export default InventoryManagement;
