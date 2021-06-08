
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
    console.log({entry})
    parentState['E2ETimeLines'][lenParent - 1].push(entry)
    // what if there is no grandparent
    // get the parent's parent and link it down to parentState['E2ETimeLines'][lenParent - 1][lastItem]
    const grandParentObject = getParentObject(parentState)
    console.log({parentState, grandParentObject})
    // its possible for parentState === grandParentObject
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
// visiting a state for the first time on the same run(continue current timeline)
// vs visiting a state for the first time, but we are on a different run(make new timeline)
/*
step tree for 1 timeline(parallel states, later version)
a0a1a2
    b0b1b2
    c0c1c2
*/
export const applyStateCountRecordRules = (
    {stateRunCount,
    startChildren,
    stateWeWillRunName,
    parentState,
    childState,
    entry}
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

/* have a separate timeline tree from the main control flow tree
    put in whatever things from original tree that let's us mentally link the records
    to the functions, variable, and state that created them

    change the linear timeline to a tree timeline for parallel state
*/

export const entryDispatch = (state, action, passes) => {

    let entry = null
    console.log('entries', state['trialEntries'])
    if(passes) {
        entry = state['trialEntries'].pop()
        state['entries'].push(entry)
        console.log("here", entry)
    }
    else {
        state['entries'].push(state['trialEntries'])
        state['trialEntries'] = []
    }
    // else if(state['trialEntries'].length > 1) {
        // There were 0 succesfull states.
        // what happens if at least 1 failed trial state didn't set any variables
        // what if it runs through all the states and they all fail and none of them
        // set variables
    // }
    // requires at least 1 entry to exist
    let winningStateName = action.meta.currentStateName
    let entriesLength = state['entries'].length
    console.log({action, entry: state['entries'][entriesLength - 1]})
    applyStateCountRecordRules(
        {stateRunCount: action.meta.parentState.children[winningStateName].stateRunCount,
        startChildren: action.meta.parentState.start,
        stateWeWillRunName: winningStateName,
        parentState: action.meta.parentState,
        childState: action.meta.parentState.children[winningStateName],
        entry: state['entries'][entriesLength - 1]})
    
}