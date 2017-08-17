import React, { Component } from 'react';
import InventoryList from './InventoryList';
import LoginControl from './LoginControl';
import DropdownMenu from './DropdownMenu';
import {getProperties} from './serviceCalls';
import {topics} from './constants';
class InventoryManagement extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin : false,
        user : '',
        token : '',
        propertyLoaded : false
      };
      this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(isLogin, userName, token) {
      this.setState({
        isLogin : isLogin,
        token : token,
        user : userName
      });
      getProperties({'topic' : topics[0], 'token' : token})
      .then((response)=>{
         this.properties = response.details;
         this.setState({propertyLoaded : true});
      })
      .catch((error)=>console.warn(error));
    }
   render() {
    return (
      <div>
        <LoginControl onLoginButton={this.handleLogin}/>
        <DropdownMenu isLogin={this.state.isLogin} userName={this.state.user} token={this.state.token}/>
        <InventoryList isLogin={this.state.isLogin} userName={this.state.user} token={this.state.token} properties={this.properties} propertyLoaded={this.state.propertyLoaded}/>
      </div>
    );
  }
}

export default InventoryManagement;
