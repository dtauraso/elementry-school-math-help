import React, { useState } from 'react'

import { connect } from 'react-redux'
import { getCat } from './Redux/catActions'
import { setToValue, append, getValue, deepAssign } from '../reducerHelpers'
import { makeQuantity } from '../utility'
import AddTwoValues from './AddTwoValues'

const PresentProblems = (props) => {

    const {Cat} = props
    return (
        <div>

        {Object.keys(getValue(Cat, ['redux', 'elementary school', 'children', 'problem set'])).map(problemId => (
            
            <AddTwoValues
                key={problemId}
                statePath={['redux', 'elementary school', 'children', 'problem set', parseInt(problemId)]}

                />

        ))}

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
