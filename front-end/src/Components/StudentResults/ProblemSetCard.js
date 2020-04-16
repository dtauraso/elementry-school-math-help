import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { getProblemSets } from '../Redux/Actions'
import {
    getCell,
    getVariable } from '../../reducerHelpers'

const Problems = styled.p`

    display: flex;
    // flex-direction: flex-end;

`
const ProblemSetCard = (props) => {

    const { Root,
            stateCoordinates: {problemSet, problem}} = props

    let {   id,
        problemSetId,
        a,
        b,
        theirAnswer,
        actualAnswer,
        gotItRightTheFirstTime} = getCell(Root, ['results from backend']).jsObject['problems'][problemSet][problem]
    // console.log('myProblem', myProblem)

    return (
        <div>
            <Problems>
                {a} + {b} = {actualAnswer}    your answer -> {theirAnswer} {gotItRightTheFirstTime? 'true': 'false'}
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
    { getProblemSets }

)(ProblemSetCard)
