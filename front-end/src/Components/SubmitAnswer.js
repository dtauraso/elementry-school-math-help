import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { getCat, submitAnswer } from './Redux/Actions'
import {
    setToValue,
    append,
    getValue,
    deepAssign,
    getCell,
    getVariable,
    getChild,
    getChildren,
    tableAssign } from '../reducerHelpers'
import { makeQuantity } from '../utility'
const Form = styled.form`

    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    // border: 1px solid #BADA55;

`
const InputField = styled.input`
    width: 40%;
    border: 1px solid black;

`

const SubmitAnswer = (props) => {

    let {
        // statePath,
        stateCoordinates,
        Root} = props

    // should assume the coordinates for the answer form were passed in
    let answerFormStateName = [`${stateCoordinates.problemPart} ${stateCoordinates.problemId}`]
    let answer = getCell(Root, answerFormStateName)
    console.log('answer', answer)
    let submissionStateName = [...answerFormStateName, `submission ${stateCoordinates.problemId}`]
    let submission = getCell(Root, submissionStateName)
    console.log("submission context", submission)
    
    // let submissionStateName = [`${stateCoordinates.problemPart} ${stateCoordinates.problemId}`,
    //                             `submission ${stateCoordinates.problemId}`]
    let y = getVariable(Root, submissionStateName, 'value')//[`value ${stateCoordinates.problemPart}`])
    console.log("submission's value", y)

    // console.log("submit answer form path", statePath)
    // ["redux", "elementary school", "children", "problem set", 0, "answerForm"]
    // const answerForm = getValue(Root, statePath)
    // // console.log(answerForm.submission)
    // const {value,
    //     quantity,
    //     correct,
    //     actualAnswer,
    //     isValid} = answerForm.submission.variables
    // const {
    //     submitCount,
    //     correctFirstTime
    // } = answerForm.progressMeter.variables
    // console.log(answerForm.submission.variables)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        // const data = new FormData(event.target);
        
        // fetch('/api/form-submit-url', {
        //   method: 'POST',
        //   body: data,
        // });
      }
    return (
            <Form onSubmit={handleSubmit}>
                {/* <p>{firstTimeSubmitting !== "notYetSubmitted"?
                    (correct? "O": "X"):
                    ""
                }</p> */}
                <button>Check Answer</button>

                {/* <label htmlFor="username">Best Guess -> </label> */}
                <InputField id="username" name="username" type="text"
                onChange={(e) => {
                    console.log(Root)
                    // console.log(getValue(Root, [...statePath, 'submission']))
                    props.submitAnswer({
                        newValue: e.target.value
                    }, 
                    submissionStateName
                    
                    // [...statePath, 'submission']
                    )

                }} />

            </Form>
    )
}

const mapStateToProps = state => {
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat, submitAnswer }

)(SubmitAnswer)
