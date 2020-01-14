import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery';
import EditUser from '../profile/EditUser';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '50%',
    height: '50%'
  },
});

export default class Example extends React.Component {
  
  render() {
      return (
        <div>
          <div className="App-header">
            MODIFICAR USUARIO
          </div>
        <div className="App-body">
            <div style={{ marginLeft: "100px", marginBottom: "70px"}}>
            <EditUser/>
            </div>
        </div>
        </div>
      );
    }
}