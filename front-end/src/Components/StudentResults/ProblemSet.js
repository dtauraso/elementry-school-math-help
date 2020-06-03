import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner';
import ProblemSetCard from './ProblemSetCard'
import AddTwoValues from '../AddTwoValues'
import { connect } from 'react-redux'
import { getCat, submitAnswer, addToAnswer } from '../Redux/Actions'
import {
    getCell,
    getVariable } from '../../reducerHelpers'

    
const ProblemSet = (props) => {
    const {Root} = props

    // assume the state chart is already made
    // look for states using the old frontend components with a start offset of 'display '

    let problemSet = getCell(Root, 'resultsFromBackend').jsObject['problems']
    let id = getCell(Root, 'selectedProblemSetFromBackend').value
    let problemsId = getCell(Root, 'problemSetIdMapToAppendedProblemId').value
    let displayResults = getCell(Root, 'displayResults')
    let children = displayResults.children

    console.log({id, problemsId, children: children[ problemsId[id] ]})
    console.log({offsetString: 'displayResults', id: `${problemsId[id]}`})
    if(id >= 0) {
        console.log('my problems', problemSet[id])
        // corrdinates from the 'displayResults ' states
        // ith problem set
        // run AddTwoValues for each problem in the ith problem set
        // problemSetIdMapToAppendedProblemId
        // before we display anything prove we can find the right data
        return (
            <div>
                {problemSet[id].map((problem, i) => (
                    <ProblemSetCard key={i} stateCoordinates={{
                                                    problemSet: id,
                                                    problemId: i,
                                                    offsetString: 'displayResults '}}/>
                ))}
                <AddTwoValues
                // key={i}
                // i={{problemId: problemId}}  // prefered pracice as accessing key directly is not a good idea
                stateCoordinates={{problemId: `${problemsId[id]}`, offsetString: 'displayResults'}}
                // pass in a state name prefix to identify the prefixth data set
                />
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    
    }
}

const mapStateToProps = state => {
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat, submitAnswer, addToAnswer }

)(ProblemSet)
