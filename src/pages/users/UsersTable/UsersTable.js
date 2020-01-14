// import React from "react";
// import { render } from "react-dom";
// import { makeData } from "./Utils";
// import axios from 'axios';

// // Import React Table
// import ReactTable from "react-table";
// import "react-table/react-table.css";

// export default class UsersTable extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       data: makeData(),
//       users:[]
//     };
//   }

//   async componentDidMount() {
    
//     var accessToken =  localStorage.getItem('access-token');
//     // alert(accessToken);
//     console.log(accessToken);
//     try {
//     await  axios.get('http://localhost:1337/User/users',
//         {headers: {'access-token': accessToken}})
//         .then(res => {
//             const users = res.data;
//             console.log( res.data);
//             this.setState({  users });
//         })
        
//     } catch(err) {
//         alert(err);
//         }
//     }

    

//   render() {

//   //   const columns = [
//   //   this.state.users.map((user) => (
//   //     {
//   //       Header: "Name",
//   //       columns: [
//   //         {
//   //           Header: "Nombre",
//   //           id: "Name",
//   //           accessor: d => user.Name
//   //         },
//   //         {
//   //           Header: "Apellido",
//   //           id: "lastName",
//   //           accessor: d => user.LastName
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       Header: "Info",
//   //       columns: [
//   //         {
//   //           Header: "DNI",
//   //           id: "DNI",
//   //           accessor: d => user.Dni
//   //         },
//   //         {
//   //           Header: "Status",
//   //           accessor: "status"
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       Header: 'Stats',
//   //       columns: [
//   //         {
//   //           Header: "Visits",
//   //           accessor: "visits"
//   //         }
//   //       ]
//   //     }
//   //   ]}
//   //   defaultPageSize={10}
//   //   className="-striped -highlight"
//   // ]

//   const columns = [
//       {
//         Header: "Datos Personales",
//         columns: [
//           {
//             Header: "Nombre",
//             id: "Nombre",
//             accessor: d => d.Name
//           },
//           {
//             Header: "Apellido",
//             id: "Apellido",
//             accessor: d => d.LastName
//           }
//         ]
//       },
//       {
//         Header: "Informacion Adicional",
//         columns: [
//           {
//             Header: "DNI",
//             id: "DNI",
//             accessor: d => d.Dni
//           }
//         ]
//       }
//   ];

//     const { data, users } = this.state;
//     return (
//       <div>
//         <ReactTable
//           data={users}
//           columns={columns}
//           defaultPageSize={10}
//           className="-striped -highlight"
//         />
//       </div>
//     );
//   }
// }

import React from 'react';
import axios from 'axios';
import {DropdownButton,MenuItem,Button,FormGroup,FormControl,HelpBlock,ControlLabel,Glyphicon} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    fontSize: '15rem',
  },
  table: {
    minWidth: 700,
    fontSize: '15rem',
  },
});

export default class UsersTable extends React.Component {
  constructor(props, context) {
    super(props, context);
   //   this.handleUsers = this.handleDni.bind(this);
      this.state = {
        users:[]
      };
  }

  async componentDidMount() {
    
   var accessToken =  localStorage.getItem('access-token');
  //  alert(accessToken);
   console.log(accessToken);
   try {
    
   await  axios.get('http://localhost:1337/User/users',
    {headers: {'access-token': accessToken}})
      .then(res => {
        const users = res.data;
        console.log( res.data)
        this.setState({  users });
      })
      
    } catch(err) {
      alert(err);
    }
  }
  async userDelete(id){
    var accessToken =  localStorage.getItem('access-token');
    var data = {'id': id};
    await axios.patch("http://localhost:1337/User/DeleteUser",data,{headers: {'access-token': accessToken}})
    .then(res => {
      // alert(res)
    })
    alert('Usuario Eliminado');
    }
  
    userEdit(){
      // onClick={() => this.userEdit(user.id)}
    }

    

     usersFills() {
    const listUser = this.state.users.map((user) =>
      <TableRow key={user.id}>
        <TableCell component="th" scope="row">
          {user.Dni}
        </TableCell>
        <TableCell >{user.Name}</TableCell>
        <TableCell >{user.LastName}</TableCell>
        <TableCell >{user.Email}</TableCell>
        <TableCell>
          <Button style={{marginRight: 20}} onClick={() => this.userDelete(user.id)}><Glyphicon glyph="glyphicon glyphicon-trash" /></Button>
          <Link style={{marginRight: 20}} to='/edit-user/1'><Button><Glyphicon glyph="glyphicon glyphicon-pencil" /></Button></Link>
          <Link to='/view-user/1'><Button><Glyphicon glyph="glyphicon glyphicon-eye-open" /></Button></Link>
        </TableCell>
      </TableRow>
    )  
    
    return (
    <Grid container spacing={16}>
      <Grid item xs={1}>
      </Grid>
        <Grid item xs={10}>
          <Paper >
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Documento de identidad</TableCell>
                  <TableCell >Nombre</TableCell>
                  <TableCell >Apellido</TableCell>
                  <TableCell >Email</TableCell>
                  <TableCell >Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUser}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      <Grid item xs={1}>
      </Grid>
    </Grid>
    );
  }
  render() {
    return (
      this.usersFills()
    )
  }

}