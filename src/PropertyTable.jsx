import React, { Component } from 'react';
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
    //sort the property
    if(this.props.properties && this.props.updateTable){
      this.props.properties.sort((property1, property2) => {
          if(property1.category < property2.category){
             return -1;
          }
          if(property1.category > property2.category){
             return 1;
          }
          return 0;
      });
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
    }
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
export default PropertyTable;
