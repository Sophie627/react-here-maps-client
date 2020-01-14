import React from 'react';
import PropTypes from 'prop-types';
import UsersTable from './UsersTable';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '50%',
      height: '50%'
    },
  });
  
  export default class UsersTableView extends React.Component {
    
    render() {
        return (
          <div>
            <div className="App-header">
              Usuarios
            </div>
          <div className="App-body">
              <div style={{ height: "150%", width: "90%"}}>
              <UsersTable/>
              </div>
          </div>
          </div>
        );
      }
  }