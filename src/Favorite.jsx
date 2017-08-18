import React, { Component } from 'react';
import './Favorite.css';
class FavoriteLink extends Component{
      constructor(props){
         super(props);
         this.showFavorite = this.showFavorite.bind(this);
      }
      showFavorite(){
          this.props.onFavoriteClick();
      }
      render(){
         return(<a className="profile"
                    href="#myFavorite"
                    onClick={this.showFavorite}
                    >My Favorite</a>);
      }
}
class FavoriteList extends Component{
    render(){
       return(
         <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
         </ul>
       );
    }
}
class Favorite extends Component{
    constructor(props){
       super(props);
       this.state = {showDetail : this.props.showDetail};
       this.requestProfile = this.requestProfile.bind(this);
       this.hideDetail = this.hideDetail.bind(this);
    }
    hideDetail(){
       this.setState({showDetail : false});
    }
    requestProfile(){
       this.setState((preState)=>({showDetail : !preState.showDetail}));
    }
   render(){
     return(
       <div>
         <FavoriteLink/>
         <FavoriteList/>
       </div>
     );
   }
}
export default Favorite;
