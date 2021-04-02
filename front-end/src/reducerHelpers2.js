
export const setVariable2 = () => {

}
export const getVariable2 = (root, absolutePath) => {

}

export const getState2 = (root, absolutePath) => {
    // assume absolute path is name1 name2 name3 - name4 name5 - name6
    let listOfStrings = absolutePath.split(' - ')
    let pathList = listOfStrings.map(string => string.split(' '))

    let tracker = root
    pathList.forEach(stateNameParts => {
        stateNameParts.forEach(stateNamePart => {
            if(stateNamePart in tracker) {
                tracker = tracker[stateNamePart]
            }
        })
        if('children' in tracker) {
            tracker = tracker['children']
        }
    })
    return tracker

}
export const setTimelineMetadataToStates = (contextualStateChart) => {
    
}
export const makeEntry = (  stateWeWillRunName,
                            functionName,
                            parentDataStateAbsolutePath,
                            parentDataState,
                            varName,
                            variable,
                            newValue) => {
    return {
        [stateWeWillRunName]: {
            functionName: functionName,
            [parentDataStateAbsolutePath]: {
                reference: parentDataState,
                // is set 1 time
                before: {
                    [varName]: variable
                },
                // is set 1 time and reset the remaining times set2 is called inside the
                // function for stateWeWillRunName
                after: {
                    [varName]: newValue
                }
            }
        }
    }
}
export const set2 = (root,
                    parentstateNameAbsolutePath,
                    stateWeWillRunName,
                    parentDataStateAbsolutePath,
                    varName,
                    newValue) => {
    // the react components will travel down the state chart
    // when loading components

    let parentState = getState2(root, parentstateNameAbsolutePath)
    let childState = getState2(root, stateWeWillRunName)
    let functionName = childState.functionCode.toString()
    let parentDataState = getState2(root, parentDataStateAbsolutePath)
    let variable = parentState['variables'][varName]

    let set2CallCount = childState['Set2SFromtateFunctionCallCount']
    let stateRunCount = childState['stateRunCount']

    let startChildren = parentState['start']


    /* 
    unit test:
        entry is saved at the state it was made in
    end to end test:
        entry is saved at the parent state
    */
    if(set2CallCount === 0 && stateRunCount === 0) {
        // the start of each state
        
       if(childState in startChildren) {
           // the first state in the submachine
           parentState['E2ETimeLines'].push([])
           const lenParent = parentState['E2ETimeLines'].length
           parentState['E2ETimeLines'][lenParent - 1].push(makeEntry(
                stateWeWillRunName,
                functionName,
                parentDataStateAbsolutePath,
                parentDataState,
                varName,
                variable,
                newValue))
            childState['unitTimeLines'].push([])

            const lenChild = childState['unitTimeLines'].length
            const lenParentLastTimeLine = parentState['E2ETimeLines'][lenParent - 1].length
            
            childState['unitTimeLines'][lenChild - 1].push(parentState['E2ETimeLines'][lenParent - 1][lenParentLastTimeLine - 1])
        }
       else {

       }

    }

    let newParentTimeline = false
    if(childState in startChildren && set2CallCount === 0 && stateRunCount === 0) {
        // the start of each cycle of entire submachine at the start state
        // start the new timeline for the parent
        parentState['E2ETimeLines'].push([makeEntry(
                                            stateWeWillRunName,
                                            functionName,
                                            parentDataStateAbsolutePath,
                                            parentDataState,
                                            varName,
                                            variable,
                                            newValue)])
        newParentTimeline = true
    }
    childState['variables'][varName] = newValue
    if(set2CallCount === 0 && stateRunCount === 0) {
        // the start of each cycle of entire submachine at stateWeWillRunName
        // start the new timeline for the child
        if(!newParentTimeline) {
            parentState['timeLines'].push([makeEntry(
                                                stateWeWillRunName,
                                                functionName,
                                                parentDataStateAbsolutePath,
                                                parentDataState,
                                                varName,
                                                variable,
                                                newValue)])
        }
        let timeLinesLen = parentState['timeLines'].length
        let timeLineLen = arentState['timeLines'][timeLinesLen - 1].length
        childState['timeLines'].push([])
        let len = childState['timeLines'].length
        childState['timeLines'][len - 1].push(parentState['timeLines'][timeLinesLen - 1][timeLineLen - 1])
    }
    if(set2CallCount === 0 && stateRunCount > 0) {
        // any state that has already successfully run once
        // append entry to parent timeline
        let timeLinesLen = parentState['timeLines'].length
        parentState['timeLines'][timeLinesLen - 1].push(makeEntry(
            stateWeWillRunName,
            functionName,
            parentDataStateAbsolutePath,
            parentDataState,
            varName,
            variable,
            newValue))

        // append entry reference to child timeline
        let timeLinesLen = parentState['timeLines'].length
        let timeLineLen = arentState['timeLines'][timeLinesLen - 1].length

        let len = childState['timeLines'].length
        childState['timeLines'][len - 1].push(parentState['timeLines'][timeLinesLen - 1][timeLineLen - 1])

    }
    if(set2CallCount > 0) {
        // update last entry in parent timeline
        parentState['timeLines'][timeLinesLen - 1][timeLineLen - 1][stateWeWillRunName][parentDataStateAbsolutePath]['after'][varName] = newValue
    }
    


    /*
    
    stateName could match parentDataState1 or not
    reference to rootObject, 
    parentstateNameAbsolutePath,
    stateWeWillRunName,
    parentDataStateAbsolutePath,
    varName,
    newValue
    the form state machine should hold a collection of timelines
    store the data into the parent state
    after the child state is done running
    take the last piece of data from the child state in the parent state
    and store it into the child state. use the refernce

    if childStateName is the start child and Set2SFromtateFunctionCallCount === 0
        start the new timeline

    if Set2SFromtateFunctionCallCount === 0 and stateRunCount === 0
        start the new timeline for the childStateName 
    reset Set2SFromtateFunctionCallCount after the state passed
    reset stateRunCount right before the recursive call(breathFirstTraversal2) unwinds
    parentstateName: {
        Set2SFromtateFunctionCallCount: 0,
        stateRunCount: 0
        timeLines: [ {
            0: {
                childStateName1: {
                    parentDataStateAbsolutePath1: {
                        // is assigned 1 time
                        before: {
                            var1: 
                            var2:
                        }
                        // is assigned the remaining times
                        after: {
                            var1:
                            var2
                        }
                    }
                }
            },
            1: {
                childStateName2: {
                    parentDataStateAbsolutePath2: {
                        before: {
                            var1: 
                            var2:
                        }
                        after: {
                            var1:
                            var2
                        }
                    }
                }
            }
        }]
    }
    
    */
}

export const treeVisualizer2 = () => {

}

export const breathFirstTraversal2 = () => {

}