import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { editarCombo } from '../../actions/combosAction';
import { mostrarProductos } from '../../actions/productosAction';

//CSS
import Swal from 'sweetalert2'
import '../../assets/css/empleados/form-alta-empleados.css';

class EditarCombo extends Component {

    state = {
        currentUser : '',
        selectedOption : [],
        optionsProductsName : [],
        optionsProductsCount : [],
        productsToUpdate : [],
        indexProductsToUpdate : [],
    }

    nombreRef = React.createRef();
    descripcionRef = React.createRef();
    montoRef = React.createRef();
    comboRef = React.createRef();



    componentWillMount(){
        
        // console.log("ComponentWillMount")
        {this.props.location.state.ProductosPorCombo.map(producto => (
            // console.log(producto),
            // producto.Product.map(prod => (
                // console.log(producto),
                this.state.optionsProductsName.push({value: producto.Product.id,label: producto.Product.Name + " " + producto.Product.Description,count: producto.Count}),
                // this.state.optionsProductsName.push({value: prod.id,label: prod.Name + " " + prod.Description,count: producto.Count})
                // this.state.productsToUpdate.push({Product: prod.id, Count: producto.Count}),
                this.state.selectedOption.push({value: producto.Product.id,label: producto.Product.Name + " " + producto.Product.Description,count: producto.Count})
            // ))
            //   this.state.optionsProductsName.push({value: producto.Product,label: producto.Product,count: producto.Count})
        ))}
        
        this.state.optionsProductsName = this.state.optionsProductsName.filter((product, index, self) =>
            index === self.findIndex((t) => (
                t.value === product.value && t.label === product.label
            ))
        )

        this.props.mostrarProductos();
    }

    componentDidMount(){
        this.setState({
          selectedOption : this.state.optionsProductsName
        })

        
    //     {this.props.location.state.ProductosPorCombo.map(producto => (
    //         console.log(producto),
    //         // producto.Product.map(prod => (
    //             // console.log(producto),
    //             // this.state.productsToUpdate.push({Product: prod.id, Count: producto.Count})
    //             this.state.optionsProductsName.push({Product: producto.Product.id,Count: producto.Count})
    //         // ))
    //     ))}

    //     // console.log(typeof(this.state.productsToUpdate))

    //     //Revaluo el indice de los elementos dentro del objeto
        this.state.productsToUpdate = Object.entries(this.state.productsToUpdate).reduce((s, [_, v]) => (s[v.Product] = v, s), {});

    //         // console.log(this.state.productsToUpdate);
    }

    handleChange = selectedOption => {
        this.setState(
          { selectedOption },
          () => console.log(`Option selected:`, this.state.selectedOption)
        );
        // console.log("handleChange")
    };

    commonChange = (event) => {
        

        // console.log("commonChange")

        this.setState({
            productsToUpdate : {
                ...this.state.productsToUpdate,
                [event.target.name]: {
                   Product :  parseInt(event.target.name),
                   Count : parseInt(event.target.value)
                }
            },
            optionsProductsCount : {
                ...this.state.optionsProductsCount,
                [event.target.name]: {
                   Product :  parseInt(event.target.name),
                   Count : parseInt(event.target.value)
                }
            }
        })


        console.log(this.state.productsToUpdate)

        this.state.optionsProductsName = this.state.optionsProductsName.filter((product, index, self) =>
            index === self.findIndex((t) => (
                t.value === product.value && t.label === product.label
            ))
        )

    }

    componentDidUpdate(){
        // console.log("componentDidUpdate")
        this.reorganizarProductos();
    }

    reorganizarProductos = () => {

        // console.log("reorganizarProductos")

        // console.log(this.state.productsToUpdate)

        this.state.optionsProductsName = this.state.optionsProductsName.filter((product, index, self) =>
            index === self.findIndex((t) => (
                t.value === product.value && t.label === product.label
            ))
        )

        if(this.state.optionsProductsName.length == this.props.productos.length) return null;
        {this.props.productos.map(producto => (
            this.state.optionsProductsName.push({value: producto.id,label: producto.Name + " " + producto.Description})
        ))}

        this.state.optionsProductsName = this.state.optionsProductsName.filter((product, index, self) =>
            index === self.findIndex((t) => (
                t.value === product.value && t.label === product.label
            ))
        )


        

    }

    mostrarProductosListos = () => {

        if(this.state.selectedOption == null || this.state.selectedOption === null) return null;

        // console.log(this.state.selectedOption)
        // console.log("mostrarProductos")

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
                                <input style={{width: '60px'}}
                                onChange={this.commonChange}
                                name={product.value}
                                defaultValue={product.count}
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

    editarCombo = (e) => {
        e.preventDefault();

        let idProductos = []

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

        this.state.indexProductsToUpdate = Object.entries(this.state.selectedOption).reduce((s, [_, v]) => (s[v.value] = v, s), {});

        console.log(this.state.indexProductsToUpdate)

        var dict = {};
        for (var i=0; i<this.state.selectedOption.length; i++){
            dict[this.state.selectedOption[i]['value']] = this.state.selectedOption[i];
        }


        console.log(this.state.selectedOption)

        // Comparo el SelectedOption con el optionsProductsCount para eliminar los productos deseleccionados


        console.log(this.state.productsToUpdate)

        const o = Object.entries(this.state.productsToUpdate).reduce((s, [k, v]) =>
            k in dict ? (s[k] = v, s) : s, []);


        console.log(o)


        var filtered = o.filter( el => {
            return el != null;
        });




        console.log(this.props)

        const combo = {
            id : this.props.location.state.id,
            nombre : this.nombreRef.current.value,
            descripcion : this.descripcionRef.current.value,
            monto : this.montoRef.current.value,
            productos : filtered
        }

        console.log(combo)

        // this.props.editarCombo(combo);
    }

    
    render() {
        const { selectedOption } = this.state;

        return (
            
        <React.Fragment>
            <Header titulo = 'Editar Combo'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.editarCombo} className="col-5">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input ref={this.nombreRef} type="text" defaultValue={this.props.location.state.Name} className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Descripcion</label>
                            <input ref={this.descripcionRef} type="text" defaultValue={this.props.location.state.Description} className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Monto</label>
                            <input ref={this.montoRef} type="number" defaultValue={this.props.location.state.Amount} min="1" step="1" title="Numbers only" className="form-control" required/>
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

export default connect(mapStateToProps, { mostrarProductos, editarCombo })(EditarCombo);