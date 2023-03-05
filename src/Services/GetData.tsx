import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
function Add(number1: any, number2: any) {
   return number1 + number2;
}

const GetData = () => {
   const [items, setPosts]: any = useState([]);
   useEffect(() => {
      fetch('https://localhost:44396/api/User/get-all')
         .then((response) => response.json())
         .then((data) => {
            setPosts(data);
            console.log("get locall date", data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);




   function handleDelete(e: any) {
      console.log("vale herer of e", e)
      fetch(`https://localhost:44396/api/User/${e}`, {
         method: 'DELETE'
      })
         .then(res => res.json())
         .then(console.log);

   }

   return (
      <div className="posts-container">

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>User Id</TableCell>
                     <TableCell align="right">User name</TableCell>
                     <TableCell align="right">Date of Birth</TableCell>
                     <TableCell align="right">Email Id</TableCell>
                     <TableCell align="right">Country</TableCell>
                     <TableCell align="right">Mobile Number</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {items.map((item: any) => (
                     <TableRow
                        key={item.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell align="right">{item.id}</TableCell>
                        <TableCell component="th" scope="row"> {item.name}</TableCell>
                        <TableCell align="right">{item.dob}</TableCell>
                        <TableCell align="right">{item.emailId}</TableCell>
                        <TableCell align="right">{item.country}</TableCell>
                        <TableCell align="right">{item.mobileNumber}</TableCell>
                        <Button variant="contained" color='error' onClick={() => handleDelete(item.id)}> Delete</Button>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
}
export default GetData