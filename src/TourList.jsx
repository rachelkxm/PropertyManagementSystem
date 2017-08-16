import React, { Component } from 'react';
import './TourList.css';

class TourList extends React.Component{
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
export default TourList;
