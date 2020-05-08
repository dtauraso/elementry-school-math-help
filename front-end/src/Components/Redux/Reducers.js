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
            printTreeInteractive
        
        
        
        
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
const addChild = (Root2, stateName, newChildNames) => {

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
            children: [...Root2[stateName].children, ...newChildNames]
        }
    }
    return Root2
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
const generateProblemStructure = (state, action) => {
    // action has an offset sequence
    // when making the state structure add the offset to each of them(first string in name)
    // make sure the views are using the offset sequence as another coordinate to access them
    // let contextName = 'plusProblems'
    // let stateCell = makeCell({
    //     name: [`${contextName}problem ${i}`],  // key of AddTwoValues maps to this

    //     // 0, 1, 2    3, 4, 5   6, 7, 8
    //     // 0
    //     children: [ [`${contextName}${iA} ${i}`],
    //                 [`${contextName}${iB} ${i}`],
    //                 [`${contextName}${iAnswer} ${i}`]],   // can use the OneValue key and the AddTwoValues key
    //     variableNames: [`${contextName}problemParts ${i}`]
    // })

    //     Root2 = makeLinks(Root2, {
    //     newStateName: [`problem ${i}`],
    //     parent: ['problem set 0'],
    //     stateCells: stateCell,
    //     isVariable: false,
    //     isIntermediateState: false})
}
const setJSObject = (state, parentStateName, variableName, newValue) => {

    // parentStateName is an array of strings
    let variable = getVariable(state, parentStateName, variableName)

    return {
        ...state,
        
        [variable.name[0]]: {
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
const incrementVariableBy = (state, parentStateName, variableName, newValue) => {

    // parentStateName is an array of strings
    let variable = getVariable(state, parentStateName, variableName)

    return {
        ...state,
        
        [variable.name]: {
            ...variable,
            value: variable.value + newValue
        }
    }
}

const appendState = (table, state) => {
    return {
        ...table,
        [state.name]: {
            ...state
        }
    }
}
const setupProblem = (state, action) => {

    // 
    // need to put this into a for loop
    // ['elementary school', 'utilities', 'create problem']
    // ['problemCount']
    const parentOfProblemCount = 'elementarySchool utilities createProblem'
    const offsetString = 'plusProblems '
    let numberOfProblems2 = getVariable(state, parentOfProblemCount, `${offsetString}problemCount`).value
    // console.log('we need to make', numberOfProblems2, 'problems')
    console.log(state)
    let numberOfProblems3 = getVariable(state, `${offsetString}problemSet 0`, `${offsetString}numberOfProblems`)
    // console.log(numberOfProblems3.name)
    // console.log('about to make a problem', getVariable(state, `${offsetString}problemSet 0`, `${offsetString}numberOfProblems`).value)

    let Root2 = state


    for(let i = 0; i < numberOfProblems2; i++) {

        
        Root2 = incrementVariableBy(Root2, `${offsetString}problemSet 0`, `${offsetString}numberOfProblems`, 1)
        
        // {
        //     ...Root2,
            
        //     [numberOfProblems3.name[0]]: {
        //         ...Root2.numberOfProblems,
        //         value: getVariable(Root2, ['problem set 0'], 'numberOfProblems').value + 1
        //     }
        // }
    
        let numberOfProblems = getVariable(Root2, `${offsetString}problemSet 0`, `${offsetString}numberOfProblems`).value
        let i = numberOfProblems - 1
        // console.log(numberOfProblems, problems[numberOfProblems])
        const ithProblem = problems[i]
        // console.log(i, 'th problem', ithProblem)
        let iA = 3 * i
        let iB = iA + 1
        let iAnswer = iA + 2
        // console.log("new starting values", iA, iB, iAnswer)
        // program froze here
        Root2 = addChild(Root2, `${offsetString}problemSet 0`, [`${offsetString}problem ${i}`])
        // Root2 = appendState(Root2, {
        //     [`${offsetString}problemSet 0`]: {
        //         ...Root2[`${offsetString}problemSet 0`],
        //         children: [...Root2[`${offsetString}problemSet 0`].children, `${offsetString}problem ${i}`]
        //     }
        // })
       

        Root2 = {
                ...Root2,
                // the printout is showing no data for this
                // 1 indent for child/variable name
                [`${offsetString}problem ${i}`]: {
                    parent: `${offsetString}problemSet 0`,
                    name: `${offsetString}problem ${i}`,  // key of AddTwoValues maps to this

                    // 0, 1, 2    3, 4, 5   6, 7, 8
                    // 0

                    children: [
                        `${offsetString}${iA} ${i}`,
                        `${offsetString}${iB} ${i}`,
                        `${offsetString}${iAnswer} ${i}`// can use the OneValue key and the AddTwoValues key
                    ],
                    variableNames: [`${offsetString}problemParts ${i}`]
                },
                // plusProblems isForm 0 doesn't exist
                // the items do exist, but their links are wrong
                // vanishes when we view it in presentProblems
                    [`${offsetString}problemParts ${i}`]: {
                        parent: `${offsetString}problem ${i}`,
                        name: `${offsetString}problemParts ${i}`,
                        value: 3
                    },
                    [`${offsetString}${iA} ${i}`]: {
                        parent: `${offsetString}problem ${i}`,
                        name: `${offsetString}${iA} ${i}`,
                        variableNames: [`${offsetString}value ${iA}`,
                                        `${offsetString}quantity ${iA}`,
                                        `${offsetString}isForm ${iA}`,
                                        `${offsetString}operationType ${iA}`]
                    },
                        [`${offsetString}value ${iA}`]: {
                            parent: `${offsetString}${iA} ${i}`,
                            name: `${offsetString}value ${iA}`,
                            value: ithProblem.a
                        },
                        [`${offsetString}quantity ${iA}`]: {
                            parent: `${offsetString}${iA} ${i}`,
                            name: `${offsetString}quantity ${iA}`,
                            value: makeQuantity(ithProblem.a, ithProblem.a + ithProblem.b)
                        },
                        [`${offsetString}isForm ${iA}`]: {
                            parent: `${offsetString}${iA} ${i}`,
                            name: `${offsetString}isForm ${iA}`,
                            value: false
                        },
                        [`${offsetString}operationType ${iA}`]: {
                            parent: `${offsetString}${iA} ${i}`,
                            name: `${offsetString}operationType ${iA}`,
                            value: ''
                        },
                    [`${offsetString}${iB} ${i}`]: {
                        parent: `${offsetString}problem ${i}`,
                        name: `${offsetString}${iB} ${i}`,
                        variableNames: [`${offsetString}value ${iB}`,
                                        `${offsetString}quantity ${iB}`,
                                        `${offsetString}isForm ${iB}`,
                                        `${offsetString}operationType ${iB}`]
                    },
                        [`${offsetString}value ${iB}`]: {
                            parent: `${offsetString}${iB} ${i}`,
                            name: `${offsetString}value ${iB}`,
                            value: ithProblem.b
                        },
                        [`${offsetString}quantity ${iB}`]: {
                            parent: `${offsetString}${iB} ${i}`,
                            name: `${offsetString}quantity ${iB}`,
                            value: makeQuantity(ithProblem.b, ithProblem.a + ithProblem.b)
                        },
                        [`${offsetString}isForm ${iB}`]: {
                            parent: `${offsetString}${iB} ${i}`,
                            name: `${offsetString}isForm ${iB}`,
                            value: false
                        },
                        [`${offsetString}operationType ${iB}`]: {
                            parent: `${offsetString}${iB} ${i}`,
                            name: `${offsetString}operationType ${iB}`,
                            value: '+'
                        },
                    [`${offsetString}${iAnswer} ${i}`]: {
                        parent: `${offsetString}problem ${i}`,
                        name: `${offsetString}${iAnswer} ${i}`,
                        substates: [`submission ${i}`, `progressMeter ${i}`],
                        variableNames: [`${offsetString}isForm ${iAnswer}`, `${offsetString}operationType ${iAnswer}`]
                    },
                        [`${offsetString}isForm ${iAnswer}`]: {
                            parent: `${offsetString}${iAnswer} ${i}`,
                            name: `${offsetString}isForm ${iAnswer}`,
                            value: true
                        },
                        [`${offsetString}operationType ${iAnswer}`]: {
                            parent: `${offsetString}${iAnswer} ${i}`,
                            name: `${offsetString}operationType ${iAnswer}`,
                            value: ''
                        },
                            // 2 indents from `${offsetString}${iAnswer} ${i}` as it's a substate
                            // has the same parent as the superstate
                            // we start our submitting the answer with this cell
                            // this index(i) corresponds to the total number of problems

                            [`${offsetString}${iAnswer} ${i} submission ${i}`]: {
                                parent: `${offsetString}problem ${i}`,
                                name: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                substates: [`updateTypedAnswer ${i}`],
                                functionCode: returnState,
                                nextStates: [`${offsetString}${iAnswer} ${i} progressMeter ${i}`],
                                children: [
                                    `${offsetString}noValue ${iAnswer}`,
                                    `${offsetString}isInteger ${iAnswer}`,
                                    `${offsetString}isNotInteger ${iAnswer}`,
                                    `${offsetString}submitValue ${iAnswer}`
                                ],
                                variableNames: [
                                    `${offsetString}value ${iAnswer}`,
                                    `${offsetString}quantity ${iAnswer}`,
                                    `${offsetString}correct ${iAnswer}`,
                                    `${offsetString}firstAnswer ${iAnswer}`,
                                    `${offsetString}actualAnswer ${iAnswer}`,
                                    `${offsetString}submitCount ${iAnswer}`,
                                    `${offsetString}feedbackMessage ${iAnswer}`,
                                    `${offsetString}backgroundColor ${iAnswer}`
                                ]

                            },
                                    // 4 total indents as it the substate of `${offsetString}${iAnswer} ${i} submission ${i}`
                                    [`${offsetString}${iAnswer} ${i} submission ${i} updateTypedAnswer ${i}`]: {
                                        parent: `${offsetString}problem ${i}`,
                                        name: `${offsetString}${iAnswer} ${i} submission ${i} updateTypedAnswer ${i}`,
                                        functionCode: updateTypedAnswer
                                    },
                                [`${offsetString}value ${iAnswer}`]: {
                                    parent: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}value ${iAnswer}`,
                                    value: ''
                                },
                                [`${offsetString}quantity ${iAnswer}`]: {
                                    parent: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}quantity ${iAnswer}`,
                                    value: makeQuantity(0, ithProblem.a + ithProblem.b)
                                },
                                [`${offsetString}correct ${iAnswer}`]: {
                                    parent: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}correct ${iAnswer}`,
                                    value: false
                                },
                                [`${offsetString}firstAnswer ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}firstAnswer ${iAnswer}`,
                                    value: null
                                },
                                [`${offsetString}actualAnswer ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}actualAnswer ${iAnswer}`,
                                    value: ithProblem.a + ithProblem.b
                                },
                                [`${offsetString}submitCount ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}submitCount ${iAnswer}`,
                                    value: 0
                                },
                                [`${offsetString}feedbackMessage ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}feedbackMessage ${iAnswer}`,
                                    value: 'O'
                                },
                                [`${offsetString}backgroundColor ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}backgroundColor ${iAnswer}`,
                                    value: 'white'
                                },
                                [`${offsetString}noValue ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}noValue ${iAnswer}`,
                                    functionCode: noValue
                                },
                                [`${offsetString}isInteger ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}isInteger ${iAnswer}`,
                                    functionCode: isInteger,
                                    nextStates: [`${offsetString}submitValue ${iAnswer}`]
                                },
                                [`${offsetString}isNotInteger ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}isNotInteger ${iAnswer}`,
                                    functionCode: returnState,
                                },
                                [`${offsetString}submitValue ${iAnswer}`]: {
                                    parents: `${offsetString}${iAnswer} ${i} submission ${i}`,
                                    name: `${offsetString}submitValue ${iAnswer}`,
                                    functionCode: submitValue,
                                },
                            [`${offsetString}${iAnswer} ${i} progressMeter ${i}`]: {
                                parent: `${offsetString}problem ${i}`,
                                name: `${offsetString}${iAnswer} ${i} progressMeter ${i}`,
                                functionCode: returnState,
                                children: [ `${offsetString}gotItRightTheFirstTime ${i}`, // passes if they are right and submission count == 1
                                            `${offsetString}else ${i}`
                                    ],
                                variableNames: [
                                    `${offsetString}correctFirstTime ${i}`,
                                    `${offsetString}testingWithoutForm ${i}`
                                ]
                            },
                                [`${offsetString}correctFirstTime ${i}`]: {
                                    parent: `${offsetString}${iAnswer} ${i} progressMeter ${i}`,
                                    name: `${offsetString}correctFirstTime ${i}`,
                                    value: false
                                },
                                [`${offsetString}testingWithoutForm ${i}`]: {
                                    parent: `${offsetString}${iAnswer} ${i} progressMeter ${i}`,
                                    name: `${offsetString}testingWithoutForm ${i}`,
                                    value: false
                                },
                                [`${offsetString}gotItRightTheFirstTime ${i}`]: {
                                    parent: `${offsetString}${iAnswer} ${i} progressMeter ${i}`,
                                    name: `${offsetString}gotItRightTheFirstTime ${i}`,
                                    functionCode: gotItRightTheFirstTime
                                },
                                [`${offsetString}else ${i}`]: {
                                    parent: `${offsetString}${iAnswer} ${i} progressMeter ${i}`,
                                    name: `${offsetString}else ${i}`,
                                    functionCode: returnState
                                }




        }
        // let elementarySchoolName = 'elementarySchool'
        // let x = treeVisualizer2(Root2, elementarySchoolName)
        // console.log('tree', x)
        // console.log(Root2)
        // console.log('made stuff')

        // prefixForStateNames: ''  this is so we can use the same numeric formula to generate different
        // sets of state trees without the trees overwriting each other
        // problemPartNumber: iA,
        // ithProblem: i,
        // value: ithProblem.a,
        // quantity: makeQuantity(ithProblem.a, ithProblem.a + ithProblem.b))
        // isform: false
        // operationType: '+'
        // display operator: false
        // hiding operator color: 'white'
                
                        // display operator
                        // hiding operator color
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
    state = set2(state, parentStateName, `${offsetString}value`, newValue)
    console.log("after set", state)
    let newValue2 = getVariable(state, parentStateName, `${offsetString}value`)
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
    const offsetString = action.meta.offsetString
    console.log("insied solveProblem", `|${offsetString}|`)
    let temporaryState = state
    let a = getVariable(state, `${offsetString}${i} ${j}`, `${offsetString}value`).value
    let b = getVariable(state, `${offsetString}${i + 1} ${j}`, `${offsetString}value`).value
    let submission =           `${offsetString}${i + 2} ${j} ${offsetString}submission ${j}`
    // console.log(a, b, c)
    // randomly get it wrong
    let randomValue = Math.floor(Math.random() * 10) % 2

    if(randomValue === 0) {
        temporaryState = set2(temporaryState, submission, `${offsetString}value`, a + b)
        let progressMeter = `${offsetString}${i + 2} ${j} ${offsetString}progressMeter ${j}`
        temporaryState = set2(temporaryState, progressMeter, `${offsetString}correctFirstTime`, true)
    
    }
    else {
        temporaryState = set2(temporaryState, submission, `${offsetString}value`, a + 1)
        let progressMeter = `${offsetString}${i + 2} ${j} ${offsetString}progressMeter ${j}`
        temporaryState = set2(temporaryState, progressMeter, `${offsetString}correctFirstTime`, false)

    }
    // console.log('result', temporaryState)
    temporaryState = set2(temporaryState, submission, `${offsetString}correct`, [`${offsetString}actualAnswer`, `${offsetString}value`], determineAnswer)

    temporaryState = set2(temporaryState, submission, `${offsetString}submitCount`, getVariable(temporaryState, submission, `${offsetString}submitCount`).value + 1)

    temporaryState = set2(temporaryState, submission, `${offsetString}firstAnswer`, getVariable(temporaryState, submission, `${offsetString}value`).value)

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
    return [temporaryState, true]

}
const collectProblems = (state, action, i, j) => {

    // getCell(state, parentStateName)
    // console.log('in collect problems', state)
    let temporaryState = state
    const offsetString = action.meta.offsetString

    let a = getVariable(state, `${offsetString}${i} ${j}`, `${offsetString}value`).value
    let b = getVariable(state, `${offsetString}${i + 1} ${j}`, `${offsetString}value`).value
    let submission =           `${offsetString}${i + 2} ${j} ${offsetString}submission ${j}`
    let progressMeter =        `${offsetString}${i + 2} ${j} ${offsetString}progressMeter ${j}`


    let firstAnswer = getVariable(state, submission, `${offsetString}firstAnswer`).value

    let actualAnswer = getVariable(state, submission, `${offsetString}actualAnswer`).value

    let gotItRightTheFirstTime = getVariable(state, progressMeter, `${offsetString}correctFirstTime`).value

    let row = {
        a: a,
        b: b,
        theirAnswer: firstAnswer,
        actualAnswer: actualAnswer,
        gotItRightTheFirstTime: gotItRightTheFirstTime
    }


    let myProblemTable = getCell(state, 'payload')
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
const updateStateValue = (state, action) => {

    // wouldn't be possible if stateName is an array of strings
    // takes in a new value and updates itself
    const stateName = action.type
    const parentStateName = action.meta.parentStateName
    let newValue = action.payload
    let temporaryState = state

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
    temporaryState = setVariable(temporaryState, parentStateName, stateName, newValue)

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
    temporaryState = setJSObject(temporaryState, parentStateName, 'resultsFromBackend', payload)
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
    'elementarySchool': {
        parent: 'root',
        name: 'elementarySchool',
        substates: ['utilities', 'testing', 'storeResults'],
        children: ['plusProblems problemSet 0'],
        variableNames: ['plusProblems problemSets 0']
    },
            // 2 indents as it's a substate
            'elementarySchool utilities': {
                parent: 'root',
                name: 'elementarySchool utilities',
                substates: ['create problem']
            },
            'plusProblems problemSets 0': {
                parent: 'elementarySchool',
                name: 'plusProblems problemSets 0',
                value: 1
            },
                    'elementarySchool utilities createProblem': {
                        parent: 'root',
                        name: 'elementarySchool utilities createProblem',
                        functionCode: setupProblem,
                        variableNames: ['plusProblems problemCount']
                    },
                    'plusProblems problemCount': {
                        parent: 'root',
                        name: 'plusProblems problemCount',
                        value: problems.length
                    },
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
                    nextStates: ['setup for backend']
                },

            'elementarySchool storeResults': {
                parent: 'root',
                name: 'elementarySchool storeResults',
                functionCode: storeResults,
                variableNames: ['resultsFromBackend', 'selectedProblemSetFromBackend', 'payload']
            },
                'resultsFromBackend': {
                    parent: 'elementarySchool storeResults',
                    name: 'resultsFromBackend',
                    jsObject: -1
                },
                'selectedProblemSetFromBackend': {
                    parent: 'elementarySchool storeResults',
                    name: 'selectedProblemSetFromBackend',
                    functionCode: updateStateValue,
                    value: -1
                },
                'payload': {
                    parent: 'elementarySchool storeResults',
                    name: 'payload',
                    jsObject: {'problem set table': []}
                },

        'plusProblems problemSet 0': {
            parent: 'elementarySchool',
            children: [],
            name: 'plusProblems problemSet 0',
            variableNames: ['plusProblems numberOfProblems 0']
        },
            'plusProblems numberOfProblems 0': {
                parent: 'plusProblems problemSet 0',
                name: 'plusProblems numberOfProblems 0',
                value: 0
            }
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
let action = {
    type: 'elementarySchool utilities createProblem',
    meta: {
            basePath: 'elementarySchool utilities createProblem', // base state(for the object data)
            parentStateName: 'elementarySchool utilities createProblem',
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