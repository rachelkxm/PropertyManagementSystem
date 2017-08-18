import React, { Component } from 'react';
class TableHeader extends Component {
    render () {
        let indicator = <div />;
        if (this.props.order === false) {
            indicator = <span className='caretup'><i className='fa fa-caret-up' /></span>;
        } else if (this.props.order === true) {
            indicator = <span className='caretdown'><i className='fa fa-caret-down' /></span>;
        }
        return (
            <tr>
                <th onClick={this.props.onHeaderClick}>Zip Code{indicator}</th>
                <th>Address</th>
                <th>Location</th>
                <th>Price</th>
                <th>Bed</th>
                <th>Bath</th>
                <th>sq.ft</th>
                <th>status</th>
                <th />
                <th />
            </tr>
        );
    }
}
export default TableHeader;
