import React, {useEffect} from 'react'
import styled from 'styled-components'
import ProblemSetsCard from './ProblemSetsCard'
import { connect } from 'react-redux'
import { getProblemSets } from '../Redux/Actions'
import {
    getCell,
    getVariable } from '../../reducerHelpers'

const ProblemSets = (props) => {

    const {Root} = props
    // console.log(problemSets)
    let problemSets = getCell(Root, ['results from backend']).jsObject['problemSets']
    // console.log(problemSets)

    return (
        <div>
            {problemSets.map((problemSetStat, i) => (
                <ProblemSetsCard key={i} stateCoordinates={{problemSetStat: i}}/>
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
    { getProblemSets }

)(ProblemSets)
