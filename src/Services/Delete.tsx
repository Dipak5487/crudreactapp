import React, { useState, useEffect } from 'react';

const Delete = () =>{
 const [item,setPosts] = useState([])

 const deleteItem = async (id:any) => {
    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}`,{
            method : 'DELETE'
        })
           .then((response) => response.json())
           .then((data) => {
               setPosts(data);
               console.log(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

}
}

export default Delete