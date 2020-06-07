// There is one glitch here. We cannot autogenerate state graphs with using a single universal rule(adding a new string to the state name and incrememnting it
// when there is a neighbor in the trie tree to keep all the state name vectors unique)
// this is called the adding extra dimentions glitch

// A solution to this glitch is to make a string shift
// (x, y, z) => (offsetStringx, offsetStringy, offsetStringz)
// to allow for the same structure of points (x, y, z) to exist in a different plane

// We are currently using a generator dependent on the problem domain(number of problems)

// for the number generating formula:
    // numbering needs to be in the first name
    // extra context names need to also be included in the first name

// The other glitch is this. Each name in the root hash table must be unique or
// a cell will overwrite another cell

/*
limitations
a function state cannot have a value
you should always access a variable state using the parent state name
a variable state can't have children attributes(a nested jsObject doesn't count as a child)

alowances(not currently imlemented)
children can be variables
variables can store jsObjects as values
submahcines can be treated like hash tables as long as the parent state is used to access them
use flags to keep track of things
make special functions to assume different properties of the states and print out error messages when they fail
*/

// state chart selling point is I made the is from the ground up

// if they ask about xstate say I wanted to make something similar to prove I could do it

// can I work with them?
// can they do the job?

export const setCell = (value) => {
    return value
}


// getVariable(tree, getCell(tree, stateName), 'value').value => value from key 'value 0'
// tableAssign(tree,
                // getVariable(getCell(tree, stateName), 'value').name,
                // aValue,
                // setCell)
// have an assignment routine that updates a set of rows at once
// ...(cb(cells, value).cells) // cb should always return a js object stateName: {stuff}

export const getCell = (table, name) => {

    // console.log('path', name)
    if(Object.keys(table).includes(name)) {
        return table[name]
    }
    return {"error": 'no state'}
}


export const getVariable = (state, parentStateName, variableName) => {

    // The parent state should only be linked to one variable name at a time
    // in the below example:
    // You can say 'quantity 2' then call it 'quantity' when using it in the reducers
    // as long as the same parent doesn't also have a variable name called 'quantity 3'.
    // This is to allow the user to use variable names with this contextual state chart
    // at a simular level of detail they would use in a programming lnagugae
    // console.log("here", parentStateName, state)
    let cell = getCell(state, parentStateName)
    // console.log({cell})
    if(!cell) {
        return null
    }
    if(!Object.keys(cell).includes('variableNames')) {
        return null
    }
    let variable = null

    let variableNameIsInCellVariableNamesCount = 0
    let found = false
    // console.log(cell.variableNames, variableName)
    cell.variableNames.forEach(cellVariableName => {
        if(cellVariableName.search(variableName) === -1) {
            return null
        }
        // console.log(cellVariableName.search(variableName))

        variableNameIsInCellVariableNamesCount ++
        found = true
        variable = state[cellVariableName]
    })
    // console.log(found)
    if(variableNameIsInCellVariableNamesCount > 1) {
        console.log(`You cannot have more than 1 variable name that contains |${variableName}|`)
        return null
    }
    if(!found) {
        console.log(`A variable similarly called ${variableName} may exist but there is no link from |${parentStateName}| to |${variableName}|`)
        return null

    }
    if(variable === null) {
        console.log(variableName, 'doesn\'t exist')
        return null
    }
    // console.log('found it', variable)

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
        console.log(`A variable similarly called ${variableName} may exist but there is no link from |${parentStateName}| to |${variableName}|`)
        return null

    }
    if(variable === null) {
        console.log(variableName, 'doesn\'t exist')
        return null
    }
    return variable
}

export const getChild = (state, cell, childName) => {

    if(!cell) {
        return null
    }
    // console.log('getting child', cell)
    // console.log(Object.keys(cell))
    if(!Object.keys(cell).includes('children')) {
        return null
    }
    let child = null
    // console.log(cell.children, childName, cell.children.includes(childName))
    if(cell.children.includes(childName)) {
        child = getCell(state, childName)
    }
    
    return child//state[childName]
}

// not being used anymore
export const getChildren = (state, stateName) => {

    let cell = getCell(state, stateName)
    // console.log('cell with children', cell)
    // console.log(Object.keys(cell))
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

    // console.log('setting the cell', cell)
    if(cell === null) {
        return state
    }
    let cellName = cell.name
    return {
        ...state,
        [cellName]: {
            ...state[cellName],
            value: value
        }
    }    
}

export const tableAssignJsObject2 = (state, cell, value) => {

    if(cell === null) {
        return state
    }
    // console.log(cell, Object.keys(cell))
    let cellName = cell.name
    return {
        ...state,
        [cellName]: {
            ...state[cellName],
            jsObject: value
        }
    }
}

export const set = (state, parentStateName, targetVar, dependencyVars, cb) => {

    // console.log({parentStateName, targetVar})
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
        // apply cb to list of variables
        cb(...dependencyVars.map(variableName => getVariable(state, parentStateName, variableName).value))
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

const hasSubstates = (cell) => {
    if(!Object.keys(cell).includes('substates')) {
        return false
    }
    else if(Object.keys(cell.substates).length === 0) {
        return false
    }
    else {
        return true
    }
}

const hasAttributeOfCollection = (cell, attributeName) => {
    if(!Object.keys(cell).includes(attributeName)) {
        return false
    }
    else if(cell[attributeName].length === 0) {
        return false
    }
    else {
        return true
    }

}
const hasAttribute = (cell, attributeName) => {
    if(!Object.keys(cell).includes(attributeName)) {
        return false
    }
    else {
        return true
    }
}
export const treeVisualizer = (table, currentState) => {

    // treat each cell as if only 1 function call maps to 1 cell
    /*
    cell(full name here)
    children
    variables
    substates: [
        {
        cell(full name here)
        children
        variables
        substates: []
        }
    ]
    */
//    console.log('current state name', currentState)
    // if any child state has more than 1 parent this will return misleading information
    let cell = getCell(table, currentState)
    if(!cell) {
        return {}
    }
    if(hasAttribute(cell, 'jsObject')) {
        return {jsObject: cell.jsObject}
    }
    // this is why a child state with a value gets messed up
    else if(hasAttribute(cell, 'value')) {
        return {name: cell.name, value: cell.value}
    }

    let variables = {}
    if(hasAttributeOfCollection(cell, 'variableNames')) {

        cell.variableNames.forEach(variableStateName => {
            variables = {
                ...variables,

                // should return a tree of states
                [variableStateName]: {...treeVisualizer(table,
                                                variableStateName)}
            }
        })
    }

    let children = []
    if(hasAttributeOfCollection(cell, 'children')) {

        cell.children.forEach(childStateName => {

            // should return a tree of states
            children = [...children,
                        treeVisualizer(table,
                                childStateName)]
        })
    }

    let substates = []
    if(hasSubstates(cell)) {

        // visit subtrees here
        // console.log('current state', currentState, 'substates', cell.substates)
        cell.substates.forEach(substate => {
            // console.log('substate name', currentState + ' ' + substate)
            // get the next nested granular state within currentState
            substates = [
                ...substates,
                treeVisualizer(table,
                        currentState + ' ' + substate)
                ]
        })
    }
    
    return {
            // 'a', 'b', and 'c' parts are so this is the order they show up in the inspector
            a_name: cell.name,
            ...(cell.functionCode === undefined? {} : {b_function: cell.functionCode.name}),
            // missing next states
            ...(cell.nextStates === undefined? {} : {c_nextStates: cell.nextStates}),
            d_children: children,
            e_variables: variables,
            ...(cell.jsObject === undefined? {} : {jsObject: cell.jsObject}),
            substates: substates  
    }
}
export const printTreeInteractive = (state) => {
    let elementarySchoolName = 'elementarySchool'
    let x = treeVisualizer(state, elementarySchoolName)
    console.log('tree', x)

}
export const breathFirstTraversal = (state, action, startStateName, levelId, stateChartHistory) => {
    // startStateName is a string

    // we can use the payload from the user for the entire traversal
    // traverse from start state to end state

    // dft for each level with bft for each node in the level
    // try all the options
    // for each one
        // return the state then the stateSuceded flag
        // if it passes try it's children

    // return the state once endState is reached
    // assume each occurrence of this function on the callstack represents the outcome of the state machine
    // [state, pass/fail status]

    // This function will create a stack overflow if the state chart tree has any cycles

    
    // this will cumulatively hold the state copies untill we are done with the machine
    let temporaryState = state
    // console.log("level", levelId)
    let nextStates = startStateName
    let currentStateName = startStateName

    while(true) {
        // record each state as it passes
        //  [{treeBefore: temporaryState, stateName, functionName, treeAfter: temporaryStateAfter, submachine: [path of states]}]
        // pass the tree down the call stack to save each state after it's run
        // return the tree up the call stack to replace the old version above it
        // console.log(nextStates)
        let passes = false
        let winningStateName = ''
        let winningFunctionName = ''

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
            // console.log('cell found', cell.name)
            // ignore the state if it doesn't have a function to run
            if(!Object.keys(cell).includes('functionCode')) {
                console.log(cell, "doesn't have a function")
                return null
            }
            // action.type is the parent state untill this line is run(in the first level the parent == current state)
            // console.log('parent state', action.meta.parentStateName)
            action.type = nextState
            // console.log('got here')
            // action's current state is .type
            // action.meta.currentState = nextState // bad idea
            // console.log("function to run", getValue(temporaryState, nextState), action)
            // save tree here
            const result = cell['functionCode'](temporaryState, action)
            const success = result[1]
            // console.log("finished function")
            // console.log(temporaryState, success)
            if(!success) {
                return null
            }
            // save the state and function name here
            // console.log(cell['functionCode'].name)
            stateChartHistory = {   ...stateChartHistory,
                                    [Object.keys(stateChartHistory).length] : {
                                                                stateName: nextState,
                                                                functionName: cell['functionCode'].name}}
            console.log({stateChartHistory})
            // append the state we just ran here
            // if debug is active
                // print the history
                // how do we know if a state will crash or halt the machine prematurely?
                    // we don't
            // must keep the success value as we go up and down the call stack
            temporaryState = result[0]

            passes = true
            winningStateName = nextState
            winningFunctionName = cell['functionCode'].name
            // action.type = winningStateName
            // console.log('passes', action.type)
            // console.log()
            // untested
            // if the winningStateName has any children
            let childrenStates = getChildren(temporaryState, winningStateName)
            // console.log('children states', childrenStates)
            if(childrenStates === null) {
                return null
            }
            if(childrenStates.length === 0) {
                return null
            }
            // console.log("we have children", childrenStates)
            action.meta.parentStateName = action.type
            // call the routing agin with next states holding the children
            // pass the current list here
            const nestedResult = breathFirstTraversal(  temporaryState,
                                                        action,
                                                        childrenStates,
                                                        levelId + 1,
                                                        stateChartHistory)
            // update the state hierarchy history here using nestedResult[2]
            let keys = Object.keys(stateChartHistory)
            let lastKey = keys[keys.length - 1]
            stateChartHistory = {   ...stateChartHistory,
                                    [lastKey] : {
                                       ...stateChartHistory[lastKey],
                                        submachine: nestedResult[2]}}
            console.log({stateChartHistory})
            // stateChartHistory = nestedResult[2]

            passes = nestedResult[1]
            if(!passes) {
                return null
            }

            temporaryState = nestedResult[0]

        })
        // 3 parameter return as opposed to the [stateChart, didPass] the reducers return
        // current state is an end state
        if(nextStates.length === 0) {
            // return whatever value we have in passes and the stateChartHistory build up so far from top to bottom back to top
            return [temporaryState, passes, stateChartHistory]
        }
        // current state is not an end state

        else if(passes) {
            // console.log("we have a winner", winningStateName, winningFunctionName)

            currentStateName = winningStateName
            
            const currentStateObject = getCell(temporaryState, currentStateName)
            // putting this in would force all states to have it as an attribute even if they have no edges
            if(!Object.keys(currentStateObject).includes('nextStates')) {
                // console.log('The next states doesn\'t exist')
                // printTreeInteractive(temporaryState)

                return [temporaryState, true, stateChartHistory] // return stateChartHistory too
            }
            if(currentStateObject.nextStates.length === 0) {
                // console.log(`machine is done 1 ${levelId}`)
                // keepGoing = false
                return [temporaryState, true, stateChartHistory]
            }
            nextStates = currentStateObject.nextStates

            // console.log("next set of edges", nextStates)
        }
        else {
            // we still can't tell the difference between a purposefull failure and unpurposefull failure
            let keys = Object.keys(stateChartHistory)
            let lastKey = keys[keys.length - 1]
            stateChartHistory = {   ...stateChartHistory,
                                    [lastKey] : {
                                       ...stateChartHistory[lastKey],
                                        nextStates: nextStates}}
            console.log('failed', {stateChartHistory})

            // console.log(currentStateName,
            //     "failed",
            //     "attempted next states",
            //     nextStates)
            return [temporaryState, false, stateChartHistory]
        }
    }
}
