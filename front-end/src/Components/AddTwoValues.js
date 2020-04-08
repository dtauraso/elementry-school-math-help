import React, { useState } from 'react'
import OneValue from './OneValue';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat } from './Redux/Actions'
import {
    getCell,
    getChildren } from '../reducerHelpers'
import { makeQuantity } from '../utility'
// AddTwoValues box
// mobile first
const backgroundColor = "lightblue"
const Container = styled.div`

    // @media(max-width: 400px) {
        width: 50%;//vw;
        background-color: ${props => props.backgroundColor};
        border: 1px solid #BADA55;
        display: flex;
        flex-direction: column;
        // justify-content: flex-start;
        margin: 0 auto;
        // magin-left: 
    // }
    
`


// switch to redux
// https://github.com/erikras/ducks-modular-redux
// currently doing redux "prop grilling" style without Reducers hooks
// need to know all the values so the right total spaces can be calculated
export const AddTwoValues = (props) => {
    // have useState here
    const {

        stateCoordinates,
        Root
    } = props
    // getValue(Root).table['AddTwoValues'][stateCoordinates.problemId] => #
    // problem #
    console.log('our key', stateCoordinates)
    let x = getCell(Root, [`problem ${stateCoordinates.problemId}`])
    console.log("our state", x)
    let problemParts = getChildren(Root, x.name)
    // let problemParts = getVariable(Root, x.name, 'problemParts').value

    console.log('problem parts', problemParts, stateCoordinates)
    // let problemParts = getVariable(Root, x.name, 'problemSets')

    // will need to pass index trackers instead of a single long path
    // const problemPath = statePath
    // const problem = getValue(Root, statePath)
    // const total = problem.a.value + problem.b.value
    // console.log(problemStateName)
    // if there are problems load them
    // else run a genertive Reducers
    return (
        // <div></div>
        // needs a form and both values with the solution
        <Container>
            {/* <h1>testing</h1> */}
            {problemParts.map((problemKey, i) => (
                <OneValue
                    key={i}
                    stateCoordinates={{...stateCoordinates, problemPart: problemKey[0].split(' ')[0]}}
                    />
            ))}
            
        </Container>
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

)(AddTwoValues)
