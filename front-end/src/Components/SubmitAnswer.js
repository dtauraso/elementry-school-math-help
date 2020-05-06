import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { getCat, submitAnswer, addToAnswer } from './Redux/Actions'
import {
    getCell,
    getVariable } from '../reducerHelpers'
const Form = styled.form`

    width: 80px;//40%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    // border: 1px solid #BADA55;

`
const InputField = styled.input`
    width: 40px;//40%;
    border: 1px solid black;

`
const FeedbackMessage = styled.p`
    width: 30px;
    color: ${props => props.backgroundColor};
`

const SubmitAnswer = (props) => {

    let {
        // statePath,
        stateCoordinates,
        Root} = props

    // should assume the coordinates for the answer form were passed in
    let answerFormStateName = `${stateCoordinates.offsetString}${stateCoordinates.problemPart} ${stateCoordinates.problemId}`
    let answer = getCell(Root, answerFormStateName)
    // console.log('answer', answer)
    let submissionStateName = `${answerFormStateName}${stateCoordinates.offsetString}submission ${stateCoordinates.problemId}`
    let submission = getCell(Root, submissionStateName)
    // console.log("submission context", submission)
    
    // let submissionStateName = [`${stateCoordinates.problemPart} ${stateCoordinates.problemId}`,
    //                             `submission ${stateCoordinates.problemId}`]
    // let dataSetName = ''
    let y = getVariable(Root, submissionStateName, `${stateCoordinates.offsetString}value`)//[`value ${stateCoordinates.problemPart}`])
    // console.log("submission's value", y)
    let feedbackMessage = getVariable(Root, submissionStateName, `${stateCoordinates.offsetString}feedbackMessage`).value
    let backgroundColor = getVariable(Root, submissionStateName, `${stateCoordinates.offsetString}backgroundColor`).value

    let updateTypedAnswerStateName = `${submissionStateName}${stateCoordinates.offsetString}updateTypedAnswer ${stateCoordinates.problemId}`
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
        console.log('we are submitting our answer')
        // call submit answer here
        // get the answer from Root
        // getVariable(Root, submissionStateName, 'value')

        props.submitAnswer(submissionStateName)
        // console.log(event)
        // const data = new FormData(event.target);
        
        // fetch('/api/form-submit-url', {
        //   method: 'POST',
        //   body: data,
        // });
      }
    return (
            <Form onSubmit={handleSubmit}>

                {/* put this outside the form */}
                <FeedbackMessage backgroundColor={backgroundColor}>
                    {feedbackMessage}
                </FeedbackMessage>


                <button>Check Answer</button>

                {/* <label htmlFor="username">Best Guess -> </label> */}
                <InputField id="username" name="username" type="text"
                onChange={(e) => {
                    props.addToAnswer({
                        newValue: e.target.value
                    },
                    updateTypedAnswerStateName
                    )
                    // call add to answer here
                    console.log(Root)
                    // console.log(getValue(Root, [...statePath, 'submission']))
                    

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
    { getCat, submitAnswer, addToAnswer }

)(SubmitAnswer)
