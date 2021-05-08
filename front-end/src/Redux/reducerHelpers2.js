export const setVariable2 = () => {

}
export const getVariable2 = (root, absolutePath) => {

}

export const getState2 = (root, absolutePathArray) => {
    // assume absolute path is name1 name2 name3 - name4 name5 - name6
    // let listOfStrings = absolutePath.split(' - ')
    let pathList = absolutePathArray.map(string => string.split(' '))

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
    // linking state to it's parent
    // a timeline key is not added to root because the key can only be added
    // to the child when it links to the root
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
}
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


export const allRemainingSetCallsInState = (entry,
                                            stateWeWillRunName,
                                            parentDataStateAbsolutePathArray,
                                            varName,
                                            newValue) => {
    // console.log('allRemainingSetCallsInState')
    // console.log(varName, newValue)
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
    stateRunCount,
    childState,
    startChildren,
    parentState,
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
export const set2 = ({root,
                    parentStateNameAbsolutePathArray,
                    stateWeWillRunName,
                    parentDataStateAbsolutePathArray},
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

// export const treeVisualizer2 = () => {

// }
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




export const addOrSwitchWinningStateName = (action, winningStateName) => {

    if(action.meta.parentState.start.includes(winningStateName)) {
        // console.log("push", action.meta.logList)
        action.meta.logList.push(winningStateName)
        // if(levelId > 0) {
        //     action.type += ` - ${winningStateName}`
        // }
    }
    else {
        action.meta.logList.pop()
        action.meta.logList.push(winningStateName)
        // replaceState(action, winningStateName)
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
    // console.log({parentState, grandParentObject})

    if(grandParentObject) {
        // what if grandParentObject has never ben used yet
        if(grandParentObject['E2ETimeLines'].length === 0) {
            grandParentObject['E2ETimeLines'].push([])
            const grandparentTimeLinesLen = grandParentObject['E2ETimeLines'].length
            grandParentObject['E2ETimeLines'][grandparentTimeLinesLen - 1].push([])
            const grandparentTimeLineLen = grandParentObject['E2ETimeLines'][grandparentTimeLinesLen - 1].length
            grandParentObject['E2ETimeLines'][grandparentTimeLinesLen - 1][grandparentTimeLineLen - 1].childTimeLine = parentState['E2ETimeLines'][lenParent - 1]

        }
        else {
            const grandparentTimeLinesLen = grandParentObject['E2ETimeLines'].length
            const grandparentTimeLineLen = grandParentObject['E2ETimeLines'][grandparentTimeLinesLen - 1].length
            // console.log({grandparentTimeLinesLen, grandparentTimeLineLen})
            grandParentObject['E2ETimeLines'][grandparentTimeLinesLen - 1][grandparentTimeLineLen - 1].childTimeLine = parentState['E2ETimeLines'][lenParent - 1]
    
        }
    
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
export const applyStateCountRecordRules = (
    stateRunCount,
    startChildren,
    stateWeWillRunName,
    parentState,
    childState,
    entry
) => {

    if(stateRunCount === 0) {
        // the start of each state
        // console.log(stateWeWillRunName, startChildren)
        // stateWeWillRunName is supposed to be a string
        if(startChildren.includes(stateWeWillRunName)) {
            // passes for machine of 1 level
            // the first state in the submachine
            // console.log('setupFirstState')
            setupFirstState(parentState, childState, entry)
        }
        else {
            // console.log('setupSetInAllRemainingStates')
            // first set function called in all states that aren't start states
            setupSetInAllRemainingStates(parentState, childState, entry)                

        }
    }
    else if(stateRunCount > 0) {
        // console.log('revisitingSuccessfullyRunStates')
        // any state that has already been successfully run once
        revisitingSuccessfullyRunStates(parentState, childState, entry)
    }
}
export const setupForBreathFirstTraversal2 = (state, action, levelId) => {

    // setup for breathFirstTraversal2
    // pull out parent information if possible
    // assume we are starting with action.type
    /*
    currentState (object)
    parentState (object)
    parentPath (string)
    action.type (string)
    
    need to start state at getState2('elementarySchool - displayResults')
    checking for the next state must be O(1) time
    type must be the path of the current state (printing out in redux debugger)
    need parent and child to always be different for accessing the next state
    a parent(child in the first run) can represent any collection of start children
  
    expected log output
    elementarySchool - displayResults
    elementarySchool - displayResults - storeResults
    elementarySchool - displayResults - setupSubmachineForDisplay

    */

    /*
    action.meta.parentState
    action.meta.parentPathArray
    action.meta.childName
    */
    // console.log("setupForBreathFirstTraversal2")
    // console.log({path})
    let path = action.type.split(' - ')

    // assume path as at least 2 elements

    action.meta.parentPathArray = path.slice(0, path.length - 1)
    action.meta.logList = path.slice(0, path.length - 1)
    action.meta.parentState = getState2(state, action.meta.parentPathArray)
    action.meta.currentStateNames = [path[path.length - 1]]
    action.meta.stateNumberRun = -1

    return breathFirstTraversal2(state, action, levelId)
}
export const breathFirstTraversal2 = (state, action, levelId) => {

    // want user to think in terms of name - name
    // but system is default setup to use [name, name]
    // the path array is converted to string for action.type
    // console.log('action starting at breathFirstTraversal2', action)
    /* the logging system has 2 parts
            # set calls in each state function(seems to work)
            # times state was run in submachine(redesign)
    */
    let temporaryState = state

    let next = action.meta.currentStateNames
    let parentPathArray = action.meta.parentPathArray
    /*
    parentStateNameAbsolutePathArray,
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
            let nextState = action.meta.parentState.children[nextStateName]
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
            // console.log('action before running state', action)
            const result = nextState['functionCode'](temporaryState, action)
            const success = result[1]

            temporaryState = result[0]
            if(!success) {
                return null
            }
            passes = true
            winningStateName = nextStateName

        })
        // console.log({winningStateName, passes})
        /*
        state logging rules
            ony add an entry when it's corresponding state socceeds
            if the state failed save all of the trial states set results
                from the first successfull set call to the last successfull set call
            make sure every entry has a link to the function code
        */
       /*
        if we change a variable over multiple states, the inital record of the state currently
        shows the variable as starting out undefined(verified hypothesis)
        adiditional issue when putting in the trial entries(unintended consequence)
            a new timeline was made per state
        restructuring is required

        parent's child timeline only has 1 entry despite 2 statees getting run
        */
        /*
        stateRunCount -> action.meta.parent.children[winningStateName].stateRunCount
        stateWeWillRunName -> winningStateName
        startChildren -> action.meta.parent.start
        parentState -> action.meta.parent
        childState -> action.meta.parent.children[winningStateName]
        entry -> temporaryState['trialEntries'][trialEntriesLength - 1]
        */
        if(!passes) {
            // trialEntries to error state entry
            // reset stateRunCount on all children states
            Object.keys(action.meta.parentState.children).forEach(childStateName => {
                action.meta.parentState.children[childStateName].stateRunCount = 0
            })
            return [temporaryState, false]
        }
        /*
        stateRunCount -> action.meta.parentState.children[winningStateName].stateRunCount,
        startChildren -> action.meta.parentState.start
        stateWeWillRunName -> winningStateName,
        parentState -> action.meta.parentState,
        childState -> action.meta.parentState[winningStateName],
        entry -> temporaryState['trialEntries'][trialEntriesLength - 1]
        */
        action.meta.stateNumberRun += 1
        // if(action.meta.stateNumberRun )
       /*
       state passed, set was run at least 1 time
       state passed, set wasn't run 1 time
       */
        const trialEntriesLength = temporaryState['trialEntries'].length

        // applyStateCountRecordRules(
        //     action.meta.parentState.children[winningStateName].stateRunCount,
        //     action.meta.parentState.start,
        //     winningStateName,
        //     action.meta.parentState,
        //     action.meta.parentState[winningStateName],
        //     temporaryState['trialEntries'][trialEntriesLength - 1]
        // )
        // trialEntries[last item] to entries
        // temporaryState['entries'].push(temporaryState['trialEntries'][trialEntriesLength - 1])
        // temporaryState['trialEntries'] = []
        let winningState = action.meta.parentState.children[winningStateName]
        // reset Set2SFromStateFunctionCallCount after the state passed
        winningState.Set2SFromStateFunctionCallCount = 0

        winningState.stateRunCount += 1
        // console.log(winningState.stateRunCount)

        // addOrSwitchWinningStateName
        // if state was start
        addOrSwitchWinningStateName(action, winningStateName)
        action.type = action.meta.logList.join(' - ')
        console.log(action.type)

        if('children' in winningState) {
            // console.log("children", winningState)
            // action.parentState = currentState
            // action.parentPath +=  ' - ' + childName
            // action.currentStateNames = parentState.start
            // f(state, action)
            // action.logList.pop()

            // action.type += ' - '

            action.meta.parentState = winningState
            action.meta.parentPathArray.push(winningStateName)
            action.meta.currentStateNames = action.meta.parentState.start
            // console.log("before recurse", action.meta)
            const nestedResult = breathFirstTraversal2(
                temporaryState,
                action,
                levelId + 1
            )
            // reset stateRunCount on all children states
            Object.keys(action.meta.parentState.children).forEach(childStateName => {
                action.meta.parentState.children[childStateName].stateRunCount = 0
            })
            passes = nestedResult[1]
            if(!passes) {
                return [temporaryState, false]
            }
            temporaryState = nestedResult[0]

            action.meta.parentPathArray.pop()
            action.meta.parentState = getState2(temporaryState, parentPathArray)
            action.meta.logList.pop()

            // popLowestLevel(action)
        }
        if('next' in winningState) {
            // console.log('next', winningStateName, action.meta.parentState.children[winningStateName].next)
            next = action.meta.parentState.children[winningStateName].next
        }
        else {
            // reset stateRunCount on all children states
            Object.keys(action.meta.parentState.children).forEach(childStateName => {
                action.meta.parentState.children[childStateName].stateRunCount = 0
            })
            return [temporaryState, true]
        }
    }
}