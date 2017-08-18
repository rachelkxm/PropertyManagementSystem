import React, { Component } from 'react';
import './TourList.css';

class TourListLink extends Component{
    constructor(props){
       super(props);
       this.showTourList = this.showTourList.bind(this);
    }
    showTourList(){
        this.props.onTourListClick();
    }
    render(){
       return(<a className="profile"
                  href="#myTour"
                  onClick={this.showTourList}
                  >My Tour</a>);
    }
}
class TourListDetail extends React.Component{
    render(){
       const profile = this.props.profile.visitedHistory;
       console.log(profile);
       const itemList = <div></div>;
       let output = <div>Empty tour, please schedule a tour</div>;
       if(!this.props.showDetail) return(<div></div>);
       if(profile && profile.length>0){
         output = profile.map(function(p){
              return <li>address : {p.address}
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
class TourList extends React.Component{
    constructor(props){
       super(props);
       this.state = {showDetail : this.props.showDetail};
       this.showMyTour = this.showMyTour.bind(this);
       this.hideDetail = this.hideDetail.bind(this);
    }
    hideDetail(){
       this.setState({showDetail : false});
    }
    showMyTour(){
       this.setState((preState)=>({showDetail : !preState.showDetail}));
    }
    render(){
     return(
       <div>
         <TourListLink onTourListClick={this.showMyTour}/>
         <TourListDetail showDetail={this.state.showDetail}
                         profile={this.props.profile}
                         onSubmit={this.hideDetail}/>
       </div>
     );
    }
}
export default TourList;
