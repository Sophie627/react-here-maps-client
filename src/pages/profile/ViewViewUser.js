import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery';
import ViewUser from '../profile/ViewUser';

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
            VISUALIZAR USUARIO
          </div>
        <div className="App-body">
            <div style={{ marginLeft: "100px", marginBottom: "70px"}}>
            <ViewUser/>
            </div>
        </div>
        </div>
      );
    }
}