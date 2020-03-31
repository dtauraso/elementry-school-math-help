import { makeQuantity } from '../../utility'
import {    setToValue,
            append,
            getValue,
            deepAssign,
            makeVariablePath,
            makeVariablePath2 } from '../../reducerHelpers'

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
                        Root: action.payload
                }
        
    }
}
export const fetchCatFailure = (state, action) => {
    return {...state,
            catTree : {...state.catTree,
                        error: action.payload,
                        Root: null,
                        isFetching: false
                }

    }
}
const saveComponentProps = (state, action) => {
    // adds the component props data to redux
}
const returnState = (state, action) => {
    return [state, true]
}
const noValue = (state, action) => {
    // console.log("is invalid")
    if(action.payload.newValue.length === 0) {

        // const variablesBasePath = [...action.meta.basePath, 'variables']

        let y = deepAssign(
            state,
            makeVariablePath(action, 'quantity'),
            makeQuantity(0,
                getValue(state,
                    makeVariablePath(action, 'actualAnswer'))),
            setToValue
        )
        return [y, true]
    
    }
    return [state, false]
}
const isInteger = (state, action) => {
    return [state, !isNaN(parseInt(action.payload.newValue)) === true]
}

const submitValue = (state, action/*e*/) => {
    // console.log(e.target.value)
    // console.log(pathDownObject)
    // console.log(answerForm)
    // console.log("submit value")
    // console.log("current state", action.meta.currentState)
    // fails when the user puts in an empty value

    // in the submission state
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
    y = deepAssign(
        y,
        makeVariablePath(action, 'correct'),
            getValue(state,
                makeVariablePath(action, 'actualAnswer')) ===
                getValue(state,
                    makeVariablePath(action, 'value'))
        ,
        setToValue
    )
    // increment the submit counter
    y = deepAssign(
        y,
        makeVariablePath(action, 'submitCount'),
        getValue(state, makeVariablePath(action, 'submitCount')) + 1,
        setToValue
    )
    // console.log(y)
    return [y, true]
    
}
// keep as reference incase it needs to be used
const measureProgress = (state, action) => {
    // this state reads data from the answerForm.submission state
    // to decide how to set data to the answerForm.measureProgress state
    // action.type ends at submission
    let y = state
    // testing the submit state

    if(getValue(state, makeVariablePath(action, 'submitCount')) === 1) {    
        if(getValue(state, makeVariablePath(action, 'correct'))) {

            let progressPath = [
                ...action.meta.basePath.split(0, action.type.length - 1),
                'progressMeter']
            y = deepAssign(
                state,
                makeVariablePath2(progressPath, 'correctFirstTime'),
                true,
                setToValue
            )
            
            // return [y, true]
        }
        
    }
    y = deepAssign(
        state,
        makeVariablePath(action, 'submitCount'),
        getValue(state, makeVariablePath(action, 'submitCount')) + 1,
        setToValue
    )
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
export var Root = {
    redux: {
        // have a Root category
        // have a BreakApp category
        // store the different Reducers functions outside this function
        // break up the reducers but keep the store the same
        Cat: {
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
        table : {
            'root' : {
                name: ['root'],
                // all the starts of the links are right here
                nextParts: {'elementary school':1,
                            'problem set 0':1,
                            'problem 0':1,
                            '0 0':1,
                            'value 0': 1,
                            'quantity 0': 1,
                            'isForm 0': 1,
                            'operationType 0':1,

                            '1 0': 1,
                            'value 1': 1,
                            'quantity 1': 1,
                            'isForm 1': 1,
                            'operationType 1':1,


                            '2 0': 1,
                            'value 2': 1,
                            'quantity 2': 1,
                            'isForm 2': 1,
                            'operationType 2': 1,
                            'noValue 0': 1,
                            'isInteger 0': 1,
                            'isNotInteger 0': 1,

                            'submitValue 0': 1,
                            'isFirstTimeSubmitting 0': 1,
                            'allOtherTimesSubmitting 0': 1
                        }
            },
            'elementary school': {
                name: ['elementary school'],
                children: {'problem set 0': 1},
                variableNames: ['problemSets 0']
            },
            'problemSets 0': {
                name: ['problemSets 0'],
                value: 1
            },
            'problem set 0': {
                name: ['problem set 0'],
                children: {'problem 0': 1},
                // variableNames: ['numberOfProblems 0']
            },
            // 'numberOfProblems 0': {
            //     name: ['numberOfProblems 0'],
            //     value: 1
            // },
            'problem 0': { // key of AddTwoValues maps to this
                name: ['problem 0'],
                children: {'0 0': 1, '1 0': 1, '2 0': 1}, // can use the OneValue key and the AddTwoValues key
                // variableNames: ['problemParts 0']
            },
            // 'problemParts 0': {
            //     name: ['problemParts 0'],
            //     value: 3
            // },


            '0 0': {  // a
                name: ['0 0'],
                variableNames: ['value 0', 'quantity 0', 'isForm 0', 'operationType 0']
            },
            'value 0': {
                name: ['value 0'],
                value: 4
            },
            'quantity 0': {
                name: ['quantity 0'],
                value: makeQuantity(4, answer)
            },
            'isForm 0': {
                name: ['isForm 0'],
                value: false
            },
            'operationType 0': {
                name: ['operationType 0'],
                value: ''
            },



            '1 0': { // b
                name: ['1 0'],
                variableNames: ['value 1', 'quantity 1', 'isForm 1', 'operationType 1']
            },
            'value 1': {
                name: ['value 1'],
                value: 4
            },
            'quantity 1': {
                name: ['quantity 1'],
                value: makeQuantity(4, answer)
            },
            'isForm 1': {
                name: ['isForm 1'],
                value: false
            },
            'operationType 1': {
                name: ['operationType 1'],
                value: ''
            },

            // intermediate state that also has variable names
            '2 0': { // anserForm
                name: ['2 0'],
                nextParts: {'submission 0':1,
                            'progressMeter 0': 1},
                variableNames: ['isForm 2', 'operationType 2']
            },
            // we start our submittion the answer with this cell
            // this index corresponds to the total number of problems
            'submission 0': {

                name: ['answerForm 0', 'submission 0'],
                'function': returnState,

                nextStates: [['noValue 0'],
                            ['isInteger 0'],
                            ['isNotInteger 0']],
                // indeces in variableNames corresponds to the number of problems * (3 - 1)

                variableNames: ['value 2',
                                'quantity 2',
                                'correct 2',
                                'actualAnswer 2',
                                'submitCount 2']
            },
            'progressMeter 0': {
                name: ['answerForm 0', 'progressMeter 0'],
                variableNames: ['correctFirstTime 0',
                                'testingWithoutForm 0']
            },


            // submit states
            // for now keep them as next states
            'noValue 0': {
                'function': noValue,
                nextStates: [],


            },
            'isInteger 0': {
                'function': isInteger,
                nextStates: [['submitValue 0']],
            },
            'isNotInteger 0': {
                'function': returnState,
                nextStates: [],
            },
            'submitValue 0': {
                // need a context for each form
                'function': submitValue,
                nextStates: [
                    // go to the progressMeter state
                    ['isFirstTimeSubmitting 0'],
                    ['allOtherTimesSubmitting 0']
                ],

            },
            'isFirstTimeSubmitting 0' : {
                'function': isFirstTimeSubmitting,
                nextStates: [],
                childrenStateLinks: []

            },
            'allOtherTimesSubmitting 0': {
                'function': allOtherTimesSubmitting,
                nextStates: [],
                childrenStateLinks: []

            },
            'value 2': {
                name: ['value 2'],
                value: undefined
            },
            'quantity 2': {
                name: ['quantity 2'],
                value: makeQuantity(4, answer)
            },
            'isForm 2': {
                name: ['isForm 2'],
                value: false
            },
            'operationType 2': {
                name: ['operationType 2'],
                value: ''
            }
        },
        /*
        
        state table
        name_i            next parts(name_(i + 1)) | state data
        'root'            ['part of state name'] |
        'part of state name'     ['0'] | function | variable names | 
    
        know what the actuall state names are and make lookng them up O(1)
        updating the table in redux will be really easy

        the state names are divided up into a list of string where each string is the part of a name

        name centric integer indicies {word: intLocation}

        show as a level order traversal
        make the state names keys searchable

        // it should be easy to get the variable name state from the user's variable name
        // getVariable(getValue(tree, stateName), 'value') => object from key 'value 0'
        /*
        name: ['root']
        nextParts: {    'elementary school':1,
                        'problem set 0':1,
                        'problem 0':1}
        function: returnState

        nextStates: []
        children: {'a 0': 1, 'b 0': 1, 'answerForm 0': 1},

        variableNames: ['value 1',
                        'quantity 1',
                        'isForm 1',
                        'operationType 1']

        table : {
            0 : {
            name: ['root'],
            all the starts of the links are right here
            needs to have key value pairs to make lookup O(1)
            nextParts: {'elementary school':1,
                        'problem set 0':1,
                        'problem 0':1,
                        'a 0':1,
                        'value 0': 1,
                        'quantity 0': 1,
                        'isForm 0': 1,
                        'operationType 0':1,

                        'b 0': 1,
                        'value 1': 1,
                        'quantity 1': 1,
                        'isForm 1': 1,
                        'operationType 1':1}

            },
            'elementary school': {
                name: ['elementary school'],
                children: {0: ['problem set 0']}
                variableNames: {problemSets: 1}

            },
            'problem set 0': {
                name: ['problem set 0'],
                children: { 0: ['problem 0']}
                variableNames: {problems: 1}

            }

            'problem 0': {
                name: ['problem 0']
                children: { 0: ['a 0']
                            1: ['b 0']}

            }

            'a 0': {
                name: ['a 0'],
                variableNames: ['value 0', 'quantity 0', 'isForm 0', 'operationType 0']

            },
            'value 0': {
                name: ['value 0'],
                value: 4
            },
            'quantity 0': {
                name: ['quantity 0'],
                value: makeQuantity(4, answer)
            }
            'isForm 0'; {
                name: ['isForm 0'],
                value: false
            },
            'operationType 0': {
                name: ['operationType 0'],
                value: ''
            }

            'b 0': {
                name: ['b 0'],
                variableNames: ['value 1', 'quantity 1', 'isForm 1', 'operationType 1']

            },
            'value 1': {
                name: ['value 1'],
                value: 4
            },
            'quantity 1': {
                name: ['quantity 1'],
                value: makeQuantity(4, answer)
            }
            'isForm 1'; {
                name: ['isForm 1'],
                value: false
            },
            'operationType 1': {
                name: ['operationType 1'],
                value: ''
            }



            
    ]
        */
        'elementary school' : {
            children: {
                'problem set': {
                    0: {
                        a: {
                            'function': returnState,
                            // array of primitives or primitives
                            variables: {
                                value: 4,
                                quantity: makeQuantity(4, answer),
                                isForm: false,
                                operationType: ''
                            },
                        },
                        b: {
                            'function': returnState,
                            variables: {
                                value: 3,
                                quantity: makeQuantity(3, answer),
                                isForm: false,
                                operationType: '+'
                            },
                        },
                        // this state chart will start on the bottom and end up on the 'top'
                        answerForm: {
                            'function': returnState,
                            variables: {
                                isForm: true,
                                operationType: ''

                            },
                            // is it right to do this?
                            // 1 context for each 
                            // 2 different contexts but the message depends on the submission and we start execution at submission
                            // a Reducers will have to juggle code for 2 different states
                            // the Reducers can read from a neighboring state but can't write to it
                            // ideally we would have 1 Reducers at the top state to address this directly
                            // we start at submission so there are no children states to run

                            // the submission state travels to the progressMeter as we can only have reducers associated
                            // with buttons and the progressMeter variables doesn't depend on a button

                            // for the contextual state chart philosophy, submission should be a child state of answerForm
                            // and it's in reality a context of answerForm(fix it later)
                            // children states were not originally meant to have variables of their own unless they were parents
                            submission: {
                                
                                'function': returnState,

                                variables: {
                                    value: undefined,
                                    quantity: makeQuantity(0, answer),
                                    correct: false, // true when the answer is right
                                    actualAnswer: answer,
                                    submitCount: 0,


                                },
                                nextStates: [['redux', 'elementary school', 'children', 'noValue'],
                                            ['redux', 'elementary school', 'children', 'isInteger'],
                                            ['redux', 'elementary school', 'children', 'isNotInteger']
                                        ],
                                childrenStateLinks: [],
                                // can't relocate these states(as was done wtih the validator states) as they are contexts within the answerForm state
                                checkSubmissionCount: {
                                    'function': returnState,
                                    nextStates: [
                                        ['redux', 'elementary school', 'children', 'problem set', 0,
                                        'answerForm',
                                        'submission',
                                        'checkCorrectnessFirstTime'],
                                        ['redux', 'elementary school', 'children', 'allOtherTimesSubmitting']

                                    ],
                                    childrenStateLinks: [],

                                },
                                checkCorrectnessFirstTime: {
                                    'function': returnState,
                                    nextStates : [['redux', 'elementary school', 'children', 'problem set', 0,
                                        'answerForm',
                                        'progressMeter']],
                                    childrenStateLinks: [],

                                }
                            },
                            progressMeter: {
                                'function': returnState,

                                variables: {
                                    correctFirstTime: false,  // true if submitCount === 0

                                    testingWithoutForm: false

                                },
                                nextStates: [],
                                childrenStateLinks: []
                            }
                        }
                    }
                },
                // these are here so they aren't copied so many time inside the answerForm state
               'noValue': {
                    'function': noValue,
                    nextStates: [],
                    childrenStateLinks: []

                },
                'isInteger': {
                    'function': isInteger,
                    nextStates: [['redux', 'elementary school', 'children', 'submitValue']],
                    childrenStateLinks: []
                },
                'isNotInteger': {
                    'function': returnState,
                    nextStates: [],
                    childrenStateLinks: []

                },
                'submitValue': {
                    // need a context for each form
                    'function': submitValue,
                    nextStates: [
                        // go to the progressMeter state
                        ['redux', 'elementary school', 'children', 'isFirstTimeSubmitting'],
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