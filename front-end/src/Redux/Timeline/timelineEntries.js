export const makeEntry = (  stateWeWillRunName,
    functionName,
    parentDataStateAbsolutePathArray,
    parentDataState,
    varName,
    value,
    newValue,
    childTimeLine) => {
    return {
        [stateWeWillRunName]: {
            // enforce order of keys becuase Chrome inspector
            // sorts the keys
            [`A_${parentDataStateAbsolutePathArray}`]: {

                // is set 1 time
                A_before: {
                    [varName]: value
                },
                // is set 1 time and reset the remaining times set2 is called inside the
                // function for stateWeWillRunName
                B_after: {
                    [varName]: newValue
                },
                C_reference: parentDataState,
            },
            B_childTimeLine: childTimeLine,
            C_functionName: functionName,

        }
    }
}

// export const saveErrorEntry = (
//     temporaryState,
//     parentStateNameAbsolutePathArray,
//     stateWeWillRunName,
//     parentDataStateAbsolutePathArray,
//     nextStates,
//     currentStateName,
//     varName,
//     newValue) => {
//         let entry = {}
//         let parentState = getState2(temporaryState, parentStateNameAbsolutePathArray)
//         let childState = getState2(temporaryState, stateWeWillRunName)
//         let functionName = childState.functionCode.toString()
//         let parentDataState = getState2(temporaryState, parentDataStateAbsolutePathArray)
//         let variable = parentState['variables'][varName]
    
//         let set2CallCount = childState['Set2SFromStateFunctionCallCount']
//         let stateRunCount = childState['stateRunCount']
//         let startChildren = parentState['start']
    
//         applyE2EAndUnitTimelineRules(
//             set2CallCount,
//             stateRunCount,
//             childState,
//             startChildren,
//             parentState,
//             entry,
//             stateWeWillRunName,
//             parentDataStateAbsolutePathArray,
//             varName,
//             newValue
//         )

// }
