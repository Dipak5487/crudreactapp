import React, { useState, useEffect } from 'react';

const Create= ()=>{
    const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [items, setData]:any = useState([]);

  const addPosts = async (title:any, body:any) => {
    await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          userId: 5,
          /* other post data */
        })
      })
     
       .then((response) => response.json())
       .then((data) => {
        setData(data);
        console.log("seetrtr",data)
          setTitle('');
          setBody('');
       })
       .catch((err) => {
          console.log(err.message);
       });
 };
  const handleSubmit = (e : any) => {
    e.preventDefault();
    addPosts(title, body);
 }; 
    return (
        <div className="app">
           <div className="add-post-container">
              <form onSubmit={handleSubmit}>
                 <input type="text" className="form-control" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                 />
                 <textarea name="" className="form-control" id="" 
                    value={body} onChange={(e) => setBody(e.target.value)} 
                 ></textarea>
                 <button type="submit">Add Post</button>
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