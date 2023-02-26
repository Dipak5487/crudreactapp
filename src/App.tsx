import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetData from './Services/GetData';
import Create from './Services/Create'
function App() {
  return (
    <div className="App">
       <Create/>
      <GetData/>
     
    </div>
  );
}

export default App;
