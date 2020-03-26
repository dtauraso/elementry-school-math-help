export const setToValue = (container, value) => {
    return value
}
export const append = (container, value) => {

    return [...container, value]
}
export const getValue = (state, path) => {

    if(path.length === 0) {
        return state
    } else if(path.length > 0) {
        const firstNode = path[0]
        if(!state.hasOwnProperty(firstNode)) {
            return state
        } else {
            return getValue(state[firstNode], path.filter((node, i) => i > 0))
        }
    }
}
export const objectExistsAtPath = (state, path) => {

    if(path.length === 0) {
        return true
    } else if(path.length > 0) {
        const firstNode = path[0]
        if(!state.hasOwnProperty(firstNode)) {
            return false
        } else {
            return getValue(state[firstNode], path.filter((node, i) => i > 0))
        }
    }
}

export const deepAssign = (state, path, value, cb) => {
    // state is an object
    // console.log("deep copy", path)
    // console.log("path", path)
    // console.log("reduced path", path.filter((node, i) => i > 0))
    // console.log(path.length === 0)
    // console.log(state)

    if(path.length === 0) {
        // console.log("replace", state, value)
        return cb(state, value)

    } else if(path.length > 0) {

        const firstNode = path[0]

        if(!state.hasOwnProperty(firstNode)) {

            // copy of original with some object references from the original?
            return {...state}
        }
        else {
            return {
                ...state,
                // [] seems to protect the variable name from being treated as a key
                [firstNode]: deepAssign(    state[firstNode],
                                            path.filter((node, i) => i > 0),
                                            value,
                                            cb)
            }
        }
    }
}


export const breathFirstTraversal = (state, action, startStateName) => {
    // startStateName, endStateName are lists of strings
    // we can use the payload from the user for the entire traversal
    // from start state to end state
    // bft
    // try all the options
    // for each one
        // return the state then the stateSuceded flag
    // return the state once endState is reached
    // let currentState = getValue(state, stateStateName)
    console.log('breathFirstTraversal', startStateName)
    // take out cropChildreaname
    // let [ baseStateName, childStateName ] = cropChildName(startStateName)
    let nextStates = [startStateName]
    let currentStateName = startStateName
    let keepGoing = true
    // console.log(baseStateName, childStateName)
    // have a list of end states and make sure the current state is not in the set
    while(keepGoing) {
        console.log(nextStates)
        let passes = false
        let winningStateName = ''
        nextStates.forEach(nextState => {
            if(nextState === undefined) {
                console.log("the js formation for the next states failed")
                keepGoing = false
            } else {
                if(!passes) {
                    // action's current state is .type
                    action.meta.currentState = nextState
                    console.log("function to run", getValue(state, nextState), action)
                    const result = getValue(state, nextState)['function'](state, action)
                    state = result[0]
                    const success = result[1]
                    console.log("finished function")
                    console.log(state, success)
                    if(success) {
                        passes = true
                        winningStateName = nextState
                    }
        
                }
            }

        })
        if(passes) {
            currentStateName = winningStateName
            const currentStateObject = getValue(state, currentStateName)

            if(currentStateObject.nextStates.length > 0) {
                // console.log("we have a winner", winningStateName)
                nextStates = currentStateObject.nextStates
                // console.log("next set of edges", nextStates)
            } else {
                keepGoing = false

            }
        } else if(!passes && nextStates.length === 0) {
            console.log('machine is done')
            return state
        } else {
            console.log(currentStateName,
                        "failed",
                        "attempted next states",
                        nextStates)
            return state
        }
    
    }
    return state
}


/*
assume the path is a tree
"0", "answerForm" "value"
"0", "answerForm" "quantity"

"0" : {
    "answerForm" : {
        "value" : {
            "value": ourValue,
            "cb": ourCb
        },
        quantity: {
            "value": ourValue,
            "cb": ourCb
        }
    }
}

*/

// export const deepAssignTree = (state, tree) => {
//     // state is an object
//     // console.log("deep copy", path)
//     // console.log("path", path)
//     // console.log("reduced path", path.filter((node, i) => i > 0))
//     // console.log(path.length === 0)
//     // console.log(state)

//     if(Object.keys(tree).length === 2 &&
//         Object.keys(tree).includes("value") &&
//         Object.keys(tree).includes("cb")) {
//         // console.log("replace", state, value)
//         return tree.cb(state, tree.value)//cb(state, value)

//     } else {//if(path.length > 0) {

//         Object.keys(tree).forEach(pathKey => {

//         })
//         const firstNode = path[0]

//         if(!state.hasOwnProperty(firstNode)) {

//             // copy of original with some object references from the original?
//             return {...state}
//         }
//         else {
//             return {
//                 ...state,
//                 // [] seems to protect the variable name from being treated as a key
//                 [firstNode]: deepAssign(    state[firstNode],
//                                             path.filter((node, i) => i > 0),
//                                             value,
//                                             cb)
//             }
//         }
//     }
// }
