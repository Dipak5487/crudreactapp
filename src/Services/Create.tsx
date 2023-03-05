import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Input } from '@mui/material';


interface users {
   name: string,
   dob: string,
   emailId: string,
   country: string,
   mobileNumber: string
}
const Create = () => {
   const [user, setUser] = useState({ id:0,name: '', dob: '', emailId: '', country: '', mobileNumber: '' });

   //     const [name, setName] = useState('');
   // const [dob, setDob] = useState('');
   // const [emailId, setEmail] = useState('');
   // const [country, setCountry] = useState('');
   // const [mobileNumber, setMobile] = useState('');
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
            console.log("seetrtr", data)
            //   setName('');
            //     setDob('');
         })
         .catch((err) => {
            console.log(err.message);
         });
   };

   const handleSubmit = (e: any) => {
      e.preventDefault();
      addPosts(user);
   };
   return (
      <div className="app">
         <div className="add-post-container">
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
               <Input type="text" className="form-control" id ='name'value={user.name}
                  onChange={(e) => setUser({
                     ...user,
                     name: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='dob'>Date of Birth</label>
               <Input name="dob" className="form-control" id="dob"
                  value={user.dob} onChange={(e) => setUser({
                     ...user,
                     dob: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='emailId'>Email Id</label>
               <Input name="emailId" className="form-control" id="emailId"
                  value={user.emailId} onChange={(e) => setUser({
                     ...user,
                     emailId: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='country'>Country Name</label>
               <Input name="country" className="form-control" id="country"
                  value={user.country} onChange={(e) => setUser({
                     ...user,
                     country: e.target.value
                  })}
               />
               <br></br>
               <label htmlFor='mobileNumber'>Mobile Number</label>
               <Input name="mobileNumber" className="form-control" id="mobileNumber"
                  value={user.mobileNumber} onChange={(e) => setUser({
                     ...user,
                     mobileNumber: e.target.value
                  })} />
                  <Button variant="outlined" type ="submit" size='large'>Create</Button>
            </form>
         </div>

         <h1>{items.id}</h1>
         <h1>{items.title}</h1>
         <h1>{items.userId}</h1>
         <h1>{items.body}</h1>
      </div>
   );
}

export default Create