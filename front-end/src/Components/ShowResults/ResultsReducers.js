// import { makeQuantity } from '../utility'
// import {    
//             appendStates,
//             setVariable,
//             getVariable,
//             breathFirstTraversal, 
//             getCell,
//             getChildren,

//             tableAssign,
//             set,
//             setArray,
//             printTreeInteractive,
//             getChild
        
        
        
        
//         } from '../Redux/reducerHelpers'
import { set2 } from '../../Redux/Timeline/setFunctionCountRules'

// only runs when user does autocompute
const storeResults = (state, action) => {

    // const stateName = action.type
    // const payload = action.payload
    // let temporaryState = state
    // console.log('store results')
    // console.log({parent: action.meta.parentState, meta: action.meta})

    /*
    action.type is acting as a parent when a state is being run
    action.typ is acting as a child state after the state runs successfully
    single timestep difference vs difference in hierarchy
    can't want to print out the state path at the same time as
    using it as the parent

    the difference in pointers the first time was hierarchical
    the second time was on the same level
    */
    // console.log({state, action})
    // use an array for the path
    const argumentObject = {
        root: state,
        // action.meta.parent is not a path
        parentStateNameAbsolutePathArray: action.meta.parentPathArray,
        stateWeWillRunName: action.meta.currentStateName,
        parentDataStateAbsolutePathArray: action.meta.parentPathArray
    }
    // console.log({argumentObject})
    set2(argumentObject, 'test', 1)
    set2(argumentObject, 'test', 4)
    // set2(argumentObject, 'I\'m another test', 7)

        // // console.log('store resulst', payload)

    // let parentStateName = 'elementarySchool storeResults'
    // temporaryState = setVariable(temporaryState, parentStateName, 'resultsFromBackend', payload)
    // // console.log('saved payload')
    // // console.log(temporaryState)
    return [state, true]
}

const setupSubmachineForDisplay = (state, action) => {

    // const stateName = action.type
    // const payload = action.payload
    // let temporaryState = state
    // console.log({type: action.type, meta: action.meta})
    const argumentObject = {
        root: state,
        parentStateNameAbsolutePathArray: action.meta.parentPathArray,
        stateWeWillRunName: action.meta.currentStateName,
        parentDataStateAbsolutePathArray: action.meta.parentPathArray
    }
    // console.log({argumentObject})
    set2(argumentObject, 'test', 78)
    // set2(argumentObject, 'display test', 4)
    // set2(argumentObject, 'test', 6)
    // set2(argumentObject, 'test', 8)

    // set2(argumentObject, 'I\'m a special display test', 7)

    // let problemSets = getCell(temporaryState, 'resultsFromBackend').value['problems']
    // // console.log({problemSets})
    // // problemSetId is too large(the sql id table isn't getting reset)
    // let problemSetId = getCell(temporaryState, 'selectedProblemSetFromBackend').value

    // // console.log('my problem sets', problemSets, 'selected problem set id', problemSetId)
    // const myProblemSet = problemSets[problemSetId]
    // // console.log('the problem set to display', myProblemSet)
    // // make the state machine structure for each problem
    // // action.meta.problemSet = myProblemSet
    // action.meta.mathProblems = myProblemSet
    // action.meta.offsetString = 'displayResults'
    // console.log({action})
    // can't just append the next problem set for display when a user selects a random problem set
    // we can change the problem set gneration to using a dict system
    // we can also loop the makeProblemSet for all the times there are problem sets
    // have this function be called earlier in the timeline and use a loop
    // we are just appending to the end of a growing list
    // loop idea works

    // map the problem id selected to the last problem appended
    // systemwide problem requarding offsetString as a state name
    // 'plusProblems' as a state name vs 'plusProblems ' as a state name access substring
    // for(let i = 0; i < problemSets.length; i += 1 ) {
    // let problemSetIdMapToAppendedProblemId = getVariable(temporaryState, 'elementarySchool displayResults', 'problemSetIdMapToAppendedProblemId').value
    // the second time selecting problemSetId messes things up
    // it's using the previously selected one for a different item
    // seems to be set to the previously selected item
    // this if statement may be wrong
    // if(problemSetIdMapToAppendedProblemId[problemSetId] === undefined) {

    //     temporaryState = setVariable(temporaryState, 'elementarySchool displayResults', 'problemCount', myProblemSet.length)

        // works because this always appens the next generated set to the parent's child array
        // and we map the set they picked with the index of the last position of the parent's child array

        // "displayResults problemSet 0" is the problem set name genrated but the '0' doesn't refer to the ith problem set
        // when this runs it's overriting previous correctly calculated results for a different problem set
        // this problem set is for display purposes
        // let result = makeProblemSet(temporaryState, action)
        // temporaryState = result[0]
        // let myDisplayResults = getCell(temporaryState, 'displayResults')
    
        // // index of the last item appended
        // let appendedProblemId = myDisplayResults.children.length - 1
    
        // // have it find out if the user already picked it and only generate stuff if the user hasn't picked it before
        // // works
        // console.log({problemSetId, appendedProblemId})
    
        // temporaryState = setVariable(   temporaryState,
        //                                 'elementarySchool displayResults',
        //                                 'problemSetIdMapToAppendedProblemId',
        //                                 {...problemSetIdMapToAppendedProblemId,
        //                                     [problemSetId]: appendedProblemId})
    // }  

    // temporaryState = {
    //     ...temporaryState,
    //     // add var name to parent
    //     'elementarySchool displayResults': {
    //         ...temporaryState['elementarySchool displayResults'],
    //         variableNames: [...temporaryState['elementarySchool displayResults'].variableNames,
    //                         'problemSetIdMapToAppendedProblemId']
    //     },
    //     // add variable to machine and link it to parent
    //     'problemSetIdMapToAppendedProblemId': {
    //         parent: 'elementarySchool displayResults', // same parent as selectedProblemSetFromBackend
    //         name: 'problemSetIdMapToAppendedProblemId',
    //         value: {[problemSetId]: appendedProblemId}
    //     }
    // }
    // 'problemSetIdMapToAppendedProblemId'
    // one state varable with value = {problemSetId: appendedProblemId}
    // console.log('set dict up', temporaryState)


    // printTreeInteractive(temporaryState)

    // have the viewing card read the structure
    return [state, true]
}

const setupSubmachineForProblems = (state, action) => {

    // set the problems into action.meta
    // call setupProblem
    return [state, true]
}

export {storeResults, 
        setupSubmachineForDisplay,
        setupSubmachineForProblems}