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
            getChildren,
            treeVisualizer,

            makeCell2,
            getCell2,
            tableAssign2,
            tableAssignJsObject2,
            set2,
            setArray2,
            hasSubstates2,
            treeVisualizer2,
            breathFirstTraversal2,
            printTreeInteractive,
            getChild
        
        
        
        
        } from '../../reducerHelpers'

// Only add states when they need to be initially created or enumaerated with a graph generator.
// No singletone states should be created just cause they don't need to exist untill that reducer runs.

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
// how much of the 'highly accurate' shotgun surgery can I get the program to do for me?
/*
to replicate the same counting algorithm with a slightly different state structure
new count var
1 function to make the state tree v vars
1 new context name at the front of all the states being generated
// (instead of `${iA} ${i}` use `display ${iA} ${i}`)
// the offset string will = 'offset '
// the variable access form will look like this `${offsetString}variableName`

*/
// adding a new state and some vars
// new startin next parts from root
// add new state name as a child from the parent

// add the cells representing the new state
// add the var's names to the new state

/* 
adding a single new state
put next parts in root
add a new link to the parent state child set (var set if it's a variable)
fill out the cell form

current state name form (i0. i1, i2)
new state name form (i0 + j. i1, i2)

*/
const appendStates = (temporaryState, states) => {
    return {
        ...temporaryState,
        ...states
    }
}



// root -> stateName1 -> stateName2
/*
guarantees links are made in a consistent manner
f(table, remainingName, stateData)
if remainingName is empty
    return ''

if table[car(remainingName)] exists
    newNextPartName = f(table, rest(remainingName), stateData)
    if newNextPartName !== ''
        // linking current to next
        table[car(remainingName)].nextparts[newNextPartName] = 1
        
        // maintain already existing link
        return car(remainingName)
    else

        // maintain already existing link
        return car(remainingName)
else
    make new node
    table[lastName] = new node
    return new node name
*/

const setJSObject2 = (state, parentStateName, variableName, newValue) => {

    // parentStateName is an array of strings
    let variable = getVariable(state, parentStateName, variableName)

    return {
        ...state,
        
        [variable.name]: {
            ...variable,
            jsObject: newValue
        }
    }
}

const setVariable = (state, parentStateName, variableName, newValue) => {

    // parentStateName is an array of strings
    let variable = getVariable(state, parentStateName, variableName)

    return {
        ...state,
        
        [variable.name]: {
            ...variable,
            value: newValue
        }
    }
}


const makeProblemPartNumber = (  offsetString,
                                i,
                                j,
                                {   value,
                                    quantity,
                                    isForm,
                                    operationType,
                                    isCorrect,
                                    isActualAnswer,
                                    isResult
                                },

                                isForDisplayResultsOnly
                            ) => {

    // i is the ith problem
    let problemPartCoordinates = `${offsetString}${i} ${j}`
    let ij = `${i} ${j}`

    let problem_i = `${offsetString}problem ${i}`
    let problem_i_displayResult = `${problemPartCoordinates} displayResult`

    let valueName = `${offsetString}value ${ij}`
    let quantityName = `${offsetString}quantity ${ij}`
    let isFormName = `${offsetString}isForm ${ij}`
    let operationTypeName = `${offsetString}operationType ${ij}`



    let isCorrectName = `${offsetString}isCorrect ${ij}`
    let isActualAnswerName = `${offsetString}isActualAnswerName ${ij}`
    let isResultName = `${offsetString}isResultName ${ij}`

    return {
        [problemPartCoordinates]: {
            parent: problem_i,
            name: problemPartCoordinates,
            substates: isForDisplayResultsOnly? []: ['displayResult'],
            variableNames: [valueName,
                            quantityName,
                            isFormName,
                            operationTypeName]

            },
            ...(isForDisplayResultsOnly? {}: {
                    // These are set to meaningfull values in the results route
                    [problem_i_displayResult]: {
                        parent: problemPartCoordinates,
                        name: problem_i_displayResult,
                        variableNames: [isCorrectName,
                                        isActualAnswerName,

                                        // tells OneValue to render a slightly different sequence of components when we are
                                        // in the results route (redux flag -> sequence of react components,
                                        // also, each flag must be exclusive)
                                        isResultName,
                        ]
                    },
                        [isCorrectName]: {
                            parent: problem_i_displayResult,
                            name: isCorrectName,
                            value: isCorrect
                        },
                        [isActualAnswerName]: {
                            parent: problem_i_displayResult,
                            name: isActualAnswerName,
                            value: isActualAnswer
                        },
                        [isResultName]: {
                            parent: problem_i_displayResult,
                            name: isResultName,
                            value: isResult
                        }
            }),
                

            [valueName]: {
                parent: problemPartCoordinates,
                name: valueName,
                value: value
            },
            [quantityName]: {
                parent: problemPartCoordinates,
                name: quantityName,
                value: quantity
            },
            [isFormName]: {
                parent: problemPartCoordinates,
                name: isFormName,
                value: isForm
            },
            [operationTypeName]: {
                parent: problemPartCoordinates,
                name: operationTypeName,
                value: operationType
            },
    }


}
const makeAnswerForm = (    offsetString,
                            i,
                            j,
                            {   isForm,
                                operationType,
                                submission: {
                                    value,
                                    quantity,
                                    correct,
                                    firstAnswer,
                                    actualAnswer,
                                    submitCount,
                                    feedbackMessage,
                                    backgroundColor
                                },
                                progressMeter: {
                                    correctFirstTime,
                                    testingWithoutForm
                                }
                            }
                        ) => {

    let problemPartCoordinates = `${offsetString}${i} ${j}`
    let ij = `${i} ${j}`
    let problem_i = `${offsetString}problem ${i}`

    let problem_i_submission = `${problemPartCoordinates} submission`

    let valueName = `${offsetString}value ${ij}`
    let quantityName = `${offsetString}quantity ${ij}`
    let correctName = `${offsetString}correct ${ij}`
    let firstAnswerName = `${offsetString}firstAnswer ${ij}`
    let actualAnswerName = `${offsetString}actualAnswer ${ij}`
    let submitCountName = `${offsetString}submitCount ${ij}`
    let feedbackMessageName = `${offsetString}feedbackMessage ${ij}`
    let backgroundColorName = `${offsetString}backgroundColor ${ij}`

    let noValueName = `${offsetString}noValue ${ij}`
    let isIntegerName = `${offsetString}isInteger ${ij}`
    let isNotIntegerName = `${offsetString}isNotInteger ${ij}`
    let submitValueName = `${offsetString}submitValue ${ij}`


    let problem_i_submission_updateTypedAnswer = `${problem_i_submission} updateTypedAnswer`
    
    let problem_i_progressMeter = `${problemPartCoordinates} progressMeter`
    
    let gotItRightTheFirstTimeName = `${offsetString}gotItRightTheFirstTime ${i}`

    // 'else' is a keyword in js
    let elseStateName = `${offsetString}else ${i}`

    let correctFirstTimeName = `${offsetString}correctFirstTime ${i}`
    let testingWithoutFormName = `${offsetString}testingWithoutForm ${i}`


    let isFormName = `${offsetString}isForm ${ij}`
    let operationTypeName = `${offsetString}operationType ${ij}`
    // [problemPartCoordinates]: {
    //     parent: `${offsetString}problem ${i}`,
    //     name: problemPartCoordinates,
    //     substates: isForDisplayResultsOnly? []: [`displayResult`],
    //     variableNames: [`${offsetString}value ${ij}`,
    //                     `${offsetString}quantity ${ij}`,
    //                     `${offsetString}isForm ${ij}`,
    //                     `${offsetString}operationType ${ij}`]

    //     },
    // problemPartCoordinates vs problem_i
    // both this one and the one for the number has the same error
    return {

    
    [problemPartCoordinates]: {
        parent: problem_i,
        name: problemPartCoordinates,
        substates: ['submission', 'progressMeter'],
        variableNames: [isFormName, operationTypeName]
    },
        [isFormName]: {
            parent: problemPartCoordinates,
            name: isFormName,
            value: isForm
        },
        [operationTypeName]: {
            parent: problemPartCoordinates,
            name: operationTypeName,
            value: operationType
        },
        

            // 2 indents from `${offsetString}${iAnswer} ${i}` as it's a substate
            // has the same parent as the superstate
            // we start our submitting the answer with this cell
            // this index(i) corresponds to the total number of problems

            [problem_i_submission]: {
                parent: problem_i,
                name: problem_i_submission,
                substates: ['updateTypedAnswer'],
                functionCode: returnState,
                nextStates: [problem_i_progressMeter],
                children: [
                    noValueName,
                    isIntegerName,
                    isNotIntegerName,
                    submitValueName
                ],
                variableNames: [
                    valueName,
                    quantityName,
                    correctName,
                    firstAnswerName,
                    actualAnswerName,
                    submitCountName,
                    feedbackMessageName,
                    backgroundColorName
                ]

            },
                    // 4 total indents as it the substate of `${offsetString}${iAnswer} ${i} submission ${i}`
                    [problem_i_submission_updateTypedAnswer]: {
                        parent: problem_i,
                        name: problem_i_submission_updateTypedAnswer,
                        functionCode: updateTypedAnswer
                    },
                [valueName]: {
                    parent: problem_i_submission,
                    name: valueName,
                    value: value
                },
                [quantityName]: {
                    parent: problem_i_submission,
                    name: quantityName,
                    value: quantity
                },
                [correctName]: {
                    parent: problem_i_submission,
                    name: correctName,
                    value: correct
                },
                [firstAnswerName]: {
                    parents: problem_i_submission,
                    name: firstAnswerName,
                    value: firstAnswer
                },
                [actualAnswerName]: {
                    parents: problem_i_submission,
                    name: actualAnswerName,
                    value: actualAnswer
                },
                [submitCountName]: {
                    parents: problem_i_submission,
                    name: submitCountName,
                    value: submitCount
                },
                [feedbackMessageName]: {
                    parents: problem_i_submission,
                    name: feedbackMessageName,
                    value: feedbackMessage
                },
                [backgroundColorName]: {
                    parents: problem_i_submission,
                    name: backgroundColorName,
                    value: backgroundColor
                },
                [noValueName]: {
                    parents: problem_i_submission,
                    name: noValueName,
                    functionCode: noValue
                },
                [isIntegerName]: {
                    parents: problem_i_submission,
                    name: isIntegerName,
                    functionCode: isInteger,
                    nextStates: [submitValueName]
                },
                [isNotIntegerName]: {
                    parents: problem_i_submission,
                    name: isNotIntegerName,
                    functionCode: returnState,
                },
                [submitValueName]: {
                    parents: problem_i_submission,
                    name: submitValueName,
                    functionCode: submitValue,
                },
            [problem_i_progressMeter]: {
                parent: problem_i,
                name: problem_i_progressMeter,
                functionCode: returnState,
                children: [ gotItRightTheFirstTimeName, // passes if they are right and submission count == 1
                            elseStateName // 'else' is a keyword in js
                    ],
                variableNames: [
                    correctFirstTimeName,
                    testingWithoutFormName
                ]
            },
                [correctFirstTimeName]: {
                    parent: problem_i_progressMeter,
                    name: correctFirstTimeName,
                    value: correctFirstTime
                },
                [testingWithoutFormName]: {
                    parent: problem_i_progressMeter,
                    name: testingWithoutFormName,
                    value: testingWithoutForm
                },
                [gotItRightTheFirstTimeName]: {
                    parent: problem_i_progressMeter,
                    name: gotItRightTheFirstTimeName,
                    functionCode: gotItRightTheFirstTime
                },
                [elseStateName]: {
                    parent: problem_i_progressMeter,
                    name: elseStateName,
                    functionCode: returnState
                }
    }

}
const makeNumber = (
                    {   value,
                        quantity,
                        isForm,
                        // make an operationTypeForPadding
                        // make an isOperationTypeForPadding

                        operationType,

                        // flags for displaying the result
                        isCorrect,
                        isActualAnswer,
                        isResult
                    }
                ) => {

    return {
        
            value: value,
            quantity: quantity,
            isForm: isForm,
            // make an operationTypeForPadding
            // make an isOperationTypeForPadding

            operationType: operationType,

            // flags for displaying the result
            isCorrect: isCorrect,
            isActualAnswer: isActualAnswer,
            isResult: isResult
        
    }
}
const makeProblemPartsForDisplayResults = (ithProblem) => {

    // console.log('ith problem', ithProblem)
    const {a, b, theirAnswer, actualAnswer, gotItRightTheFirstTime} = ithProblem

    const mySum = a + b
    return [
        // a
        makeNumber({
                value: a,
                quantity: makeQuantity(a, mySum),
                isForm: false,
                // make an operationTypeForPadding
                // make an isOperationTypeForPadding
    
                operationType: '',
    
                // flags for displaying the result
                isCorrect: false,
                isActualAnswer: false,
                isResult: false
        }),

        // b
        makeNumber({
            value: b,
            quantity: makeQuantity(b, mySum),
            isForm: false,
            // make an operationTypeForPadding
            // make an isOperationTypeForPadding

            operationType: '+',

            // flags for displaying the result
            isCorrect: false,
            isActualAnswer: false,
            isResult: false
        }),

        // theirAnswer
        makeNumber({
            value: theirAnswer,
            quantity: makeQuantity(theirAnswer, mySum),
            isForm: false,
            // make an operationTypeForPadding
            // make an isOperationTypeForPadding

            operationType: '',

            // flags for displaying the result
            isCorrect: gotItRightTheFirstTime,
            isActualAnswer: false,
            isResult: true
        }),

        // actualAnswer
        makeNumber({
            value: actualAnswer,
            quantity: makeQuantity(actualAnswer, mySum),
            isForm: false,
            // make an operationTypeForPadding
            // make an isOperationTypeForPadding

            operationType: '',

            // flags for displaying the result
            isCorrect: false,
            isActualAnswer: true,
            isResult: false
        })
    ]
    
}
const makeProblemParts = (ithProblem) => {

    return [
        {
            // reusable
            ...makeNumber({
                value: ithProblem.a,
                quantity: makeQuantity(ithProblem.a, ithProblem.a + ithProblem.b),
                isForm: false,
                // make an operationTypeForPadding
                // make an isOperationTypeForPadding
    
                operationType: '',
    
                // flags for displaying the result
                isCorrect: false,
                isActualAnswer: false,
                isResult: false
            })
        },
        {
            ...makeNumber({ 
                value: ithProblem.b,
                quantity: makeQuantity(ithProblem.b, ithProblem.a + ithProblem.b),
                isForm: false,
                operationType: '+',
    
                // flags for displaying the results
                isCorrect: false,
                isActualAnswer: false,
                isResult: false
            })
        },
        {
                // anserForm
                isForm: true,
                operationType: '',
                submission: {   value: '',
                                quantity: makeQuantity(0, ithProblem.a + ithProblem.b),
                                correct: false,
                                firstAnswer: null,
                                actualAnswer: ithProblem.a + ithProblem.b,
                                submitCount: 0,
                                feedbackMessage: 'O',
                                backgroundColor: 'white'
                },
                progressMeter: {    correctFirstTime: false,
                                    testingWithoutForm: false
                }
        }
    ]
}

const initState = (temporaryState, parentName, stateName) => {
    return {
        ...temporaryState,
        [stateName]: {
            parent: parentName,
            children: [],
            name: stateName,
        }
    }
}
const addChild = (Root2, stateName, newChildName) => {

    // newChildName is an array of strings
    // let newChildrenForProblemSet = [
    //     [`problem ${i}`]
    // ]
    
    // console.log('here')
    // add starting trie links to root and add the new problem child to the problem set
    Root2 = {
        ...Root2,
        [stateName]: {
            ...Root2[stateName],
            children: [...Root2[stateName].children, newChildName]
        }
    }
    return Root2
}

const makeProblemSet = (state, action) => {


    // get offset from action
    const offsetString = action.meta.offsetString
    // get the list of problems from action
    const mathProblems = action.meta.mathProblems
    let temporaryState = state
    // add a problem set branch
    
    const nameOfProblemSetCetagory = offsetString
    // categories for problems to be in: addProblems, subtractProblems, displayResults
    let problemSetId = getChildren(temporaryState, nameOfProblemSetCetagory).length

    const nameOfProblemSet = `${offsetString}problemSet ${problemSetId}`

    // printTreeInteractive(temporaryState)
    // console.log("|", nameOfProblemSetCetagory, "|" , nameOfProblemSet)
    temporaryState = addChild(temporaryState, nameOfProblemSetCetagory, nameOfProblemSet)
    // console.log('got here')

    // need to also add the problem set state
    temporaryState = initState(temporaryState, nameOfProblemSetCetagory, nameOfProblemSet)
    // correct up to here
    // printTreeInteractive(temporaryState)

    // make a test run with just printing out the number's
    mathProblems.forEach((mathProblem, i) => {
        let dataForSingleProblem = {}
        let problemParts = []
        if(offsetString == 'displayResults ') {
            dataForSingleProblem = makeProblemPartsForDisplayResults(mathProblem)
            const [a, b, answer, yourAnswer] = dataForSingleProblem
            problemParts = [a, b, answer, yourAnswer]
        }
        else {
            dataForSingleProblem = makeProblemParts(mathProblem)
            const [a, b, answerForm] = dataForSingleProblem
            problemParts = [a, b, answerForm]

        }
        // console.log('got the data')
        // console.log(dataForSingleProblem)
        // add a problem branch
        const nameOfProblem = `${offsetString}problem ${i}`
        temporaryState = addChild(temporaryState, nameOfProblemSet, nameOfProblem)

        temporaryState = initState(temporaryState, nameOfProblemSet, nameOfProblem)

        // console.log('added problem')
        // printTreeInteractive(temporaryState)
        // children: problemPartIndicies.map(problemPartIndex => (
        //     `${offsetString}${problemPartIndex} ${i}`// can use the OneValue key and the AddTwoValues key
        // )),
    
        // temporaryState = addChild(temporaryState, ) plusProblems problem 0
        problemParts.forEach((problemPart, j) => {

            const problemPartCoordinates = `${offsetString}${i} ${j}`
            temporaryState = addChild(temporaryState, nameOfProblem, problemPartCoordinates)

            // a, b
            if(j < 2) {
                temporaryState = appendStates(  temporaryState,
                    makeProblemPartNumber(offsetString, i, j, problemPart))

                // if(j === 2 && offsetString === 'displayResults ') {
                //     // temporaryState = appendStates(  temporaryState,
                //     //     makeProblemPartNumber(offsetString, i, j, problemPart))

                // }
                // else {
                //     temporaryState = appendStates(  temporaryState,
                //         makeProblemPartNumber(offsetString, i, j, problemPart))

                // }
            }
            
            // answerForm or answer
            if(j === 2) {
                // answer
                if(offsetString === 'displayResults ') {
                    temporaryState = appendStates(  temporaryState,
                        makeProblemPartNumber(offsetString, i, j, problemPart))
    
                }
                else {
                    // answerForm
                    temporaryState = appendStates(  temporaryState,
                        makeAnswerForm(offsetString, i, j, problemPart))
    
                }
            }

            // make the graph representing each problem part
            // offset, i, j
            // make a problem part branch with the attributes using (offset, i, j)
            
        })
        // console.log('added problem parts')
        // printTreeInteractive(temporaryState)
        // console.log(temporaryState)


        
    })
    printTreeInteractive(temporaryState)

    // for each problem
        // get the list data for a single problem
        // const dataForSingleProblem = {}

        // for each problem part

            // a, b, (c or answer form), yourAnswer
            // if we are at the 3rd problem part
                // if the offset says displayProblems
                    // use a different function
                // else
                    // use the number function
            // else
                // use the regular number function
    return [temporaryState, true]
}


// reducers that make state machines holding references to other reducers
// make a simpler version for just showing a + b = c
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
    console.log('updating the typed answer')
    console.log(action.meta.parentStateName)
    let parentList = action.meta.parentStateName.split(' ')
    const parentStateName = parentList.slice(0, parentList.length - 2).join(' ')
    const offsetString = action.meta.offsetString
    console.log("got here", parentStateName)
    // parent state name plusProblems 2 0 submission 0
    // plusProblems 2 0 submission 0 
    // the one passed into here plusProblems 2 0 submission 0 updateTypedAnswer 0
    console.log('new value', newValue, 'parent name', parentStateName)

    // set is probably wrong
    // the value is now in the submission context
    state = set2(state, `${parentStateName} submission`, `${offsetString}value`, newValue)
    console.log("after set", state)
    let newValue2 = getVariable(state, `${parentStateName} submission`, `${offsetString}value`)
    // it's like the value is set for certain sanerios
    console.log(newValue2)
    return [state, true]

}
const noValue = (state, action) => {
    console.log("is invalid")
    const parentStateName = action.meta.parentStateName
    const offsetString = action.meta.offsetString
    // this value should have been set by updateTypedAnswer
    let newValue2 = getVariable(state, parentStateName, `${offsetString}value`)
    console.log('value', newValue2)

    let newValue = getVariable(state, parentStateName, `${offsetString}value`).value
    if(newValue.length === 0) {

        // const parentStateName = action.meta.parentStateName

        let newState = setArray2(
            state,
            parentStateName,
            `${offsetString}quantity`,
            makeQuantity(0,
                    getVariable(state, parentStateName, `${offsetString}actualAnswer`).value))

        newState = set2(newState, parentStateName, `${offsetString}feedbackMessage`, 'O')

        newState = set2(newState, parentStateName, `${offsetString}backgroundColor`, 'white')
        
        return [newState, true]
    
    }
    return [state, false]
}
const isInteger = (state, action) => {
    const parentStateName = action.meta.parentStateName
    const offsetString = action.meta.offsetString

    // console.log(getVariable(state, parentStateName, 'value').value,
            // parseInt(getVariable(state, parentStateName, 'value').value))

    return [state, !isNaN(parseInt(getVariable(state, parentStateName, `${offsetString}value`).value)) === true]
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
    const offsetString = action.meta.offsetString
    console.log('submitting our value function')
    console.log(parentStateName, stateName)
    const newValue = getVariable(state, parentStateName, `${offsetString}value`).value

    // const { basePath } = action.meta.basePath
    // const variablesBasePath = [...action.meta.basePath, 'variables']

    // [...action.type, 'variables'] is the path to the vars for the answer form
    // console.log(getValue(state, makeVariablesObjectPath(action)))
    // console.log("set value", parentStateName, getVariable(state, parentStateName, 'value'))
    // this line works
    let newState = set2(state, parentStateName, `${offsetString}value`, parseInt(newValue))
    console.log('after the value is set')
    printTreeInteractive(state)
    // console.log('new tree')
    // console.log(newState, stateName)
    // console.log("correct", getVariable(state, parentStateName, 'correct'))
    let actualAnswer = getVariable(newState, parentStateName, `${offsetString}actualAnswer`).value
    let maxValue = newValue > actualAnswer? newValue: actualAnswer
    // wrong
    newState = setArray2(
        newState,
        parentStateName,
        `${offsetString}quantity`,
        makeQuantity(newValue,
            maxValue)
                )
    console.log('after the quantity is set', maxValue)
    printTreeInteractive(state)
    // we have no way of knowing if the value they entered is wrong or too small
    // console.log('new tree 2', newState, stateName)
// pass in correctFirstTime


    newState = set2(newState, parentStateName, `${offsetString}correct`, [`${offsetString}actualAnswer`, `${offsetString}value`], determineAnswer)

    newState = set2(newState, parentStateName, `${offsetString}feedbackMessage`, [`${offsetString}actualAnswer`, `${offsetString}value`], determineAnswerMessage)

    newState = set2(newState, parentStateName, `${offsetString}backgroundColor`, 'black')

    // console.log('new tree 3', newState, stateName)
    newState = set2(newState, parentStateName, `${offsetString}submitCount`, getVariable(newState, parentStateName, `${offsetString}submitCount`).value + 1)
    const submitCount = getVariable(newState, parentStateName, `${offsetString}submitCount`).value

    // so this matches gotItRightTheFirstTime
    if(submitCount === 1) {
        newState = set2(newState, parentStateName, `${offsetString}firstAnswer`, getVariable(newState, parentStateName, `${offsetString}value`).value)

    }
    console.log('after everything')
    printTreeInteractive(state)

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
    const offsetString = action.meta.offsetString

    // console.log('parent', parentStateName)
    let submitCount = getVariable(state, submissionStateName, `${offsetString}submitCount`).value
    let correct = getVariable(state, submissionStateName, `${offsetString}correct`).value
    let newState = state
    if(submitCount === 1 && correct) {
        newState = set2(newState, parentStateName, `${offsetString}correctFirstTime`, true)

        // need to use the same parent state name for getting and setting
        const feedbackMessage = getVariable(state, submissionStateName, `${offsetString}feedbackMessage`).value
        newState = set2(newState, submissionStateName, `${offsetString}feedbackMessage`, feedbackMessage + '1')

        return [newState, true]

    }
    return [newState, false]

}
const processProblems = (state, action, cb) => {

    // This function generates the (i, j) coordinates for finding the correct state
    // (i, j) => 00, 10, 20, 31, 41, 51... (numberOfProblems * 3, numberOfProblems)
    // "problem set 0" tells me how many problems we need to use to look for the forms
    const offsetString = action.meta.offsetString

    let problems = getChildren(state, `${offsetString}problemSet 0`)
    let numberOfProblems = problems.length
    let temporaryState = state
    let i = 0
    let j = -1
    for(; i < numberOfProblems * 3; i += 3) {

        if(i % 3 === 0) {
            j += 1
        }

        temporaryState = cb(temporaryState, action, i, j)
    }
    return temporaryState

}

const solveProblem = (state, action, i, j) => {

    // the last one is always ""
    // the last one's correctFirstTime is always not getting set
    // now it seems to be working
    // don't know if it was solved
    const offsetString = action.meta.offsetString
    console.log("insied solveProblem", `|${offsetString}|`)
    let temporaryState = state
    let a = getVariable(state, `${offsetString}${i} ${j}`, `${offsetString}value`).value
    let b = getVariable(state, `${offsetString}${i + 1} ${j}`, `${offsetString}value`).value
    let submission =           `${offsetString}${i + 2} ${j} submission ${j}`
    // console.log(a, b, submission)
    // randomly get it wrong
    let randomValue = Math.floor(Math.random() * 10) % 2
    // plusProblems correctFirstTime 4
    if(randomValue === 0) {
        // console.log("answer is right the first time")
        temporaryState = set2(temporaryState, submission, `${offsetString}value`, a + b)
        let progressMeter = `${offsetString}${i + 2} ${j} progressMeter ${j}`
        temporaryState = set2(temporaryState, progressMeter, `${offsetString}correctFirstTime`, true)
    
    }
    else {
        // if b == 1 then this is always messed up
        temporaryState = set2(temporaryState, submission, `${offsetString}value`, -1)
        let progressMeter = `${offsetString}${i + 2} ${j} progressMeter ${j}`
        temporaryState = set2(temporaryState, progressMeter, `${offsetString}correctFirstTime`, false)

    }
    // let result = getVariable(temporaryState, submission, `${offsetString}value`)
    // console.log('get result', result)
    // solved it correctly up to here
    // console.log('result', temporaryState)
    temporaryState = set2(temporaryState, submission, `${offsetString}correct`, [`${offsetString}actualAnswer`, `${offsetString}value`], determineAnswer)

    temporaryState = set2(temporaryState, submission, `${offsetString}submitCount`, getVariable(temporaryState, submission, `${offsetString}submitCount`).value + 1)

    temporaryState = set2(temporaryState, submission, `${offsetString}firstAnswer`, getVariable(temporaryState, submission, `${offsetString}value`).value)

    // console.log("solved a problem", j)
    // printTreeInteractive(temporaryState)
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
    console.log('inside autoSolve', `|${action.meta.offsetString}|`)
    let temporaryState = processProblems(state, action, solveProblem)
    console.log('after autosolve')
    printTreeInteractive(temporaryState)

    return [temporaryState, true]

}
const collectProblems = (state, action, i, j) => {

    // getCell(state, parentStateName)
    // console.log('in collect problems', state)
    let temporaryState = state
    const offsetString = action.meta.offsetString

    let a = getVariable(state, `${offsetString}${i} ${j}`, `${offsetString}value`).value
    let b = getVariable(state, `${offsetString}${i + 1} ${j}`, `${offsetString}value`).value
    let submission =           `${offsetString}${i + 2} ${j} submission ${j}`
    let progressMeter =        `${offsetString}${i + 2} ${j} progressMeter ${j}`


    let firstAnswer = getVariable(state, submission, `${offsetString}firstAnswer`).value

    let actualAnswer = getVariable(state, submission, `${offsetString}actualAnswer`).value

    let gotItRightTheFirstTime = getVariable(state, progressMeter, `${offsetString}correctFirstTime`).value
    console.log('values', a, b, firstAnswer)
    let row = {
        a: a,
        b: b,
        theirAnswer: firstAnswer,
        actualAnswer: actualAnswer,
        gotItRightTheFirstTime: gotItRightTheFirstTime
    }


    let myProblemTable = getCell(state, 'payload')
    // console.log('my promblem table', myProblemTable)
    temporaryState = tableAssignJsObject2(
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
    console.log('state', state, action)

    // Root2 = makeLinks(Root2, {
    //     parent: [`${iAnswer} ${i}`],
    //     newStateName: [`operationType ${iAnswer}`],
    //     stateCells: makeCell({
    //         name: [`operationType ${iAnswer}`],
    //         value: ''
    //     }),
    //     isVariable: true,
    //     isIntermediateState: false
    // })
    // make a single payload state
    // let problemTable = makeCell({
    //     name: ['payload'],
    //     jsObject: {'problem set table': []}
    // })

    let temporaryState = state
    const offsetString = action.meta.offsetString
    
    // temporaryState = {
    //     ...temporaryState,
    //     ...problemTable
        
    // }
    // temporaryState = makeLinks(temporaryState, {
    //         parent: ['elementary school', 'store results'],
    //         newStateName: ['payload'],
    //         stateCells: makeCell({
    //             name: ['payload'],
    //             jsObject: {'problem set table': []}
    //         }),
    //         isVariable: true,
    //         isIntermediateState: false
    // })

    // temporaryState = tableAssignJsObject(temporaryState, problemTable['XXXXXXX'], [])
    // console.log('added the problem set table', temporaryState)
    temporaryState = processProblems(temporaryState, action, collectProblems)

    // console.log("done with first part", temporaryState)
    // let x = getCell(temporaryState, ['payload'])
    let myCompletedProblems = getCell(temporaryState, 'payload')
    console.log('completed problems', myCompletedProblems)
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
    temporaryState = tableAssignJsObject2(
        temporaryState,
        myCompletedProblems, 
        {   ...myCompletedProblems.jsObject,
            'problem sets table': {nameOfProblemSet: `${offsetString}problem set 0`,
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

const saveProblemSetSelectedForDisplay = (state, action) => {

    // wouldn't be possible if stateName is an array of strings
    // takes in a new value and updates itself
    const stateName = action.type
    const parentStateName = action.meta.parentStateName
    let problemSetId = action.payload
    let temporaryState = state
    // console.log(stateName, newValue)
    // debugger
    // store the payload to selectedProblemSetFromBackend instead

    // not connected to the main graph
    // temporaryState = setVariable(temporaryState, parentStateName, stateName, newValue) => {
    // console.log('updating value', stateName)
    // temporaryState = {
    //     ...temporaryState,
    //     ...makeCell({
    //         name: stateName,
    //         nextStates: [],
    //         functionCode: updateStateValue,
    //         value: newValue
    //     })        
    // }
    temporaryState = setVariable(   temporaryState,
                                    parentStateName,
                                    'selectedProblemSetFromBackend',
                                    problemSetId)

    // temporaryState = setJSObject2(   temporaryState,
    //                                 parentStateName,
    //                                 'resultsFromBackend',
    //                                 newValue)
    // console.log('new value', newValue)
    // printTreeInteractive(temporaryState)
    return [temporaryState, true]
}
// only runs when user does autocompute
const storeResults = (state, action) => {

    const stateName = action.type
    const payload = action.payload
    let temporaryState = state

    // console.log('store resulst', payload)

//     temporaryState = makeLinks(temporaryState, {
//         parent: ['elementary school', 'store results'],
//         newStateName: ['payload'],
//         stateCells: makeCell({
//             name: ['payload'],
//             jsObject: {'problem set table': []}
//         }),
//         isVariable: true,
//         isIntermediateState: false
// })
    let parentStateName = 'elementarySchool storeResults'
    temporaryState = setJSObject2(temporaryState, parentStateName, 'resultsFromBackend', payload)
    // console.log('saved payload')
    // let tree = treeVisualizer(temporaryState, ['elementary school'])
    // console.log('tree', tree)
    // temporaryState = makeLinks(temporaryState, {
    //     parent: ['elementary school', 'store results'],
    //     newStateName: ['resultsFromBackend'],
    //     stateCells: makeCell({
    //         name: ['resultsFromBackend'],
    //         // nextParts: ['problemSetSelected'],
    //         jsObject: payload
    //     }),
    //     isVariable: true,
    //     isIntermediateState: true
    // })

    // let problemTable = makeCell({
    //     name: ['resultsFromBackend'],
    //     nextParts: ['problemSetSelected'],
    //     jsObject: payload
    // })

    // this is an index state
    // It's purpose is to store and update a value without relying on a parent state to access the variable
    // let ithProblemSet = makeCell({
    //     name: ['resultsFromBackend', 'problemSetSelected'],
    //     nextStates: [],
    //     functionCode: updateStateValue,
    //     value: -1
    // })
    // temporaryState = makeLinks(temporaryState, {
    //     parent: ['elementary school', 'store results'],
    //     newStateName: ['selectedProblemSetFromBackend'],
    //     stateCells: makeCell({
    //         name: ['selectedProblemSetFromBackend'],
    //         nextStates: [],
    //         functionCode: updateStateValue,
    //         value: -1
    //     }),
    //     isVariable: true,
    //     isIntermediateState: false
    // })

    // let temporaryState = state
    // temporaryState = {
    //     ...temporaryState,
    //     // ...problemTable,
    //     // ...ithProblemSet
        
    // }
    // console.log(temporaryState)
    return [temporaryState, true]
}

const setupSubmachineForDisplay = (state, action) => {

    const stateName = action.type
    const payload = action.payload
    let temporaryState = state

    let problemSets = getCell(temporaryState, 'resultsFromBackend').jsObject['problems']
    let problemSetId = getCell(temporaryState, 'selectedProblemSetFromBackend').value

    console.log('my problem sets', problemSets, 'selected problem set id', problemSetId)
    const myProblemSet = problemSets[problemSetId]
    console.log('the problem set to display', myProblemSet)
    // make the state machine structure for each problem
    action.meta.problemSet = myProblemSet
    
    temporaryState = setVariable(temporaryState, 'elementarySchool displayResults', 'problemCount', myProblemSet.length)
    // let result = setupProblemForResults(temporaryState, action)
    // temporaryState = result[0]
    printTreeInteractive(temporaryState)

    // have the viewing card read the structure
    return [temporaryState, true]
}

const setupSubmachineForProblems = (state, action) => {

    // set the problems into action.meta
    // call setupProblem

}


// reducers and the state for it in the same file
// merge the states with 1 initialState
// group by context of problem, not by kind of coding construct
// let Root2 = {}
let Root2 = {

    // the indents are to illustrate the nesting the editor should pickup on but doesn't
    'root': {
        name: 'root',
        children: ['elementarySchool']
    },

    /*
    elementartySchool
        children:
            add, subtract, display

    add
        children
            plusProblems problemSet 0, plusProblems problemSet 1
    plusProblems problemSet 0
        children
            plusProblems problem 0, plusProblems problem 2, plusProblems problem 3
    plusProblems problem 0
        children
            plusProblems(batch name) problemPart 0(ith probelem) 0(ith problem part)
    
    plusProblems(batch name) problemPart 0(ith probelem) 0(ith problem part)
        children 
        plusProblems varName 0 0

    subtract
        children
            subtractProblems problemSet 0, subtractProblems problemSet 1
    
    display
        children
            displayResults problemSet 0, displayResults problemSet 1
    
    
    batch branching routine


    make a new branch (plusProblems problemSet 0)

    for each subbranch(problem) we need 
        make a submachine for each sub sub branch(numbers, form) we need
    

    make submachine
        if we are at a number
            make the number
        else
            make the form
    */
    'elementarySchool': {
        parent: 'root',
        name: 'elementarySchool',
        substates: ['utilities', 'testing', 'storeResults', 'displayResults'],
        children: ['plusProblems ', 'displayResults '],
    },
                // 2 indents as it's a substate
                'elementarySchool utilities': {
                    parent: 'root',
                    name: 'elementarySchool utilities',
                    substates: ['create problem']
                },
    
                        'elementarySchool utilities createProblem': {
                            parent: 'root',
                            name: 'elementarySchool utilities createProblem',
    
                            functionCode: makeProblemSet,
                        },

    'plusProblems ': {
        parent: 'elementarySchool',
        name: 'plusProblems ',
        // holds each problem set
        children: []
    },
    'displayResults ': {
        parent: 'elementarySchool',
        name: 'displayResults ',
        children: []
    },
        // 'plusProblems problemSets 0': {
        //     parent: 'elementarySchool',
        //     name: 'plusProblems problemSets 0',
        //     value: 1
        // },
             // do later(after program is finished)
            //  change of plan, the program doesn't even work for all problem sets
            // and the problem has to do with the problem counts
            // fix the program count issue
            // fix the problems being passed in 2 different ways
            // 'plusProblems problemSet 0': {
            //     parent: 'elementarySchool',
            //     children: [],
            //     name: 'plusProblems problemSet 0',
            //     variableNames: ['plusProblems numberOfProblems 0']
            // },
            //     'plusProblems numberOfProblems 0': {
            //         parent: 'plusProblems problemSet 0',
            //         name: 'plusProblems numberOfProblems 0',
            //         value: 0
            //     },
            'elementarySchool testing': {
                parent: 'root',
                name: 'elementarySchool testing',
                functionCode: returnState,
                children: ['autoSolve']
            },
                // 1 indent as it's just a child/variable
                'autoSolve': {
                    parent: 'elementarySchool testing',
                    name: 'autoSolve',
                    functionCode: autoSolve,
                    nextStates: ['setupForBackend']
                },
                'setupForBackend': {
                    parent: 'elementarySchool testing',
                    name: 'setupForBackend',
                    functionCode: setupForBackend,

                },


            // after this is run there is no need to transfer the payload
            'elementarySchool storeResults': {
                parent: 'root',
                name: 'elementarySchool storeResults',
                functionCode: storeResults,
                variableNames: ['resultsFromBackend', 'payload'],
            },
                'resultsFromBackend': {
                    parent: 'elementarySchool storeResults',
                    name: 'resultsFromBackend',
                    jsObject: -1
                },
                
                'payload': {
                    parent: 'elementarySchool storeResults',
                    name: 'payload',
                    jsObject: {'problem set table': []}
                },

            // for displaying results only
            'elementarySchool displayResults' : {
                parent: 'root',
                name: 'elementarySchool displayResults',
                children: ['saveProblemSetSelectedForDisplay', 'displayResults problemSet 0'],
                variableNames: ['selectedProblemSetFromBackend', 'displayResults problemCount']
            },
                // variables shouldn't call functions
                'selectedProblemSetFromBackend': {
                    parent: 'elementarySchool storeResults',
                    name: 'selectedProblemSetFromBackend',
                    // functionCode: savePayloadToFrontEnd,
                    value: -1,
                },
                'displayResults problemCount': {
                    parent: 'elementarySchool displayResults',
                    name: 'displayResults problemCount',
                    value: 0
                },


                'saveProblemSetSelectedForDisplay': {
                    parent: 'elementarySchool storeResults',
                    name: 'getProblemsFromBackend',
                    functionCode: saveProblemSetSelectedForDisplay,
                    nextStates: ['setupSubmachineForDisplay']
                },

                // get the data from resultsFromBackend and selectedProblemSetFromBackend
                // and use it to identify the right js object to make the submachine out of
                // I don't have a state that saves the current problem they clicked on
                'setupSubmachineForDisplay': {
                    parent: 'elementarySchool storeResults',
                    name: 'setupSubmachineForDisplay',
                    functionCode: setupSubmachineForDisplay
                },

                'displayResults problemSet 0': {
                    parent: 'elementarySchool displayResults',
                    children: [],
                    name: 'displayResults problemSet 0',
                    variableNames: ['displayResults numberOfProblems 0']
                },
                    'displayResults numberOfProblems 0': {
                        parent: 'displayResults problemSet 0',
                        name: 'displayResults numberOfProblems 0',
                        value: 0
                    },
       
}



// 'nameOne nameTwo'
// 'elementarySchool utilities'
// 'elementarySchool testing'
// 'elementarySchool storeResults'


// 1 state per entry in table

    
    
// let elementarySchoolName = 'elementarySchool'
// let x = treeVisualizer2(Root2, elementarySchoolName)
// console.log('tree', x)

// let stateMachine = setupProblem(Root2)
// console.log(stateMachine)
// console.log('state to export', stateMachine[0])
// let machine2 = setupProblem(stateMachine[0])
// machine2 = setupProblem(machine2[0])
// get the list of problems from action

let action = {
    type: 'elementarySchool utilities createProblem',
    meta: {
            basePath: 'elementarySchool utilities createProblem', // base state(for the object data)
            parentStateName: 'elementarySchool utilities createProblem',
            offsetString: 'plusProblems ',
            mathProblems: problems
        }
}
const [temporaryState, success] = breathFirstTraversal2(
    Root2,
    action,
    [action.type],
    0)
// console.log('done with machine')
// let elementarySchoolName = 'elementarySchool'
// let x = treeVisualizer2(temporaryState, elementarySchoolName)
// console.log('tree', x)
// the data is setup at this point
// if(success) {
//     console.log('all reducers are done', temporaryState)
//     return temporaryState
// } else {
//     return state
// }
// problemParts exists here but not in presentProblems
export var Root = temporaryState