import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import Container from '@mui/material/Container';
import { margin } from '@mui/system';



interface users {
   name: string,
   dob: string,
   emailId: string,
   country: string,
   mobileNumber: string
}
const Create = () => {
   const [user, setUser] = useState({ id:0,name: '', dob: '', emailId: '', country: '', mobileNumber: '' });
   const [question, setQuestion] = useState('')
   const [answer, setAnswer] = useState('')
   const [items, setData]: any = useState([]);
   const addPosts = async (user: any) => {
      console.log(user)
      await fetch('https://localhost:44396/api/User/user-create', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)
      })

         .then((response) => response.json())
         .then((data) => {
            setData(data);
            console.log("created", data)
         })
         .catch((err) => {
            console.log(err.message);
         });
   };

   const searchOpenAI = async (user: any) => {
      console.log(" Quesitr is",user)
     const res = await fetch('https://localhost:44396/api/User/open-ai', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)
      })
      const result = await res.text();
      console.log(result)
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
   return (
      <div className="app">
         <Container maxWidth="sm" sx={{ p: 2, border: '1px dashed grey'}} style={{marginTop:"20px"}}>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name' style={{padding:"25px"}}>Name</label>
               <Input type="text" className="form-control" id ='name'value={user.name}
                  onChange={(e) => setUser({
                     ...user,
                     name: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='dob' style={{padding:"25px"}}>Date of Birth</label>
               <Input name="dob" className="form-control" id="dob"
                  value={user.dob} onChange={(e) => setUser({
                     ...user,
                     dob: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='emailId' style={{padding:"25px"}}>Email Id</label>
               <Input name="emailId" className="form-control" id="emailId"
                  value={user.emailId} onChange={(e) => setUser({
                     ...user,
                     emailId: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='country' style={{padding:"25px"}}>Country Name</label>
               <Input name="country" className="form-control" id="country"
                  value={user.country} onChange={(e) => setUser({
                     ...user,
                     country: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='mobileNumber' style={{padding:"25px"}}>Mobile Number</label>
               <Input name="mobileNumber" className="form-control" id="mobileNumber"
                  value={user.mobileNumber} onChange={(e) => setUser({
                     ...user,
                     mobileNumber: e.target.value
                  })} />
                  <br/>
                  <Button variant="outlined" type ="submit" size='large' style={{margin:"25px"}}>Create</Button>
            </form>
         </Container>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

         <div>
         <Container maxWidth="sm" sx={{ p: 2, border: '1px dashed grey' }}>
            <form onSubmit={handleOpenAISubmit}>
            <label htmlFor='Question' style={{padding:"25px"}}>Ask Question</label>
               <Input name="Question" className="form-control" id="Question"
                  value={question} onChange={(e) => setQuestion( e.target.value)} />
                  <br/>
                  <Button variant="outlined" type ="submit" size='large' style={{margin:"25px"}}>Search</Button>

            </form>
            <label>{answer}</label>
            </Container>
         </div>         
         <br/>
         <br/>
         <br/>
         <br/>
      </div>
   );
}

export default Create