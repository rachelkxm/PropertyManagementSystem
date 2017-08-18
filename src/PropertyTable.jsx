import React, { Component } from 'react';
class PropertyCategoryRow extends Component {
  render() {
    return (<tr className="category"><th colSpan="10">{this.props.category}</th></tr>);
  }
}
class PropertyRow extends Component {
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
      this.props.onScheduleTour(this.props.property);
  }
  render() {
    let buttons='';
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
        <td>{this.props.property.sqft}</td>
        <td>{this.props.property.status}</td>
        {buttons}
      </tr>
    );
  }
}
class TableHeader extends Component {
  render(){
    let indicator = <div></div>
    if(this.props.order===false){
       indicator = <span className="caretup"><i className="fa fa-caret-up"></i></span>;
    }else if(this.props.order===true){
       indicator = <span className="caretdown"><i className="fa fa-caret-down"></i></span>;
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
class PropertyTable extends Component {
  constructor(props){
     super(props);
     this.sort = true;//true means ascending order, false means descending order
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
    //this.sortByZipcode();
  }
  sortByZipcode(){
    this.props.onSort('zipcode',this.sort);
    this.sort = !(this.sort);
  }
  render() {
    const rows = [];
    let lastCategory = null;
    //sort the property
    if(this.props.properties){
      this.sortByPropertyType();
      const filterText = this.props.filterText;
      this.props.properties.forEach((property) => {
        if (property.address.indexOf(filterText) === -1 && property.location.indexOf(filterText) === -1 && property.price.indexOf(filterText) === -1 &&
            property.bath.indexOf(filterText) === -1 && property.bed.indexOf(filterText) === -1 &&
            property.sqft.indexOf(filterText) === -1 && property.zipcode.indexOf(filterText) === -1) {
          return;
        }
        if(this.props.selected !== 'All' && property.status !== this.props.selected) return;
        if (property.category !== lastCategory) {
          rows.push(<PropertyCategoryRow category={property.category} key={property.category} />);
        }
        rows.push(<PropertyRow property={property}
                               currentUser={this.props.currentUser}
                               onEditButton={this.props.onEditButton}
                               onDeleteButton={this.props.onDeleteButton}
                               key={property.id}
                               onScheduleTour={this.props.onScheduleTour}/>);
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
