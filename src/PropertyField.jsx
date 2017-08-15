import React, { Component } from 'react';
import './PropertyField.css';
class PropertyField extends React.Component{
    constructor(props){
      super(props);
      this.handleDoPost = this.handleDoPost.bind(this);
      this.handlePropertyTypeChange = this.handlePropertyTypeChange.bind(this);
      this.handleListingStatusChange = this.handleListingStatusChange.bind(this);
      this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleBedChange = this.handleBedChange.bind(this);
      this.handleBathChange = this.handleBathChange.bind(this);
      this.handleSqftChange = this.handleSqftChange.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
    }
    handleDoPost(){
       this.props.onDoPost();
    }
    handlePropertyTypeChange(e){
       this.props.onPropertyTypeChange(e.target.value);
    }
    handleListingStatusChange(e){
       this.props.onListingStatusChange(e.target.value);
    }
    handleZipcodeChange(e){
       this.props.onZipcodeChange(e.target.value);
    }
    handleAddressChange(e){
       this.props.onAddressChange(e.target.value);
    }
    handleLocationChange(e){
       this.props.onLocationChange(e.target.value);
    }
    handlePriceChange(e){
       this.props.onPriceChange(e.target.value);
    }
    handleBedChange(e){
        this.props.onBedChange(e.target.value);
    }
    handleBathChange(e){
        this.props.onBathChange(e.target.value);
    }
    handleSqftChange(e){
        this.props.onSqftChange(e.target.value);
    }
    handleCancel(){
        this.props.onCancel();
    }
    render(){
       if(!this.props.showField){
          return(<div></div>);
       }
       return(
          <div className="propertyField">
            <label><b>Property Type</b></label>
            <select name='propertyType' onChange={this.handlePropertyTypeChange}>
              <option value="house" selected={this.props.propertyType.house}>house</option>
              <option value="condo" selected={this.props.propertyType.condo}>condo</option>
              <option value="apartment" selected={this.props.propertyType.apartment}>apartment</option>
              <option value="townhouse" selected={this.props.propertyType.townhouse}>townhouse</option>
            </select>
            <label><b>Listing Status</b></label>
            <select name='listingStatus' onChange={this.handleListingStatusChange}>
              <option value="onsale" selected={this.props.listingStatus.onsale}>On Sale</option>
              <option value="pending" selected={this.props.listingStatus.pending}>Pending</option>
              <option value="sold" selected={this.props.listingStatus.sold}>Sold</option>
              <option value="outofmarket" selected={this.props.listingStatus.outofmarket}>Out of Market</option>
            </select><br></br>
            <label><b>ZipCode</b></label>
            <input type="text" placeholder="Enter Zip Code" name="zipcode" value={this.props.zipcode} onChange={this.handleZipcodeChange}/>
            <label><b>Address</b></label>
            <input type="text" placeholder="Enter Address" name="location" value={this.props.address} onChange={this.handleAddressChange}/>
            <label><b>Location</b></label>
            <input type="text" placeholder="Enter Location" name="location" value={this.props.location} onChange={this.handleLocationChange}/>
            <label><b>Price</b></label>
            <input type="text" placeholder="Enter Price" name="price" value={this.props.price} onChange={this.handlePriceChange}/>
            <label><b>Bed</b></label>
            <input type="text" placeholder="Enter number of bed" name="bed" value={this.props.bed} onChange={this.handleBedChange}/>
            <label><b>Bath</b></label>
            <input type="text" placeholder="Enter number of bath" name="bath" value={this.props.bath} onChange={this.handleBathChange}/>
            <label><b>sq.ft</b></label>
            <input type="text" placeholder="Enter sq.ft" name="sqft" value={this.props.sqft} onChange={this.handleSqftChange}/>
            <button onClick={this.handleDoPost}>Do Post</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>);

    };
}
export default PropertyField;
