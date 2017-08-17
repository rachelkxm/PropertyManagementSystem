import React, { Component } from 'react';
import './DropdownMenu.css';
import Account from './Account';
class MenuList extends Component{
  render(){
  //<Account isLogin={this.props.isLogin} userName={this.props.userName} token={this.props.token}/>
     if(this.props.show){
        return(<div id="myDropdown" className="dropdown-content">
          <Account isLogin={this.props.isLogin} userName={this.props.userName} token={this.props.token}/>
          <a href="#myFavorite">My Favorite</a>
          <a href="#myTour">My Tour</a>
        </div>);
     }else{
        return(<div></div>);
     }
  }

}
class DropdownMenu extends Component{
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
            <MenuList show={this.state.show} isLogin={this.props.isLogin} userName={this.props.userName} token={this.props.token}/>
          </div>
        );
      }else{
         return(<div></div>);
      }
    }
}
export default DropdownMenu;
