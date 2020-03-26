import React, { useState } from 'react'

import { connect } from 'react-redux'
import { getCat } from './Redux/catActions'
import { setToValue, append, getValue, deepAssign } from '../deepAssign'
import { makeQuantity } from '../utility'
import AddTwoValues from './AddTwoValues'
const PresentProblems = (props) => {

    // console.log(props.Cat)
    const answer = 4 + 3
    // pass problemSet, setProblemSet, and the path to all components onvolved with the problemset
    const [problemSet, setProblemSet] = useState({
        0: {
            a: {
                value: 4,
                quantity: makeQuantity(4, answer),
                isForm: false,
                operationType: ''

            },
            b: {
                value: 3,
                quantity: makeQuantity(3, answer),
                isForm: false,
                operationType: '+'

            },
            answerForm: {
                value: undefined,
                quantity: makeQuantity(0, answer),

                actualAnswer: answer,
                isForm: true,
                correctFirstTime: false,
                correct: false,
                // possible values: notYetSubmitted, firstTime
                firstTimeSubmitting: "notYetSubmitted"


            }
        }
    })
    // console.log(problemSet)
    return (
        <div>

        {Object.keys(problemSet).map(problemId => (
            
            <AddTwoValues
                key={problemId}
                pathDownObject={[problemId]}
                problemSet={problemSet}
                setProblemSet={setProblemSet}
                statePath={['redux', 'elementary school', 'children', 'problem set', parseInt(problemId)]}

                />

    ))}
        {/* < bla i={i} problem={problem} setProblemSet={setProblemSet} setProblemSet={setProblemSet} /> */}

        </div>
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

)(PresentProblems)
