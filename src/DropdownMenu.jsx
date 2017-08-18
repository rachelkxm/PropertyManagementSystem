import React, { Component } from 'react';
import './DropdownMenu.css';
import MenuList from './MenuList';
import { getProfile} from './serviceCalls';
class DropdownMenu extends Component{
    constructor(props){
       super(props);
       this.profile = {};
       this.state = {show : false, showDetail : false};
       this.handleDropdownClick = this.handleDropdownClick.bind(this);
       this.requestProfile = this.requestProfile.bind(this);
    }
    handleDropdownClick(){
       this.setState(
          (preState)=>({
             show : !preState.show
          })
       );
       this.requestProfile();
    }
    requestProfile(){
      getProfile({userName : this.props.userName, token : this.props.token})
      .then((response) => {
        if( response.error ) {
            return Promise.reject(response);
        }
        this.profile = response.profile;
        this.setState({showDetail : false});
      })
      .catch((error)=>console.log(error));
    }
    render(){
      if(this.props.isLogin){
        return(
          <div className="dropdown">
            <button onClick={this.handleDropdownClick} className="dropbtn">{this.props.userName}<i className="fa fa-caret-down"></i></button>
            <MenuList show={this.state.show}
                      showDetail={this.state.showDetail}
                      isLogin={this.props.isLogin}
                      userName={this.props.userName}
                      token={this.props.token}
                      profile={this.profile}/>
          </div>
        );
      }else{
         return(<div></div>);
      }
    }
}
export default DropdownMenu;
