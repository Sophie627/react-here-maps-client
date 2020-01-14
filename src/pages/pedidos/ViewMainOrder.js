import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainOrder from './MainOrder';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '50%',
      height: '50%'
    },
  });
  
  export default class ViewMainOrder extends React.Component {
    
    render() {
        return (
          <div>
            <div className="App-header">
              PEDIDOS
            </div>
          <div className="App-body">
              <div style={{ height: "150%", width: "90%", marginTop: "-100px"}}>
              <MainOrder/>
              </div>
          </div>
          </div>
        );
      }
  }