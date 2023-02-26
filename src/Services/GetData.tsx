import React, { useState, useEffect } from 'react';



const GetData =() =>
{
    const [items, setPosts]: any = useState([]);
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
         .then((response) => response.json())
         .then((data) => {
             setPosts(data);
             console.log(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);


   return(
    <div className="posts-container">
      {items.map((item:any) => {
         return (
            <div >
                <h4>{item.id}</h4>
                <h4>{item.body}</h4>
                <h4>{item.title}</h4>
                <h4>{item.userId}</h4>
            </div>
         );
      })}
   </div>
   )
}

export default GetData