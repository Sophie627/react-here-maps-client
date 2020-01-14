import React, {Component} from 'react';
import axios from 'axios';
import {Button,FormGroup,FormControl,ControlLabe,Glyphicon} from 'react-bootstrap';
import StylesLoginForm from '../../assets/css/Login/StylesLoginForm';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const queryString = require('query-string');

const styles = StylesLoginForm;
class AddressUser extends Component {
    constructor(props, context) {
        const Parametros = queryString.parse(window.location.search);
        super(props, context);
        this.state = {
            Adress:props.address
          };
    }
    listAddress(){
        alert (JSON.stringify(this.props.address))
        const { classes } = this.props;
        const listAddres = this.props.address.map((direccion) =>
      <TableRow key={direccion.id}>
        <TableCell component="th" scope="row">
          {direccion.Adress}
        </TableCell>
        <TableCell >{direccion.Department}</TableCell>
        <TableCell >{direccion.Floor}</TableCell>
        <TableCell >{direccion.Cp}</TableCell>
        <TableCell>
          <Button style={{marginRight: 20}} onClick={() => this.addressDelete(direccion.id)}><Glyphicon glyph="glyphicon glyphicon-trash" /></Button>
          <Link to={'/edit-adress?id='+ direccion.id}><Button><Glyphicon glyph="glyphicon glyphicon-pencil" /></Button></Link>
        </TableCell>
      </TableRow>
        )
        return(
           
            <Paper className={classes.paper}>
            <Typography variant="h3" component="h3">
                 Domicilios
            </Typography>
<Table >
              <TableHead>
                <TableRow>
                  <TableCell>Domicilio </TableCell>
                  <TableCell >Departamento</TableCell>
                  <TableCell >Piso</TableCell>
                  <TableCell >Codigo Postal</TableCell>
                  <TableCell >Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {listAddres}
              </TableBody>
            </Table>
            {this.buttonAdd()}
</Paper>
        )
        
    }

    content(){
        if(this.props.address){
           return( this.listAddress() )
        }
            return(this.buttonAdd())
        
    }

    buttonAdd(){
        return(
            <Fab color="primary" aria-label="Add" >
        <AddIcon />
      </Fab>
        )
    }

    render() {

        return (
            this.content()
        )
    }
}

AddressUser.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddressUser);