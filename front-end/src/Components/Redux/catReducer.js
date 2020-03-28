import React from 'react'
import { makeQuantity } from '../../utility'
import {    setToValue,
            append,
            getValue,
            deepAssign,
            makeVariablePath } from '../../reducerHelpers'

const answer = 4 + 3

// example states for the axios calls

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
    if(isNaN(action.payload.newValue)) {

        // const variablesBasePath = [...action.meta.basePath, 'variables']

        let y = deepAssign(
            state,
            makeVariablePath(action, 'quantity'),
            makeQuantity(0,
                getValue(state,
                    makeVariablePath(action, 'actualAnswer'))),
            setToValue
        )
        // will not show right untill all the data sources use Redux
        y = deepAssign(
            y,
            makeVariablePath(action, 'firstTimeSubmitting'),
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
    // const { basePath } = action.meta.basePath
    // const variablesBasePath = [...action.meta.basePath, 'variables']

    // [...action.type, 'variables'] is the path to the vars for the answer form
    // console.log(getValue(state, makeVariablesObjectPath(action)))
    let y = deepAssign(
        state,
        makeVariablePath(action, 'value'),
        newValue,
        setToValue
    )
    // console.log(y)
    y = deepAssign(
        y,
        makeVariablePath(action, 'quantity'),
        makeQuantity(newValue,
            getValue(state,
                makeVariablePath(action, 'actualAnswer'))),
        setToValue
    )
    // console.log(y)
    return [y, true]
    
}
const isFirstTimeSubmitting = (state, action/*e*/) => {
    const { newValue } = action.payload

    // is the answer right the first time?
    if(getValue(state, makeVariablePath(action, 'visitCount')) === 0) {
        
    }
    // const variablesBasePath = [...action.meta.basePath, 'variables']
    // console.log("current state", action.type)

    // console.log('is first time submitting?', makeVariablesObjectPath(action))

    return [state, getValue(state, makeVariablePath(action, 'actualAnswer')) === newValue]
    // actualAnswer === parseInt(e.target.value)]
}
const allOtherTimesSubmitting = (state, action/*e*/) => {
    const { newValue } = action.payload
    // console.log("all remaining times")
    // console.log(makeVariablesObjectPath(action), getValue(state, makeVariablePath(action, 'actualAnswer')))
    // if(actualAnswer === parseInt(e.target.value))
    let y = deepAssign(
        state,
        makeVariablePath(action, 'correct'),
        getValue(state, makeVariablePath(action, 'actualAnswer')) === newValue,
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
                        // this state chart will start on the bottom and end up on the 'top'
                        answerForm: {
                            variables: {
                                isForm: true

                            },
                            children: {
                                // is it right to do this?
                                // 1 context for each 
                                // 2 different contexts but the message depends on the submission and we start execution at submission
                                // a reducer will have to juggle code for 2 different states
                                // the reducer can read from a neighboring state but can't write to it
                                // ideally we would have 1 reducer at the top state to address this directly
                                // we start at submission so there are no children states to run

                                // the submission state travels to the progressMeter as we can only have reducers associated
                                // with buttons and the progressMeter variables doesn't depend on a button
                                submission: {
                                    'function': returnState,

                                    variables: {
                                        value: undefined,
                                        quantity: makeQuantity(0, answer),
                                        correct: false, // true when the answer is right
                                        actualAnswer: answer,
                                        isValid: false
                                        
                                    },
                                    nextStates: [['redux', 'elementary school', 'children', 'invalidValue'],
                                                ['redux', 'elementary school', 'children', 'isInteger'],
                                                ['redux', 'elementary school', 'children', 'isNotInteger']
                                            ],
                                    childrenStateLinks: []
                                },
                                progressMeter: {
                                    'function': returnState,

                                    variables: {
                                        submitCount: 0,
                                        correctFirstTime: false,  // true if submitCount === 0
    
                                        testingWithoutForm: false
    
                                    },
                                    nextStates: [],
                                    childrenStateLinks: []
                                },
                            }
                        }
                    }
                },
                // these are here so they aren't copied so many time inside the answerForm state
               'invalidValue': {
                    'function': invalidValue,
                    nextStates: [],
                    childrenStateLinks: []

                },
                'isInteger': {
                    'function': returnState,
                    // need to go to the progress meeter state instead
                    nextStates: [['redux', 'elementary school', 'children', 'submitValue']],
                    childrenStateLinks: []
                },
                'isNotInteger': {
                    'function': returnState,
                    nextStates: [],
                    childrenStateLinks: []

                },
                'submitValue': {
                    'function': submitValue,
                    nextStates: [['redux', 'elementary school', 'children', 'isFirstTimeSubmitting'],
                                ['redux', 'elementary school', 'children', 'allOtherTimesSubmitting']],
                    childrenStateLinks: []

                },






                // should be able to be used for each answerForm state
                'isFirstTimeSubmitting' : {
                    'function': isFirstTimeSubmitting,
                    nextStates: [],
                    childrenStateLinks: []

                },
                'allOtherTimesSubmitting': {
                    'function': allOtherTimesSubmitting,
                    nextStates: [],
                    childrenStateLinks: []

                }
            }
        }
        
    }
    
    
}