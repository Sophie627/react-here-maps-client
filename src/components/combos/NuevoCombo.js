import React, { Component } from 'react';
import Select from 'react-select';
import { Grid, Row, Col } from 'react-bootstrap';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { agregarCombo } from '../../actions/combosAction';
import { mostrarProductos } from '../../actions/productosAction';

//CSS
import Swal from 'sweetalert2'
import '../../assets/css/empleados/form-alta-empleados.css';

class NuevoCombo extends Component {

    state = {
        currentUser : '',
        selectedOption : null,
        countSelected : null,
        optionsProductsName : [],
        optionsProductsCount : [],
        productoFinal : [],
    }

    nombreRef = React.createRef();
    descripcionRef = React.createRef();
    montoRef = React.createRef();
    comboRef = React.createRef();

    componentWillMount(){
        this.props.mostrarProductos();
    }

    handleChange = selectedOption => {
        this.setState(
          { selectedOption },
        //   () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    commonChange = (event) => {
        this.setState({
            optionsProductsCount : {
                ...this.state.optionsProductsCount,
                [event.target.name]: {
                   Product :  parseInt(event.target.name),
                   Count : parseInt(event.target.value)
                }
            }
        })
    }

    componentDidUpdate(){
        this.reorganizarProductos();
    }

    reorganizarProductos = () => {
        // console.log(this.props)

        if(this.state.optionsProductsName.length == this.props.productos.length) return null;
        {this.props.productos.map(producto => (
            this.state.optionsProductsName.push({value: producto.id,label: producto.Name + " " + producto.Description})
        ))}

        // console.log(this.state.optionsProductsName);
    }

    mostrarProductosListos = () => {
        if(this.state.selectedOption == null || this.state.selectedOption === null) return null;
        console.log(this.state.selectedOption);
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
                                <input 
                                    onChange={this.commonChange}
                                    name={product.value}
                                    style={{width: '60px'}} 
                                    type="number" min="1" step="1" title="Numbers only" 
                                    className="form-control" required/>
                            </Col>
                        </Row>
                        </Grid>
                    </div>
                ))}

                </div>
            </div>
        )
    }

    agregarCombo = (e) => {
        e.preventDefault();

        let idProductos = []
        let cantProductos = []

        if(this.state.selectedOption != null){

            this.state.selectedOption.map(idProd => (
                idProductos.push(idProd.value)
            ));

        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Faltan datos en el formulario',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }


        var dict = {};
        for (var i=0; i<this.state.selectedOption.length; i++){
            dict[this.state.selectedOption[i]['value']] = this.state.selectedOption[i];
        }

        // Comparo el SelectedOption con el optionsProductsCount para eliminar los productos deseleccionados

        const o = Object.entries(this.state.optionsProductsCount).reduce((s, [k, v]) =>
            k in dict ? (s[k] = v, s) : s, []);

        // console.log(o);

        // console.log(dict);
        // console.log(this.state.optionsProductsCount);

        // idProductos.map(prod => (
        //     idProductos.indexOf(prod)
        // ));

        let ProductosPorCombo = 
        Object.keys(this.state.optionsProductsCount).map(valores => (
            {
                Product : parseInt(valores),
                Count : parseInt(this.state.optionsProductsCount[valores])
            }
        ))

        //Elimino los indices nulos
        var filtered = o.filter( el => {
            return el != null;
        });
  
        // console.log(typeof(ProductosPorCombo));
        // console.log(typeof(filtered));

        // console.log((ProductosPorCombo));
        // console.log((filtered));

        const combo = {
            nombre : this.nombreRef.current.value,
            descripcion : this.descripcionRef.current.value,
            monto : this.montoRef.current.value,
            producto : filtered
        }

        this.props.agregarCombo(combo);
    }

    
    render() {
        const { selectedOption } = this.state;

        return (
            
        <React.Fragment>
            <Header titulo = 'Alta de Combo'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.agregarCombo} className="col-5">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input ref={this.nombreRef} type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Descripcion</label>
                            <input ref={this.descripcionRef} type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Monto</label>
                            <input ref={this.montoRef} type="number" min="1" step="1" title="Numbers only" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Seleccione los Productos</label>
                            <div center="true" align="center">
                            <Select required
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={this.state.optionsProductsName}
                                isMulti
                                isSearchable
                            />
                            </div>
                        </div>
                        {this.mostrarProductosListos()}
                        <div center="true" align="center" className="form-group">
                            <input type="submit" value="Enviar" className="btn btn-primary" required/>
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    combos : state.combos.combos,
    productos : state.productos.productos
});

export default connect(mapStateToProps, { mostrarProductos, agregarCombo })(NuevoCombo);