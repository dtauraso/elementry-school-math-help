import React, {useEffect} from 'react'
import styled from 'styled-components'
import ProblemSetsCard from './ProblemSetsCard/ProblemSetsCard'
import { connect } from 'react-redux'
// import { getProblemSets } from '../../../Redux/Actions'
import {
    getCell,
    getVariable } from '../../../Redux/reducerHelpers'

const ProblemSets = (props) => {

    const {Root} = props
    // console.log(problemSets)
    let x = getCell(Root, 'resultsFromBackend')

    // console.log(x)
    let problemSets = getCell(Root, 'resultsFromBackend').value['problemSets']
    console.log('my problem sets', problemSets)
    return (
        <div>
            {problemSets.map((problemSet, i) => (
                <ProblemSetsCard key={i} stateCoordinates={{problemSet: i}}/>
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
    {  }

)(ProblemSets)
