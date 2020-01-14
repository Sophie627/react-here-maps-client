import React, { Component } from 'react';
import Select from 'react-select';
// import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { mostrarProductos } from '../../actions/productosAction';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

class ComboIndividual extends Component {

    state = {
        currentUser : '',
        currentSelects : 3,
        selectedOption : null,
        optionsProductsName : [],
        optionsProductsCount : []
    }

    componentDidMount(){
      this.setState({
        selectedOption : this.state.optionsProductsName
      })

    //   console.log(this.props.location.state);

      console.log(this.props.location.state.ProductosPorCombo);
    }

    componentWillMount(){
    console.log(this.props.location.state.ProductosPorCombo)
      {this.props.location.state.ProductosPorCombo.map(producto => (
        // console.log(producto),
        // producto.Product.map(prod => (
            // console.log(producto)
            this.state.optionsProductsName.push({value: producto.Product.id,label: producto.Product.Name + " " + producto.Product.Description,count: producto.Count})
        // ))
        //   this.state.optionsProductsName.push({value: producto.Product,label: producto.Product,count: producto.Count})
      ))}
      
    //   this.props.mostrarProductos();
    }

    mostrarProductosListos = () => {
        if(this.state.selectedOption == null || this.state.selectedOption === null) return null;
        // console.log(this.state.selectedOption);
        // console.log(this.props)
        return (
            <div className="form-group">
                <label>Coloque una cantidad para cada producto</label>
                <div center="true" align="center">

                {this.state.selectedOption.map(product => (
                    <div className="form-group" key={product.value}>
                        <Grid style={{marginTop:'20px'}}>
                        <Row className="show-grid">
                            <Col xs={8} md={3}>
                                <p>{product.label}</p>
                            </Col>
                            <Col xs={4} md={2}>
                                <input disabled defaultValue={product.count} style={{width: '60px'}} type="number" min="1" step="1" title="Numbers only" className="form-control" required/>
                            </Col>
                        </Row>
                        </Grid>
                    </div>
                ))}

                </div>
            </div>
        )
    }

    
    render() {
        const { selectedOption } = this.state;

        return (
            
        <React.Fragment>
            <Header titulo = 'Ver Combo'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form className="col-5">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input disabled type="text" defaultValue={this.props.location.state.Name} className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Descripcion</label>
                            <input disabled type="text" defaultValue={this.props.location.state.Description} className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Monto</label>
                            <input disabled type="number" defaultValue={this.props.location.state.Amount} min="1" step="1" title="Numbers only" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Seleccione los Productos</label>
                            <div center="true" align="center">
                            <Select 
                                isDisabled
                                value={selectedOption}
                                options={this.state.optionsProductsName}
                                isMulti
                                isSearchable
                            />
                            </div>
                        </div>
                        {this.mostrarProductosListos()}
                    </form>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    productos : state.productos.productos
});

export default connect(mapStateToProps, { mostrarProductos })(ComboIndividual);