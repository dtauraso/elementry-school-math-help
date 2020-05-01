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
            treeVisualizer} from '../../reducerHelpers'

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
const addChild = (Root2, stateNameLastString, newChildNames) => {

    // newChildName is an array of strings
    // let newChildrenForProblemSet = [
    //     [`problem ${i}`]
    // ]
    

    // add starting trie links to root and add the new problem child to the problem set
    Root2 = {
        ...Root2,
        [stateNameLastString]: {
            ...Root2[stateNameLastString],
            children: [...Root2[stateNameLastString].children, ...newChildNames]
        }
    }
    return Root2
}

const makeLinks = (Root2, {newStateName, parent, stateCells, isVariable, isIntermediateState}) => {
    // newStateName is an array of strings
    /*
    new state: 'problem ${i}'
    parent: `problem set 0`

    */
    let newNextParts = makeSet([
        newStateName[0],
        
    ])

    // let newChildrenForProblemSet = [
    //     newStateName
    // ]
    // let lastName = parent[parent.length - 1]
    // console.log('parts I need')
    // console.log('newStateName', newStateName)
    // console.log('newNextParts', newNextParts)
    // console.log('newChildrenForProblemSet', newChildrenForProblemSet)
    // console.log('lastName', lastName)
    // console.log('parent', parent)
    // console.log('stateCells', stateCells)

    // console.log('tree', Root2)
    // let parentState = getCell(Root2, parent)

    // console.log('parentState', parentState)

    // think of intermediate states as part of the state name chain
    // the root only cares about the first link in the chain
    if(!isIntermediateState) {
        // are some of my non intermdeiate staes the last one of a 3 name state name?
        // if so that will generate an extra connection that will not work at root, but will not affect the graph
        Root2 = {
            ...Root2,
            'root': {
                ...Root2.root,
                nextParts: isVariable?
                // variables don't need to be connected to root as the parent exclusvely accesses them
                {
                    ...Root2.root.nextParts
                }:
                 {
                    ...Root2.root.nextParts,
                    ...newNextParts
                }
        
            }
        }
    }
    
    // console.log('print tree')
    // console.log(Root2)

    return {
    ...Root2,
    ...stateCells
    }
}

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
        
        [variable.name[0]]: {
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
        
        [variable.name[0]]: {
            ...variable,
            value: variable.value + newValue
        }
    }
}

const setupProblem = (state, action) => {

    // 
    // need to put this into a for loop
    // ['elementary school', 'utilities', 'create problem']
    // ['problemCount']
    const parentOfProblemCount = ['elementary school', 'utilities', 'create problem']
    const offsetString = 'plusProblems '
    let numberOfProblems2 = getVariable(state, parentOfProblemCount, `${offsetString}problemCount`).value
    console.log('we need to make', numberOfProblems2, 'problems')
    console.log(state)
    let numberOfProblems3 = getVariable(state, [`${offsetString}problem set 0`], `${offsetString}numberOfProblems`)
    console.log(numberOfProblems3.name[0])
    console.log('about to make a problem', getVariable(state, [`${offsetString}problem set 0`], `${offsetString}numberOfProblems`).value)

    let Root2 = state


    for(let i = 0; i < numberOfProblems2; i++) {

        
        Root2 = incrementVariableBy(Root2, [`${offsetString}problem set 0`], `${offsetString}numberOfProblems`, 1)
        
        // {
        //     ...Root2,
            
        //     [numberOfProblems3.name[0]]: {
        //         ...Root2.numberOfProblems,
        //         value: getVariable(Root2, ['problem set 0'], 'numberOfProblems').value + 1
        //     }
        // }
    
        let numberOfProblems = getVariable(Root2, [`${offsetString}problem set 0`], `${offsetString}numberOfProblems`).value
        let i = numberOfProblems - 1
        // console.log(numberOfProblems, problems[numberOfProblems])
        const ithProblem = problems[i]
        console.log(i, 'th problem', ithProblem)
        let iA = 3 * i
        let iB = iA + 1
        let iAnswer = iA + 2
        console.log("new starting values", iA, iB, iAnswer)
        Root2 = addChild(Root2, `${offsetString}problem set 0`, [[`${offsetString}problem ${i}`]])

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem set 0`],
            newStateName: [`${offsetString}problem ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}problem ${i}`],  // key of AddTwoValues maps to this

                // 0, 1, 2    3, 4, 5   6, 7, 8
                // 0
                children: [ [`${offsetString}${iA} ${i}`],
                            [`${offsetString}${iB} ${i}`],
                            [`${offsetString}${iAnswer} ${i}`]],   // can use the OneValue key and the AddTwoValues key
                variableNames: [`${offsetString}problemParts ${i}`]
            }),
            isVariable: false,
            isIntermediateState: false})

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem ${i}`],
            newStateName: [`${offsetString}problemParts ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}problemParts ${i}`],
                value: 3
            }),
            isVariable: true,
            isIntermediateState: false})
                    

        // console.log('print tree', Root2)
        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem ${i}`],
            newStateName: [`${offsetString}${iA} ${i}`],
            stateCells: makeCell({ // a
                name: [`${offsetString}${iA} ${i}`],
                variableNames: [`${offsetString}value ${iA}`,
                                `${offsetString}quantity ${iA}`,
                                `${offsetString}isForm ${iA}`,
                                `${offsetString}operationType ${iA}`]
            }),
            isVariable: false,
            isIntermediateState: false
        })
        
        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iA} ${i}`],
            newStateName: [`${offsetString}value ${iA}`],
            stateCells: makeCell({
                name: [`${offsetString}value ${iA}`],
                value: ithProblem.a
            }),
            isVariable: true,
            isIntermediateState: false

        })
        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iA} ${i}`],
            newStateName: [`${offsetString}quantity ${iA}`],
            stateCells: makeCell({
                name: [`${offsetString}quantity ${iA}`],
                value: makeQuantity(ithProblem.a, ithProblem.a + ithProblem.b)
            }),
            isVariable: true,
            isIntermediateState: false

        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iA} ${i}`],
            newStateName: [`${offsetString}isForm ${iA}`],
            stateCells: makeCell({
                name: [`${offsetString}isForm ${iA}`],
                value: false
            }),
            isVariable: true,
            isIntermediateState: false

        })

        Root2 = makeLinks(Root2, {
            parent: [`${iA} ${i}`],
            newStateName: [`${offsetString}operationType ${iA}`],
            stateCells: makeCell({
                name: [`${offsetString}operationType ${iA}`],
                value: ''
            }),
            isVariable: true,
            isIntermediateState: false

        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem ${i}`],
            newStateName: [`${offsetString}${iB} ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}${iB} ${i}`], // b
                variableNames: [`${offsetString}value ${iB}`,
                                `${offsetString}quantity ${iB}`,
                                `${offsetString}isForm ${iB}`,
                                `${offsetString}operationType ${iB}`]
            }),
            isVariable: false,
            isIntermediateState: false
        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iB} ${i}`],
            newStateName: [`${offsetString}value ${iB}`],
            stateCells: makeCell({
                name: [`${offsetString}value ${iB}`],
                value: ithProblem.b
            }),
            isVariable: true,
            isIntermediateState: false
        })




        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iB} ${i}`],
            newStateName: [`${offsetString}quantity ${iB}`],
            stateCells: makeCell({
                name: [`${offsetString}quantity ${iB}`],
                value: makeQuantity(ithProblem.b, ithProblem.a + ithProblem.b)
            }),
            isVariable: true,
            isIntermediateState: false

        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iB} ${i}`],
            newStateName: [`${offsetString}isForm ${iB}`],
            stateCells:  makeCell({
                name: [`${offsetString}isForm ${iB}`],
                value: false
            }),
            isVariable: true,
            isIntermediateState: false

        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iB} ${i}`],
            newStateName: [`${offsetString}operationType ${iB}`],
            stateCells: makeCell({
                name: [`${offsetString}operationType ${iB}`],
                value: '+'
            }),
            isVariable: true,
            isIntermediateState: false
        })
        

        // works but [`${iAnswer} ${i}`] link from root's nextParts is actually made when [ `${iAnswer} ${i}`, `submission ${i}`] is added
        
        // intermediate state that also has variable names

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem ${i}`],
            newStateName: [`${offsetString}${iAnswer} ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}${iAnswer} ${i}`],  // answerForm
                nextParts: [`${offsetString}submission ${i}`, `${offsetString}progressMeter ${i}`],
                variableNames: [`${offsetString}isForm ${iAnswer}`, `${offsetString}operationType ${iAnswer}`]
            }),
            isVariable: false,
            isIntermediateState: true
        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iAnswer} ${i}`],
            newStateName: [ `${offsetString}isForm ${iAnswer}`],
            stateCells: makeCell({
                name: [ `${offsetString}isForm ${iAnswer}`],
                value: true
            }),
            isVariable: true,
            isIntermediateState: false
        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iAnswer} ${i}`],
            newStateName: [`${offsetString}operationType ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}operationType ${iAnswer}`],
                value: ''
            }),
            isVariable: true,
            isIntermediateState: false
        })


        
        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem ${i}`],
            newStateName: [ `${offsetString}${iAnswer} ${i}`, `submission ${i}`],
            stateCells : makeCell({
                name: [ `${offsetString}${iAnswer} ${i}`,
                        `${offsetString}submission ${i}`],
                nextParts: [`${offsetString}update typed answer ${i}`],
    
                functionCode: returnState,
                nextStates: [[`${offsetString}${iAnswer} ${i}`, `${offsetString}progressMeter ${i}`]],
    
                children: [ [`${offsetString}noValue ${i}`],
                            [`${offsetString}isInteger ${i}`],
                            [`${offsetString}isNotInteger ${i}`],
                            [`${offsetString}submitValue ${i}`]],
    
                variableNames: [`${offsetString}value ${iAnswer}`,
                                `${offsetString}quantity ${iAnswer}`,
                                `${offsetString}correct ${iAnswer}`,
                                `${offsetString}firstAnswer ${iAnswer}`,
                                `${offsetString}actualAnswer ${iAnswer}`,
                                `${offsetString}submitCount ${iAnswer}`,
                                `${offsetString}feedbackMessage ${iAnswer}`,
                                `${offsetString}backgroundColor ${iAnswer}`]
            }),
            isVariable: false,
            isIntermediateState: false
        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem ${i}`],
            newStateName: [ `${offsetString}${iAnswer} ${i}`,
            `${offsetString}submission ${i}`,
            `${offsetString}update typed answer ${i}`],
            stateCells: makeCell({
                name: [ `${offsetString}${iAnswer} ${i}`,
                        `${offsetString}submission ${i}`,
                        `${offsetString}update typed answer ${i}`],
                functionCode: updateTypedAnswer,
                nextStates: [],
                chldren: []
    
            }),
            isVariable: false,
            isIntermediateState: false
        })
        // Root2 = makeLinks(Root2, {
        //     newStateName
        //     parent
        //     stateCells
        //     isVariable
        //     isIntermediateState
        // })
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}value ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}value ${iAnswer}`],
                value: null
            }),
            isVariable: true,
            isIntermediateState: false
        })
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}quantity ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}quantity ${iAnswer}`],
                value: makeQuantity(0, ithProblem.a + ithProblem.b)
            }),
            isVariable: true,
            isIntermediateState: false
        })
        // ...makeCell({
        //     name: [`quantity ${iAnswer}`],
        //     value: makeQuantity(0, ithProblem.a + ithProblem.b)
        // }),
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}correct ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}correct ${iAnswer}`],
                value: false
            }),
            isVariable: true,
            isIntermediateState: false
        })
        // ...makeCell({
        //     name: [`correct ${iAnswer}`],
        //     value: false
        // }),
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}firstAnswer ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}firstAnswer ${iAnswer}`],
                value: null
            }),
            isVariable: true,
            isIntermediateState: false
        })
        // ...makeCell({
        //     name: [`firstAnswer ${iAnswer}`],
        //     value: null
        // }),
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}actualAnswer ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}actualAnswer ${iAnswer}`],
                value: ithProblem.a + ithProblem.b
            }),
            isVariable: true,
            isIntermediateState: false
        })
        // ...makeCell({
        //     name: [`actualAnswer ${iAnswer}`],
        //     value: ithProblem.a + ithProblem.b
        // }),
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}submitCount ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}submitCount ${iAnswer}`],
                value: 0
            }),
            isVariable: true,
            isIntermediateState: false
        })
        // ...makeCell({
        //     name: [`submitCount ${iAnswer}`],
        //     value: 0
        // }),
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}feedbackMessage ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}feedbackMessage ${iAnswer}`],
                value: 'O'
            }),
            isVariable: true,
            isIntermediateState: false
        })
        // ...makeCell({
        //     name: [`feedbackMessage ${iAnswer}`],
        //     value: 'O'
        // }),
        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}backgroundColor ${iAnswer}`],
            stateCells: makeCell({
                name: [`${offsetString}backgroundColor ${iAnswer}`],
                value: 'white'
            }),
            isVariable: true,
            isIntermediateState: false
        })


        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}noValue ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}noValue ${i}`],
                functionCode: noValue,
                nextStates: [],
            }),
            isVariable: false
        })

        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}isInteger ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}isInteger ${i}`],
                functionCode: isInteger,
                nextStates: [[`${offsetString}submitValue ${i}`]],
            }),
            isVariable: false,
            isIntermediateState: false
        })


        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}isNotInteger ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}isNotInteger ${i}`],
                functionCode: returnState,
                nextStates: [],
            }),
            isVariable: false,
            isIntermediateState: false
        })

        Root2 = makeLinks(Root2, {
            parent: [ `${offsetString}${iAnswer} ${i}`, `${offsetString}submission ${i}`],
            newStateName: [`${offsetString}submitValue ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}submitValue ${i}`],
    
                // need a context for each form
                functionCode: submitValue,
                nextStates: [],
            }),
            isVariable: false,
            isIntermediateState: false
        })
        
        // makeCell({
        //     name: [`isNotInteger ${i}`],
        //     functionCode: returnState,
        //     nextStates: [],
        // })
        // ...makeCell({
        //     name: [`isInteger ${i}`],
        //     functionCode: isInteger,
        //     nextStates: [[`submitValue ${i}`]],
        // }),

        // ...makeCell({
        //     name: [`backgroundColor ${iAnswer}`],
        //     value: 'white'
        // }),
        // ...makeCell({
        //     name: [`value ${iAnswer}`],
        //     value: null
        // }),
        // ...makeCell({
        //     name: [ `${iAnswer} ${i}`,
        //             `submission ${i}`,
        //             `update typed answer ${i}`],
        //     functionCode: updateTypedAnswer,
        //     nextStates: [],
        //     chldren: []

        // }),

        // console.log('he')
        

                                // submit states
                        // for now keep them as next states
                        // ...makeCell({
                        //     name: [`noValue ${i}`],
                        //     functionCode: noValue,
                        //     nextStates: [],
                        // }),

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}problem ${i}`],
            newStateName: [`${offsetString}${iAnswer} ${i}`, `${offsetString}progressMeter ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}${iAnswer} ${i}`, `${offsetString}progressMeter ${i}`],
                functionCode: returnState,
                nextStates: [],
                children: [ [`${offsetString}got it right the first time ${i}`], // passes if they are right and submission count == 1
                            [`${offsetString}else ${i}`]],
                variableNames:  [
                                `${offsetString}correctFirstTime ${i}`,
                                `${offsetString}testingWithoutForm ${i}`
                            ]
            }),
            isVariable: false,
            isIntermediateState: false
        })

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iAnswer} ${i}`, `${offsetString}progressMeter ${i}`],
            newStateName: [`${offsetString}correctFirstTime ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}correctFirstTime ${i}`],
                value: false
            }),
            isVariable: true,
            isIntermediateState: false
        })
        

        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iAnswer} ${i}`, `${offsetString}progressMeter ${i}`],
            newStateName: [`${offsetString}testingWithoutForm ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}testingWithoutForm ${i}`],
                value: false
            }),
            isVariable: true,
            isIntermediateState: false
        })


        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iAnswer} ${i}`, `${offsetString}progressMeter ${i}`],
            newStateName: [`${offsetString}got it right the first time ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}got it right the first time ${i}`],
                functionCode: gotItRightTheFirstTime,
                nextStates: [],
            }),
            isVariable: false,
            isIntermediateState: false
        })

        
        Root2 = makeLinks(Root2, {
            parent: [`${offsetString}${iAnswer} ${i}`, `${offsetString}progressMeter ${i}`],
            newStateName: [`${offsetString}else ${i}`],
            stateCells: makeCell({
                name: [`${offsetString}else ${i}`],
                functionCode: returnState,
                nextStates: [],
            }),
            isVariable: false,
            isIntermediateState: false
        })

        
        // ...,
        // ...,
        // let elementarySchoolName = ['elementary school']
        // console.log('print tree')
        // console.log(Root2)
        //treeVisualizer(Root2, elementarySchoolName, 1)
    
        // links for root
        // let newNextParts = makeSet([
            // `problem ${i}`,
            // `${iA} ${i}`,
            // `${iB} ${i}`,
            // `${iAnswer} ${i}`,
            // `noValue ${i}`,
            // `isInteger ${i}`,
            // `isNotInteger ${i}`,
            // `submitValue ${i}`,
            // `got it right the first time ${i}`,
            // `else ${i}`
        // ])
        


        // new child for problem set 0
        // let newChildrenForProblemSet = [
        //     [`problem ${i}`]
        // ]
        
    
        // add starting trie links to root and add the new problem child to the problem set
        // Root2 = {
        //     ...Root2,
        //     'root': {
        //         ...Root2.root,
        //         nextParts: {
        //             ...Root2.root.nextParts,
        //             ...newNextParts
        //         }
        
        //     },
        //     'problem set 0': {
        //         ...Root2['problem set 0'],
        //         children: [...Root2['problem set 0'].children, ...newChildrenForProblemSet]
        //     }
        // }
        // the states representing the problem
        // let x = {
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
                // ...makeCell({
                //     name: [`problem ${i}`],  // key of AddTwoValues maps to this
        
                //     // 0, 1, 2    3, 4, 5   6, 7, 8
                //     children: [ [`${iA} ${i}`],
                //                 [`${iB} ${i}`],
                //                 [`${iAnswer} ${i}`]],   // can use the OneValue key and the AddTwoValues key
                //     variableNames: [`problemParts ${i}`]
                // }),
        
                    // ...makeCell({
                    //     name: [`problemParts ${i}`],
                    //     value: 3
                    // }),
        
                    // need this for building the arithmatic display structure
                // (
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
                // ...makeCell({ // a
                //     name: [`${iA} ${i}`],
                //     variableNames: [`value ${iA}`,
                //                     `quantity ${iA}`,
                //                     `isForm ${iA}`,
                //                     `operationType ${iA}`]
                // }),
        
                        // ...makeCell({
                        //     name: [`value ${iA}`],
                        //     value: ithProblem.a
                        // }),
        
                        // ...makeCell({
                        //     name: [`quantity ${iA}`],
                        //     value: makeQuantity(ithProblem.a, ithProblem.a + ithProblem.b)
                        // }),
        
                        // ...makeCell({
                        //     name: [`isForm ${iA}`],
                        //     value: false
                        // }),
        
                        // ...makeCell({
                        //     name: [`operationType ${iA}`],
                        //     value: ''
                        // }),
                        // display operator
                        // hiding operator color
        
        
        
                // ...makeCell({
                //     name: [`${iB} ${i}`], // b
                //     variableNames: [`value ${iB}`,
                //                     `quantity ${iB}`,
                //                     `isForm ${iB}`,
                //                     `operationType ${iB}`]
                // }),
        
                        // ...makeCell({
                        //     name: [`value ${iB}`],
                        //     value: ithProblem.b
                        // }),
        
                        // ...makeCell({
                        //     name: [`quantity ${iB}`],
                        //     value: makeQuantity(ithProblem.b, ithProblem.a + ithProblem.b)
                        // }),
        
                        // ...makeCell({
                        //     name: [`isForm ${iB}`],
                        //     value: false
                        // }),
        
                        // ...makeCell({
                        //     name: [`operationType ${iB}`],
                        //     value: '+'
                        // }),
        
                // // cannot be added in as a new state
                // // intermediate state that also has variable names
                // ...makeCell({
                //     name: [`${iAnswer} ${i}`],  // answerForm
                //     nextParts: [`submission ${i}`, `progressMeter ${i}`],
                //     variableNames: [`isForm ${iAnswer}`, `operationType ${iAnswer}`]
                // }),
        
                        // ...makeCell({
                        //     name: [ `isForm ${iAnswer}`],
                        //     value: true
                        // }),
        
                        // ...makeCell({
                        //     name: [`operationType ${iAnswer}`],
                        //     value: ''
                        // }),
        
                // we start our submitting the answer with this cell
                // this index corresponds to the total number of problems
        
                //     ...makeCell({
                //     name: [ `${iAnswer} ${i}`,
                //             `submission ${i}`],
                //     nextParts: [`update typed answer ${i}`],
        
                //     functionCode: returnState,
                //     nextStates: [[`${iAnswer} ${i}`, `progressMeter ${i}`]],
        
                //     children: [ [`noValue ${i}`],
                //                 [`isInteger ${i}`],
                //                 [`isNotInteger ${i}`]],

                //     variableNames: [`value ${iAnswer}`,
                //                     `quantity ${iAnswer}`,
                //                     `correct ${iAnswer}`,
                //                     `firstAnswer ${iAnswer}`,
                //                     `actualAnswer ${iAnswer}`,
                //                     `submitCount ${iAnswer}`,
                //                     `feedbackMessage ${iAnswer}`,
                //                     `backgroundColor ${iAnswer}`]
                // }),
                            // ...makeCell({
                            //     name: [ `${iAnswer} ${i}`,
                            //             `submission ${i}`,
                            //             `update typed answer ${i}`],
                            //     functionCode: updateTypedAnswer,
                            //     nextStates: [],
                            //     chldren: []
        
                            // }),
                        // just indenting the code
                        // ...makeCell({
                        //     name: [`value ${iAnswer}`],
                        //     value: null
                        // }),
        
                        // ...makeCell({
                        //     name: [`quantity ${iAnswer}`],
                        //     value: makeQuantity(0, ithProblem.a + ithProblem.b)
                        // }),
        
                        // ...makeCell({
                        //     name: [`correct ${iAnswer}`],
                        //     value: false
                        // }),
        
                        // ...makeCell({
                        //     name: [`firstAnswer ${iAnswer}`],
                        //     value: null
                        // }),
        
                        // ...makeCell({
                        //     name: [`actualAnswer ${iAnswer}`],
                        //     value: ithProblem.a + ithProblem.b
                        // }),
        
                        // ...makeCell({
                        //     name: [`submitCount ${iAnswer}`],
                        //     value: 0
                        // }),
        
                        // ...makeCell({
                        //     name: [`feedbackMessage ${iAnswer}`],
                        //     value: 'O'
                        // }),
        
                        // ...makeCell({
                        //     name: [`backgroundColor ${iAnswer}`],
                        //     value: 'white'
                        // }),
        
                        // submit states
                        // for now keep them as next states
                        // ...makeCell({
                        //     name: [`noValue ${i}`],
                        //     functionCode: noValue,
                        //     nextStates: [],
                        // }),
        
                        // ...makeCell({
                        //     name: [`isInteger ${i}`],
                        //     functionCode: isInteger,
                        //     nextStates: [[`submitValue ${i}`]],
                        // }),
        
                        // ...makeCell({
                        //     name: [`isNotInteger ${i}`],
                        //     functionCode: returnState,
                        //     nextStates: [],
                        // }),
        
                        // ...makeCell({
                        //     name: [`submitValue ${i}`],
        
                        //     // need a context for each form
                        //     functionCode: submitValue,
                        //     nextStates: [],
                        // }),
        
                    // can enter a submachine again
                    // ...makeCell({
                    //     name: [`${iAnswer} ${i}`, `progressMeter ${i}`],
                    //     functionCode: returnState,
                    //     nextStates: [],
                    //     children: [ [`got it right the first time ${i}`], // passes if they are right and submission count == 1
                    //                 [`else ${i}`]],
                    //     variableNames:  [
                    //                     `correctFirstTime ${i}`,
                    //                     `testingWithoutForm ${i}`
                    //                 ]
                    // }),
        
                        // ...makeCell({
                        //     name: [`correctFirstTime ${i}`],
                        //     value: false
                        // }),
        
                        // ...makeCell({
                        //     name: [`testingWithoutForm ${i}`],
                        //     value: false
                        // }),
        
                    // ...makeCell({
                    //     name: [`got it right the first time ${i}`],
                    //     functionCode: gotItRightTheFirstTime,
                    //     nextStates: [],
                    // }),
        
                    // ...makeCell({
                    //     name: [`else ${i}`],
                    //     functionCode: returnState,
                    //     nextStates: [],
                    // })
        
        
            // }
        // Root2 = {
        //     ...Root2,
        //     ...x
        // }
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
    const offsetString = action.meta.offsetString
    // console.log("got here", parentStateName)
    
    return [set(state, parentStateName, `${offsetString}value`, newValue), true]

}
const noValue = (state, action) => {
    // console.log("is invalid")
    const parentStateName = action.meta.parentStateName
    const offsetString = action.meta.offsetString

    let newValue = getVariable(state, parentStateName, `${offsetString}value`).value
    if(newValue.length === 0) {

        // const parentStateName = action.meta.parentStateName

        let newState = setArray(
            state,
            parentStateName,
            `${offsetString}quantity`,
            makeQuantity(0,
                    getVariable(state, parentStateName, `${offsetString}actualAnswer`).value))

        newState = set(newState, parentStateName, `${offsetString}feedbackMessage`, 'O')

        newState = set(newState, parentStateName, `${offsetString}backgroundColor`, 'white')
        
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

    const newValue = getVariable(state, parentStateName, `${offsetString}value`).value

    // const { basePath } = action.meta.basePath
    // const variablesBasePath = [...action.meta.basePath, 'variables']

    // [...action.type, 'variables'] is the path to the vars for the answer form
    // console.log(getValue(state, makeVariablesObjectPath(action)))
    // console.log("set value", parentStateName, getVariable(state, parentStateName, 'value'))
    // this line works
    let newState = set(state, parentStateName, `${offsetString}value`, parseInt(newValue))
    
    // console.log('new tree')
    // console.log(newState, stateName)
    // console.log("correct", getVariable(state, parentStateName, 'correct'))
    let actualAnswer = getVariable(newState, parentStateName, `${offsetString}actualAnswer`).value
    let maxValue = newValue > actualAnswer? newValue: actualAnswer
    newState = setArray(
        newState,
        parentStateName,
        `${offsetString}quantity`,
        makeQuantity(newValue,
            maxValue)
                )
    // we have no way of knowing if the value they entered is wrong or too small
    // console.log('new tree 2', newState, stateName)
// pass in correctFirstTime


    newState = set(newState, parentStateName, `${offsetString}correct`, [`${offsetString}actualAnswer`, `${offsetString}value`], determineAnswer)

    newState = set(newState, parentStateName, `${offsetString}feedbackMessage`, [`${offsetString}actualAnswer`, `${offsetString}value`], determineAnswerMessage)

    newState = set(newState, parentStateName, `${offsetString}backgroundColor`, 'black')

    // console.log('new tree 3', newState, stateName)
    newState = set(newState, parentStateName, `${offsetString}submitCount`, getVariable(newState, parentStateName, `${offsetString}submitCount`).value + 1)
    const submitCount = getVariable(newState, parentStateName, `${offsetString}submitCount`).value

    // so this matches gotItRightTheFirstTime
    if(submitCount === 1) {
        newState = set(newState, parentStateName, `${offsetString}firstAnswer`, getVariable(newState, parentStateName, `${offsetString}value`).value)

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
    const offsetString = action.meta.offsetString

    // console.log('parent', parentStateName)
    let submitCount = getVariable(state, submissionStateName, `${offsetString}submitCount`).value
    let correct = getVariable(state, submissionStateName, `${offsetString}correct`).value
    let newState = state
    if(submitCount === 1 && correct) {
        newState = set(newState, parentStateName, `${offsetString}correctFirstTime`, true)

        // need to use the same parent state name for getting and setting
        const feedbackMessage = getVariable(state, submissionStateName, `${offsetString}feedbackMessage`).value
        newState = set(newState, submissionStateName, `${offsetString}feedbackMessage`, feedbackMessage + '1')

        return [newState, true]

    }
    return [newState, false]

}
const processProblems = (state, action, cb) => {


    // (i, j) => 00, 10, 20, 31, 41, 51... (numberOfProblems * 3, numberOfProblems)
    // "problem set 0" tells me how many problems we need to use to look for the forms
    const offsetString = action.meta.offsetString

    let problems = getChildren(state, [`${offsetString}problem set 0`])
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

const solveProblem = (state, action, i, j) => {
    const offsetString = action.meta.offsetString
    let temporaryState = state
    let a = getVariable(state, [`${offsetString}${i} ${j}`], `${offsetString}value`).value
    let b = getVariable(state, [`${offsetString}${i + 1} ${j}`], `${offsetString}value`).value
    let submission =           [`${offsetString}${i + 2} ${j}`, `${offsetString}submission ${j}`]
    // console.log(a, b, c)
    // randomly get it wrong
    let randomValue = Math.floor(Math.random() * 10) % 2

    if(randomValue === 0) {
        temporaryState = set(temporaryState, submission, `${offsetString}value`, a + b)
        let progressMeter = [`${offsetString}${i + 2} ${j}`, `${offsetString}progressMeter ${j}`]
        temporaryState = set(temporaryState, progressMeter, `${offsetString}correctFirstTime`, true)
    
    }
    else {
        temporaryState = set(temporaryState, submission, `${offsetString}value`, a + 1)
        let progressMeter = [`${offsetString}${i + 2} ${j}`, `${offsetString}progressMeter ${j}`]
        temporaryState = set(temporaryState, progressMeter, `${offsetString}correctFirstTime`, false)

    }
    // console.log('result', temporaryState)
    temporaryState = set(temporaryState, submission, `${offsetString}correct`, [`${offsetString}actualAnswer`, `${offsetString}value`], determineAnswer)

    temporaryState = set(temporaryState, submission, `${offsetString}submitCount`, getVariable(temporaryState, submission, `${offsetString}submitCount`).value + 1)

    temporaryState = set(temporaryState, submission, `${offsetString}firstAnswer`, getVariable(temporaryState, submission, `${offsetString}value`).value)

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
const collectProblems = (state, action, i, j) => {

    // getCell(state, parentStateName)
    // console.log('in collect problems', state)
    let temporaryState = state
    const offsetString = action.meta.offsetString

    let a = getVariable(state, [`${offsetString}${i} ${j}`], `${offsetString}value`).value
    let b = getVariable(state, [`${offsetString}${i + 1} ${j}`], `${offsetString}value`).value
    let submission =           [`${offsetString}${i + 2} ${j}`, `${offsetString}submission ${j}`]
    let progressMeter =        [`${offsetString}${i + 2} ${j}`, `${offsetString}progressMeter ${j}`]


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
    temporaryState = setVariable(temporaryState, parentStateName, stateName[0], newValue)

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
    let parentStateName = ['elementary school', 'store results']
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
let Root2 = {}
Root2 = {
    ...makeCell({
        name: ['root'],
        nextParts : [   'elementary school',
                        'plusProblems problem set 0',
                        'plusProblems problem 0',
                        'plusProblems problemsParts 0',
                        // rename to 'a 0 0' ? or 'a 0'?
                        // Cannot rename them using letters
                        'plusProblems 0 0',
                        'plusProblems 1 0',
                        'plusProblems 2 0',
                        'plusProblems noValue 0',
                        'plusProblems isInteger 0',
                        'plusProblems isNotInteger 0',
                        'plusProblems submitValue 0',
                        'plusProblems got it right the first time 0',
                        'plusProblems else 0'],
    })
}

Root2 = makeLinks(Root2, {
    parent: ['root'],
    newStateName: ['elementary school'],
    stateCells: makeCell({
        name: ['elementary school'],
        nextParts: ['utilities', 'testing', 'store results'],
        children: [['plusProblems problem set 0']],
        variableNames: ['plusProblems problemSets 0']
    }),
    isVariable: false,
    isIntermediateState: true
})

Root2 = makeLinks(Root2, {
    parent: ['root'],
    newStateName: ['elementary school', 'utilities'],
    stateCells: makeCell({
        name: ['elementary school', 'utilities'],
        nextParts: ['create problem']
    }),
    isVariable: false,
    isIntermediateState: true
})


Root2 = makeLinks(Root2, {
    parent: ['elementary school'],
    newStateName: ['plusProblems problemSets 0'],
    stateCells: makeCell({
        name: ['plusProblems problemSets 0'],
        value: 1
    }),
    isVariable: true,
    isIntermediateState: false
})
// it appears for this to work the substates share the same parent as the root substate
Root2 = makeLinks(Root2, {
    parent: ['root'],
    newStateName: ['elementary school', 'utilities', 'create problem'],
    stateCells: makeCell({
        name: ['elementary school', 'utilities', 'create problem'],
        functionCode: setupProblem,
        nextStates: [],
        variableNames: ['plusProblems problemCount']
    }),
    isVariable: false,
    isIntermediateState: false
})


Root2 = makeLinks(Root2, {
    parent: ['root'],
    newStateName: ['plusProblems problemCount'],
    stateCells: makeCell({
        name: ['plusProblems problemCount'],
        value: problems.length
    }),
    isVariable: true,
    isIntermediateState: false
})



Root2 = makeLinks(Root2, {
    parent: ['root'],
    newStateName: ['elementary school', 'testing'],
    stateCells: makeCell({
        name: ['elementary school', 'testing'],
        functionCode: returnState,
        children: [['autoSolve']],
        nextStates: []
    }),
    isVariable: false,
    isIntermediateState: false
})

Root2 = makeLinks(Root2, {
    parent: ['elementary school', 'testing'],
    newStateName: ['autoSolve'],
    stateCells: makeCell({
        name: ['autoSolve'],
        functionCode: autoSolve,
        nextStates: [['setup for backend']]
    })
    ,
    isVariable: false,
    isIntermediateState: false
})

Root2 = makeLinks(Root2, {
    parent: ['elementary school', 'testing'],
    newStateName: ['setup for backend'],
    stateCells: makeCell({
        name: ['setup for backend'],
        functionCode: setupForBackend,
        nextStates: []
    
    }),
    isVariable: false,
    isIntermediateState: false
})


Root2 = makeLinks(Root2, {
    parent: ['root'],
    newStateName: ['elementary school', 'store results'],
    stateCells: makeCell({
        name: ['elementary school', 'store results'],
        // run a function to save the retreived backend data to a results state
        functionCode: storeResults,
        variableNames: ['resultsFromBackend', 'selectedProblemSetFromBackend'],
        // this is the only place where children links get set
        children: [],
        nextStates: []
    }),
    isVariable: false,
    isIntermediateState: false
})


Root2 = makeLinks(Root2, {
    parent: ['elementary school', 'store results'],
    newStateName: ['resultsFromBackend'],
    stateCells: makeCell({
        name: ['resultsFromBackend'],
        // nextParts: ['problemSetSelected'],
        jsObject: -1
    }),
    isVariable: true,
    isIntermediateState: true
})

Root2 = makeLinks(Root2, {
    parent: ['elementary school', 'store results'],
    newStateName: ['selectedProblemSetFromBackend'],
    stateCells: makeCell({
        name: ['selectedProblemSetFromBackend'],
        nextStates: [],
        functionCode: updateStateValue,
        value: -1
    }),
    isVariable: true,
    isIntermediateState: false
})

Root2 = makeLinks(Root2, {
    parent: ['elementary school', 'store results'],
    newStateName: ['payload'],
    stateCells: makeCell({
        name: ['payload'],
        jsObject: {'problem set table': []}
    }),
    isVariable: true,
    isIntermediateState: false
})

Root2 = makeLinks(Root2, {
    parent: ['elementary school'],
    newStateName: ['plusProblems problem set 0'],
    stateCells: makeCell({
        name: ['plusProblems problem set 0'],
        children: [],
        variableNames: ['plusProblems numberOfProblems 0']
    }),
    isVariable: true,
    isIntermediateState: false
})


Root2 = makeLinks(Root2, {
    parent: ['plusProblems problem set 0'],
    newStateName: ['plusProblems numberOfProblems 0'],
    stateCells: makeCell({
        name: ['plusProblems numberOfProblems 0'],
        value: 0
    }),
    isVariable: true,
    isIntermediateState: false
})
// ...makeCell({
//     name: ['numberOfProblems 0'],
//     value: 0
// }),

// ...makeCell({
//     name: ['problem set 0'],
//     children: [],
//     variableNames: ['numberOfProblems 0']
// }),



// makeCell({
//     name: ['elementary school', 'store results'],
//     // run a function to save the retreived backend data to a results state
//     functionCode: storeResults,

//     // this is the only place where children links get set
//     children: [],
//     nextStates: []
// }),
// makeCell({
//     name: ['setup for backend'],
//     functionCode: setupForBackend,
//     nextStates: []

// }),
// makeCell({
//     name: ['autoSolve'],
//     functionCode: autoSolve,
//     nextStates: [['setup for backend']]
// })
// ...makeCell({
//     name: ['elementary school', 'testing'],
//     functionCode: returnState,
//     children: [['autoSolve']],
//     nextStates: []
// }),
// makeCell({
//     name: ['problemCount'],
//     value: problems.length
// }),

// makeCell({
//     name: ['elementary school', 'utilities', 'create problem'],
//     functionCode: setupProblem,
//     nextStates: [],
//     variableNames: ['problemCount']
// }),

// makeCell({
//     name: ['problemSets 0'],
//     value: 1
// })
// start state
Root2 = {
    ...Root2,
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
    //    ...makeCell({
    //         name: ['root'],
    //         nextParts : [   'elementary school',
    //                         'problem set 0',
    //                         'problem 0',
    //                         'problemParts 0',
    //                         // rename to 'a 0 0' ? or 'a 0'?
    //                         // Cannot rename them using letters
    //                         '0 0',
    //                         '1 0',
    //                         '2 0',
    //                         'noValue 0',
    //                         'isInteger 0',
    //                         'isNotInteger 0',
    //                         'submitValue 0',
    //                         'got it right the first time 0',
    //                         'else 0'],
    //     }),
        // ...makeCell({
        //     name: ['elementary school'],
        //     nextParts: ['utilities', 'testing', 'store results'],
        //     children: [['problem set 0']],
        //     variableNames: ['problemSets 0']
        // }),
            // the indents are for illustration only(ie, each node entire hierarchical tree is stored at the top level of
            // this js object)
            // dummy intermediate state
            // ...makeCell({
            //     name: ['elementary school', 'utilities'],
            //     nextParts: ['create problem']
            // }),

            // ...makeCell({
            //     name: ['problemSets 0'],
            //     value: 1
            // }),
                // ...makeCell({
                //     name: ['elementary school', 'utilities', 'create problem'],
                //     functionCode: setupProblem,
                //     nextStates: [],
                //     variableNames: ['problemCount']
                // }),
                    // ...makeCell({
                    //     name: ['problemCount'],
                    //     value: problems.length
                    // }),
            // ...makeCell({
            //     name: ['elementary school', 'testing'],
            //     functionCode: returnState,
            //     children: [['autoSolve']],
            //     nextStates: []
            // }),
                // ...makeCell({
                //     name: ['autoSolve'],
                //     functionCode: autoSolve,
                //     nextStates: [['setup for backend']]
                // }),
                // ...makeCell({
                //     name: ['setup for backend'],
                //     functionCode: setupForBackend,
                //     nextStates: []

                // }),

            // ...makeCell({
            //         name: ['elementary school', 'store results'],
            //         // run a function to save the retreived backend data to a results state
            //         functionCode: storeResults,

            //         // this is the only place where children links get set
            //         children: [],
            //         nextStates: []
            //     }),
    
        // ...makeCell({
        //     name: ['problem set 0'],
        //     children: [],
        //     variableNames: ['numberOfProblems 0']
        // }),


        // ...makeCell({
        //     name: ['numberOfProblems 0'],
        //     value: 0
        // }),

        

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