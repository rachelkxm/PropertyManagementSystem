import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import InventoryManagement from './InventoryManagement';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Property Inventory System</h2>
        </div>
        <InventoryManagement/>
      </div>
    );
  }
}
export default App;
