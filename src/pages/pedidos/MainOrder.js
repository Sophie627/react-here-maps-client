import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteRounded';
import StylesMainOrder from '../../assets/css/Order/StylesMainOrder'

const styles = StylesMainOrder;

let id = 0;
function createData(name, status) {
  id += 1;
  return { id, name, status };
}

const rows = [
  createData('Pedido 1', 'Activo'),
  createData('Pedido 2', 'Entregado'),
  createData('Pedido 3', 'Finalizado'),
  createData('Pedido 4', 'Activo'),
  createData('Pedido 5', 'Finalizado'),
];

class MainOrder extends Component {
    constructor(props) {
      super(props);
      this.state = { };
    }
    render() {

      const { classes } = this.props;

      return (
        <div className={classes.root}>
        
        {/* <Grid container spacing={16}>

         <Grid item xs={3}>
              <Button variant="outlined" color="secondary" className={classes.button}>
                Nuevo Pedido
              </Button>
              
          </Grid>

          <Grid item xs={3}>
          </Grid>

          <Grid item xs={3}>
          </Grid>

          <Grid item xs={3}>
              <Button variant="outlined" color="primary" className={classes.button}>
                Asignar Delivery
              </Button>
          </Grid>

          <Grid item xs={1}>
        </Grid>

         <Grid item xs={6} sm container>
        <Paper className={classes.paper}>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                Standard license
              </Typography>
              <Typography gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
              <Typography color="textSecondary">ID: 1030114</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">$19.00</Typography>
          </Grid>
          </Paper>
          </Grid> */}

        <Grid item xs={10}>
          <Paper className={classes.paper}>

          <Grid container spacing={16}>
          <Grid item xs={3}>
              <Button variant="outlined" color="secondary" className={classes.button}>
                Nuevo Pedido
              </Button>
              
          </Grid>
          <Grid item xs={3}>
          </Grid>

          <Grid item xs={3}>
          </Grid>

          <Grid item xs={3}>
              <Button variant="outlined" color="primary" className={classes.button}>
                Asignar Delivery
              </Button>
          </Grid>
          </Grid>

          <Divider />
          <Grid container spacing={16} style={{ paddingTop: 30 }}>

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize: 15, height:"50"}}>Datos Pedido</TableCell>
                <TableCell></TableCell>
                <TableCell style={{fontSize: 15, height:"50"}}>Estado</TableCell>
                <TableCell></TableCell>
                <TableCell style={{fontSize: 15, height:"50", paddingLeft:230}}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {rows.map(row => {
                    return (
                      
                      <TableRow key={row.id}>
                        <TableCell style={{fontSize: 12}} component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell style={{fontSize: 12}}>{row.status}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                        <Button variant="contained" color="primary" className={classes.button}>
                          Borrar
                          <Icon className={classes.rightIcon}>delete</Icon>
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button}>
                          Editar
                          <Icon className={classes.rightIcon}>edit</Icon>
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button}>
                          Ver
                          <Icon className={classes.rightIcon}>visibility</Icon>
                        </Button>
                        </TableCell>
                      </TableRow>
                    );
            })}

            </TableBody>
          </Table>

          {/* Segundo Pedido */}

          {/* <Grid item xs={6}>
            <Typography gutterBottom variant="subtitle">Pedido Nº 2</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography gutterBottom variant="subtitle1">Entregado</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography variant="subtitle1">O</Typography>
          </Grid>
          <Grid item xs={1}>
          <Typography variant="subtitle1">O</Typography>
          </Grid> */}

        </Grid>

          </Paper>


        </Grid>

      </div>
       );
    }
  }

  MainOrder.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(MainOrder);