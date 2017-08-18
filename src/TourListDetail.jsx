import React, { Component } from 'react';
class TourListDetail extends React.Component{
    render(){
       const profile = this.props.profile.visitedHistory;
       let output = <div>Empty tour, please schedule a tour</div>;
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
export default TourListDetail;
