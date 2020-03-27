import React from 'react'
import { makeQuantity } from '../../utility'
import { setToValue, append, getValue, deepAssign } from '../../deepAssign'

const answer = 4 + 3

export const fetchCatStart = (state, action) => {

    return {...state,
            catTree : {...state.catTree,
                        isFetching: true
                    }
            
    }
}


export const fetchCatSuccess = (state, action) => {


    return {...state,
            catTree : {...state.catTree,
                        error: '',
                        isFetching: false,
                        cat: action.payload
                }
        
    }
}
export const fetchCatFailure = (state, action) => {
    return {...state,
            catTree : {...state.catTree,
                        error: action.payload,
                        cat: null,
                        isFetching: false
                }

    }
}
const returnState = (state, action) => {
    return [state, true]
}
const invalidValue = (state, action) => {
    // console.log("is invalid")
    const { basePath } = action.meta
    if(isNaN(action.payload.newValue)) {

        const variableBasePath = [...basePath, 'variables']

        let y = deepAssign(
            state,
            [...variableBasePath, 'quantity'],
            makeQuantity(0, getValue(state, [...variableBasePath, 'actualAnswer'])),
            setToValue
        )
        // will not show right untill all the data sources use Redux
        y = deepAssign(
            y,
            [...variableBasePath, 'firstTimeSubmitting'],
            'notYetSubmitted',
            setToValue
        )
        return [y, true]
    
    }
    return [state, false]
}
const submitValue = (state, action/*e*/) => {
    // console.log(e.target.value)
    // console.log(pathDownObject)
    // console.log(answerForm)
    // console.log("submit value")
    // console.log("current state", action.meta.currentState)
    // fails when the user puts in an empty value
    
    // console.log(state, action)
    // all the info has made it this far
    const { newValue } = action.payload
    const { basePath } = action.meta

    // [...action.type, 'variables'] is the path to the vars for the answer form
    console.log(getValue(state, [...basePath, 'variables']))
    const variableBasePath = [...basePath, 'variables']
    let y = deepAssign(
        state,
        [...variableBasePath, 'value'],
        newValue,
        setToValue
    )
    // console.log(y)
    y = deepAssign(
        y,
        [...variableBasePath, 'quantity'],
        makeQuantity(newValue, getValue(state, [...variableBasePath, 'actualAnswer']) ),
        setToValue
    )
    // console.log(y)
    return [y, true]
    
}
const isFirstTimeSubmitting = (state, action/*e*/) => {
    const { newValue } = action.payload
    const { basePath } = action.meta

    const variableBasePath = [...basePath, 'variables']
    console.log("current state", action.type)

    console.log('is first time submitting?', variableBasePath)

    return [state, getValue(state, [...variableBasePath, 'actualAnswer']) === newValue]
    // actualAnswer === parseInt(e.target.value)]
}
const allOtherTimesSubmitting = (state, action/*e*/) => {
    const {
        problemSet,
        pathDownObject,
        actualAnswer,
        e,
        firstTimeSubmitting
    } = action.payload
    console.log("all remaining times")
    // if(actualAnswer === parseInt(e.target.value))
    let y = deepAssign(
        y,
        [...pathDownObject, 'correct'],
        actualAnswer === parseInt(e.target.value),
        setToValue
    )
    return [y, true]
    // return actualAnswer === parseInt(e.target.value)
}
// const updateState = (state, currentStatePath, cb, event) => {
//     return cb(state, currentStatePath, event)
// }

// reducers and the state for it in the same file
// merge the states with 1 initialState
// group by context of problem, not by kind of coding construct

// start state
export var Cat = {
    redux: {
        // have a cat category
        // have a BreakApp category
        // store the different reducer functions outside this function
        // break up the reducers but keep the store the same
        cat: {
            children: [['FETCH_CAT_START']],
            variables: [['error'], ['catPic']]
        },
        error: '',
        catPic: null,
        
        // -> FETCH_CAT_SUCCESS or FETCH_CAT_FAILURE
        'FETCH_CAT_START' : {
            
            'next': [['FETCH_CAT_SUCCESS'], ['FETCH_CAT_FAILURE']],
            'functions': fetchCatStart
        },

        'FETCH_CAT_SUCCESS' : {
            // {'next': {'0': {'validate':'0', 'invalid':'0'}},
            'functions': fetchCatSuccess
        },

        'FETCH_CAT_FAILURE' : {
            // {'next': {'0': {}},
            // 'children': {'0': {'char':'0'}},
            'functions': fetchCatFailure
        },
        'elementary school' : {
            children: {
                'problem set': {
                    0: {
                        a: {
                            // array of primitives or primitives
                            variables: {
                                value: 4,
                                quantity: makeQuantity(4, answer),
                                isForm: false,
                                operationType: ''
                            },
                            'function': returnState
                        },
                        b: {
                            variables: {
                                value: 3,
                                quantity: makeQuantity(3, answer),
                                isForm: false,
                                operationType: '+'
                            },
                            'function': returnState
                        },
                        answerForm: {
                            variables: {
                                value: undefined,
                                quantity: makeQuantity(0, answer),
                
                                actualAnswer: answer,
                                isForm: true,
                                correctFirstTime: false,
                                correct: false,
                                testingWithoutForm: false,
                                // possible values: notYetSubmitted, firstTime
                                firstTimeSubmitting: 'notYetSubmitted'
                            },
                            nextStates: [['redux', 'elementary school', 'children', 'invalidValue'],
                                         ['redux', 'elementary school', 'children', 'submitValue']],
                            'function': returnState
                        }
                    }
                },
                'invalidValue' : {
                    nextStates: [],
                    'function': invalidValue
                },
                'submitValue' : {
                    nextStates: [['redux', 'elementary school', 'children', 'isFirstTimeSubmitting'],
                                ['redux', 'elementary school', 'children', 'allOtherTimesSubmitting']],
                    'function': submitValue
                },
                // should be able to be used for each answerForm state
                'isFirstTimeSubmitting' : {
                    nextStates: [],
                    'function': isFirstTimeSubmitting
                },
                'allOtherTimesSubmitting': {
                    nextStates: [],
                    'function': allOtherTimesSubmitting

                }
            }
        }
        
    }
    
    
}