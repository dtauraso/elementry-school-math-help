export const setToValue = (container, value) => {
    return value
}
export const setCell = (container, value) => {
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

export const makeVariablePath = (action, variableName) => {

    return [...action.meta.basePath, 'variables', variableName]
}
export const makeVariablePath2 = (pathToStateObject, variableName) => {

    return [pathToStateObject, 'variables', variableName]
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
    let temporaryState = state
    // console.log('breathFirstTraversal', startStateName)
    // take out cropChildreaname
    // let [ baseStateName, childStateName ] = cropChildName(startStateName)
    let nextStates = [...startStateName]
    let currentStateName = startStateName
    let keepGoing = true
    // console.log(baseStateName, childStateName)
    // have a list of end states and make sure the current state is not in the set
    while(true) {
        // console.log(nextStates)
        let passes = false
        let winningStateName = ''
        nextStates.forEach(nextState => {
            if(nextState === undefined) {
                console.log("the js syntax for the next states is wrong")
                // keepGoing = false
                return [temporaryState, true]

            } else {
                if(!passes) {
                    // console.log(nextState)
                    // action's current state is .type
                    // action.meta.currentState = nextState // bad idea
                    // console.log("function to run", getValue(temporaryState, nextState), action)
                    const result = getValue(temporaryState, nextState)['function'](temporaryState, action)
                    temporaryState = result[0]
                    const success = result[1]
                    // console.log("finished function")
                    // console.log(temporaryState, success)
                    // must keep the success value as we go up and down the call stack
                    if(success) {
                        passes = true
                        winningStateName = nextState
                        action.type = winningStateName
                        // console.log()
                        // untested
                        // if the winningStateName has any children
                        // call the routing agin with next states holding the children
                        // result = breathFirstTraversal(state, action, childrenStates)
                        // if the submachine is false then this state is also false 
                    }
        
                }
            }

        })
        if(passes) {
            currentStateName = winningStateName
            const currentStateObject = getValue(temporaryState, currentStateName)

            if(currentStateObject.nextStates.length > 0) {
                console.log("we have a winner", winningStateName)
                nextStates = currentStateObject.nextStates
                // console.log("next set of edges", nextStates)
            } else {
                // keepGoing = false
                return [temporaryState, true]

            }
        } else if(!passes && nextStates.length === 0) {
            console.log('machine is done')
            // return temporaryState
            return [temporaryState, true]

        } else {
            console.log(currentStateName,
                        "failed",
                        "attempted next states",
                        nextStates)
            // return temporaryState
            return [temporaryState, true]

        }
    
    }
    // machine is finished
    // return [temporaryState, true]
}


// getVariable(tree, getCell(tree, stateName), 'value').value => value from key 'value 0'
// tableAssign(tree,
                // getVariable(getCell(tree, stateName), 'value').name,
                // aValue,
                // setCell)
// have an assignment routine that updates a set of rows at once
// ...(cb(cells, value).cells) // cb should always return a js object stateName: {stuff}

export const getCell = (state, path) => {

    // for any valid cell the forEach must run at least 1 time
    let currentCell = state.redux.table.root
    path.forEach(namePart => {
        // console.log(currentCell)
        if(!Object.keys(currentCell).includes('nextParts')) {
            currentCell = null
        }
        if(!currentCell.nextParts[namePart]) {
            currentCell = null
        }
        currentCell = state.redux.table[namePart]
        
    })

    // this will be the root if the path doesn't exist
    // this will be null if the state the path refers to doesn't exist
    return currentCell
}

export const getVariable = (state, parentStateName, variableName) => {


    let cell = getCell(state, parentStateName)
    console.log(cell)
    // the variableName can just say 'value', 'quantity' instead of 'value 0'
    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('variableNames')) {
        return null
    }
    let variable = null
    cell.variableNames.forEach(cellVariableName => {
        if(cellVariableName.search(variableName) === -1) {
            return null
        }
        console.log(cellVariableName)

        variable = state.redux.table[cellVariableName]
    })
    return variable
}

export const getChild = (state, cell, childName) => {

    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('children')) {
        return null
    }
    if(!cell.children[childName]) {
        return null
    }
    return state.redux.table[childName]
}

export const getChildren = (state, stateName) => {

    let cell = getCell(state, stateName)
    // console.log('cell', cell)
    if(!cell) {
        return []
    }
    if(!Object.keys(cell).includes('children')) {
        return []
    }
    
    return Object.keys(cell.children).map(nextStateString => [nextStateString])
}

export const tableAssign = (state, cell, value) => {

    if(cell === null) {
        return state
    }
    let cellName = cell.name[cell.name.length - 1]
    return {
        ...state,
        redux: {
            ...state.redux,
            table: {
                ...state.redux.table,
                [cellName]: {
                    ...state.redux.table[cellName],
                    value: value
                }
            } 
        }
        
    }
    
    /*
    for premade cells
    return {
        ...state,
        table: {
            ...state.redux.table,
            ...cells
        }
    }

    */
    
    
}

export const breathFirstTraversal2 = (state, action, startStateName, levelId) => {
    // startStateName, endStateName are lists of strings
    // we can use the payload from the user for the entire traversal
    // from start state to end state
    // bft
    // try all the options
    // for each one
        // return the state then the stateSuceded flag
    // return the state once endState is reached
    // let currentState = getValue(state, stateStateName)
    let temporaryState = state
    // console.log('breathFirstTraversal', startStateName)
    // take out cropChildreaname
    // let [ baseStateName, childStateName ] = cropChildName(startStateName)
    console.log("level", levelId)
    let nextStates = startStateName
    console.log('next states', nextStates, 'parent', action.type)
    let currentStateName = startStateName
    let keepGoing = true
    // console.log(baseStateName, childStateName)
    // have a list of end states and make sure the current state is not in the set
    while(true) {
        // console.log(nextStates)
        let passes = false
        let winningStateName = ''
        nextStates.forEach(nextState => {
            console.log('trying', nextState)
            if(nextState === undefined) {
                console.log("the js syntax for the next states is wrong")
                // keepGoing = false
                return [temporaryState, true]

            } else {

                if(!passes) {

                    let cell = getCell(temporaryState, nextState)
                    // ignore the state if it doesn't have a function to run
                    if(!Object.keys(cell).includes('function')) {
                        console.log(cell, "doesn't have a function")
                        return [temporaryState, true]
                    }
                    // action.type is the parent state untill this line is run(in the first level the parent == current state)
                    console.log('parent state', action.meta.parentStateName)
                    action.type = nextState
                    // console.log(nextState)
                    // action's current state is .type
                    // action.meta.currentState = nextState // bad idea
                    // console.log("function to run", getValue(temporaryState, nextState), action)
                    const result = cell['function'](temporaryState, action)
                    const success = result[1]
                    // console.log("finished function")
                    // console.log(temporaryState, success)
                    // must keep the success value as we go up and down the call stack
                    if(success) {
                        temporaryState = result[0]

                        passes = true
                        winningStateName = nextState
                        // action.type = winningStateName
                        console.log('passes', action.type)
                        // console.log()
                        // untested
                        // if the winningStateName has any children
                        let childrenStates = getChildren(temporaryState, winningStateName)
                        if(childrenStates.length > 0) {
                            console.log("we have children", childrenStates)
                            action.meta.parentStateName = [...action.type]
                            // call the routing agin with next states holding the children
                            const nestedResult = breathFirstTraversal2(state, action, childrenStates, levelId + 1)
                            const submachineSuccess = nestedResult[1]
                            if(submachineSuccess) {
                                temporaryState = nestedResult[0]

                            } else {

                                // if the submachine is false then this state is also false 
                                passes = false
                            }
                        }
                        

                    }
        
                }
            }

        })
        if(passes) {
            currentStateName = winningStateName
            
            const currentStateObject = getCell(temporaryState, currentStateName)//getValue(temporaryState, currentStateName)

            if(currentStateObject.nextStates.length > 0) {
                console.log("we have a winner", winningStateName)
                nextStates = currentStateObject.nextStates
                // console.log("next set of edges", nextStates)
            } else {
                console.log(`machine is done ${levelId}`)
                // keepGoing = false
                return [temporaryState, true]

            }
        } else if(!passes && nextStates.length === 0) {
            console.log('machine is done 2')
            // return temporaryState
            return [temporaryState, true]

        } else {
            console.log(currentStateName,
                        "failed",
                        "attempted next states",
                        nextStates)
            // return temporaryState
            return [temporaryState, true]

        }
    
    }
    // machine is finished
    // return [temporaryState, true]
}
