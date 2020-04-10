
export const setCell = (value) => {
    return value
}

export const makeSet = (array) => {
    // this is the only way I know of to make a js object mimic a set
    let jsObject = {}
    array.forEach(item => {
        jsObject = {...jsObject, [item]: 1}
    })
    return jsObject
}

// getVariable(tree, getCell(tree, stateName), 'value').value => value from key 'value 0'
// tableAssign(tree,
                // getVariable(getCell(tree, stateName), 'value').name,
                // aValue,
                // setCell)
// have an assignment routine that updates a set of rows at once
// ...(cb(cells, value).cells) // cb should always return a js object stateName: {stuff}
export const makeCell = (stateObject) => {


    // the variables are stored as a single string for each name to let the user access them with only 1 string
    // the nextParts are in a set styled js object to enable O(n) state fetch times reguardless of how many strings are
    // in the state name(trie tree)
    const { name,
            nextParts,
            functionCode,
            nextStates,
            children,
            variableNames,
            value,
            jsObject} = stateObject
    let newCell = {}
    let lastPosition = name.length - 1
    if(name) {
        newCell = {[name[lastPosition]]: {name: name}}
    }
    if(nextParts) {
        let newNextParts = {}
        nextParts.forEach(nextPart => {
            newNextParts = {...newNextParts, [nextPart]: 1}
        })
        newCell = {[name[lastPosition]]: {...newCell[name[lastPosition]], nextParts: newNextParts}}
        }
    if(functionCode) {

        // if(typeof functionCode === String) {
        //     console.log('function name is a string')
        //     return newCell
        // }
        newCell = {[name[lastPosition]]: {...newCell[name[lastPosition]], 'function': functionCode}}
    }
    if(nextStates) {
        newCell = {[name[lastPosition]]: {...newCell[name[lastPosition]], nextStates: nextStates}}
    }
    if(children) {
        newCell = {[name[lastPosition]]: {...newCell[name[lastPosition]], children: children}}
    }
    if(variableNames) {
        newCell = {[name[lastPosition]]: {...newCell[name[lastPosition]], variableNames: variableNames}}
    }
    if(value !== undefined) {
        newCell = {[name[lastPosition]]: {...newCell[name[lastPosition]], value: value}}
    }
    if(jsObject !== undefined) {
        newCell = {[name[lastPosition]]: {...newCell[name[lastPosition]], jsObject: jsObject}}
    }

    
    return newCell
    // name: ['root']
    // nextParts: {    'elementary school':1,
    //             'problem set 0':1,
    //             'problem 0':1}
    // function: returnState

    // nextStates: []
    // children: {'a 0': 1, 'b 0': 1, 'answerForm 0': 1},

    // variableNames: ['value 1',
    //             'quantity 1',
    //             'isForm 1',
    //             'operationType 1']
    

}
export const getCell = (state, path) => {

    // console.log('path', path)
    // for any valid cell the forEach must run at least 1 time
    let currentCell = state.root
    path.forEach(namePart => {
        // console.log("|", namePart, "|")
        if(!Object.keys(currentCell).includes('nextParts')) {
            // console.log(currentCell, 'doens\t have a next parts')
            currentCell = null
        }
        if(!currentCell.nextParts[namePart]) {
            // console.log(`the path ends here ${namePart}`)
            currentCell = null
        }
        currentCell = state[namePart]
        
    })
    // console.log(currentCell)
    // this will be the root if the path doesn't exist
    // this will be null if the state the path refers to doesn't exist
    return currentCell
}

export const getVariable = (state, parentStateName, variableName) => {

    // The parent state should only be linked to one variable name at a time
    // in the below example:
    // You can say 'quantity 2' then call it 'quantity' when using it in the reducers
    // as long as the same parent doesn't also have a variable name called 'quantity 3'.
    // This is to allow the user to use variable names with this contextual state chart
    // at a simular level of detail they would use in a programming lnagugae

    let cell = getCell(state, parentStateName)
    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('variableNames')) {
        return null
    }
    let variable = null

    let variableNameIsInCellVariableNamesCount = 0
    let found = false
    cell.variableNames.forEach(cellVariableName => {
        if(cellVariableName.search(variableName) === -1) {
            return null
        }
        variableNameIsInCellVariableNamesCount ++
        found = true
        variable = state[cellVariableName]
    })
    if(variableNameIsInCellVariableNamesCount > 1) {
        console.log(`You cannot have more than 1 variable name that contains |${variableName}|`)
        return null
    }
    if(!found) {
        console.log(variableName, `may exist but there is no link from |${parentStateName}| to |${variableName}|`)
        return null

    }
    if(variable === null) {
        console.log(variableName, 'doesn\'t exist')
        return null
    }
    return variable
}

export const getJsObject = (state, parentStateName, variableName) => {

    // The parent state should only be linked to one variable name at a time
    // in the below example:
    // You can say 'quantity 2' then call it 'quantity' when using it in the reducers
    // as long as the same parent doesn't also have a variable name called 'quantity 3'.
    // This is to allow the user to use variable names with this contextual state chart
    // at a simular level of detail they would use in a programming lnagugae

    let cell = getCell(state, parentStateName)
    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('jsObject')) {
        return null
    }
    let variable = null

    let variableNameIsInCellVariableNamesCount = 0
    let found = false
    cell.variableNames.forEach(cellVariableName => {
        if(cellVariableName.search(variableName) === -1) {
            return null
        }
        variableNameIsInCellVariableNamesCount ++
        found = true
        variable = state[cellVariableName]
    })
    if(variableNameIsInCellVariableNamesCount > 1) {
        console.log(`You cannot have more than 1 js object name that contains |${variableName}|`)
        return null
    }
    if(!found) {
        console.log(variableName, `may exist but there is no link from |${parentStateName}| to |${variableName}|`)
        return null

    }
    if(variable === null) {
        console.log(variableName, 'doesn\'t exist')
        return null
    }
    return variable
}

export const findListInNestedList = (nestedList, list) => {

    let isFound = false
    nestedList.forEach(listItem => {
        let count = 0
        listItem.forEach((string, i) =>{
            if(string === list[i]) {
                count ++
            }
        })
        if(count === listItem.length) {
            isFound = true
        }
    })
    return isFound
}
export const getChild = (state, cell, childName) => {

    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('children')) {
        return null
    }
    let child = null
    
    if(findListInNestedList(cell.children, childName)) {
        child = getCell(state, childName)
    }
    
    return child//state[childName]
}

// not being used anymore
export const getChildren = (state, stateName) => {

    let cell = getCell(state, stateName)
    // console.log('cell', cell)
    if(!cell) {
        return []
    }
    if(!Object.keys(cell).includes('children')) {
        return []
    }
    // the children are 1 dimentional
    // we want the children to return like this [['one'], ['three'], ['four']]
    return cell.children//Object.keys(cell.children)//.map(nextStateString => [nextStateString])
}

export const tableAssign = (state, cell, value) => {

    if(cell === null) {
        return state
    }
    let cellName = cell.name[cell.name.length - 1]
    return {
        ...state,
        [cellName]: {
            ...state[cellName],
            value: value
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
export const tableAssignJsObject = (state, cell, value) => {

    if(cell === null) {
        return state
    }
    // console.log(cell, Object.keys(cell))
    let cellName = cell.name[cell.name.length - 1]
    return {
        ...state,
        [cellName]: {
            ...state[cellName],
            jsObject: value
        }
    }
}
export const set = (state, parentStateName, targetVar, dependencyVars, cb) => {

    // targetVar is a variable name
   if(typeof dependencyVars !== 'object') {
       return tableAssign(
        state,
        getVariable(state, parentStateName, targetVar),
        dependencyVars
       )
   }
    return tableAssign(
        state,
        getVariable(state, parentStateName, targetVar),
        cb(...dependencyVars.map(variable => getVariable(state, parentStateName, variable).value))
    )
}
export const setArray = (state, parentStateName, targetVar, array) => {

    // array is an object
    return tableAssign(
        state,
        getVariable(state, parentStateName, targetVar),
        array
    )
}
export const breathFirstTraversal = (state, action, startStateName, levelId) => {
    // startStateName, endStateName are lists of strings
    // we can use the payload from the user for the entire traversal
    // from start state to end state
    // bft
    // try all the options
    // for each one
        // return the state then the stateSuceded flag
    // return the state once endState is reached
    // let currentState = getValue(state, stateStateName)
    // this will cumulatively hold the state copies untill we are done with the machine
    let temporaryState = state
    // console.log('breathFirstTraversal', startStateName)
    // take out cropChildreaname
    // let [ baseStateName, childStateName ] = cropChildName(startStateName)
    console.log("level", levelId)
    let nextStates = startStateName
    // console.log('next states', nextStates, 'parent', action.type)
    let currentStateName = startStateName
    let keepGoing = true
    // console.log(baseStateName, childStateName)
    // have a list of end states and make sure the current state is not in the set
    while(true) {
        // console.log(nextStates)
        let passes = false
        let winningStateName = ''
        nextStates.forEach(nextState => {
            // console.log('trying', nextState)
            if(nextState === undefined) {
                console.log("the js syntax for the next states is wrong")
                // keepGoing = false
                return null

            }

            if(passes) {
                return null
            }
            // console.log("getting state", temporaryState, nextState) 
            let cell = getCell(temporaryState, nextState)
            // ignore the state if it doesn't have a function to run
            if(!Object.keys(cell).includes('function')) {
                console.log(cell, "doesn't have a function")
                return null
            }
            // action.type is the parent state untill this line is run(in the first level the parent == current state)
            // console.log('parent state', action.meta.parentStateName)
            action.type = nextState
            // console.log(nextState)
            // action's current state is .type
            // action.meta.currentState = nextState // bad idea
            // console.log("function to run", getValue(temporaryState, nextState), action)
            const result = cell['function'](temporaryState, action)
            const success = result[1]
            // console.log("finished function")
            // console.log(temporaryState, success)
            if(!success) {
                return null
            }
            // must keep the success value as we go up and down the call stack
            temporaryState = result[0]

            passes = true
            winningStateName = nextState
            // action.type = winningStateName
            // console.log('passes', action.type)
            // console.log()
            // untested
            // if the winningStateName has any children
            let childrenStates = getChildren(temporaryState, winningStateName)
            console.log(childrenStates)
            if(childrenStates.length === 0) {
                return null
            }
            console.log("we have children", childrenStates)
            action.meta.parentStateName = [...action.type]
            // call the routing agin with next states holding the children
            
            const nestedResult = breathFirstTraversal(temporaryState, action, childrenStates, levelId + 1)
            const submachineSuccess = nestedResult[1]
            // console.log('done with submachine', nestedResult)
            if(!submachineSuccess) {

                // if the submachine is false then this state is also false 
                passes = false
                return null
            }
            temporaryState = nestedResult[0]
            // console.log('submachine passes', temporaryState)

        })
        if(passes) {
            console.log("we have a winner", winningStateName, temporaryState)

            currentStateName = winningStateName
            
            const currentStateObject = getCell(temporaryState, currentStateName)
            // putting this in would force all states to have it as an attribute even if they have no edges
            if(!Object.keys(currentStateObject).includes('nextStates')) {
                console.log('The next states doesn\'t exist')
                return [temporaryState, true]
            }
            if(currentStateObject.nextStates.length === 0) {
                console.log(`machine is done 1 ${levelId}`)
                // keepGoing = false
                return [temporaryState, true]
            }
            nextStates = currentStateObject.nextStates

            console.log("next set of edges", nextStates)
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
