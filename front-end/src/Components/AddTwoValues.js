import React, { useState } from 'react'
import OneValue from './OneValue';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat } from './Redux/Actions'
import { setToValue, append, getValue, deepAssign } from '../reducerHelpers'
import { makeQuantity } from '../utility'
// AddTwoValues box
// mobile first
const backgroundColor = "lightblue"
const Container = styled.div`

    // @media(max-width: 400px) {
        width: vw;
        background-color: ${props => props.backgroundColor};
        border: 1px solid #BADA55;
    
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

        statePath,
        Root
    } = props
    // will need to pass index trackers instead of a single long path
    const problemPath = statePath
    const problem = getValue(Root, statePath)
    const total = problem.a.value + problem.b.value
    // if there are problems load them
    // else run a genertive Reducers
    return (
        // <div></div>
        // needs a form and both values with the solution
        <Container>
            {/* <h1>testing</h1> */}
            {Object.keys(problem).map(problemKey => (
                <OneValue
                    key={problemKey}
                    statePath={[...problemPath, problemKey]}/>
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
