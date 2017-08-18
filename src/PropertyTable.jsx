import React, { Component } from 'react';
import PropertyCategoryRow from './PropertyCategoryRow';
import PropertyRow from './PropertyRow';
import TableHeader from './TableHeader';

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
                               onScheduleTour={this.props.onScheduleTour}
                               onFavorite={this.props.onFavorite}/>);
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
