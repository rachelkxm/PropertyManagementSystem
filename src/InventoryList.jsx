import React, { Component } from 'react';
import './Inventory.css';
class PropertyCategoryRow extends React.Component {
  render() {
    return (<tr className="category"><th colSpan="10">{this.props.category}</th></tr>);
  }
}
class PropertyRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.property.zipCode}</td>
        <td>{this.props.property.address}</td>
        <td>{this.props.property.location}</td>
        <td>{this.props.property.price}</td>
        <td>{this.props.property.bed}</td>
        <td>{this.props.property.bath}</td>
        <td>{this.props.property.sqrt}</td>
        <td>{this.props.property.status}</td>
        <td>{this.props.property.edit}</td>
        <td>{this.props.property.delete}</td>
      </tr>
    );
  }
}
class PropertyTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.properties.forEach((property) => {
      if (property.location.indexOf(this.props.filterText) === -1 && property.price.indexOf(this.props.filterText) === -1 &&
          property.bath.indexOf(this.props.filterText) === -1 && property.bed.indexOf(this.props.filterText) === -1 &&
          property.sqrt.indexOf(this.props.filterText) === -1 && property.zipCode.indexOf(this.props.filterText) === -1) {
        return;
      }
      if(this.props.selected !== 'All' && property.status !== this.props.selected) return;
      if (property.category !== lastCategory) {
        rows.push(<PropertyCategoryRow category={property.category} key={property.category} />);
      }
      rows.push(<PropertyRow property={property} key={property.address} />);
      lastCategory = property.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Zip Code</th>
            <th>Address</th>
            <th>Location</th>
            <th>Price</th>
            <th>Bed</th>
            <th>Bath</th>
            <th>sq.ft</th>
            <th>status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterInputChange(e.target.value);
  }

  handleSelectChange(e) {
    this.props.onSelectStatusChange(e.target);
  }

  render() {
    return (
      <form className="searchbar">
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input type="radio" name="status" value="all" checked={this.props.selectAll} onClick={this.handleSelectChange}/>All
          <input type="radio" name="status" value="onsale" checked={this.props.selectOnSale} onClick={this.handleSelectChange}/>On Sale
          <input type="radio" name="status" value="pending" checked={this.props.selectPending} onClick={this.handleSelectChange}/>Pending
          <input type="radio" name="status" value="sold" checked={this.props.selectSold} onClick={this.handleSelectChange}/>Sold
        </p>
      </form>
    );
  }
}
class AddButton extends React.Component {
    render(){
        return(
           <button className="addBtn">Post a new Property</button>
        );
    }
}
class InventoryList extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          filterText : '',
          selectAll : true,
          selectOnSale : false,
          selectPending : false,
          selectSold : false,
          selected :'All'
      }
      this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
      this.handleSelectStatusChange = this.handleSelectStatusChange.bind(this);
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
    render(){
      //fetch()
      const properties = [
        {zipCode: '98109', address:'906 Dexter Ave', location:'Seattle',price:'500,000', bed:'2',bath:'2',sqrt:'1500', status:'On Sale',category:'house'},
        {zipCode: '98109', address:'910 Dexter Ave', location:'Queen',price:'500,000', bed:'1',bath:'2',sqrt:'1000', status:'Pending',category:'house'},
        {zipCode: '98109', address:'907 Dexter Ave', location:'North Gate',price:'500,000', bed:'2',bath:'2',sqrt:'1500', status:'Sold',category:'apartment'},
        {zipCode: '98109', address:'908 Dexter Ave', location:'Seattle',price:'500,000', bed:'3',bath:'2',sqrt:'2500', status:'Pending',category:'condo'},
        {zipCode: '98109', address:'909 Dexter Ave', location:'Seattle',price:'500,000', bed:'2',bath:'2',sqrt:'3500', status:'On Sale',category:'townhouse'}

      ];
      properties.forEach(function(property){
          property.edit = <button className="cellBtn">Edit</button>
          property.delete = <button className="cellBtn">Delete</button>
      });
      let output = <div></div>;
      if(this.props.isLogin){
         output = <div>
                     <SearchBar filterText={this.state.filterText} onFilterInputChange={this.handleFilterInputChange} onSelectStatusChange={this.handleSelectStatusChange}/>
                     <PropertyTable filterText={this.state.filterText} selected={this.state.selected} properties={properties}/>;
                     <AddButton/>
                  </div>
      }
       return(
         <div>{output}</div>
       );
    }
}
export default InventoryList;
