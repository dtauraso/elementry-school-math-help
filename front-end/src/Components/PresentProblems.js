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
    let problemSets = getVariable(Root, ['elementary school'], 'problemSets')
    // console.log('stuff', elementarySchool, problemSets.value - 1)
    let problemSet = getChild(Root, elementarySchool, `problem set ${problemSets.value - 1}`)
    // console.log(problemSet)
    let problems = Object.keys(problemSet.children)
    // console.log(problems)
    return (
        <div>

        {problems.map((problem, i) => (
            
            <AddTwoValues
                key={i}
                // i={{problemId: problemId}}  // prefered pracice as accessing key directly is not a good idea
                // statePath={['elementary school', 'children', 'problem set', parseInt(problemId)]}
                stateCoordinates={{problemId: i}}
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
