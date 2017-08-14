import React, { Component } from 'react';
import './PropertyField.css';
class PropertyField extends React.Component{
    render(){
       if(!this.props.showField){
          return(<div></div>);
       }
       return(
          <div className="propertyField">
            <label><b>Property Type</b></label>
            <select name='propertyType'>
              <option value="house">house</option>
              <option value="condo">condo</option>
              <option value="apartment">apartment</option>
              <option value="townhouse">townhouse</option>
            </select>
            <label><b>Listing Status</b></label>
            <select name='propertyStatus'>
              <option value="onsale">On Sale</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="outofmarket">Out of Market</option>
            </select><br></br>
            <label><b>ZipCode</b></label>
            <input type="text" placeholder="Enter Zip Code" name="zipcode"/>
            <label><b>Location</b></label>
            <input type="text" placeholder="Enter Location" name="location"/>
            <label><b>Price</b></label>
            <input type="text" placeholder="Enter Price" name="price"/>
            <label><b>Bed</b></label>
            <input type="text" placeholder="Enter number of bed" name="bed"/>
            <label><b>Bath</b></label>
            <input type="text" placeholder="Enter number of bath" name="bath"/>
            <label><b>sq.ft</b></label>
            <input type="text" placeholder="Enter sq.ft" name="sqft"/>
            <button>Do Post</button>
          </div>);

    };
}
export default PropertyField;
