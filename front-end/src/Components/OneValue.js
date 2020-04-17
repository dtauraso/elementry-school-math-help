import React from 'react'
import Quantity from './Quantity'
import SubmitAnswer from './SubmitAnswer'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat, submitAnswer } from './Redux/Actions'
import {
    getCell,
    getVariable } from '../reducerHelpers'

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
// calc(10px + 31px)
const Value = styled.p`

    width: 40px;
    // margin-left: 10px;
    // margin-right: 10px;
    // padding-bottom: 20px;
    border-bottom: ${props => props.operationType === '+'? '2px solid black': ''} ;



`
const OneValue = (props) => {

    // need the entire problem part
    let {
        // statePath,
        stateCoordinates,
        Root} = props
    // console.log('redux tree', Root)
    let problemPartName = [`${stateCoordinates.problemPart} ${stateCoordinates.problemId}`]
    // console.log(stateCoordinates)
    let x = getCell(Root, problemPartName)
    // console.log('problem part', x)
    let isForm = getVariable(Root,
                            problemPartName,
                            'isForm').value
    // console.log('isForm', isForm)
    let operationType = getVariable(Root,
        problemPartName,
        'operationType').value
    // console.log('operationType', "|", operationType, "|")
    let oneValue = null
    if(!isForm) {
        oneValue = getVariable(Root,
            problemPartName,
            'value').value
    }
    // we cannot assume there is a form right now
    // const oneValue = getValue(Root, statePath)
    // let { isForm, operationType } = oneValue.variables
    // console.log("one value", oneValue)
    // const formOrValue = (isForm, operationType) => {
    //     if(isForm) {
    //         // const formPath = statePath
    //         return (<SubmitAnswer
    //                     // statePath={formPath}
    //                     stateCoordinates={stateCoordinates}
    //                     />)
    //     } else {
    //         // const valuePath = statePath
    //         // console.log("Value", getValue(Root, [...valuePath, 'variables']))
    //         return (
    //             <Value operationType={operationType}>
    //                 {(`${operationType}              ${getValue(Root, ['variables']).value}`)}
    //             </Value>
    //             )
    //     }
    // }
    return (
        <Container>
            {/* {formOrValue(isForm, operationType)} */}
            {isForm? 
                <SubmitAnswer
                // statePath={formPath}
                stateCoordinates={stateCoordinates}
                />:
                <Value operationType={operationType}>
                    {(`${operationType}              ${oneValue}`)}
                </Value>
                }
            <Quantity
                // quantity comes from different locations
                // statePath={isForm?
                //     [...statePath, 'submission', 'variables', 'quantity']:
                //     [...statePath, 'variables', 'quantity']}
                stateCoordinates={{...stateCoordinates, isForm: isForm}}

                />

        </Container>
    )
    // const formPath = statePath
    // console.log("path to value", statePath)
    // console.log("one value", getValue(Root, statePath))

    // console.log("path to value", statePath)
    // console.log('value', getValue(Root, statePath))
    // console.log(pathDownObject, problemSet)
    // console.log(getValue(problemSet, pathDownObject))
    // const answerForm = getValue(Root, formPath)
    // let { isForm, operationType } = answerForm.variables

    // // console.log(answerForm)
    // let {value,
    //     quantity,
    //     correct,
    //     actualAnswer,
    //     isValid} = answerForm.submission.variables
    // console.log(answerForm.submission.variables)
    // console.log("they right?", correctFirstTime, correct)
    // what if I added padding to ensure there was always the same 
    // should take in a single value and display it along with the quantity
    // why am I using useState on props?
    // const [value, setValue] = useState(props.value)
    
    // why isn't quantiy's prob being updated when oneValue's is being updated?

    // console.log('here', value, quantity)

    // return (<div></div>)

    // const showSubmissionMesssage = () => {
    //     // run Reducers
    //     // return the message
    // }
    // return (
    //     // ideally 50% of the screen should be the form or the value
    //     // the other 50% of the screen shoudl be the quantity
    //     <Container>
    //         {/* if there is a form, display the extra component holding the form */}
    //         {/* don't show value if it's undefined */}
    //         {/* first half of the page */}
    //         {/* conditional rendering */}
    //         {/* {showFormOrValue(isForm, value)} */}
    //         {isForm?
    //             <SubmitAnswer statePath={formPath}/> :
                
    //             <Value operationType={operationType}>
    //                 {(`${operationType}              ${value}`)}
    //             </Value>  
    //         }
    //         {/* second half of the page */}
    //         <Quantity
    //             quantity={quantity}
    //             statePath={[...formPath, 'children', 'submission', 'variables', 'quantity']}
    //             />
                
    //     </Container>
    // )
}

const mapStateToProps = state => {
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat, submitAnswer }

)(OneValue)
