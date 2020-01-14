import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery'; 

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '50%',
    height: '50%'
  },
});

// function PaperSheet(props) {
//   const { classes } = props;

//   return (
//     <div>
//         <div className="App-header">
//           PEDIDOS
//         </div>
//         <div className="App-body">
//           <Paper className={classes.root} elevation={1}>
//             <Typography variant="h5" component="h3">
//               This is a sheet of paper.
//             </Typography>
//             <Typography component="p">
//               Paper can be used to build surface or other elements for your application.
//             </Typography>
//           </Paper>
//         </div>
//     </div>
//   );
// }

// PaperSheet.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(PaperSheet);


export default class Example extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      names: []
    };
  }
  
  componentDidMount() {
      $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      dataType: 'json',
      success: function(data) {
        this.setState({names: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });
  }
  
  render() {
    if (this.state.names.length > 0) {
      return (
        <div>
          <div className="App-header">
                     EMPLEADOS
          </div>
        <div className="App-body">
          {this.state.names.map(function (person) {
              return <div>{person.name} // {person.username}</div>
            })
          }
        </div>
        </div>
      );
    }
    
    return (<span></span>);
  }
}