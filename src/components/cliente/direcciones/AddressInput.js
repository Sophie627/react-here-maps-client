import React, { Component } from 'react';
import AddressItem from './AddressItem';

class AddressInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    depto : false
  }

  tipoDomicilioRef = React.createRef();
  pisoRef = React.createRef();
  deptoRef = React.createRef();

  handleChange(evt) {
    this.props.onChange(evt);
  }

  handleChangeDomicilio = () => {
    this.setState(prevState => ({
      depto: !prevState.depto,
    }));
  }

  handleChangePiso = () => {
    this.props.piso(this.pisoRef.current.value)
  }

  handleChangeDpto = () => {
    this.props.depto(this.deptoRef.current.value)
  }

  mostrarDatosDepto = () => {

    if(this.state.depto){
      return(
        <div>
          <div className="form-group">
              <label>Piso</label>
              <input onChange={this.handleChangePiso} ref={this.pisoRef} type="text" className="form-control"/>
          </div>
          <div className="form-group">
              <label>Departamento</label>
              <input onChange={this.handleChangeDpto} ref={this.deptoRef} type="text" className="form-control"/>
          </div>
        </div>
      )
    }else{
      return;
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <AddressItem label="Calle" id="street" value={this.props.street} onChange={this.handleChange} placeholder="" />
          <AddressItem label="Ciudad" id="city" value={this.props.city} onChange={this.handleChange} placeholder="" />
          <AddressItem label="Estado" id="state" value={this.props.state} onChange={this.handleChange} placeholder="" />
          <AddressItem label="Codigo Postal" id="postalCode" value={this.props.postalCode} onChange={this.handleChange} placeholder="" />
          {/* <AddressItem label="Country" id="country" value={this.props.country} onChange={this.handleChange} placeholder="" /> */}
          <input type="checkbox" name="tipo_domicilio" value={true} checked={this.state.depto} onChange={this.handleChangeDomicilio}/> Departamento?<br/>
          {this.mostrarDatosDepto()}
        </div>
      </div>
    );
  }
}

export default AddressInput;
