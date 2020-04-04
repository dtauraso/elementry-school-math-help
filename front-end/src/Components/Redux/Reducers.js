import { makeQuantity } from '../../utility'
import {    setToValue,
            makeCell,
            setCell,
            append,
            getValue,
            deepAssign,
            makeSet,
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
    // we have no way of knowing if the value they entered is wrong or too small
    // console.log('new tree 2', newState, stateName)
// pass in correctFirstTime
    newState = set(newState, parentStateName, 'correct', ['actualAnswer', 'value'], determineAnswer)

    newState = set(newState, parentStateName, 'feedbackMessage', ['actualAnswer', 'value'], determineAnswerMessage)

    newState = set(newState, parentStateName, 'backgroundColor', 'black')

    // console.log('new tree 3', newState, stateName)
    newState = set(newState, parentStateName, 'submitCount', getVariable(newState, parentStateName, 'submitCount').value + 1)
    const submitCount = getVariable(newState, parentStateName, 'submitCount').value

    // so this matches gotItRightTheFirstTime
    if(submitCount === 1) {
        newState = set(newState, parentStateName, 'firstAnswer', getVariable(newState, parentStateName, 'value').value)

    }

    console.log('new tree 4', newState, stateName)

    return [newState, true]
    
}
const gotItRightTheFirstTime = (state, action) => {

    // complex reducer because within the context of contextual state charts it can update 2 different parent states
    console.log("here", action, state)
    const stateName = action.type
    // the vars are from the basePath
    const parentStateName = action.meta.parentStateName
    const submissionStateName = action.meta.basePath
    console.log('parent', parentStateName)
    let submitCount = getVariable(state, submissionStateName, 'submitCount').value
    let correct = getVariable(state, submissionStateName, 'correct').value
    let newState = state
    if(submitCount === 1 && correct) {
        newState = set(newState, parentStateName, 'correctFirstTime', true)

        // need to use the same parent state name for getting and setting
        const feedbackMessage = getVariable(state, submissionStateName, 'feedbackMessage').value
        newState = set(newState, submissionStateName, 'feedbackMessage', feedbackMessage + '1')

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
        /*
        stateName0 : {
            'roots next parts': 1
            'state table': 1
            'next states from': {
                anotherstateName0: 1,
            'state data': {

            }
            }
        }
        */
       ...makeCell({
            name: ['root'],
            nextParts : [   'elementary school',
                            'problem set 0',
                            'problem 0',
                            'problemParts 0',
                            '0 0',
                            '1 0',
                            '2 0',
                            'noValue 0',
                            'isInteger 0',
                            'isNotInteger 0',
                            'submitValue 0',
                            'got it right the first time 0',
                            'else 0'],
        }),
        ...makeCell({
            name: ['elementary school'],
            children: [['problem set 0']],
            variableNames: ['problemSets 0']
        }),
        ...makeCell({
            name: ['problemSets 0'],
            value: 1
        }),

        ...makeCell({
            name: ['problem set 0'],
            children: [['problem 0']],
            variableNames: ['numberOfProblems 0']
        }),
        ...makeCell({
            name: ['numberOfProblems 0'],
            value: 1
        }),
        ...makeCell({  // key of AddTwoValues maps to this
            name: ['problem 0'],
            children: [['0 0'], ['1 0'], ['2 0']], // can use the OneValue key and the AddTwoValues key
            variableNames: ['problemParts 0']
        }),
        ...makeCell({
            name: ['problemParts 0'],
            value: 3
        }),
        ...makeCell({ // a
            name: ['0 0'],
            variableNames: ['value 0', 'quantity 0', 'isForm 0', 'operationType 0']
        }),

        ...makeCell({
            name: ['value 0'],
            value: 4
        }),

        ...makeCell({
            name: ['quantity 0'],
            value: makeQuantity(4, answer)
        }),

        ...makeCell({
            name: ['isForm 0'],
            value: false
        }),

        ...makeCell({
            name: ['operationType 0'],
            value: ''
        }),


        ...makeCell({ // b
            name: ['1 0'],
            variableNames: ['value 1', 'quantity 1', 'isForm 1', 'operationType 1']
        }),
        ...makeCell({
            name: ['value 1'],
            value: 3
        }),
        ...makeCell({
            name: ['quantity 1'],
            value: makeQuantity(3, answer)
        }),
        ...makeCell({
            name: ['isForm 1'],
            value: false
        }),
        ...makeCell({
            name: ['operationType 1'],
            value: '+'
        }),

        // intermediate state that also has variable names
        ...makeCell({ // anserForm
            name: ['2 0'],
            nextParts: ['submission 0', 'progressMeter 0'],
            variableNames: ['isForm 2', 'operationType 2']
        }),
            ...makeCell({
                name: ['isForm 2'],
                value: true
            }),
            ...makeCell({
                name: ['operationType 2'],
                value: ''
            }),

       

        // we start our submitting the answer with this cell
        // this index corresponds to the total number of problems

        ...makeCell({
            name: ['2 0', 'submission 0'],
            nextParts: ['update Users\'s answer 0'],
            functionCode: returnState,
            nextStates: [['2 0', 'progressMeter 0']],
            children: [['noValue 0'], ['isInteger 0'], ['isNotInteger 0']],

            variableNames: ['value 2',
                            'quantity 2',
                            'correct 2',
                            'firstAnswer 2',
                            'actualAnswer 2',
                            'submitCount 2',
                            'feedbackMessage 2',
                            'backgroundColor 2']
        }),
                    ...makeCell({
                        name: ['2 0', 'submission 0', 'update Users\'s answer 0'],
                        functionCode: 'updateTypedAnswer',
                        nextStates: [],
                        chldren: []

                    }),
            // just indenting the code

            ...makeCell({
                name: ['value 2'],
                value: null
            }),
            ...makeCell({
                name: ['quantity 2'],
                value: makeQuantity(0, answer)
            }),
            ...makeCell({
                name: ['correct 2'],
                value: false
            }),
            ...makeCell({
                name: ['firstAnswer 2'],
                value: null
            }),
            ...makeCell({
                name: ['actualAnswer 2'],
                value: answer
            }),
            ...makeCell({
                name: ['submitCount 2'],
                value: 0
            }),
            ...makeCell({
                name: ['feedbackMessage 2'],
                value: 'O2'
            }),
            ...makeCell({
                name: ['backgroundColor 2'],
                value: 'white'
            }),

            // submit states
            // for now keep them as next states
            ...makeCell({
                name: ['noValue 0'],
                functionCode: noValue,
                nextStates: [],
            }),
            ...makeCell({
                name: ['isInteger 0'],
                functionCode: isInteger,
                nextStates: [['submitValue 0']],
            }),
            ...makeCell({
                name: ['isNotInteger 0'],
                functionCode: returnState,
                nextStates: [],
            }),
            ...makeCell({
                name: ['submitValue 0'],

                // need a context for each form
                functionCode: submitValue,
                nextStates: [],
            }),

        // can enter a submachine again
        ...makeCell({
            name: ['2 0', 'progressMeter 0'],
            functionCode: returnState,
            nextStates: [],
            children: [ ['got it right the first time 0'], // passes if they are right and submission count == 1
                        ['else 0']],
            variableNames: [
                            'correctFirstTime 0',
                            'testingWithoutForm 0'
                        ]
        }),
        ...makeCell({
            name: ['correctFirstTime 0'],
            value: false
        }),
        ...makeCell({
            name: ['testingWithoutForm 0'],
            value: false
        }),
        ...makeCell({
            name: ['got it right the first time 0'],
            functionCode: gotItRightTheFirstTime,
            nextStates: []
        }),

        ...makeCell({
            name: ['else 0'],
            functionCode: returnState,
            nextStates: [],
        })            
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
// make an add state edges to root function
// add another set of states for the next problem
// let numberOfProblems = 1;
// let iA = 3 * numberOfProblems
// let iB = (3 * numberOfProblems) + 1
// let iAnswer = (3 * numberOfProblems) + 2
/*
new states to add to root

`problem ${numberOfProblems}`
`${iA} ${numberOfProblems}`
`${iB} ${numberOfProblems}`
`${iAnswer} ${numberOfProblems}`
`correctFirstTime ${numberOfProblems}`
`got it right the first time ${numberOfProblems}`
`else ${numberOfProblems}`


increment the numberOfProblems
add the new cells in
*/

// add another problem
Root2 = {
    ...Root2,
    
    'numberOfProblems': {
        ...Root2.numberOfProblems,
        value: getVariable(Root2, ['problem set 0'], 'numberOfProblems').value + 1
    }
}
// id calculating is wrong
// the cordinates to the states also pointied to an invalid state and one of the values was an integer
let numberOfProblems = getVariable(Root2, ['problem set 0'], 'numberOfProblems').value
let iA = 3 * numberOfProblems
let iB = iA + 1
let iAnswer = iA + 2
console.log("new starting values", iA, iB, iAnswer)
// links for root
let newNextParts = makeSet([
    `problem ${numberOfProblems}`,
    `${iA} ${numberOfProblems}`,
    `${iB} ${numberOfProblems}`,
    `${iAnswer} ${numberOfProblems}`,
    `noValue ${numberOfProblems}`,
    `isInteger ${numberOfProblems}`,
    `isNotInteger ${numberOfProblems}`,
    `submitValue ${numberOfProblems}`,
    `got it right the first time ${numberOfProblems}`,
    `else ${numberOfProblems}`
])

// new child for problem set 0
let neChildrenForProblemSet = [
    [`problem ${numberOfProblems}`]
]

// console.log('new problemset', newNextPartsForProblemSet)
// console.log("old stuff", {...Root2['problem set 0'].children})
// let newChildSet = {...Root2['problem set 0'].children, ...neChildrenForProblemSet}
// console.log('combination', newChildSet)
Root2 = {
    ...Root2,
    'root': {
        ...Root2.root,
        nextParts: {
            ...Root2.root.nextParts,
            ...newNextParts
        }

    },
    'problem set 0': {
        ...Root2['problem set 0'],
        children: [...Root2['problem set 0'].children, ...neChildrenForProblemSet]
    }
}
// the states representing the problem
let x = {
        // ...makeCell({
        //     name,
        //     nextParts,
        //     functionCode,
        //     nextStates,
        //     children,
        //     variableNames
        //     value
        // })

        // after add 1
        ...makeCell({
            name: [`problem ${numberOfProblems}`],  // key of AddTwoValues maps to this

            // 0, 1, 2    3, 4, 5   6, 7, 8
            children: [ [`${iA} ${numberOfProblems}`],
                        [`${iB} ${numberOfProblems}`],
                        [`${iAnswer} ${numberOfProblems}`]],   // can use the OneValue key and the AddTwoValues key
            variableNames: [`problemParts ${numberOfProblems}`]
        }),

            ...makeCell({
                name: [`problemParts ${numberOfProblems}`],
                value: 3
            }),


        ...makeCell({ // a
            name: [`${iA} ${numberOfProblems}`],
            variableNames: [`value ${iA}`,
                            `quantity ${iA}`,
                            `isForm ${iA}`,
                            `operationType ${iA}`]
        }),

                ...makeCell({
                    name: [`value ${iA}`],
                    value: 5
                }),

                ...makeCell({
                    name: [`quantity ${iA}`],
                    value: makeQuantity(5, 5 + 6)
                }),

                ...makeCell({
                    name: [`isForm ${iA}`],
                    value: false
                }),

                ...makeCell({
                    name: [`operationType ${iA}`],
                    value: ''
                }),



        ...makeCell({
            name: [`${iB} ${numberOfProblems}`], // b
            variableNames: [`value ${iB}`,
                            `quantity ${iB}`,
                            `isForm ${iB}`,
                            `operationType ${iB}`]
        }),

                ...makeCell({
                    name: [`value ${iB}`],
                    value: 6
                }),

                ...makeCell({
                    name: [`quantity ${iB}`],
                    value: makeQuantity(6, 5 + 6)
                }),

                ...makeCell({
                    name: [`isForm ${iB}`],
                    value: false
                }),

                ...makeCell({
                    name: [`operationType ${iB}`],
                    value: '+'
                }),

        // intermediate state that also has variable names
        ...makeCell({
            name: [`${iAnswer} ${numberOfProblems}`],
            nextParts: [`submission ${numberOfProblems}`, `progressMeter ${numberOfProblems}`],
            variableNames: [`isForm ${iAnswer}`, `operationType ${iAnswer}`]
        }),

                ...makeCell({
                    name: [ `isForm ${iAnswer}`],
                    value: true
                }),

                ...makeCell({
                    name: [`operationType ${iAnswer}`],
                    value: ''
                }),

        // we start our submitting the answer with this cell
        // this index corresponds to the total number of problems

        ...makeCell({
            name: [`submission ${numberOfProblems}`],
            functionCode: returnState,
            nextStates: [[`${iAnswer} ${numberOfProblems}`, `progressMeter ${numberOfProblems}`]],

            children: [ [`noValue ${numberOfProblems}`],
                        [`isInteger ${numberOfProblems}`],
                        [`isNotInteger ${numberOfProblems}`]],
            variableNames: [`value ${iAnswer}`,
                            `quantity ${iAnswer}`,
                            `correct ${iAnswer}`,
                            `firstAnswer ${iAnswer}`,
                            `actualAnswer ${iAnswer}`,
                            `submitCount ${iAnswer}`,
                            `feedbackMessage ${iAnswer}`,
                            `backgroundColor ${iAnswer}`]
        }),

                // just indenting the code
                ...makeCell({
                    name: [`value ${iAnswer}`],
                    value: null
                }),

                ...makeCell({
                    name: [`quantity ${iAnswer}`],
                    value: makeQuantity(0, 5 + 6)
                }),

                ...makeCell({
                    name: [`correct ${iAnswer}`],
                    value: false
                }),

                ...makeCell({
                    name: [`firstAnswer ${iAnswer}`],
                    value: null
                }),

                ...makeCell({
                    name: [`actualAnswer ${iAnswer}`],
                    value: answer
                }),

                ...makeCell({
                    name: [`submitCount ${iAnswer}`],
                    value: 0
                }),

                ...makeCell({
                    name: [`feedbackMessage ${iAnswer}`],
                    value: 'O'
                }),

                ...makeCell({
                    name: [`backgroundColor ${iAnswer}`],
                    value: 'white'
                }),

                // submit states
                // for now keep them as next states
                ...makeCell({
                    name: [`noValue ${numberOfProblems}`],
                    functionCode: noValue,
                    nextStates: [],
                }),

                ...makeCell({
                    name: [`isInteger ${numberOfProblems}`],
                    functionCode: isInteger,
                    nextStates: [[`submitValue ${numberOfProblems}`]],
                }),

                ...makeCell({
                    name: [`isNotInteger ${numberOfProblems}`],
                    functionCode: returnState,
                    nextStates: [],
                }),

                ...makeCell({
                    name: [`submitValue ${numberOfProblems}`],

                    // need a context for each form
                    functionCode: submitValue,
                    nextStates: [],
                }),

            // can enter a submachine again
            ...makeCell({
                name: [`${iAnswer} ${numberOfProblems}`, `progressMeter ${numberOfProblems}`],
                functionCode: returnState,
                nextStates: [],
                children: [ [`got it right the first time ${numberOfProblems}`], // passes if they are right and submission count == 1
                            [`else ${numberOfProblems}`]],
                variableNames:  [
                                `correctFirstTime ${numberOfProblems}`,
                                `testingWithoutForm ${numberOfProblems}`
                            ]
            }),

                ...makeCell({
                    name: [`correctFirstTime ${numberOfProblems}`],
                    value: false
                }),

                ...makeCell({
                    name: [`testingWithoutForm ${numberOfProblems}`],
                    value: false
                }),

            ...makeCell({
                name: [`got it right the first time ${numberOfProblems}`],
                functionCode: gotItRightTheFirstTime,
                nextStates: [],
            }),

            ...makeCell({
                name: [`else ${numberOfProblems}`],
                functionCode: returnState,
                nextStates: [],
            })


    }
Root2 = {
    ...Root2,
    ...x
}
console.log('state to export', Root2)
export var Root = Root2;