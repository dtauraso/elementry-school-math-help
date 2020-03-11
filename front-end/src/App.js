import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AddTwoValues, PresentProblems } from './Components/AddTwoValues'
function App() {
  return (
    <div className="App">
      
      <AddTwoValues a={4} b={3}/>
    </div>
  );
}

export default App;
