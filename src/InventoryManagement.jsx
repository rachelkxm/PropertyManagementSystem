import React, { Component } from 'react';
import InventoryList from './InventoryList';
import LoginControl from './LoginControl';
import Account from './Account';
import {topics} from './constants';
import {getProperties} from './ServiceCalls';
import DropdownMenu from './DropdownMenu';
class InventoryManagement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin : false,
        user : '',
        token : ''
      };
      this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(isLogin, userName, token) {
      this.setState({
        isLogin : isLogin,
        token : token,
        user : userName
      });

    }
   render() {
   //<Account isLogin={this.state.isLogin} userName={this.state.user} token={this.state.token}/>
    return (
      <div>
        <LoginControl onLoginButton={this.handleLogin}/>
        <DropdownMenu isLogin={this.state.isLogin} userName={this.state.user} token={this.state.token}/>
        <InventoryList isLogin={this.state.isLogin} userName={this.state.user} token={this.state.token}/>
      </div>
    );
  }
}

export default InventoryManagement;
