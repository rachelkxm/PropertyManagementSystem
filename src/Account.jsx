import React, { Component } from 'react';
import { getProfile, updateProfile } from './ServiceCalls';
import Profile from './Profile';
import './Account.css';

class ProfileLink extends React.Component{
      constructor(props){
         super(props);
         this.showProfile = this.showProfile.bind(this);
      }
      showProfile(){
          this.props.onLinkClick();
      }
      render(){
         return(<a className="profile"
                    href="#"
                    onClick={this.showProfile}
                    >My Profile</a>);
      }
}
class ProfileDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
                    userName : this.props.userName,
                    firstName : this.props.profile.firstName,
                    lastName : this.props.profile.lastName,
                    password : '',
                    email : this.props.profile.email
                    }
      this.handleUserNameInput = this.handleUserNameInput.bind(this);
      this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
      this.handleLastNameInput = this.handleLastNameInput.bind(this);
      this.handleEmailInput = this.handleEmailInput.bind(this);
      this.handlePasswordInput = this.handlePasswordInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFirstNameInput(e){
        this.setState({firstName : e.target.value});
    }
    handleLastNameInput(e){
       this.setState({lastName : e.target.value});
    }
    handleUserNameInput(e){
       this.setState({userName : e.target.value});
    }
    handleEmailInput(e){
       this.setState({email : e.target.value});
    }
    handlePasswordInput(e){
       this.setState({password : e.target.value});
    }
    handleSubmit(){
       const profile = {};
       profile.email = this.state.email;
       profile.firstName = this.state.firstName;
       profile.lastName = this.state.lastName;
       updateProfile({userName : this.state.userName, profile : profile, token : this.props.token});
       this.props.onSubmit();
    }
    render(){
       if(this.props.showDetail){
           return(
             <div className="myProfile">
               <h2>My Profile</h2>
               <div className="form">
                 <div className="container">
                   <Profile userName={this.state.userName}
                            firstName={this.state.firstName || this.props.profile.firstName}
                            lastName={this.state.lastName || this.props.profile.lastName}
                            email={this.state.email  || this.props.profile.email}
                            handleUserNameInput={this.handleUserNameInput}
                            handleFirstNameInput={this.handleFirstNameInput}
                            handleLastNameInput={this.handleLastNameInput}
                            handleEmailInput={this.handleEmailInput}
                            handlePasswordInput={this.handlePasswordInput}
                            />
                   <div className="clearfix">
                     <button type="submit" onClick={this.handleSubmit} className="signupbtn">Update Profile</button>
                   </div>
                 </div>
               </div>
            </div>
          );
       }
       return(<div></div>);
    }
}
class Account extends React.Component{
    constructor(props){
       super(props);
       this.state = { profile : {}, showDetail : false};
       this.requestProfile = this.requestProfile.bind(this);
       this.hideDetail = this.hideDetail.bind(this);
    }
    hideDetail(){
       this.setState({showDetail : false});
    }
    requestProfile(){
       if(!this.state.showDetail){
         getProfile({userName : this.props.userName, token : this.props.token})
         .then((response) => {
           if( response.error ) {
               return Promise.reject(response);
           }
            this.setState({profile : response.profile, showDetail : true});
         })
         .catch((error)=>console.log(error));
       }else{
          this.setState({showDetail : false});
       }
    }
    render(){
       if(this.props.isLogin){
         return(<div>
                <ProfileLink onLinkClick={this.requestProfile}/>
                <ProfileDetail showDetail={this.state.showDetail} profile={this.state.profile} userName={this.props.userName} token={this.props.token} onSubmit={this.hideDetail}/>
                </div>);
       }else return(<div></div>);
    }
}
export default Account;
