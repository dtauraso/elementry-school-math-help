import React, { useState } from 'react'

import { connect } from 'react-redux'
import { getCat } from './Redux/Actions'
import {
    setToValue,
    append,
    getValue,
    deepAssign,
    getCell,
    getVariable,
    getChild,
    tableAssign } from '../reducerHelpers'
import { makeQuantity } from '../utility'
import AddTwoValues from './AddTwoValues'

const PresentProblems = (props) => {

    const {Root} = props
    /*
    problem set, #of problems, 
    */
    // need the problem set
    // console.log(Root)
    // get last child of state 'elementary school' via var 'problemSets' as (n - 1)th 'problem set'
    // get last child of state 'state name' via var 'count' as (n - 1)th 'child name'

    let elementarySchool = getCell(Root, ['elementary school'])
    let problemSets = getVariable(Root, elementarySchool, 'problemSets')
    // console.log('stuff', elementarySchool, problemSets.value - 1)
    let problemSet = getChild(Root, elementarySchool, `problem set ${problemSets.value - 1}`)
    // console.log(problemSet)
    let problems = Object.keys(problemSet.children)
    // console.log(problems)
    return (
        <div>

        {Object.keys(getValue(Root, ['redux', 'elementary school', 'children', 'problem set'])).map(problemId => (
            
            // record this into a table
            // run a fuction that stores this data into an external table
            // import the table everyware I use this stuff
            // component that renders this and saves the ith one


            //      stateCoordinates={{problemId: 1}}
            //      destinationComponentName={'AddTwoValues'}
            // make a HOC that wraps the component insde of context api
            // that way the 'global' context is global only for the AddTwoValues component and its sub components
            // use context api? store the table inside context api
            // using context api to associate the data with the component for just that part

            // make sure this works with the prop drillng first
            <AddTwoValues
                key={problemId}
                // i={{problemId: problemId}}  // prefered pracice as accessing key directly is not a good idea
                statePath={['redux', 'elementary school', 'children', 'problem set', parseInt(problemId)]}
                stateCoordinates={{problemId: problemId}}
                />

        ))}

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
    { getCat }

)(PresentProblems)
