import React from 'react'

import { connect } from 'react-redux'
import { getCat, autoSolve } from './Redux/Actions'
import { useHistory } from 'react-router-dom'

import {
    getCell,
    getVariable,
    getChild,
    treeVisualizer } from '../reducerHelpers'
import AddTwoValues from './AddTwoValues'


// const getProblems = (state) => {
//   let elementarySchool = getCell(state, ['elementary school'])
//   let problemSets = getVariable(state, ['elementary school'], 'problemSets')
//   // console.log('stuff', elementarySchool, problemSets.value - 1)
//   let problemSet = getChild(state, elementarySchool, `problem set ${problemSets.value - 1}`)
//   // console.log(problemSet)
//   let problems = Object.keys(problemSet.children)
//   return problems
// }

const PresentProblems = (props) => {

    const {Root} = props
    
    const autoSolve1 = () => {
        props.autoSolve( ['elementary school', 'testing'])
        
    }
    /*
    problem set, #of problems, 
    */
    // need the problem set
    // console.log(Root)
    // get last child of state 'elementary school' via var 'problemSets' as (n - 1)th 'problem set'
    // get last child of state 'state name' via var 'count' as (n - 1)th 'child name'
    let elementarySchoolName = ['elementary school']
    // console.log('print tree')
    let logObject = treeVisualizer(Root, elementarySchoolName, 1)
    console.log("log of tree", logObject)
    let problemSetDataSetName = useHistory().location.pathname
    console.log('history', problemSetDataSetName.slice(1, problemSetDataSetName.length))
    let elementarySchool = getCell(Root, elementarySchoolName)
    let problemSets = getVariable(Root, elementarySchoolName, 'problemSets')
    // console.log('stuff', elementarySchool, problemSets.value - 1)
    let problemSet = getChild(Root, elementarySchool, [`problem set ${problemSets.value - 1}`])
    // console.log('problem set', problemSet)
    let problems = problemSet.children//Object.keys(problemSet.children)
    // console.log('problems', problems)
    return (
        <div>

        {/* how the coordinates are calculated here is wrong 
        use the problem name to get the coordinates*/}
        {problems.map((problem, i) => (
            
            <AddTwoValues
                key={i}
                // i={{problemId: problemId}}  // prefered pracice as accessing key directly is not a good idea
                stateCoordinates={{problemId: problem[0].split(' ')[1]}}
                // pass in a state name prefix to identify the prefixth data set
                />

        ))}
        {/* need an autocompute and submit button here */}
        <button onClick={() => autoSolve1()}>autoCompute</button>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat, autoSolve }

)(PresentProblems)
