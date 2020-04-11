import React from 'react';
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from './logo.svg';
import './App.css';
// import { AddTwoValues } from './Components/AddTwoValues'
import PresentProblems from './Components/PresentProblems'


function App() {
  return (
    <div className="App">
      <nav className="NavBar">
        <Link to="/problemSet">
          Problems
        </Link>
        <Link to='/results'>
          Results
        </Link>
      </nav>
      <Route path="/problemSet"
        render={(props) => <PresentProblems />}
        />
      {/* <Route path="/results"
        render={(props) => } */}
      
      {/* <AddTwoValues a={4} b={3}/> */}
    </div>
  );
}

export default App;

