export const setVariable2 = () => {

}
export const getVariable2 = (root, absolutePath) => {

}

export const getState2 = (root, absolutePath) => {
    // assume absolute path is name1 name2 name3 - name4 name5 - name6
    let listOfStrings = absolutePath.split(' - ')
    let pathList = listOfStrings.map(string => string.split(' '))

    let tracker = root
    // console.log({root, pathList})
    pathList.forEach((stateNameParts, i) => {
        stateNameParts.forEach(stateNamePart => {
            if(stateNamePart in tracker) {
                tracker = tracker[stateNamePart]
            }
        })
        // ' - ' means child and is only between the states in the path
        if(i < pathList.length - 1) {
            if('children' in tracker) {
                tracker = tracker['children']
            }
        }
        
        // console.log({tracker, stateNameParts})
    })
    // console.log('return this', tracker)
    return tracker

}
export const substateKeys = (state) => {
    let specialKeys = ['functionCode',
                        'start',
                        'next',
                        'children',
                        'variables',
                        'parent']
    let keys = Object.keys(state).filter(key => !specialKeys.includes(key))
    // console.log(keys)
    return keys
}
export const isLeafState = (state) => {
    // console.log(state, !('children' in state), substateKeys(state).length)
    return substateKeys(state).length === 0 &&
            !('children' in state)
}
export const isInternalState = (state) => {

    return substateKeys(state).length > 0 ||
            'children' in state
}
export const setTimelineMetadataToStates = (contextualStateChart) => {
    
    // add timeline keys to each state
    // put in parent links
    if(Object.keys(contextualStateChart).length === 0) {
        return [contextualStateChart]
    }
    // if('variables' in contextualStateChart && !('children' in state)) {
    //     // console.log("PASSES")
    //     return [contextualStateChart]
    // }
    if(isLeafState(contextualStateChart)) {
        // console.log(substateKeys(contextualStateChart), contextualStateChart)
        // console.log("leaf state", Object.keys(contextualStateChart))
        return [contextualStateChart]
    }
    if(isInternalState(contextualStateChart)) {

        // getting all the substates(may be several nodes long) of a particular state to connect
        // them to their parent
        let returnCollection = []
        
        if('children' in contextualStateChart) {
            let allSubstates = []

            Object.keys(contextualStateChart.children).forEach(child => {
                allSubstates = [
                    ...allSubstates,
                    ...setTimelineMetadataToStates(contextualStateChart.children[child])
                ]
            })
            allSubstates.forEach(nestedSubstate => {
                nestedSubstate['parent'] = contextualStateChart
                nestedSubstate['Set2SFromStateFunctionCallCount'] = 0
                nestedSubstate['stateRunCount'] = 0
                nestedSubstate['E2ETimeLines'] = []
                nestedSubstate['unitTimeLines'] = []
            })
            returnCollection.push(contextualStateChart)
        }
        let subKeys = substateKeys(contextualStateChart)

        if(subKeys.length > 0) {
            subKeys.forEach(subKey => {
                returnCollection = [
                    ...returnCollection,
                    ...setTimelineMetadataToStates(contextualStateChart[subKey])
                ]
            })
            if('variables' in contextualStateChart && !('children' in contextualStateChart)) {
                returnCollection = [
                    ...returnCollection,
                    contextualStateChart
                ]
            }
        }
        return returnCollection
    }
    else {
        console.log("problem", contextualStateChart)
    }
    // if it's a leaf state
        // return the state
    // if it's an internal state
        /*
        what if the internal state has children and substates
            return the most nested substates and the internal state
        if the internal state has children
            allNestedSubstates = setTimelineMetadataToStates(contextualStateChart[children])
            for each state in allNestedSubstates
                state.parent = contextualStateChare
                state.metadata = {

                }
            returnCollection.push(internal state)
        if the internal state has substates
            returnCollection.push(setTimelineMetadataToStates(contextualStateChart[subState]))
        return returnCollection
        */
    // else if('children' in contextualStateChart) {
    //     // if()
    // }
    // if(!('children' in contextualStateChart)) {
    //     Object.keys(contextualStateChart).forEach(subState => {
    //         setTimelineMetadataToStates(contextualStateChart[subState])
    //     })
    // }
    // else {
    //     let parent = contextualStateChart
    //     Object.keys(contextualStateChart).forEach(subState => {
    //         setTimelineMetadataToStates(contextualStateChart[subState])
    //     })
    // }
}
export const makeEntry = (  stateWeWillRunName,
                            functionName,
                            parentDataStateAbsolutePath,
                            parentDataState,
                            varName,
                            value,
                            newValue,
                            childTimeLine) => {
    return {
        [stateWeWillRunName]: {
            // enforce order of keys becuase Chrome inspector
            // sorts the keys
            [`A_${parentDataStateAbsolutePath}`]: {

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

export const getParentObject = (parentState) => {

    if('parent' in parentState) {
        return parentState['parent']
    }
    return false
}

export const setupFirstState = (parentState, childState, entry) => {

    // make the end to end entry
    parentState['E2ETimeLines'].push([])
    const lenParent = parentState['E2ETimeLines'].length
    parentState['E2ETimeLines'][lenParent - 1].push(entry)
    // what if there is no grandparent
    // get the parent's parent and link it down to parentState['E2ETimeLines'][lenParent - 1][lastItem]
    const grandParentObject = getParentObject(parentState)
    if(grandParentObject) {
        const grandparentTimeLinesLen = grandParentObject['E2ETimeLines'].length
        const grandparentTimeLineLen = grandParentObject['E2ETimeLines'][grandparentTimeLinesLen - 1].length
        grandParentObject['E2ETimeLines'][grandparentTimeLinesLen - 1][grandparentTimeLineLen - 1].childTimeLine = parentState['E2ETimeLines'][lenParent - 1]
    
    }

    childState['unitTimeLines'].push([])
    const lenChild = childState['unitTimeLines'].length
    childState['unitTimeLines'][lenChild - 1].push(entry)
}

export const setupSetInAllRemainingStates = (parentState, childState, entry) => {

    /*
        make a new timeline for entries, because we need to keep the
        new entries separate from the previous entries from prior
        runs of the submachine
        make a new timeline for the child state
            the child state might be run more than 1 time in the same machine so we
            need to keep the child runs separated from each submachine run
        add entry to new timeline for the child state
        append entry to end to end time line for the parent state
        
    */
    parentState['E2ETimeLines'].push([])
    const lenParent = parentState['E2ETimeLines'].length
    parentState['E2ETimeLines'][lenParent - 1].push(entry)

    childState['unitTimeLines'].push([])
    const lenChild = childState['unitTimeLines'].length
    childState['unitTimeLines'][lenChild - 1].push(entry)

}
export const revisitingSuccessfullyRunStates = (parentState, childState, entry) => {

    const lenParent = parentState['E2ETimeLines'].length
    parentState['E2ETimeLines'][lenParent - 1].push(entry)

    const lenChild = childState['unitTimeLines'].length
    childState['unitTimeLines'][lenChild - 1].push(entry)

}
export const allRemainingSetCallsInState = (entry,
                                            stateWeWillRunName,
                                            parentDataStateAbsolutePath,
                                            varName,
                                            newValue) => {
    // console.log('allRemainingSetCallsInState')
    // console.log(varName, newValue)
    let before = entry[stateWeWillRunName][parentDataStateAbsolutePath]['A_before']
    let after = entry[stateWeWillRunName][parentDataStateAbsolutePath]['B_after']
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
    stateRunCount,
    childState,
    startChildren,
    parentState,
    stateWeWillRunName,
    functionName,
    parentDataStateAbsolutePath,
    parentDataState,
    varName,
    value,
    newValue

) => {
   

    if(set2CallCount === 0) {
        root['entries'].push(makeEntry(
            stateWeWillRunName,
            functionName,
            parentDataStateAbsolutePath,
            parentDataState,
            varName,
            value,
            newValue,
            null))
        // console.log('entry made')
        const entriesLen = root['entries'].length
        const entry = root['entries'][entriesLen - 1]
        if(stateRunCount === 0) {
            // the start of each state
            
            if(childState in startChildren) {
                // passes for machine of 1 level
                // the first state in the submachine
                setupFirstState(parentState, childState, entry)
            }
            else {
                // first set function called in all states that aren't start states
                setupSetInAllRemainingStates(parentState, childState, entry)                

            }
        }
        else if(stateRunCount > 0) {
            // any state that has already been successfully run once
            revisitingSuccessfullyRunStates(parentState, childState, entry)
        }
    }
    else if(set2CallCount > 0) {
        const entriesLen = root['entries'].length
        const entry = root['entries'][entriesLen - 1]

        // passes
        // all remaining set calls inside a single state
        allRemainingSetCallsInState(
            entry,
            stateWeWillRunName,
            // editing an entry that already exists
            `A_${parentDataStateAbsolutePath}`,
            varName,
            newValue)
    }
}
export const set2 = ({root,
                    parentStateNameAbsolutePath,
                    stateWeWillRunName,
                    parentDataStateAbsolutePath},
                    varName,
                    newValue) => {
    // the react components will travel down the state chart
    // when loading components
    // Set2SFromStateFunctionCallCount, stateRunCount
    // are reset inside breathFirstTraversal2
    console.log({parentStateNameAbsolutePath})
    let parentState = getState2(root, parentStateNameAbsolutePath)
    console.log({parentState})
    let childState = parentState.children[stateWeWillRunName]
    let functionName = childState.functionCode.name
    let parentDataState = getState2(root, parentDataStateAbsolutePath)
    let value = undefined
    if(varName in parentState['variables']) {
        value = parentState['variables'][varName]
    }

    let set2CallCount = childState['Set2SFromStateFunctionCallCount']
    let stateRunCount = childState['stateRunCount']
    let startChildren = parentState['start']
    // console.log('about to make entry')
    // console.log({stateWeWillRunName,
    //     functionName,
    //     parentDataStateAbsolutePath,
    //     parentDataState,
    //     varName,
    //     value,
    //     newValue})
    // not supposed to make a new entry each time set2 is called
    // root['entries'].push(makeEntry(
    //     stateWeWillRunName,
    //     functionName,
    //     parentDataStateAbsolutePath,
    //     parentDataState,
    //     varName,
    //     value,
    //     newValue,
    //     null))
    // console.log('entry made')
    // const entriesLen = root['entries'].length
    // const entry = root['entries'][entriesLen - 1]
    // console.log({entry, stateWeWillRunName})
    /* 
    unit test:
        entry is saved at the state it was made in
    end to end test:
        entry is saved at the parent state
    */
    applyE2EAndUnitTimelineRules(
        root,
        set2CallCount,
        stateRunCount,
        childState,
        startChildren,
        parentState,
        stateWeWillRunName,
        functionName,
        parentDataStateAbsolutePath,
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
//     parentstateNameAbsolutePath,
//     stateWeWillRunName,
//     parentDataStateAbsolutePath,
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
//                     parentDataStateAbsolutePath1: {
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
//                     parentDataStateAbsolutePath2: {
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

// export const treeVisualizer2 = () => {

// }
export const saveErrorEntry = (
    temporaryState,
    parentstateNameAbsolutePath,
    stateWeWillRunName,
    parentDataStateAbsolutePath,
    nextStates,
    currentStateName,
    varName,
    newValue) => {
        let entry = {}
        let parentState = getState2(temporaryState, parentstateNameAbsolutePath)
        let childState = getState2(temporaryState, stateWeWillRunName)
        let functionName = childState.functionCode.toString()
        let parentDataState = getState2(temporaryState, parentDataStateAbsolutePath)
        let variable = parentState['variables'][varName]
    
        let set2CallCount = childState['Set2SFromStateFunctionCallCount']
        let stateRunCount = childState['stateRunCount']
        let startChildren = parentState['start']
    
        applyE2EAndUnitTimelineRules(
            set2CallCount,
            stateRunCount,
            childState,
            startChildren,
            parentState,
            entry,
            stateWeWillRunName,
            parentDataStateAbsolutePath,
            varName,
            newValue
        )

}

export const setupForBreathFirstTraversal2 = (state, action, levelId) => {

    // setup for breathFirstTraversal2
    // pull out parent information if possible
    // assume we are starting with action.type
    let parent = getState2(state, action.type)

    action.meta.currentStateNames = parent.start

    // let pathToParent = action.type.split(' - ')
    // pathToParent.pop()
    // pathToParent = pathToParent.join(' - ')
    action.meta.parent = parent

    // need to also maintain a parentPath pointer
    action.meta.parentPath = action.type
    action.meta.root = state
    console.log("action", action)
    return breathFirstTraversal2(state, action, levelId)

}
export const replaceState = (action, winningStateName) => {
    action.type = action.type.split(' - ')
    action.type.pop()
    action.type.push(winningStateName)
    action.type = action.type.join(' - ')

}
export const pushNextLevel = (action) => {
    action.type = action.type.split(' - ')
    action.type.pop()
    action.type = action.type.join(' - ')

}
export const popLowestLevel = (action) => {
    action.type = action.type.split(' - ')
    action.type.pop()

}

export const breathFirstTraversal2 = (state, action, levelId) => {

    let temporaryState = state

    let next = action.meta.currentStateNames
    let parent = action.meta.parent
    /*
    parentstateNameAbsolutePath,
    stateWeWillRunName
    */
    // let currentStateName = action.type
    // let start
    // console.log('inside the bft2')
    // console.log({state, action, levelId})
    while(true) {
        let passes = false
        let winningStateName = ''
        
        next.forEach(nextStateName => {
            // console.log(action.meta.parent, next)
            let nextState = action.meta.parent.children[nextStateName]
            if(nextState === undefined) {
                console.log("the js syntax for the next states is wrong")
                return null
            }

            if(passes) {
                return null
            }
            // console.log({temporaryState, nextState})

            // console.log({state})
            if(!('functionCode' in nextState)) {
                console.log(nextState, "doesn't have a function")
                return null
            }

            action.meta.currentStateName = nextStateName
            const result = nextState['functionCode'](temporaryState, action)
            const success = result[1]

            temporaryState = result[0]
            if(!success) {
                return null
            }
            passes = true
            winningStateName = nextStateName

        })
        /*
        state logging rules
            ony add an entry when it's corresponding state socceeds
            if the state failed save all of the trial states set results
                from the first successfull set call to the last successfull set call
            make sure every entry has a link to the function code
        if we change a variable over multiple states, the inital record of the state currently
        shows the variable as starting out undefined
        */
        if(!passes) {
            // reset stateRunCount on all children states
            Object.keys(parent.children).forEach(childStateName => {
                parent.children[childStateName].stateRunCount = 0
            })
            return [temporaryState, false]
        }
        let winningState = action.meta.parent.children[winningStateName]
        // reset Set2SFromStateFunctionCallCount after the state passed
        winningState.Set2SFromStateFunctionCallCount = 0

        winningState.stateRunCount += 1
        // console.log(winningState.stateRunCount)

        // if state was start
        if(parent.start.includes(winningStateName)) {
            if(levelId > 0) {
                action.type += ` - ${winningStateName}`
            }
        }
        else {
            replaceState(action, winningStateName)
        }
        console.log(action.type)
        if('children' in winningState) {
            console.log("children")
            // action.type += ' - '
            action.meta.parent = winningState
            action.meta.currentStateNames = Object.keys(action.meta.parent.children)
            const nestedResult = breathFirstTraversal2(
                temporaryState,
                action,
                levelId + 1
            )
            // reset stateRunCount on all children states
            Object.keys(parent.children).forEach(childStateName => {
                parent.children[childStateName].stateRunCount = 0
            })
            passes = nestedResult[1]
            if(!passes) {
                return [temporaryState, false]
            }
            temporaryState = nestedResult[0]
            action.meta.parent = parent

            popLowestLevel(action)
        }
        if('next' in winningState) {
            // console.log('next', winningStateName, action.meta.parent.children[winningStateName])
            next = action.meta.parent.children[winningStateName].next
        }
        else {
            // reset stateRunCount on all children states
            Object.keys(parent.children).forEach(childStateName => {
                parent.children[childStateName].stateRunCount = 0
            })
            return [temporaryState, true]
        }
    }
}