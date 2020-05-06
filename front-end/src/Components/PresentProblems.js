import React from 'react'
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import { connect } from 'react-redux'
import { autoSolve } from './Redux/Actions'

import {
    getCell,
    getVariable,
    getChild,
    treeVisualizer } from '../reducerHelpers'
import AddTwoValues from './AddTwoValues'


const getMyProblems = ( state, location ) => {

    let Root = state
    console.log('my lcoation inside the selector', location)
    const offsetString = location
    let elementarySchoolName = 'elementarySchool'
    let x = treeVisualizer(state, elementarySchoolName)
    console.log('tree', x)
    // let problemSetDataSetName = props.location.pathname//useHistory().location.pathname
    // console.log('history', problemSetDataSetName.slice(1, problemSetDataSetName.length))
    let elementarySchool = getCell(Root, elementarySchoolName)
    let problemSets = getVariable(Root, elementarySchoolName, `${offsetString}problemSets`)
    // console.log('stuff', elementarySchool, problemSets.value - 1)
    let problemSet = getChild(Root, elementarySchool, `${offsetString}problemSet ${problemSets.value - 1}`)
    console.log('problem set', problemSet)
    let problems = problemSet.children//Object.keys(problemSet.children)
    // console.log('my problems', problems)
    return problems
}

// ensures redux will not refresh the component when the data fetched is the same

// the n to n-1 parameters must be selector functions returning data to be cached
const getProblems = createSelector( (state, location) => ( getMyProblems(state, location) ),
                                    (stuff) => (stuff) )
  

const PresentProblems = (props) => {

    const { problems, myPath } = props
    
    const autoSolve1 = () => {
        props.autoSolve( 'elementarySchool testing')
        
    }
    console.log('refreshing present problems')
    /*
    problem set, #of problems, 
    */
    // need the problem set
    return (
        <div>

        {/* how the coordinates are calculated here is wrong 
        use the problem name to get the coordinates*/}
        {problems.map((problem, i) => (
            
            <AddTwoValues
                key={i}
                // i={{problemId: problemId}}  // prefered pracice as accessing key directly is not a good idea
                stateCoordinates={{problemId: problem[0].split(' ')[2], offsetString: myPath}}
                // pass in a state name prefix to identify the prefixth data set
                />

        ))}
        {/* need an autocompute and submit button here */}
        <button onClick={() => autoSolve1()}>autoCompute</button>

        </div>
    )
}

const mapStateToProps = (state, ownProps) => {

    return {
        
        problems: getProblems(state, ownProps.myPath)

    }
}
export default connect(
    mapStateToProps,
    { autoSolve }

)(PresentProblems)
