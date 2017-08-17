import React, { Component } from 'react';
class PropertyCategoryRow extends React.Component {
  render() {
    return (<tr className="category"><th colSpan="10">{this.props.category}</th></tr>);
  }
}
class PropertyRow extends React.Component {
  constructor(props){
     super(props);
     this.onEdit = this.onEdit.bind(this);
     this.onDelete = this.onDelete.bind(this);
     this.onFavorite = this.onFavorite.bind(this);
     this.onScheduleTour = this.onScheduleTour.bind(this);
  }
  onEdit(){
     this.props.onEditButton(this.props.property);
  }
  onDelete(){
     this.props.onDeleteButton(this.props.property);
  }
  onFavorite(){

  }
  onScheduleTour(){

  }
  render() {
    let buttons='';
    console.log(this.props.property.user);
    if(this.props.property.user === this.props.currentUser){
       buttons = (<td><button className="cellBtn" onClick={this.onEdit}>Edit</button>
       <button className="cellBtn" onClick={this.onDelete}>Delete</button></td>);
    }else{
       buttons = (<td><button className="cellBtn" onClick={this.onFavorite}>Favorite</button>
       <button className="cellBtn" onClick={this.onScheduleTour}>Schedule tour</button></td>);
    }
    return (
      <tr>
        <td>{this.props.property.zipcode}</td>
        <td>{this.props.property.address}</td>
        <td>{this.props.property.location}</td>
        <td>{this.props.property.price}</td>
        <td>{this.props.property.bed}</td>
        <td>{this.props.property.bath}</td>
        <td>{this.props.property.sqrt}</td>
        <td>{this.props.property.status}</td>
        {buttons}
      </tr>
    );
  }
}
class TableHeader extends React.Component {
  constructor(props){
     super(props);
     this.state = {show : 0};
  }
  render(){

    let indicator = <div></div>
    if(this.props.order===false){
       indicator = <span show={this.state.show} className="caretup"><i className="fa fa-caret-up"></i></span>;
    }else if(this.props.order===true){
       indicator = <span show={this.state.show} className="caretdown"><i className="fa fa-caret-down"></i></span>;
    }
    return(
      <tr>
      <th onClick={this.props.onHeaderClick}>Zip Code{indicator}</th>
      <th>Address</th>
      <th>Location</th>
      <th>Price</th>
      <th>Bed</th>
      <th>Bath</th>
      <th>sq.ft</th>
      <th>status</th>
      <th></th>
      <th></th>
      </tr>
    )
  }

}
class PropertyTable extends React.Component {
  constructor(props){
     super(props);
     //this.sort = true;//true means ascending order, false means descending order
     this.properties = this.props.properties;
     this.sortByPropertyType = this.sortByPropertyType.bind(this);
     this.sortByZipcode = this.sortByZipcode.bind(this);
  }
  sortByPropertyType(){
    this.props.properties.sort((property1, property2) => {
        if(property1.category < property2.category){
           return -1;
        }
        if(property1.category > property2.category){
           return 1;
        }
        return 0;
    });
  }
  sortByZipcode(){
    this.props.onSort('zipcode',this.sort);
    this.sort = !(this.sort);
  }
  render() {
    var rows = [];
    var lastCategory = null;
    //sort the property
    console.log(this.props.properties);
    if(this.props.properties){
      this.sortByPropertyType();
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
        rows.push(<PropertyRow property={property} currentUser={this.props.currentUser} onEditButton={this.props.onEditButton} onDeleteButton={this.props.onDeleteButton}/>);
        lastCategory = property.category;
      });

    }
    return (
      <table>
        <thead>
            <TableHeader properties={this.props.properties} onHeaderClick={this.sortByZipcode} order={this.sort}/>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
export default PropertyTable;
