


import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 350,
    },
    tableContainer: {
        borderRadius: 15,
        margin: 'auto',
        marginTop: 20,
        maxWidth: 850,
     
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        marginLeft: 50
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    // pagination:
    // {
    //   color: theme.palette.secondary.dark,
    //   marginLeft: 150,
    //   verticalAlign: 'right'
    // }
   
  }));
 
  


const List=()=>
{
    const [lists, setlist] = useState([])
    const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    
    fetch("https://reqres.in/api/users?page=2")
     .then((data) => data.json())
     .then((data)=>setlist(data))
    
  },[])
  let rows= [];
 
  if(lists.data)
  {
    rows=lists.data;
  }
return(
        <>
        


      <div className="title"><h1>Employees List</h1></div>
      <div className="listbody">
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className={classes.tableHeaderCell}>Profile</TableCell>
            <TableCell className={classes.tableHeaderCell}>First Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Last Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
         { !rows && rows.length<=0?<> Null</>: <>{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.first_name}>
              <TableCell>
                   
                 <Avatar alt={row.first_name} src={row.avatar} className={classes.avatar}/>
                 </TableCell>
                      
                 <TableCell>        
                <Typography className={classes.name}>{row.first_name}</Typography>
                
                </TableCell>
                <TableCell>        
                <Typography className={classes.name}>{row.last_name}</Typography>
                
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.email}</Typography>
                  
                </TableCell>
              
              
            </TableRow>
           
          ))}
          </>
         }
        </TableBody>
        
        </Table>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[6, 12, 18]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
        
        </TableContainer>
        </div>
        </>

    );
}
 export default List