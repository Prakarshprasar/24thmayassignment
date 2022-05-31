import logo from './logo.svg';
import './App.css';
import React from 'react';
import Todos from './components/Todos';



function App() {
  // fetch("http://localhost:3009/todos")
  // .then((r)=>r.json())
  // .then((d)=>{
  //   console.log(d)
  // })
  return (
    <div className="App">
      <Todos/>
    </div>
  );
}

export default App;
