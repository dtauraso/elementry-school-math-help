import React, {useState} from 'react'
import Quantity from './Quantity'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat, submitAnswer } from './Redux/catActions'
import { setToValue, append, getValue, deepAssign } from '../deepAssign'
import { makeQuantity } from '../utility'
// convert to formik idea? https://stackoverflow.com/questions/47420358/how-to-connect-simple-formik-form-with-redux-store-and-dispatch-an-action
// https://codesandbox.io/s/wizardly-waterfall-w3vf2
// https://github.com/jaredpalmer/formik/issues/265
// need another flexbox so the centering doesn't affect the flex-start
// the flex-start should start from 1 spot and go right(its starting from different
// positions on the left)
const Container = styled.div`
    // @media(max-width: 400px) {

        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px solid white;
        justify-content: flex-end;
        
        // align-items: center;
// }
`

const Value = styled.p`
    margin-left: 10px;
    margin-right: 10px;
    // padding-bottom: 20px;
    border-bottom: ${props => props.operationType === '+'? '2px solid black': ''} ;



`
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
const OneValue = (props) => {

    // need the entire problem part
    let {
        problemSet,
        setProblemSet,
        pathDownObject,
        statePath,
        Cat} = props
    console.log("path to value", statePath)
    console.log("one value", getValue(Cat, statePath))

    // console.log("path to value", statePath)
    // console.log('value', getValue(Cat, statePath))
    // console.log(pathDownObject, problemSet)
    // console.log(getValue(problemSet, pathDownObject))
    const answerForm = getValue(problemSet, pathDownObject)
    console.log(answerForm)
    let {value,
        quantity,
        operationType,
        isForm,
        actualAnswer,
        correctFirstTime,
        correct,
        firstTimeSubmitting} = answerForm

    // console.log("they right?", correctFirstTime, correct)
    // what if I added padding to ensure there was always the same 
    // should take in a single value and display it along with the quantity
    // why am I using useState on props?
    // const [value, setValue] = useState(props.value)
    
    // why isn't quantiy's prob being updated when oneValue's is being updated?

    // console.log('here', value, quantity)

    // return (<div></div>)
    const showFormOrValue = (isForm, value) => {
        if(isForm) {
            return (
                <Form onSubmit={handleSubmit}>
                    <p>{firstTimeSubmitting !== "notYetSubmitted"?
                        (correct? "O": "X"):
                        ""
                    }</p>
                    <button>Check Answer</button>

                    {/* <label htmlFor="username">Best Guess -> </label> */}
                    <InputField id="username" name="username" type="text"
                    onChange={(e) => {
                        console.log(Cat)
                        console.log(getValue(Cat, statePath))
                        props.submitAnswer({
                            newValue: parseInt(e.target.value)
                        }, statePath)
                        // console.log(e.target.value)
                        // console.log(pathDownObject)
                        // console.log(answerForm)
                        let y = deepAssign(
                            problemSet,
                            [...pathDownObject, 'value'],
                            parseInt(e.target.value),
                            setToValue
                        )
                        y = deepAssign(
                            y,
                            [...pathDownObject, 'quantity'],
                            makeQuantity(parseInt(e.target.value), actualAnswer),
                            setToValue
                        )

                        if(firstTimeSubmitting === "notYetSubmitted") {
                            y = deepAssign(
                                y,
                                [...pathDownObject, 'firstTimeSubmitting'],
                                "firstTime",
                                setToValue
                            )
                            // check answer
                            y = deepAssign(
                                y,
                                [...pathDownObject, 'correctFirstTime'],
                                actualAnswer === parseInt(e.target.value),
                                setToValue
                            )

                        }
                        y = deepAssign(
                            y,
                            [...pathDownObject, 'correct'],
                            actualAnswer === parseInt(e.target.value),
                            setToValue
                        )
                        setProblemSet(y)
                        
                    }} />

                </Form>
            )
            
        } else {
            return (
                    <div>
                        <Value operationType={operationType}>
                        {(`${operationType}              ${value}`)}
                        </Value>

                        {/* {
                            operationType === '+'?
                            (<resultsLine></resultsLine>):
                            (<div></div>)
                        } */}
                        
                    </div>
                    )
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        // const data = new FormData(event.target);
        
        // fetch('/api/form-submit-url', {
        //   method: 'POST',
        //   body: data,
        // });
      }
    // this.makeQuantity()
    return (
        // ideally 50% of the screen should be the form or the value
        // the other 50% of the screen shoudl be the quantity
        <Container>
            {/* if there is a form, display the extra component holding the form */}
            {/* don't show value if it's undefined */}
            {/* first half of the page */}
            {/* conditional rendering */}
            {showFormOrValue(isForm, value)}
            
            {/* second half of the page */}
            <Quantity
                quantity={quantity}
                statePath={[...statePath, 'variables', 'quantity']}
                />
                
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
    { getCat, submitAnswer }

)(OneValue)
