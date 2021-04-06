import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
// import { getProblemSets } from '../../../../../Redux/Actions'
import {
    getCell,
    getVariable,
    printTreeInteractive } from '../../../../../Redux/reducerHelpers'

const Problems = styled.p`

    display: flex;
    // flex-direction: flex-end;

`
const ProblemSetCard = (props) => {

    const { Root,
            stateCoordinates: {problemSet, problemId, offsetString}} = props

    // console.log('coordinnates', {problemSet}, {problemId}, offsetString)
    // printTreeInteractive(Root)
    // use coordinates to access the right collection to run AddTwoValues on them
    let {   id,
        problemSetId,
        a,
        b,
        theirAnswer,
        actualAnswer,
        gotItRightTheFirstTime} = getCell(Root, 'resultsFromBackend').value['problems'][problemSet][problemId]
    // console.log('myProblem', myProblem)
    // run AddTwoValues on each problem
    // stateCoordinates.offsetString}problem ${stateCoordinates.problemId
    // displayResults problemSet 0
    // let problemSet = `${offsetString}problemSet `
    return (
        <div>
            <Problems>
                {a} + {b} = {actualAnswer}    your answer {'->'} {theirAnswer} {gotItRightTheFirstTime? 'true': 'false'}
            </Problems>
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
    {  }

)(ProblemSetCard)
