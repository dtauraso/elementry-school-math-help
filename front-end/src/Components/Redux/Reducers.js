import { makeQuantity } from '../../utility'
import {    makeCell,
            makeSet,
            getVariable,
            getJsObject,
            tableAssign,
            tableAssignJsObject,
            set,
            setArray,
            breathFirstTraversal, 
            getCell,
            getChildren} from '../../reducerHelpers'

const problems = [
    {a: 4, b: 3},

    {a: 5, b: 6},

    {a: 2, b: 4},

    {a: 9, b: 4},

    {a: 5, b: 1}


]

// const answer = 4 + 3
// const secondAnswer =

// example states for the axios calls

const setupProblem = (state, action) => {

    // need to put this into a for loop
    // ['elementary school', 'utilities', 'create problem']
    // ['problemCount']
    const parentOfProblemCount = ['elementary school', 'utilities', 'create problem']
    let numberOfProblems2 = getVariable(state, parentOfProblemCount, 'problemCount').value
    console.log('we need to make', numberOfProblems2, 'problems')
    console.log(state)
    console.log('about to make a problem', getVariable(state, ['problem set 0'], 'numberOfProblems').value)

    let Root2 = state


    for(let i = 0; i < numberOfProblems2; i++) {
        Root2 = {
            ...Root2,
            
            'numberOfProblems 0': {
                ...Root2.numberOfProblems,
                value: getVariable(Root2, ['problem set 0'], 'numberOfProblems').value + 1
            }
        }
    
        let numberOfProblems = getVariable(Root2, ['problem set 0'], 'numberOfProblems').value
        let i = numberOfProblems - 1
        // console.log(numberOfProblems, problems[numberOfProblems])
        const ithProblem = problems[i]
        console.log(i, 'th problem', ithProblem)
        let iA = 3 * i
        let iB = iA + 1
        let iAnswer = iA + 2
        console.log("new starting values", iA, iB, iAnswer)
        // links for root
        let newNextParts = makeSet([
            `problem ${i}`,
            `${iA} ${i}`,
            `${iB} ${i}`,
            `${iAnswer} ${i}`,
            `noValue ${i}`,
            `isInteger ${i}`,
            `isNotInteger ${i}`,
            `submitValue ${i}`,
            `got it right the first time ${i}`,
            `else ${i}`
        ])
        
        // new child for problem set 0
        let newChildrenForProblemSet = [
            [`problem ${i}`]
        ]
        
    
        // add starting trie links to root and add the new problem child to the problem set
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
                children: [...Root2['problem set 0'].children, ...newChildrenForProblemSet]
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
                    name: [`problem ${i}`],  // key of AddTwoValues maps to this
        
                    // 0, 1, 2    3, 4, 5   6, 7, 8
                    children: [ [`${iA} ${i}`],
                                [`${iB} ${i}`],
                                [`${iAnswer} ${i}`]],   // can use the OneValue key and the AddTwoValues key
                    variableNames: [`problemParts ${i}`]
                }),
        
                    ...makeCell({
                        name: [`problemParts ${i}`],
                        value: 3
                    }),
        
        
                ...makeCell({ // a
                    name: [`${iA} ${i}`],
                    variableNames: [`value ${iA}`,
                                    `quantity ${iA}`,
                                    `isForm ${iA}`,
                                    `operationType ${iA}`]
                }),
        
                        ...makeCell({
                            name: [`value ${iA}`],
                            value: ithProblem.a
                        }),
        
                        ...makeCell({
                            name: [`quantity ${iA}`],
                            value: makeQuantity(ithProblem.a, ithProblem.a + ithProblem.b)
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
                    name: [`${iB} ${i}`], // b
                    variableNames: [`value ${iB}`,
                                    `quantity ${iB}`,
                                    `isForm ${iB}`,
                                    `operationType ${iB}`]
                }),
        
                        ...makeCell({
                            name: [`value ${iB}`],
                            value: ithProblem.b
                        }),
        
                        ...makeCell({
                            name: [`quantity ${iB}`],
                            value: makeQuantity(ithProblem.b, ithProblem.a + ithProblem.b)
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
                    name: [`${iAnswer} ${i}`],  // answerForm
                    nextParts: [`submission ${i}`, `progressMeter ${i}`],
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
                    name: [ `${iAnswer} ${i}`,
                            `submission ${i}`],
                    nextParts: [`update typed answer ${i}`],
        
                    functionCode: returnState,
                    nextStates: [[`${iAnswer} ${i}`, `progressMeter ${i}`]],
        
                    children: [ [`noValue ${i}`],
                                [`isInteger ${i}`],
                                [`isNotInteger ${i}`]],

                    variableNames: [`value ${iAnswer}`,
                                    `quantity ${iAnswer}`,
                                    `correct ${iAnswer}`,
                                    `firstAnswer ${iAnswer}`,
                                    `actualAnswer ${iAnswer}`,
                                    `submitCount ${iAnswer}`,
                                    `feedbackMessage ${iAnswer}`,
                                    `backgroundColor ${iAnswer}`]
                }),
                            ...makeCell({
                                name: [ `${iAnswer} ${i}`,
                                        `submission ${i}`,
                                        `update typed answer ${i}`],
                                functionCode: updateTypedAnswer,
                                nextStates: [],
                                chldren: []
        
                            }),
                        // just indenting the code
                        ...makeCell({
                            name: [`value ${iAnswer}`],
                            value: null
                        }),
        
                        ...makeCell({
                            name: [`quantity ${iAnswer}`],
                            value: makeQuantity(0, ithProblem.a + ithProblem.b)
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
                            value: ithProblem.a + ithProblem.b
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
                            name: [`noValue ${i}`],
                            functionCode: noValue,
                            nextStates: [],
                        }),
        
                        ...makeCell({
                            name: [`isInteger ${i}`],
                            functionCode: isInteger,
                            nextStates: [[`submitValue ${i}`]],
                        }),
        
                        ...makeCell({
                            name: [`isNotInteger ${i}`],
                            functionCode: returnState,
                            nextStates: [],
                        }),
        
                        ...makeCell({
                            name: [`submitValue ${i}`],
        
                            // need a context for each form
                            functionCode: submitValue,
                            nextStates: [],
                        }),
        
                    // can enter a submachine again
                    ...makeCell({
                        name: [`${iAnswer} ${i}`, `progressMeter ${i}`],
                        functionCode: returnState,
                        nextStates: [],
                        children: [ [`got it right the first time ${i}`], // passes if they are right and submission count == 1
                                    [`else ${i}`]],
                        variableNames:  [
                                        `correctFirstTime ${i}`,
                                        `testingWithoutForm ${i}`
                                    ]
                    }),
        
                        ...makeCell({
                            name: [`correctFirstTime ${i}`],
                            value: false
                        }),
        
                        ...makeCell({
                            name: [`testingWithoutForm ${i}`],
                            value: false
                        }),
        
                    ...makeCell({
                        name: [`got it right the first time ${i}`],
                        functionCode: gotItRightTheFirstTime,
                        nextStates: [],
                    }),
        
                    ...makeCell({
                        name: [`else ${i}`],
                        functionCode: returnState,
                        nextStates: [],
                    })
        
        
            }
        Root2 = {
            ...Root2,
            ...x
        }
    }
    
    return [Root2, true]
}
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
const returnState = (state, action) => {
    return [state, true]
}
const updateTypedAnswer = (state, action) => {
    const { newValue } = action.payload
    const stateName = action.type
    const parentStateName = action.meta.parentStateName.slice(0, 2)

    // console.log("got here", parentStateName)
    
    return [set(state, parentStateName, 'value', newValue), true]

}
const noValue = (state, action) => {
    // console.log("is invalid")
    const parentStateName = action.meta.parentStateName
    let newValue = getVariable(state, parentStateName, 'value').value
    if(newValue.length === 0) {

        // const parentStateName = action.meta.parentStateName

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
    const parentStateName = action.meta.parentStateName

    // console.log(getVariable(state, parentStateName, 'value').value,
            // parseInt(getVariable(state, parentStateName, 'value').value))

    return [state, !isNaN(parseInt(getVariable(state, parentStateName, 'value').value)) === true]
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
    // console.log("submit value", action.type, action.meta.parentStateName)
    // console.log(e.target.value)
    // console.log(pathDownObject)
    // console.log(answerForm)
    // console.log("submit value")
    // console.log("current state", action.meta.currentState)
    // fails when the user puts in an empty value

    // in the submission state
    // console.log(state, action.type)
    // all the info has made it this far
    // const { newValue } = action.payload
    const stateName = action.type
    const parentStateName = action.meta.parentStateName
    const newValue = getVariable(state, parentStateName, 'value').value

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

    // console.log('new tree 4', newState, stateName)

    return [newState, true]
    
}
const gotItRightTheFirstTime = (state, action) => {

    // complex reducer because within the context of contextual state charts it can update 2 different parent states
    // console.log("here", action, state)
    const stateName = action.type
    // the vars are from the basePath
    const parentStateName = action.meta.parentStateName
    const submissionStateName = action.meta.basePath
    // console.log('parent', parentStateName)
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
const processProblems = (state, action, cb) => {


    // (i, j) => 00, 10, 20, 31, 41, 51... (numberOfProblems * 3, numberOfProblems)
    // "problem set 0" tells me how many problems we need to use to look for the forms

    let problems = getChildren(state, ['problem set 0'])
    let numberOfProblems = problems.length
    let temporaryState = state
    let i = 0
    let j = -1
    for(; i < numberOfProblems * 3; i += 3) {

        if(i % 3 === 0) {
            j += 1
        }

        temporaryState = cb(temporaryState, i, j)
    }
    return temporaryState

}

const solveProblem = (state, i, j) => {
    let temporaryState = state
    let a = getVariable(state, [`${i} ${j}`], 'value').value
    let b = getVariable(state, [`${i + 1} ${j}`], 'value').value
    let submission =           [`${i + 2} ${j}`, `submission ${j}`]
    // console.log(a, b, c)
    // randomly get it wrong
    let randomValue = Math.floor(Math.random() * 10) % 2

    if(randomValue == 0) {
        temporaryState = set(temporaryState, submission, 'value', a + b)
        let progressMeter = [`${i + 2} ${j}`, `progressMeter ${j}`]
        temporaryState = set(temporaryState, progressMeter, 'correctFirstTime', true)
    
    }
    else {
        temporaryState = set(temporaryState, submission, 'value', a + 1)
        let progressMeter = [`${i + 2} ${j}`, `progressMeter ${j}`]
        temporaryState = set(temporaryState, progressMeter, 'correctFirstTime', false)

    }
    // console.log('result', temporaryState)
    temporaryState = set(temporaryState, submission, 'correct', ['actualAnswer', 'value'], determineAnswer)

    temporaryState = set(temporaryState, submission, 'submitCount', getVariable(temporaryState, submission, 'submitCount').value + 1)

    temporaryState = set(temporaryState, submission, 'firstAnswer', getVariable(temporaryState, submission, 'value').value)

    return temporaryState
}

const autoSolve = (state, action) => {
    // runs through all the forms and solve them for getting test data for the backend
    // this is instead of solving the problems manuallly
    // indexes of the states making up each part of the form
    // a0, b0, answerForm0, ....
    // (i, j) => 00, 10, 20, 31, 41, 51... (numberOfProblems * 3, numberOfProblems)

    // "problem set 0" tells me how many problems we need to use to look for the forms
    // const parentStateName = action.meta.parentStateName

    let temporaryState = processProblems(state, action, solveProblem)
    return [temporaryState, true]

}
const collectProblems = (state, i, j) => {

    // getCell(state, parentStateName)
    // console.log('in collect problems', state)
    let temporaryState = state
    let a = getVariable(state, [`${i} ${j}`], 'value').value
    let b = getVariable(state, [`${i + 1} ${j}`], 'value').value
    let submission =           [`${i + 2} ${j}`, `submission ${j}`]
    let progressMeter =        [`${i + 2} ${j}`, `progressMeter ${j}`]


    let firstAnswer = getVariable(state, submission, 'firstAnswer').value

    let actualAnswer = getVariable(state, submission, 'actualAnswer').value

    let gotItRightTheFirstTime = getVariable(state, progressMeter, 'correctFirstTime').value

    let row = {
        a: a,
        b: b,
        theirAnswer: firstAnswer,
        actualAnswer: actualAnswer,
        gotItRightTheFirstTime: gotItRightTheFirstTime
    }


    let myProblemTable = getCell(state, ['payload'])
    // console.log('my promblem table', myProblemTable)
    temporaryState = tableAssignJsObject(
        state,
        myProblemTable, 
        {   ...myProblemTable.jsObject,
            'problem set table': [...myProblemTable.jsObject['problem set table'], row]

        }
        )

    return temporaryState
    // myProblemTable = [...myProblemTable, row]


    // a0 | b0 | theirAnswer0 | actualAnswer | gotItRightTheFirstTime0
}
const setupForBackend = (state, action) => {

    console.log('we are setting the completed form data for submitting to the backend')
    console.log('state', state)

    // make a single payload state
    let problemTable = makeCell({
        name: ['payload'],
        jsObject: {'problem set table': []}
    })

    let temporaryState = state
    temporaryState = {
        ...temporaryState,
        ...problemTable
        
    }
    // temporaryState = tableAssignJsObject(temporaryState, problemTable['XXXXXXX'], [])
    // console.log('added the problem set table', temporaryState)
    temporaryState = processProblems(temporaryState, action, collectProblems)

    // console.log("done with first part", temporaryState)
    // let x = getCell(temporaryState, ['payload'])
    let myCompletedProblems = getCell(temporaryState, ['payload'])
    // console.log('completed problems', myCompletedProblems)
    const correctProblems = myCompletedProblems.jsObject['problem set table'].filter(problem => problem.gotItRightTheFirstTime).length
    // console.log('correctProblems', correctProblems)
    // calculate % of correct problems
    // round to largest whole number
    // let problemSetTable = makeCell({
    //     name: ['problem sets table'],
    //     jsObject: {nameOfProblemSet: 'problem set 0',
    //                     numberCorrect: correctProblems,
    //                     totalProblems: myCompletedProblems.length
    //                 }

    // })
    // temporaryState = {
    //     ...temporaryState,
    //     ...problemSetTable
        
    // }
    temporaryState = tableAssignJsObject(
        temporaryState,
        myCompletedProblems, 
        {   ...myCompletedProblems.jsObject,
            'problem sets table': {nameOfProblemSet: 'problem set 0',
                                numberCorrect: correctProblems,
                                totalProblems: myCompletedProblems.jsObject['problem set table'].length
                            }
        }
        )


    /*

    maybe just make a js object table
    makeCell({
        name: ['problem set table'],
        jsObject: {
            dddddddd
        }
    })
    problem set table
        the name of the problem set0 | % right

    problems table
        problem
        a0 | b0 | answer0 | theirAnswer0 | gotItRightTheFirstTime0


    */
    return [temporaryState, true]
}
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
                            // rename to 'a 0 0' ? or 'a 0'?
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
            nextParts: ['utilities', 'testing'],
            children: [['problem set 0']],
            variableNames: ['problemSets 0']
        }),
            // the indents are for illustration only(ie, each node entire hierarchical tree is stored at the top level of
            // this js object)
            // dummy intermediate state
            ...makeCell({
                name: ['elementary school', 'utilities'],
                nextParts: ['create problem']
            }),

            ...makeCell({
                name: ['problemSets 0'],
                value: 1
            }),
                ...makeCell({
                    name: ['elementary school', 'utilities', 'create problem'],
                    functionCode: setupProblem,
                    nextStates: [],
                    variableNames: ['problemCount']
                }),
                    ...makeCell({
                        name: ['problemCount'],
                        value: problems.length
                    }),
            ...makeCell({
                name: ['elementary school', 'testing'],
                functionCode: returnState,
                children: [['autoSolve']],
                nextStates: []
            }),
                ...makeCell({
                    name: ['autoSolve'],
                    functionCode: autoSolve,
                    nextStates: [['setup for backend']]
                }),
                ...makeCell({
                    name: ['setup for backend'],
                    functionCode: setupForBackend,
                    nextStates: []

                }),
        ...makeCell({
            name: ['problem set 0'],
            children: [],
            variableNames: ['numberOfProblems 0']
        }),


        ...makeCell({
            name: ['numberOfProblems 0'],
            value: 0
        }),

        

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

// let stateMachine = setupProblem(Root2)
// console.log(stateMachine)
// console.log('state to export', stateMachine[0])
// let machine2 = setupProblem(stateMachine[0])
// machine2 = setupProblem(machine2[0])
let action = {
    type: [['elementary school', 'utilities', 'create problem']],
    meta: {
            basePath: ['elementary school', 'utilities', 'create problem'], // base state(for the object data)
            parentStateName: ['elementary school', 'utilities', 'create problem'],
        }
}
const [temporaryState, success] = breathFirstTraversal(
    Root2,
    action,
    action.type,
    0)
// if(success) {
//     console.log('all reducers are done', temporaryState)
//     return temporaryState
// } else {
//     return state
// }

export var Root = temporaryState