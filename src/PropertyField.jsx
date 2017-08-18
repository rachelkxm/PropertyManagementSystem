import { Component } from 'react';
import './PropertyField.css';
class PropertyField extends Component {
    constructor (props) {
        super(props);
        this.state = {errorMsg: ''};
        this.handleDoPost = this.handleDoPost.bind(this);
        this.handlePropertyTypeChange = this.handlePropertyTypeChange.bind(this);
        this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleBedChange = this.handleBedChange.bind(this);
        this.handleBathChange = this.handleBathChange.bind(this);
        this.handleSqftChange = this.handleSqftChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleDoPost () {
        if (this.props.zipcode.trim() === '') {
            this.setState({errorMsg: 'please enter zip code'});
            return;
        }
        if (this.props.address.trim() === '') {
            this.setState({errorMsg: 'please enter address'});
            return;
        }
        if (this.props.location.trim() === '') {
            this.setState({errorMsg: 'please enter location'});
            return;
        }
        if (this.props.price.trim() === '') {
            this.setState({errorMsg: 'please enter price'});
            return;
        }
        if (this.props.bed.trim() === '') {
            this.setState({errorMsg: 'please enter number of bed'});
            return;
        }
        if (this.props.bath.trim() === '') {
            this.setState({errorMsg: 'please enter number of bath'});
            return;
        }
        if (this.props.sqft.trim() === '') {
            this.setState({errorMsg: 'please enter sq.ft'});
            return;
        }
        this.props.onDoPost();
    }
    handlePropertyTypeChange (e) {
        this.props.onPropertyTypeChange(e.target.value);
    }
    /* handleListingStatusChange(e){
       this.props.onListingStatusChange(e.target.value);
    } */
    handleZipcodeChange (e) {
        this.props.onZipcodeChange(e.target.value);
    }
    handleAddressChange (e) {
        this.props.onAddressChange(e.target.value);
    }
    handleLocationChange (e) {
        this.props.onLocationChange(e.target.value);
    }
    handlePriceChange (e) {
        this.props.onPriceChange(e.target.value);
    }
    handleBedChange (e) {
        this.props.onBedChange(e.target.value);
    }
    handleBathChange (e) {
        this.props.onBathChange(e.target.value);
    }
    handleSqftChange (e) {
        this.props.onSqftChange(e.target.value);
    }
    handleCancel () {
        this.props.onCancel();
    }
    render () {
        if (!this.props.showField) {
            return (<div />);
        }
        return (
            <div className='propertyField'>
                <label><b>Property Type</b></label>
                <select name='propertyType' onChange={this.handlePropertyTypeChange} value={this.props.propertyType}>
                    <option value='house'>house</option>
                    <option value='condo'>condo</option>
                    <option value='apartment'>apartment</option>
                    <option value='townhouse'>townhouse</option>
                </select><br />
                <label><b>ZipCode*</b></label>
                <input type='text' placeholder='Enter Zip Code' name='zipcode' value={this.props.zipcode} onChange={this.handleZipcodeChange} />
                <label><b>Address*</b></label>
                <input type='text' placeholder='Enter Address' name='location' value={this.props.address} onChange={this.handleAddressChange} />
                <label><b>Location*</b></label>
                <input type='text' placeholder='Enter Location' name='location' value={this.props.location} onChange={this.handleLocationChange} />
                <label><b>Price*</b></label>
                <input type='text' placeholder='Enter Price' name='price' value={this.props.price} onChange={this.handlePriceChange} />
                <label><b>Bed*</b></label>
                <input type='text' placeholder='Enter number of bed' name='bed' value={this.props.bed} onChange={this.handleBedChange} />
                <label><b>Bath*</b></label>
                <input type='text' placeholder='Enter number of bath' name='bath' value={this.props.bath} onChange={this.handleBathChange} />
                <label><b>sq.ft*</b></label>
                <input type='text' placeholder='Enter sq.ft' name='sqft' value={this.props.sqft} onChange={this.handleSqftChange} />
                <button onClick={this.handleDoPost}>Do Post</button>
                <button onClick={this.handleCancel}>Cancel</button>
                <br />
                <label className='errorMsg'><b>{this.state.errorMsg}</b></label>
            </div>);
    }
}
export default PropertyField;
