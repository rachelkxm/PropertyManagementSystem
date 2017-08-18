import React, { Component } from 'react';
import Account from './Account';
import Favorite from './Favorite';
import TourList from './TourList';
class MenuList extends Component{
  render(){
     if(this.props.show){
        return(<div id="myDropdown" className="dropdown-content">
          <Account isLogin={this.props.isLogin}
                   userName={this.props.userName}
                   token={this.props.token}
                   profile={this.props.profile}
                   showDetail={this.props.showDetail}/>
          <Favorite profile={this.props.profile} showDetail={this.props.showDetail}/>
          <TourList profile={this.props.profile} showDetail={this.props.showDetail}/>
        </div>);
     }else{
        return(<div></div>);
     }
  }
}
export default MenuList;
