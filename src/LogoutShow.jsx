import React, { Component } from 'react';
import {logout} from './serviceCalls';
class LogoutShow extends Component{
    constructor(props) {
      super(props);
      this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
    }
    handleLogoutButtonClick(){
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
export default LogoutShow
