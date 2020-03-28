import React, { useState } from 'react'

import { connect } from 'react-redux'
import { getCat } from './Redux/Actions'
import { setToValue, append, getValue, deepAssign } from '../reducerHelpers'
import { makeQuantity } from '../utility'
import AddTwoValues from './AddTwoValues'

const PresentProblems = (props) => {

    const {Root} = props
    return (
        <div>

        {Object.keys(getValue(Root, ['redux', 'elementary school', 'children', 'problem set'])).map(problemId => (
            
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
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat }

)(PresentProblems)
