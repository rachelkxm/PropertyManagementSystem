import React, { Component } from 'react';
import './Favorite.css';
class FavoriteLink extends React.Component{
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
class FavoriteList extends React.Component{
    render(){
       return(
         <ul style="list-style-type:disc">
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
         </ul>
       );
    }
}
class Favorite extends React.Component{
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
