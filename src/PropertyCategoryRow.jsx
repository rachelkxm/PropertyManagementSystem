import React, { Component } from 'react';
class PropertyCategoryRow extends Component {
  render() {
    return (<tr className="category"><th colSpan="10">{this.props.category}</th></tr>);
  }
}
export default PropertyCategoryRow;
