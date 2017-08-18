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
       const profile = this.props.profile.favorite;
       let output = <div>Empty favorite, please add you favorite one</div>;
       if(!this.props.showDetail) return(<div></div>);
       if(profile && profile.length>0){
         output = profile.map(function(p){
              return <li key={p.id}>address : {p.address}
                         <ul>
                           <li>zipcode : {p.zipcode}</li>
                           <li>location : {p.location}</li>
                           <li>price : {p.price}</li>
                           <li>bed : {p.bed}</li>
                           <li>bath : {p.bath}</li>
                           <li>sqft : {p.sqft}</li>
                         </ul>
                     </li>
         });
       }
       return(
          <ul className="width100">{output}
          </ul>
       );
    }
}
class Favorite extends Component{
    constructor(props){
       super(props);
       this.state = {showDetail : this.props.showDetail};
       this.showFavorite = this.showFavorite.bind(this);
       this.hideDetail = this.hideDetail.bind(this);
    }
    hideDetail(){
       this.setState({showDetail : false});
    }
    showFavorite(){
       this.setState((preState)=>({showDetail : !preState.showDetail}));
    }
   render(){
     return(
       <div>
         <FavoriteLink onFavoriteClick={this.showFavorite}/>
         <FavoriteList showDetail={this.state.showDetail}
                         profile={this.props.profile}
                         onSubmit={this.hideDetail}/>
       </div>
     );
   }
}
export default Favorite;
