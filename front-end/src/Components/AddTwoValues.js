import React, { useState } from 'react'
import OneValue from './OneValue';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat } from './Redux/catActions'
import { setToValue, append, getValue, deepAssign } from '../deepAssign'
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
/*
make a component for this
bring in the recursive object spread function for updating the forms
problemSet: {
    0: {
        a: {
            value: 4
            quantity: makeQuantity(whatValueHas)
        }
        b: {
            value: 3
            quantity:
        }
        answerForm: {
            theirAnswer:
            actualAnswer: 4 + 3
        }
    }
}

< bla i={i} problem={problem} setProblemSet={setProblemSet} setProblemSet={setProblemSet} />
*/


// switch to redux
// https://github.com/erikras/ducks-modular-redux
// currently doing redux "prop grilling" style without reducer hooks
// need to know all the values so the right total spaces can be calculated
export const AddTwoValues = (props) => {
    // have useState here
    const {

        pathDownObject,
        problemSet,
        setProblemSet,
        statePath
    } = props
    console.log("path to problem", statePath)
    // const total = problem.a.value + problem.b.value
    // console.log(pathDownObject, problemSet)
    // console.log(getValue(problemSet, pathDownObject))
    const problem = getValue(problemSet, pathDownObject)
    const total = problem.a.value + problem.b.value
    
    return (
        // <div></div>
        // needs a form and both values with the solution
        <Container>
            {/* <h1>testing</h1> */}
            {Object.keys(problem).map(problemKey => (
                <OneValue
                    key={problemKey}
                // pass entire object and the path to the part we want
                    problemSet={problemSet}
                    setProblemSet={setProblemSet}
                    pathDownObject={[...pathDownObject, problemKey]}
                    statePath={[...statePath, problemKey]}/>
            ))}
            {/* // <OneValue
            //     problemPart={problem["a"]}
            //     total={total}
            //     path={[...path, "a"]}
            //     backgroundColor={backgroundColor}/>
            // <OneValue
                
            //     problemPart={problem["b"]} 
            //     total={total}
            //     path={[...path, "b"]}

            //     backgroundColor={backgroundColor}/>
            // <OneValue
            //     problemPart={problem["answerForm"]} 
            //     total={total}
            //     path={[...path, "answerForm"]}

            //     backgroundColor={backgroundColor}/> */}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        Cat: state
    }
}
export default connect(
    mapStateToProps,
    { getCat }

)(AddTwoValues)
// export default AddTwoValues;