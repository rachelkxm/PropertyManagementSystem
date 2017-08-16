import React, { Component } from 'react';
import './DropdownMenu.css';

class MenuList extends React.Component{
  render(){
     if(this.props.show){
        return(<div id="myDropdown" className="dropdown-content">
          <a href="#myProfile">My Profile</a>
          <a href="#myFavorite">My Favorite</a>
          <a href="#myTour">My Tour</a>
        </div>);
     }else{
        return(<div></div>);
     }
  }

}
class DropdownMenu extends React.Component{
    constructor(props){
       super(props);
       this.state = {show : false};
       this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }
    handleDropdownClick(){
       this.setState(
          (preState)=>({
             show : !preState.show
          })
       );
    }
    render(){
      if(this.props.isLogin){
        return(
          <div className="dropdown">
            <button onClick={this.handleDropdownClick} className="dropbtn">{this.props.userName}<i className="fa fa-caret-down"></i></button>
            <MenuList show={this.state.show}/>
          </div>
        );
      }else{
         return(<div></div>);
      }
    }
}
export default DropdownMenu;
