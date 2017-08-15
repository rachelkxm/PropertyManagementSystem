import React, { Component } from 'react';
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
export default SearchBar;
