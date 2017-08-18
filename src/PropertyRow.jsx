import React, { Component } from 'react';
class PropertyRow extends Component {
  constructor(props){
     super(props);
     this.onEdit = this.onEdit.bind(this);
     this.onDelete = this.onDelete.bind(this);
     this.onFavorite = this.onFavorite.bind(this);
     this.onScheduleTour = this.onScheduleTour.bind(this);
     this.onFavorite = this.onFavorite.bind(this);
  }
  onEdit(){
     this.props.onEditButton(this.props.property);
  }
  onDelete(){
     this.props.onDeleteButton(this.props.property);
  }
  onScheduleTour(){
      this.props.onScheduleTour(this.props.property);
  }
  onFavorite(){
      this.props.onFavorite(this.props.property);
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
export default PropertyRow;
