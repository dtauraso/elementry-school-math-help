import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { getProblemSets, setProblemSetSelector } from '../Redux/Actions'
import {
    getCell,
    getVariable } from '../../reducerHelpers'

const ProblemSetStat = styled.p`

    display: flex;

`
const ProblemSetCard = (props) => {

    const { Root,
            stateCoordinates: {problemSetStat}} = props

    let {   id,
            nameOfProblemSet,
            numberCorrect,
            totalProblems} = getCell(Root, ['resultsFromBackend']).jsObject['problemSets'][problemSetStat]
    // console.log(myProblemSetStat)

    const selectProblemSetStat = (id) => {

        console.log(`get problem set ${id - 1}`)
        props.setProblemSetSelector(id - 1)
    }
    return (
        <div>
            <ProblemSetStat onClick={() => selectProblemSetStat(id)}>
                {nameOfProblemSet}  {numberCorrect} / {totalProblems} correct
            </ProblemSetStat>
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
    { getProblemSets, setProblemSetSelector }

)(ProblemSetCard)
