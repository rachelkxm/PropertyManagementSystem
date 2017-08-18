import React, { Component } from 'react';
class ProfileLink extends Component{
      constructor(props){
         super(props);
         this.showProfile = this.showProfile.bind(this);
      }
      showProfile(){
          this.props.onLinkClick();
      }
      render(){
         return(<a className="profile"
                    href="#myProfile"
                    onClick={this.showProfile}
                    >My Profile</a>);
      }
}
export default ProfileLink;
