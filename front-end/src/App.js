import React from 'react';
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import './App.css';
import PresentProblems from './Components/PresentProblems'
import Results from './Components/StudentResults/Results'


function App() {
  return (
    <div className="App">
      <nav className="NavBar">
        <Link to="/plusProblems">
          Problems
        </Link>
        <Link to='/results'>
          Results
        </Link>
      </nav>
      <Route path="/plusProblems"
        render={(props) => <PresentProblems myPath={'plusProblems '}/>}
        />
      <Route path="/results"
        render={(props) => <Results />}
        />
      {/* <AddTwoValues a={4} b={3}/> */}
    </div>
  );
}

export default App;

