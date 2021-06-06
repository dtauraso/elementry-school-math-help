import {
    setVariable2,
    getVariable2,
    getState2
} from './utilityFunctions'

import { entryDispatch } from './Timeline/stateRunHierarchyRules'

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
    console.log(action)
    let path = action.type.split(' - ')

    // assume path as at least 2 elements
    
    action.meta.parentPathArray = path.slice(0, path.length - 1)
    action.meta.logList = path.slice(0, path.length - 1)
    action.meta.parentState = getState2(state, action.meta.parentPathArray)
    action.meta.currentStateNames = [path[path.length - 1]]
    action.meta.stateNumberRun = -1

    return breathFirstTraversal2(state, action, levelId)
}
// export const setChildrenStateCountsToZero = (action) => {
// Object.keys(action.meta.parentState.children).forEach(childStateName => {
//                 action.meta.parentState.children[childStateName].stateRunCount = 0
//             })
// }
export const breathFirstTraversal2 = (state, action, levelId) => {

    // want user to think in terms of name - name
    // but system is default setup to use [name, name]
    // the path array is converted to string for action.type
    // console.log('action starting at breathFirstTraversal2', action)
    /* the logging system has 2 parts
            # set calls in each state function(seems to work)
            # times state was run in submachine(seems to work for 1 case)

            parent and child pointers for traversing the states
            metadata for tracking the current state
            metadata for tracking # of times the state ran successfully and how many times
            set2 was called for each time the state ran sucessfully
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
    // there is no code for storing trial state entries
    // a trial state entry is only made when set2 is called
    while(true) {
        // what if there is only 1 trial state and it fails
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
        // const trialEntriesLength = temporaryState['trialEntries'].length
        entryDispatch(state, action)
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