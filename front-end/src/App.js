import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { AddTwoValues } from './Components/AddTwoValues'
import PresentProblems from './Components/PresentProblems'
function App() {
  return (
    <div className="App">
      <PresentProblems />
      {/* <AddTwoValues a={4} b={3}/> */}
    </div>
  );
}

export default App;

