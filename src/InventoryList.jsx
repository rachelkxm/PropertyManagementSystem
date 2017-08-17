import React, { Component } from 'react';
import {topics} from './constants';
import {postProperty, updateProperty, getTopics} from './serviceCalls';
import PropertyField from './PropertyField';
import PropertyTable from './PropertyTable';
import SearchBar from './SearchBar';
import './Inventory.css';
class AddButton extends Component {
    render(){
        return(
           <button className="addBtn" onClick={this.props.onAddButton}>Post a new Property</button>
        );
    }
}
class InventoryList extends Component{
    constructor(props) {
      super(props);

      this.properties = [];
      this.state = {
          filterText : '',
          selectAll : true,
          selectOnSale : false,
          selectPending : false,
          selectSold : false,
          selected :'All',
          showField : false,
          propertyType : 'house',
          listingStatus : 'On Sale',
          zipcode : '',
          address : '',
          location : '',
          price : '',
          bed : '',
          bath : '',
          sqft : '',
          propertyUpdate : false,
          propertyDelete : false,
          propertyLoaded : false,
          sort : false,
          mode : 'post', //edit or post
          id : ''
      }
      this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
      this.handleSelectStatusChange = this.handleSelectStatusChange.bind(this);
      this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
      this.handlePropertyTypeChange = this.handlePropertyTypeChange.bind(this);
      //this.handleListingStatusChange = this.handleListingStatusChange.bind(this);
      this.handleZipcodeInput = this.handleZipcodeInput.bind(this);
      this.handleAddressInput = this.handleAddressInput.bind(this);
      this.handleLocationInput = this.handleLocationInput.bind(this);
      this.handlePriceInput = this.handlePriceInput.bind(this);
      this.handleBedInput = this.handleBedInput.bind(this);
      this.handleBathInput = this.handleBathInput.bind(this);
      this.handleSqftInput = this.handleSqftInput.bind(this);
      this.handleDoPost = this.handleDoPost.bind(this);
      this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
      this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleSort = this.handleSort.bind(this);
      this.sortByZipcode = this.sortByZipcode.bind(this);
    }
    sortByZipcode(order){
      if(order){
        this.properties.sort((property1, property2) => {
            if(property1.zipcode < property2.zipcode){
               return -1;
            }
            if(property1.zipcode > property2.zipcode){
               return 1;
            }
            return 0;
        });
      }else{
        this.properties.sort((property1, property2) => {
            if(property1.zipcode < property2.zipcode){
               return 1;
            }
            if(property1.zipcode > property2.zipcode){
               return -1;
            }
            return 0;
        });
      }
    }
    handleSort(byItem, order){
       if(byItem==='zipcode'){
           this.sortByZipcode(order);
       }
       this.setState((preState)=>({sort : !preState.sort}));
    }
    handleAddButtonClick(){
        this.setState({
           'zipcode' : '',
           'address' : '',
           'location' : '',
           'price' : '',
           'bed' : '',
           'bath' : '',
           'sqft' : ''
        });
       this.setState({showField : true, mode : 'post'});
    }
    handleCancel(){
        this.setState((preState)=>({showField : !preState.showField}));
    }
    handleEditButtonClick({zipcode, address, location,price, bed, bath, sqft, status,id}){
        this.setState({
           'zipcode' : zipcode,
           'address' : address,
           'location' : location,
           'price' : price,
           'bed' : bed,
           'bath' : bath,
           'sqft' : sqft,
           'id' : id
        });
        this.setState({showField : true, mode : 'edit'});
    }
    handleDeleteButtonClick(property){
         this.properties.forEach((item,index) =>{
             if(item.address === property.address){
                 this.properties.splice(index, 1);
             }
         });
         updateProperty({'topic' : topics[0], 'properties' : this.properties, 'token' : this.props.token});
         this.setState({propertyDelete : true});
    }
    handleFilterInputChange(filterText){
       this.setState({
          filterText : filterText
       });
    }
    handleSelectStatusChange(radioSelection){
       let selectedStatus = 'All';
       if(radioSelection.value === 'onsale'){
           selectedStatus = 'On Sale';
       }else if(radioSelection.value === 'pending'){
           selectedStatus = 'Pending';
       }else if(radioSelection.value === 'sold'){
           selectedStatus = 'Sold';
       }
       this.setState({
          selected : selectedStatus
       });
    }
    handlePropertyTypeChange(propertyType){
       this.setState({propertyType : propertyType});
    }
    /*handleListingStatusChange(listingStatus){

      if(listingStatus === 'onsale'){
          this.setState({onsale: true, pending: false, sold : false, outofmarket : false});
          this.setState({listingStatus : 'On Sale'});
      }else if(listingStatus === 'pending'){
          this.setState({onsale: false, pending: true, sold : false, outofmarket : false});
          this.setState({listingStatus : 'Pending'});
      }else if(listingStatus === 'sold'){
         this.setState({onsale: false, pending: false, sold : true, outofmarket : false});
         this.setState({listingStatus : 'Sold'});
      }else if(listingStatus === 'outofmarket'){
         this.setState({onsale: false, pending: false, sold : false, outofmarket : true});
         this.setState({listingStatus : 'Out of Market'});
      }
    }*/
    handleZipcodeInput(zipcode){
       this.setState({zipcode : zipcode});
    }
    handleAddressInput(adress){
       this.setState({address : adress});
    }
    handleLocationInput(location){
       this.setState({location : location});
    }
    handlePriceInput(price){
       this.setState({price : price});
    }
    handleBedInput(bed){
       this.setState({bed : bed});
    }
    handleBathInput(bath){
       this.setState({bath : bath});
    }
    handleSqftInput(sqft){
       this.setState({sqft : sqft});
    }
    handleDoPost(){
      if(this.state.mode === 'post'){
        this.properties.push({ zipcode : this.state.zipcode,
                               address : this.state.address,
                               location : this.state.location,
                               price : this.state.price,
                               bed : this.state.bed,
                               bath : this.state.bath,
                               sqft : this.state.sqft,
                               status : this.state.listingStatus,
                               category : this.state.propertyType,
                               user : this.props.userName,
                               id : this.properties.length+1
                               });
      }else{
         for(let item of this.properties){
           if(item.id === this.state.id){
              item.zipcode = this.state.zipcode;
              item.address = this.state.address;
              item.location = this.state.location;
              item.price = this.state.price;
              item.bed = this.state.bed;
              item.bath = this.state.bath;
              item.sqft = this.state.sqft;
              item.status = this.state.listingStatus;
              item.category = this.state.propertyType;
              break;
           }
         }
      }
       getTopics(this.props.token)
       .then((response) => {
           if(response.topics.indexOf(topics[0])!== -1){
              updateProperty({'topic' : topics[0], 'properties' : this.properties, 'token' : this.props.token});
           }else{
              postProperty({'topic' : topics[0], 'properties' : this.properties, 'token' : this.props.token});
           }
       })
       .catch((error)=>{
          console.log(error);
       });
       this.setState({propertyUpdate : true});
       this.setState({
          'propertyType' : 'house',
          'zipcode' : '',
          'address' : '',
          'location' : '',
          'price' : '',
          'bed' : '',
          'bath' : '',
          'sqft' : ''
       });
    }
    render(){
      if(!this.props.isLogin){ return(
         <div></div>
       );}
       this.properties = this.props.properties;
       /*getProperties({'topic' : topics[0], 'token' : this.props.token})
       .then((response)=>{
          this.properties = response.details;
          if(!this.state.propertyLoaded){
             this.setState({propertyLoaded : true});
          }
       })
       .catch((error)=>console.warn(error));
*/
       return( <div>
                   <SearchBar filterText={this.state.filterText} onFilterInputChange={this.handleFilterInputChange} onSelectStatusChange={this.handleSelectStatusChange}/>
                   <PropertyTable updateTable={this.state.propertyLoaded || this.state.propertyUpdate ||this.state.propertyDelete}
                                  filterText={this.state.filterText}
                                  selected={this.state.selected}
                                  properties={this.properties}
                                  currentUser={this.props.userName}
                                  sort={this.state.sort}
                                  onEditButton={this.handleEditButtonClick}
                                  onDeleteButton={this.handleDeleteButtonClick}
                                  onSort={this.handleSort}/>;
                   <AddButton onAddButton={this.handleAddButtonClick}/>
                   <PropertyField showField={this.state.showField}
                                  propertyType={this.state.propertyType}
                                  zipcode={this.state.zipcode}
                                  address={this.state.address}
                                  location={this.state.location}
                                  price={this.state.price}
                                  bed={this.state.bed}
                                  bath={this.state.bath}
                                  sqft={this.state.sqft}
                                  onPropertyTypeChange={this.handlePropertyTypeChange}
                                  onZipcodeChange={this.handleZipcodeInput}
                                  onAddressChange={this.handleAddressInput}
                                  onLocationChange={this.handleLocationInput}
                                  onPriceChange={this.handlePriceInput}
                                  onBedChange={this.handleBedInput}
                                  onBathChange={this.handleBathInput}
                                  onSqftChange={this.handleSqftInput}
                                  onDoPost={this.handleDoPost}
                                  onCancel={this.handleCancel}
                                  />
                </div>
        );
    }
}
export default InventoryList;
