import React, { Component } from 'react';
import AddressItem from './AddressItem';


class AddressSuggest extends Component {
  render() {
    return (
        <AddressItem
          label="Direccion"
          value={this.props.query}
          onChange={this.props.onChange}
          placeholder="Escribe una direccion" />
    );
  }
}

export default AddressSuggest;
