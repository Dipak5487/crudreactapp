import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetData from './Services/GetData';
import Create from './Services/Create';
import Dashboard from './Dashboard/Dashboard';
function App() {
  return (
    <div className="App">
      <Dashboard/>
       <Create/>
      <GetData/>
     
    </div>
  );
}

export default App;
