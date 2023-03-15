import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref,
) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface userMode{
   id: number,
   dob:string,
   emailId:string,
   country:string,
   mobileNumber: string
}
const Create = () => {
   const [user, setUser] = useState({ id: 0, name: '', dob: '', emailId: '', country: '', mobileNumber: '' });
   const [question, setQuestion] = useState('')
   const [answer, setAnswer] = useState('')
   const [snackbarMessage, setSnackbar] = useState('')
   const [success, setSuccess] = useState(true)
   const [items, setData]: any = useState([]);
   const [open, setOpen] = React.useState(false);
   const addPosts = async (user: any) => {
      var response = await fetch('https://localhost:44396/api/User/user-create', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)
      });
      if (response.status === 200) {
         setSuccess(true)
         setData(await response.json());
         snakbarMessage("Succecfully Created");
      } else {
         setSuccess(false)
         snakbarMessage("Error " + response.status)
      }
   };

   const searchOpenAI = async (user: any) => {
      const res = await fetch('https://localhost:44396/api/User/open-ai', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)
      })

      const result = await res.text();
      setAnswer(result)
   };


   const handleSubmit = (e: any) => {
      e.preventDefault();
      addPosts(user);
   };

   const handleOpenAISubmit = (e: any) => {
      e.preventDefault();
      searchOpenAI(question);
   };

   const snakbarMessage = (e: any) => {
      setSnackbar(e)
      setOpen(true);
   };

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpen(false);
   };
   return (
      <div className="app">
         <Container maxWidth="sm" sx={{ p: 2, border: '1px dashed grey' }} style={{ marginTop: "20px" }}>
            <form onSubmit={handleSubmit}>
               <TextField id="outlined-basic" label="Name" variant="outlined"
                  value={user.name}
                  onChange={(e) => setUser({
                     ...user,
                     name: e.target.value
                  })}
               />
               <br />
               <br />
               <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                        label="Basic date time picker"
                        
                        onChange={(date:any) => setUser({
                           ...user,
                           dob: moment(date).utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                        })
                        }/>
                     </DemoContainer>
                  </LocalizationProvider>
               </div>
               <br />
               <br />

               <TextField id="outlined-basic" label="Email Id" variant="outlined"
                  value={user.emailId} onChange={(e) => setUser({
                     ...user,
                     emailId: e.target.value
                  })}
               />
               <br />
               <br />
               <TextField id="outlined-basic" label="Country Name" variant="outlined"
                  value={user.country} onChange={(e) => setUser({
                     ...user,
                     country: e.target.value
                  })}
               />
               <br />
               <br />

               <TextField id="outlined-basic" label="Mobile Number" variant="outlined"
                  value={user.mobileNumber} onChange={(e) => setUser({
                     ...user,
                     mobileNumber: e.target.value
                  })} />
               <br />
               <Button variant="outlined" type="submit" size='large' style={{ margin: "25px" }}>Create</Button>
               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
                     {snackbarMessage}
                  </Alert>
               </Snackbar>
            </form>
         </Container>



         <div style={{ float: 'left', padding: '-39px', margin: '45px' }}>
            <Container maxWidth="sm" sx={{ p: 2, border: '1px dashed grey' }}>
               <form onSubmit={handleOpenAISubmit}>
                  <label htmlFor='Question' style={{ padding: "25px" }}>Ask Question</label>
                  <Input name="Question" className="form-control" id="Question"
                     value={question} onChange={(e) => setQuestion(e.target.value)} />
                  <br />
                  <Button variant="outlined" type="submit" size='large' style={{ margin: "25px" }}>Search</Button>

               </form>
               <label>{answer}</label>
            </Container>
         </div>
         <br />
         <br />
         <br />
         <br />
      </div>
   );
}

export default Create