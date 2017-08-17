import React, { Component } from 'react';
class Profile extends React.Component{
    render(){
       return(
          <div>
            <label><b>User Name*</b></label>
            <input className="profileInput" type="text" placeholder="Enter User Name" name="uname" value={this.props.userName} onChange={this.props.handleUserNameInput} required/>

            <label><b>First Name*</b></label>
            <input type="text" placeholder="Enter First Name" name="first" value={this.props.firstName} onChange={this.props.handleFirstNameInput} required/>

            <label><b>Last Name*</b></label>
            <input type="text" placeholder="Enter Last Name" name="last" value={this.props.lastName} onChange={this.props.handleLastNameInput} required/>

            <label><b>Email*</b></label>
            <input type="email" placeholder="Enter Email" name="email" value={this.props.email} onChange={this.props.handleEmailInput} required/>

            <label><b>Password*</b></label>
            <input type="password" placeholder="Enter Password" name="psw" value={this.props.password} onChange={this.props.handlePasswordInput} required/>

            <label><b>Repeat Password*</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" value={this.props.rePassword} onChange={this.props.handleRePasswordInput} required/>
          </div>
       );
    }
}
export default Profile;
