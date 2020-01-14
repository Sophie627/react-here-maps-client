import React, { Component } from 'react';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import Select from 'react-select';
import { Grid, Modal, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';
import Swal from 'sweetalert2'

//Redux
import { connect } from 'react-redux';
import { agregarPedido } from '../../actions/pedidosAction';
import { mostrarProductos } from '../../actions/productosAction';
import { mostrarCombos } from '../../actions/combosAction'

class MyVerticallyCenteredModal extends Component {

  constructor(...args) {
    super(...args);
  }

  direccionRef = React.createRef();
  departamentoRef = React.createRef();
  pisoRef = React.createRef();
  cpRef = React.createRef();


  render() {

    // console.log(this.props);
    // console.log(this)
    if(this.props.direcciones.length > 0){
      return (
        <Modal
          {...this.props}
          
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered="true"
          style={{marginTop: '100px'}}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Se encontraron las siguientes direcciones
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={this.crearDireccion} className="col-8">
          <Modal.Body>
            <div style={{margin: '50px'}}>
            {this.props.direcciones.map(direccion => (
              <React.Fragment key={direccion.id}>
                <h3>{direccion.Address}</h3>
                <Button
                    style={{marginTop: '20px'}}
                    className="btn btn-success"
                    variant="primary"
                    onClick={() => this.props.dire(direccion.id, direccion.Address, direccion.Client, direccion.LatLong)}
                    >
                    Elegir
                </Button>
              </React.Fragment>
            ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
          <Col xs={12} md={11}>
            <Button onClick={this.props.onHide}>Cerrar</Button>
          </Col>
          </Modal.Footer>
          </form>
        </Modal>
      );
    }else{
      if(this.props.redirect && this.props.redirect === true)
      // return <Redirect to='/clientes' />
      console.log(this.props.redirect)
      return null;
    }
  }
}

class NuevoPedido extends Component {

    constructor(...args) {
    super(...args);

    this.state = {
        selectedComboOption : null,
        optionsComboName : [],
        selectedProductsOption : null,
        optionsProductsName : [],
        optionsProductsCount : [],
        optionsCombosCount : [],
        modalShow: false,
        telefonoClient : '',
        correctSearchPhone : false,
        direcciones : [],
        direElegida : [],
        totalPrice : '',
        combosToUpdate : [],
        productsToUpdate : []
    }
    }

    searchClient = React.createRef();
    

    componentDidMount(){

        // this.setState({
        //     selectedProductsOption : this.state.optionsProductsName,
        //     selectedComboOption : this.state.optionsComboName
        //   })
  
          
          {this.props.location.state.ProductosPorPedido.map(producto => (
              console.log(producto),
              this.state.productsToUpdate.push({Product: producto.Product.id, Count: producto.Count})
          ))}
  
          console.log(typeof(this.state.productsToUpdate))

          
          
  
          if(this.state.productsToUpdate === undefined){
              return null;
          }else{
          //Revaluo el indice de los elementos dentro del objeto
          this.state.productsToUpdate = Object.entries(this.state.productsToUpdate).reduce((s, [_, v]) => (s[v.Product] = v, s), {});
        }
  
    }

    handleComboChange = selectedComboOption => {
        this.setState(
          { selectedComboOption },
          () => console.log(`Option selected:`, this.state.selectedComboOption)
        );
    };

    handleProductsChange = selectedProductsOption => {
        this.setState(
          { selectedProductsOption },
          () => console.log(`Option selected:`, this.state.selectedProductsOption)
        );
    };

    handleSearchClient = e => {
      this.setState({
        telefonoClient : this.searchClient.current.value
      })
    }

    componentWillMount(){
      
      this.props.mostrarProductos();
      this.props.mostrarCombos();
      this.state.selectedProductsOption = [];
      {this.props.location.state.ProductosPorPedido.map(producto => (
        this.state.selectedProductsOption.push({value: producto.id,label: producto.Product.Name + " " + producto.Product.Description,count: producto.Count})
      ))}
      
      this.state.selectedComboOption = [];
      {this.props.location.state.CombosPorPedido.map(producto => (
        this.state.selectedComboOption.push({value: producto.id,label: producto.Offer.Name ,count: producto.Count})
      ))}

    }

    componentDidUpdate(){
      // console.log(this.props)
        this.reorganizarProductos();
        this.reorganizarCombos();
    }

    reorganizarProductos = () => {
        // console.log(this.props)
      if (this.state.optionsProductsName.length == this.props.productos.length) return null;
      {
        this.props.productos.map(producto => (
          this.state.optionsProductsName.push({ value: producto.id, label: producto.Name + " " + producto.Description, price: parseInt(producto.Amount) })
        ))
      }
    }

    reorganizarCombos = () => {
        if(this.state.optionsComboName.length == this.props.combos.length) return null;
        {this.props.combos.map(combo => (
            this.state.optionsComboName.push({value: combo.id,label: combo.Name, price: combo.Amount})
        ))}
    }

    commonChange = (event) => {

      // console.log(this.state.optionsProductsName)
      // console.log(event.target.value);

        this.setState({
            optionsProductsCount : {
                ...this.state.optionsProductsCount,
                [event.target.name]: {
                   Product :  parseInt(event.target.name),
                   Count : parseInt(event.target.value),
                }
            },
          //   totalPrice : {
              
          // }
        })
    }

    commonChangeCombo = (event) => {
        this.setState({
            optionsCombosCount : {
                ...this.state.optionsCombosCount,
                [event.target.name]: {
                   Offer :  parseInt(event.target.name),
                   Count : parseInt(event.target.value)
                }
            }
        })
    }

    mostrarProductosListos = () => {
        if(this.state.selectedProductsOption == null || this.state.selectedProductsOption === null) return null;
        // console.log(this.state.selectedProductsOption);
        return (
            <div className="form-group">
                <label>Coloque una cantidad para cada producto</label>
                <div center="true" align="center">

                {this.state.selectedProductsOption.map(product => (
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
                                    defaultValue={product.count}
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


    mostrarCombosListos = () => {
      if(this.state.selectedComboOption == null || this.state.selectedComboOption === null) return null;
      // console.log(this.state.selectedProductsOption);
      return (
          <div className="form-group">
              <label>Coloque una cantidad para cada producto</label>
              <div center="true" align="center">

              {this.state.selectedComboOption.map(product => (
                  <div className="form-group" key={product.value}>
                      <Grid style={{marginTop:'20px'}}>
                      <Row className="show-grid">
                          <Col xs={8} md={3}>
                              <p>{product.label}</p>
                          </Col>
                          <Col xs={4} md={2}>
                              <input 
                                  onChange={this.commonChangeCombo}
                                  defaultValue={product.count}
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

    generarPedido = (e) => {
        e.preventDefault();

        let idProductos = []

        if(this.state.direElegida.length === 0){
          Swal.fire({
              title: 'Error!',
              text: 'Debe elegir una direccion',
              type: 'error',
              confirmButtonText: 'Reintentar'
          })
          return;
        }

        // var proddd = {};
        

        /*-----------------------Productos---------------------*/

        if(this.state.selectedProductsOption !== null){
          var dictProduct = {};
          for (var i=0; i<this.state.selectedProductsOption.length; i++){
            dictProduct[this.state.selectedProductsOption[i]['value']] = this.state.selectedProductsOption[i];
          }

          

          // Comparo el selectedProductsOption con el optionsProductsCount para eliminar los productos deseleccionados

          const o = Object.entries(this.state.optionsProductsCount).reduce((s, [k, v]) =>
              k in dictProduct ? (s[k] = v, s) : s, []);

          // console.log(o);

          let price = [];

          for (var i=0; i<this.state.selectedProductsOption.length; i++){
            price[this.state.selectedProductsOption[i]['value']] = { "value": this.state.selectedProductsOption[i]['value'], "price": this.state.selectedProductsOption[i]['price'] };
          }

          //Elimino los elementos nullos
          var productFiltered = o.filter( el => {
              return el != null;
          });


          let priceNew = [];

          for (var i=0; i<productFiltered.length; i++){
            priceNew[this.state.selectedProductsOption[i]['value']] = { "value": productFiltered[i]['Product'], "count": productFiltered[i]['Count'] };
          }

          var priceProd = []

          {price.map(price => {
              priceProd.push(price.price);
          })}

          var countProd = []

          {priceNew.map(count => {
            countProd.push(count.count);
          })}

          var finalProd = (priceProd.reduce(function(r,a,i){return r+a*countProd[i]},0));

          this.setState({
            totalPrice : finalProd
          })

        }else{
          productFiltered = []
        }

        /*-----------------------Combos---------------------*/

        if(this.state.selectedComboOption !== null){
          var dictCombo = {};
          for (var i=0; i<this.state.selectedComboOption.length; i++){
            dictCombo[this.state.selectedComboOption[i]['value']] = this.state.selectedComboOption[i];
          }

          // Comparo el selectedProductsOption con el optionsProductsCount para eliminar los productos deseleccionados

          const p = Object.entries(this.state.optionsCombosCount).reduce((s, [k, v]) =>
              k in dictCombo ? (s[k] = v, s) : s, []);


          let priceCombo = [];

          for (var i=0; i<this.state.selectedComboOption.length; i++){
            priceCombo[this.state.selectedComboOption[i]['value']] = { "value": this.state.selectedComboOption[i]['value'], "price": this.state.selectedComboOption[i]['price'] };
          }

          //Elimino los elementos nullos
          var comboFiltered = p.filter( el => {
            return el != null;
          });


          let comboNew = [];

          for (var i=0; i<comboFiltered.length; i++){
            comboNew[this.state.selectedComboOption[i]['value']] = { "value": comboFiltered[i]['Offer'], "count": comboFiltered[i]['Count'] };
          }

          var combitoPrice = []

          {priceCombo.map(price => {
            combitoPrice.push(price.price);
          })}

          var countCombo = []

          {comboNew.map(count => {
            countCombo.push(count.count);
          })}

          var finalCombo = (combitoPrice.reduce(function(r,a,i){return r+a*countCombo[i]},0));

          var finalTotal = this.state.totalPrice + finalCombo

        }else{
          comboFiltered = []
        }

        const a = new Date();
        const fecha = a.toISOString().split('T')[0]

        const pedido = {
          date : fecha,
          user : this.props.auth.user.Id,
          amount : finalTotal,
          product : productFiltered,
          combo : comboFiltered,
          state : 1,
          client : this.state.direElegida.cliente.cliente,
          address : this.state.direElegida.id.id
        }

        this.props.agregarPedido(pedido);
    }

    buscarDireccion = () => {
      
      axios.get(`https://roraso.herokuapp.com/Client/Client?Phone=${this.state.telefonoClient}`,
      { headers: { 'access-token': localStorage.getItem('access-token')}})
      .then(res => {

          console.log(res.data);

          if(res.status === 200){
              if(res.data.Cliente && this.state.correctSearchPhone == false){
                this.setState({
                  correctSearchPhone : true
                })

                console.log("Encontre telefono")

                if (res.data.Cliente.id === this.state.clientId && res.data.Client.Adress.length === this.state.direcciones.length ){
                  
                  console.log("No repito direccion")
                  
                  return
                }else{

                  console.log("Guardo las direcciones")

                  {res.data.Cliente.Adress.map(direccion => (
                    
                    this.state.direcciones.push({id: direccion.id, LatLong: direccion.LatLong, Client: direccion.Client, Address : direccion.Adress + " " + direccion.Floor + " " + direccion.Department + " " + direccion.Cp})
                  ))}

                  this.setState({
                    modalShow : true,
                    correctSearchPhone : false
                  })
                }

                return;

              }else{
                
                console.log("No encontre el telefono")

                this.setState({
                  correctSearchPhone : false
                })
                Swal.fire({
                  title: 'Sin resultados',
                  text: "Quieres crear el cliente?",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si'
                }).then((result) => {
                  if (result.value) {
                    this.setState({
                      modalShow : true,
                      direcciones : [],
                      redirect : true,
                    })
                    window.location.href = "http://localhost:3000/clientes";
                  }
                })
                
                return;
              }
          }else{
              Swal.fire({
                  title: 'Error!',
                  text: 'Hubo un error, intentelo nuevamente mas tarde',
                  type: 'error',
                  confirmButtonText: 'Reintentar'
              })
              return;
          }
      })
      .catch(err => {

          if(err.response){
              
              if(err.response.status === 404){
                  Swal.fire({
                      title: 'Error!',
                      text: `${err.response.data}`,
                      type: 'error',
                      confirmButtonText: 'Reintentar'
                  })
                  return;
              }
              if(err.response.status === 401){
                  Swal.fire({
                      title: 'Error!',
                      text: `No posee los permisos necesarios`,
                      type: 'error',
                      confirmButtonText: 'Reintentar'
                  })
                  localStorage.removeItem("access-token");
                  setTimeout(function(){ 
                      return window.location.replace("/login");
                  }, 3000);
                  
              }
          }
      })

    }

    handleClick = (id, direccion, cliente, latlong) => {
      if(id && direccion){
        return (
          this.setState({
            direElegida : {id : {id}, direccion : {direccion}, cliente : {cliente}, latlong : {latlong}}
          })
        )
      }
      else{
        return(
        <div align="center" style={{marginBottom:"20px"}} className="form-group">
            <input value={this.state.direElegida.Address} type="text" className="form-control" />
        </div>
        )
      }
    }

    mostrarDireccion = () => {
      return (
        <div>
          <input disabled value={this.props.location.state.Adress} type="text" className="form-control" required />
        </div>
      );
    }

    render() {

      // console.log(this.props)
      // console.log(this.state.direElegida)
      console.log(this.props.combos)

        const { selectedComboOption, selectedProductsOption } = this.state;
        let modalClose = () => this.setState({ modalShow: false, direcciones: [] });
        
        return (
            
        <React.Fragment>
            <Header titulo = 'Alta de Pedidos'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.generarPedido} className="col-5">
                        <div className="form-group">
                            <label>Seleccione Combo</label>
                            <Select required
                                placeholder="Ingrese o Selecciones el Combo"
                                value={selectedComboOption}
                                onChange={this.handleComboChange}
                                options={this.state.optionsComboName}
                                isMulti
                                isSearchable
                            />
                        </div>
                        {this.mostrarCombosListos()}
                        <div className="form-group">
                            <label>Seleccione Productos</label>
                            <Select required
                                placeholder="Ingrese o Selecciones los Productos"
                                value={selectedProductsOption}
                                onChange={this.handleProductsChange}
                                options={this.state.optionsProductsName}
                                isMulti
                                isSearchable
                            />
                        </div>
                        {this.mostrarProductosListos()}
                        <div className="form-group">
                            <label>Buscar Cliente</label>
                            <input ref={this.searchClient} onChange={this.handleSearchClient} placeholder="Ingrese el Numero de Telefono Sin 0 y Sin 15" type="text" className="form-control" required/>
                            <div align="center">
                            <Button
                                style={{marginTop: '20px'}}
                                className="btn btn-success"
                                variant="primary"
                                onClick={() => this.buscarDireccion()}
                                >
                                Verificar
                            </Button>

                            <MyVerticallyCenteredModal
                              show={this.state.modalShow}
                              onHide={modalClose}
                              direcciones={this.state.direcciones}
                              dire={this.handleClick}
                            />
                            {/* {this.mostrarDatos()} */}

                            
                        </div>

                        <div style={{marginTop: '20px'}} className="form-group">
                          {this.mostrarDireccion()}
                        </div>

                        </div>
                        <div align="center" style={{marginBottom:"20px"}} className="form-group">
                            <label align="center">Coloque un numero de telefono y verifique su existencia</label>
                        </div>
                        <div align="center" className="form-group">
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
    productos : state.productos.productos,
    pedidos : state.pedidos.pedidos,
    auth: state.auth
});

export default connect(mapStateToProps, {mostrarCombos, mostrarProductos, agregarPedido})(NuevoPedido);