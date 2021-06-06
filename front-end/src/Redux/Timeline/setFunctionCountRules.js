import {
    setVariable2,
    getVariable2,
    getState2
} from '../utilityFunctions'

import { makeEntry } from './timelineEntries'

export const allRemainingSetCallsInState = (
    entry,
    stateWeWillRunName,
    parentDataStateAbsolutePathArray,
    varName,
    newValue) => {
    // console.log('allRemainingSetCallsInState')
    // console.log({varName, newValue})
    let before = entry[stateWeWillRunName][parentDataStateAbsolutePathArray]['A_before']
    let after = entry[stateWeWillRunName][parentDataStateAbsolutePathArray]['B_after']
    after[varName] = newValue
    // if a different variable is set after the first set2 call
    // in the same function
    if(varName in after && !(varName in before)) {
        before[varName] = undefined
    }

}


export const applyE2EAndUnitTimelineRules = (
    root,
    set2CallCount,
    stateWeWillRunName,
    functionName,
    parentDataStateAbsolutePathArray,
    parentDataState,
    varName,
    value,
    newValue

    ) => {


    if(set2CallCount === 0) {
        root['trialEntries'].push(makeEntry(
        stateWeWillRunName,
        functionName,
        parentDataStateAbsolutePathArray,
        parentDataState,
        varName,
        value,
        newValue,
        null))
        // console.log('entry made')
        const entriesLen = root['trialEntries'].length
        const entry = root['trialEntries'][entriesLen - 1]
        // need to put the state run count dependent rules in visitor function

    }
    else if(set2CallCount > 0) {
        const entriesLen = root['trialEntries'].length
        const entry = root['trialEntries'][entriesLen - 1]

        // console.log('allRemainingSetCallsInState')
        // passes
        // all remaining set calls inside a single state
        allRemainingSetCallsInState(
        entry,
        stateWeWillRunName,
        // editing an entry that already exists
        `A_${parentDataStateAbsolutePathArray}`,
        varName,
        newValue)
    }
}
export const set2 = (
    {
        root,
        parentStateNameAbsolutePathArray,
        stateWeWillRunName,
        parentDataStateAbsolutePathArray
    },
    varName,
    newValue) => {
    // the react components will travel down the state chart
    // when loading components
    // Set2SFromStateFunctionCallCount, stateRunCount
    // are reset inside breathFirstTraversal2
    // console.log({parentStateNameAbsolutePathArray})
    // console.log({root, parentStateNameAbsolutePathArray})
    let parentState = getState2(root, parentStateNameAbsolutePathArray)
    // console.log({parentState})
    let childState = parentState.children[stateWeWillRunName]
    let functionName = childState.functionCode.name
    let parentDataState = getState2(root, parentDataStateAbsolutePathArray)
    let value = undefined
    if(varName in parentState['variables']) {
        value = parentState['variables'][varName]
    }

    let set2CallCount = childState['Set2SFromStateFunctionCallCount']
    let stateRunCount = childState['stateRunCount']
    let startChildren = parentState['start']
    console.log({varName, value})
    /* 
    unit test:
    entry is saved at the state it was made in
    end to end test:
    entry is saved at the parent state
    */
    applyE2EAndUnitTimelineRules(
        root,
        set2CallCount,
        stateWeWillRunName,
        functionName,
        parentDataStateAbsolutePathArray,
        parentDataState,
        varName,
        value,
        newValue
    )

    parentState['variables'][varName] = newValue

    childState['Set2SFromStateFunctionCallCount'] += 1
    // console.log({parentState, childState})
    // console.log(childState['Set2SFromStateFunctionCallCount'])
    // return root

    //     /*
    //     resetting
    //     childState['Set2SFromStateFunctionCallCount']
    //     childState['stateRunCount']
    //     will happen in breathFirstTraversal2

    //     */
    //     /*

    //     stateName could match parentDataState1 or not
    //     reference to rootObject, 
    //     parentStateNameAbsolutePathArray,
    //     stateWeWillRunName,
    //     parentDataStateAbsolutePathArray,
    //     varName,
    //     newValue
    //     the form state machine should hold a collection of timelines
    //     store the data into the parent state
    //     after the child state is done running
    //     take the last piece of data from the child state in the parent state
    //     and store it into the child state. use the refernce

    //     if childStateName is the start child and Set2SFromStateFunctionCallCount === 0
    //         start the new timeline

    //     if Set2SFromStateFunctionCallCount === 0 and stateRunCount === 0
    //         start the new timeline for the childStateName 
    //     reset Set2SFromStateFunctionCallCount after the state passed
    //     reset stateRunCount right before the recursive call(breathFirstTraversal2) unwinds
    //     parentstateName: {
    //         Set2SFromStateFunctionCallCount: 0,
    //         stateRunCount: 0
    //         timeLines: [ {
    //             0: {
    //                 childStateName1: {
    //                     parentDataStateAbsolutePathArray1: {
    //                         // is assigned 1 time
    //                         before: {
    //                             var1: 
    //                             var2:
    //                         }
    //                         // is assigned the remaining times
    //                         after: {
    //                             var1:
    //                             var2
    //                         }
    //                     }
    //                 }
    //             },
    //             1: {
    //                 childStateName2: {
    //                     parentDataStateAbsolutePathArray2: {
    //                         before: {
    //                             var1: 
    //                             var2:
    //                         }
    //                         after: {
    //                             var1:
    //                             var2
    //                         }
    //                     }
    //                 }
    //             }
    //         }]
    //     }

    //     */
}
