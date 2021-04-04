import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { getProblemSets, setProblemSetSelector } from '../../Redux/Actions'
import {
    getCell,
    getVariable } from '../../Redux/reducerHelpers'

const ProblemSetStat = styled.p`

    display: flex;

`
const ProblemSetCard = (props) => {

    const { Root,
            stateCoordinates: {problemSet}} = props

    let {   id,
            nameOfProblemSet,
            numberCorrect,
            totalProblems} = getCell(Root, 'resultsFromBackend').value['problemSets'][problemSet]
    // console.log(myProblemSetStat)

    const selectProblemSet = (id) => {

        console.log(`get problem set ${id - 1}`)
        // supposed to set selectedProblemSetFromBackend
        props.setProblemSetSelector(id - 1)
    }
    // at presentProblems level?
    // yes
    // ith problem set

    return (
        <div>
            <ProblemSetStat onClick={() => selectProblemSet(id)}>
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
