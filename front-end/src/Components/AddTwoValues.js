import React from 'react'
import OneValue from './OneValue';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat } from './Redux/Actions'

import {
    getCell,
    getChildren,
    getVariable,
    printTreeInteractive } from '../reducerHelpers'
// AddTwoValues box
// mobile first
const backgroundColor = "lightblue"


  
const Container = styled.div`

    // @media(max-width: 400px) {
        width: ${props => (props.quantityLength * 27) + 150}px;//75%;//vw;
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
    // console.log('our key', stateCoordinates)
    // console.log(stateCoordinates)
    // console.log('state to look for|', `${stateCoordinates.offsetString} problem ${stateCoordinates.ithProblemSet} ${stateCoordinates.problemId}`)
    // printTreeInteractive(Root)
    // get problem parts
    let x = getCell(Root, `${stateCoordinates.offsetString} problem ${stateCoordinates.ithProblemSet} ${stateCoordinates.problemId}`)
    // console.log("our state", x)
    let problemParts = getChildren(Root, x.name)

    // console.log({problemParts})
    // get the quantity size
    // the item # is the second number after the offset string
    let problemPart = problemParts[0].split(' ')[3]
    // console.log({item})

    let stateName = `${stateCoordinates.offsetString} ${stateCoordinates.ithProblemSet} ${stateCoordinates.problemId} ${problemPart}`
    // console.log({stateName})
    // printTreeInteractive(Root)
    // console.log(Root)
    let state = getCell(Root, stateName)
    // let isForm = getVariable(Root,
    //     stateName,
    //     'isForm').value
    
    // if(!isForm) {

    // }
    // console.log('state', state)
    // the submission context is only with the 3rd number in each problem
    // this state only exists for the problem set
    let isForm = getVariable(Root,
        stateName,
        'isForm').value
    // console.log({isForm, problemParts})
    // printTreeInteractive(Root)
    let myQuantity = null
    let sizeOfQuantity = 0
    // ${offsetString} ${i} ${j} ${k}
    if(stateCoordinates.offsetString === 'plusProblems') {
        myQuantity = getVariable(Root,
            `${stateCoordinates.offsetString} ${stateCoordinates.ithProblemSet} ${stateCoordinates.problemId} 2 submission`,
            'quantity'
            ).value
        sizeOfQuantity = myQuantity.length
    }
    else {
        // may want to visit all quantities and get the largest one
        sizeOfQuantity = 10
    }
   
    // console.log({problemParts})
    // console.log('quantity for the add 2 values', myQuantity)
    // let problemParts = getVariable(Root, x.name, 'problemParts').value

    // console.log('problem parts', problemParts, stateCoordinates)
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
        <Container quantityLength={sizeOfQuantity}>
            {/* <h1>testing</h1> */}
            {problemParts.map((problemKey, i) => (
                <OneValue
                    key={i}
                    stateCoordinates={{...stateCoordinates,
                                        problemPart: problemKey.split(' ')[3], // 3rd coordinate point in the name [batchName, x, y, z]
                                        offsetString: stateCoordinates.offsetString}}
                    />
            ))}
            
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    // console.log('my props in adding 2 values', ownProps)
    // find the base state name for the selector
    // have the input selector return [...problemParts, myQuantity.length]
    // decuple the cache from the algorithm
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat }

)(AddTwoValues)
