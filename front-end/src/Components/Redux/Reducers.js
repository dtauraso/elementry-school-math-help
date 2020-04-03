import { makeQuantity } from '../../utility'
import {    setToValue,
            setCell,
            append,
            getValue,
            deepAssign,
            tableAssign,
            makeVariablePath,
            makeVariablePath2,
            getCell,
            getVariable,
            getChild,
            set,
            setArray } from '../../reducerHelpers'

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

        const parentStateName = action.meta.parentStateName

        let newState = setArray(
            state,
            parentStateName,
            'quantity',
            makeQuantity(0,
                    getVariable(state, parentStateName, 'actualAnswer').value))

        newState = set(newState, parentStateName, 'feedbackMessage', 'O')

        newState = set(newState, parentStateName, 'backgroundColor', 'white')
        
        return [newState, true]
    
    }
    return [state, false]
}
const isInteger = (state, action) => {
    return [state, !isNaN(parseInt(action.payload.newValue)) === true]
}
const determineAnswerMessage = (actualAnswer, value) => {
    
    return actualAnswer === value? 'O':'X'
    // if correct first time
        // append 1 to the returned result
}

const determineAnswer = (actualAnswer, value) => {
    return actualAnswer === value
}
const submitValue = (state, action/*e*/) => {
    // start changing this state
    console.log("submit value", action.type, action.meta.parentStateName)
    // console.log(e.target.value)
    // console.log(pathDownObject)
    // console.log(answerForm)
    // console.log("submit value")
    // console.log("current state", action.meta.currentState)
    // fails when the user puts in an empty value

    // in the submission state
    // console.log(state, action.type)
    // all the info has made it this far
    const { newValue } = action.payload
    const stateName = action.type
    const parentStateName = action.meta.parentStateName

    // const { basePath } = action.meta.basePath
    // const variablesBasePath = [...action.meta.basePath, 'variables']

    // [...action.type, 'variables'] is the path to the vars for the answer form
    // console.log(getValue(state, makeVariablesObjectPath(action)))
    // console.log("set value", parentStateName, getVariable(state, parentStateName, 'value'))
    // this line works
    let newState = set(state, parentStateName, 'value', parseInt(newValue))
    
    // console.log('new tree')
    // console.log(newState, stateName)
    // console.log("correct", getVariable(state, parentStateName, 'correct'))
    let actualAnswer = getVariable(newState, parentStateName, 'actualAnswer').value
    let maxValue = newValue > actualAnswer? newValue: actualAnswer
    newState = setArray(
        newState,
        parentStateName,
        'quantity',
        makeQuantity(newValue,
            maxValue)
                )
    // console.log('new tree 2', newState, stateName)
// pass in correctFirstTime
    newState = set(newState, parentStateName, 'correct', ['actualAnswer', 'value'], determineAnswer)

    newState = set(newState, parentStateName, 'feedbackMessage', ['actualAnswer', 'value'], determineAnswerMessage)

    newState = set(newState, parentStateName, 'backgroundColor', 'black')

    // console.log('new tree 3', newState, stateName)
    const submitCount = getVariable(newState, parentStateName, 'submitCount').value
    newState = set(newState, parentStateName, 'submitCount', getVariable(newState, parentStateName, 'submitCount').value + 1)
    // so this matches gotItRightTheFirstTime
    if(submitCount === 1) {
        newState = set(newState, parentStateName, 'firstAnswer', getVariable(newState, parentStateName, 'value').value)

    }

    console.log('new tree 4', newState, stateName)

    return [newState, true]
    
}
const gotItRightTheFirstTime = (state, action) => {
    console.log("here", action, state)
    const stateName = action.type
    // the vars are from the basePath
    const parentStateName = action.meta.basePath
    console.log('parent', parentStateName)
    let submitCount = getVariable(state, parentStateName, 'submitCount').value
    let correct = getVariable(state, parentStateName, 'correct').value
    let newState = state
    if(submitCount === 1 && correct) {
        newState = set(newState, parentStateName, 'correctFirstTime', true)
        return [newState, true]

    }
    return [newState, false]

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
let Root2 = {
    // get rid of this level
    // redux: {
        // have a Root category
        // have a BreakApp category
        // store the different Reducers functions outside this function
        // break up the reducers but keep the store the same
        // Cat: {
        //     children: [['FETCH_CAT_START']],
        //     variables: [['error'], ['catPic']]
        // },
        // error: '',
        // catPic: null,
        
        // -> FETCH_CAT_SUCCESS or FETCH_CAT_FAILURE
        // 'FETCH_CAT_START' : {
            
        //     'next': [['FETCH_CAT_SUCCESS'], ['FETCH_CAT_FAILURE']],
        //     'functions': fetchCatStart
        // },

        // 'FETCH_CAT_SUCCESS' : {
        //     // {'next': {'0': {'validate':'0', 'invalid':'0'}},
        //     'functions': fetchCatSuccess
        // },

        // 'FETCH_CAT_FAILURE' : {
        //     // {'next': {'0': {}},
        //     // 'children': {'0': {'char':'0'}},
        //     'functions': fetchCatFailure
        // },
        'root' : {
            name: ['root'],
            // all the starts of the links are right here
            // only the states need to be listed here.  the variables can be accessed from their parent states
            nextParts: {'elementary school':1,
                        'problem set 0':1,

                        'problem 0':1,
                        'problemParts 0': 1,
                        '0 0':1,

                        
                        '1 0': 1,

                        '2 0': 1,

                        'noValue 0': 1,
                        'isInteger 0': 1,
                        'isNotInteger 0': 1,


                        'submitValue 0': 1,


                        'got it right the first time 0': 1,
                        'else 0': 1,

                        // 'isFirstTimeSubmitting 0': 1,
                        // 'allOtherTimesSubmitting 0': 1
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
            variableNames: ['numberOfProblems 0']
        },
        'numberOfProblems 0': {
            name: ['numberOfProblems 0'],
            value: 1
        },
        'problem 0': { // key of AddTwoValues maps to this
            name: ['problem 0'],
            children: {'0 0': 1, '1 0': 1, '2 0': 1}, // can use the OneValue key and the AddTwoValues key
            variableNames: ['problemParts 0']
        },
        'problemParts 0': {
            name: ['problemParts 0'],
            value: 3
        },


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
            value: 3
        },
        'quantity 1': {
            name: ['quantity 1'],
            value: makeQuantity(3, answer)
        },
        'isForm 1': {
            name: ['isForm 1'],
            value: false
        },
        'operationType 1': {
            name: ['operationType 1'],
            value: '+'
        },

        // intermediate state that also has variable names
        '2 0': { // anserForm
            name: ['2 0'],
            nextParts: {'submission 0':1,
                        'progressMeter 0': 1},
            variableNames: ['isForm 2', 'operationType 2']
        },
            'isForm 2': {
                name: ['isForm 2'],
                value: true
            },
            'operationType 2': {
                name: ['operationType 2'],
                value: ''
            },
        // we start our submitting the answer with this cell
        // this index corresponds to the total number of problems
        'submission 0': {

            name: ['2 0', 'submission 0'],
            'function': returnState,

            nextStates: [['2 0', 'progressMeter 0']],
            children: {'noValue 0': 1,
                        'isInteger 0': 1,
                        'isNotInteger 0': 1},
                        

            // indeces in variableNames corresponds to the number of problems * (3 - 1)

            variableNames: ['value 2',
                            'quantity 2',
                            'correct 2',
                            'firstAnswer 2',
                            'actualAnswer 2',
                            'submitCount 2',
                            'feedbackMessage 2',
                            'backgroundColor 2']
        },
            // just indenting the code
            'value 2': {
                name: ['value 2'],
                value: undefined
            },
            'quantity 2': {
                name: ['quantity 2'],
                value: makeQuantity(0, answer)
            },
            'correct 2': {
                name: ['correct 2'],
                value: false
            },
            'firstAnswer 2': {
                name: ['firstAnswer 2'],
                value: null
            },
            'actualAnswer 2': {
                name: ['actualAnswer 2'],
                value: answer
            },
            
            'submitCount 2': {
                name: ['submitCount 2'],
                value: 0
            },
            'feedbackMessage 2': {
                name: ['feedbackMessage 2'],
                value: 'O'
            },
            'backgroundColor 2': {
                name: ['backgroundColor 2'],
                value: 'white'
            },
            // submit states
            // for now keep them as next states
            'noValue 0': {
                'function': noValue,
                nextStates: [],
                // parents: 
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
                nextStates: [],

            },


        // can enter a submachine again
        'progressMeter 0': {
            name: ['2 0', 'progressMeter 0'],
            'function': returnState,
            // (state, action) => {
            //     console.log("at progress meter", state)
            //     return [state, true]
            // },
            nextStates: [],
            children: {
                        'got it right the first time 0': 1, // passes if they are right and submission count == 1
                        'else 0': 1
                        },
            variableNames: [
                            'correctFirstTime 0',
                            'testingWithoutForm 0'
                        ]
        },
        'correctFirstTime 0': {
            name: ['correctFirstTime 0'],
            value: false
        },
        'testingWithoutForm 0': {
            name: ['testingWithoutForm 0'],
            value: false
        },
        'got it right the first time 0': {
            name: ['got it right the first time'],
            'function': gotItRightTheFirstTime,
            nextStates: []
        },
        'else 0': {
            name: ['else 0'],
            'function': returnState,
            nextStates: []
        },
        
        // 'isFirstTimeSubmitting 0' : {
        //     'function': isFirstTimeSubmitting,
        //     nextStates: [],
        //     childrenStateLinks: []

        // },
        // 'allOtherTimesSubmitting 0': {
        //     'function': allOtherTimesSubmitting,
        //     nextStates: [],
        //     childrenStateLinks: []

        // }
            
        /*
        
        state table
        name_i            next parts(name_(i + 1)) | state data
        'root'            ['part of state name'] |
        'part of state name'     ['0'] | function | variable names | 
    
        know what the actuall state names are and make lookng them up O(1)
        updating the table in redux will be really easy

        the state names are divided up into a list of string where each string is the part of a name


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

        */

    
    
}
// run init stuff here with bft
// Root2 = {}

export var Root = Root2;