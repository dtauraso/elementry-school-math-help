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
export const makeCell2 = (stateObject) => {


    // the variables are stored as a string with no whitespaces for each name to let the user access them
    // like they would do with variable names

    const { name,
            substates,
            functionCode,
            nextStates,
            children,
            variableNames,
            value,
            jsObject} = stateObject
    let newCell = {}
    if(name) {
        newCell = {[name]: {name: name}}
    }
    if(substates) {
        newCell = {[name]: {...newCell[name], substates: functionCode}}
    }
    if(functionCode) {

        newCell = {[name]: {...newCell[name], 'function': functionCode}}
    }
    if(nextStates) {
        newCell = {[name]: {...newCell[name], nextStates: nextStates}}
    }
    if(children) {
        newCell = {[name]: {...newCell[name], children: children}}
    }
    if(variableNames) {
        newCell = {[name]: {...newCell[name], variableNames: variableNames}}
    }
    if(value !== undefined) {
        newCell = {[name]: {...newCell[name], value: value}}
    }
    if(jsObject !== undefined) {
        newCell = {[name]: {...newCell[name], jsObject: jsObject}}
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

export const getCell = (table, name) => {

    // console.log('path', name)
    if(Object.keys(table).includes(name)) {
        return table[name]
    }
    return {"error": 'no state'}
}

export const getCell2 = (table, name) => {

    // console.log('path', path)
    // for any valid cell the forEach must run at least 1 time
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
export const tableAssign2 = (state, cell, value) => {

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
export const set2 = (state, parentStateName, targetVar, dependencyVars, cb) => {

    // console.log({parentStateName, targetVar})
    // targetVar is a variable name
   if(typeof dependencyVars !== 'object') {
       return tableAssign2(
        state,
        getVariable(state, parentStateName, targetVar),
        dependencyVars
       )
   }
    return tableAssign2(
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

export const setArray2 = (state, parentStateName, targetVar, array) => {

    // array is an object
    return tableAssign2(
        state,
        getVariable(state, parentStateName, targetVar),
        array
    )
}

const hasSubstates = (cell) => {
    if(!Object.keys(cell).includes('nextParts')) {
        return false
    }
    else if(Object.keys(cell.nextParts).length === 0) {
        return false
    }
    else {
        return true
    }
}
const hasSubstates2 = (cell) => {
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

    // have to treat each cell as if only 1 function call maps to 1 cell
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
    let cell = getCell(table, currentState)
    if(!cell) {
        return {}
    }
   
    if(hasAttribute(cell, 'jsObject')) {
        return {jsObject: cell.jsObject}
    }
    else if(hasAttribute(cell, 'value')) {
        return {value: cell.value}
    }

    let variables = {}
    if(hasAttributeOfCollection(cell, 'variableNames')) {

        cell.variableNames.forEach(variableStateName => {
            variables = {
                ...variables,

                // should return a tree of states
                [variableStateName]: {...treeVisualizer(table,
                                                [variableStateName])}
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
        Object.keys(cell.nextParts).forEach(nextPart => {

            // get the next nested granular state within currentState
            substates = [
                ...substates,
                treeVisualizer(table,
                        [...currentState, nextPart])
                ]
        })
    }

    return {
            // a, b, and c parts are so this is the order they show up in the inspector
            a_name: cell.name,
            ...(cell.function === undefined? {} : {b_function: cell.function.name}),
            // missing next states
            ...(cell.nextStates === undefined? {} : {c_nextStates: cell.nextStates}),
            d_children: children,
            e_variables: variables,
            ...(cell.jsObject === undefined? {} : {jsObject: cell.jsObject}),
            substates: substates  
    }
}
export const treeVisualizer2 = (table, currentState) => {

    // have to treat each cell as if only 1 function call maps to 1 cell
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

    let cell = getCell(table, currentState)
    if(!cell) {
        return {}
    }
    if(hasAttribute(cell, 'jsObject')) {
        return {jsObject: cell.jsObject}
    }
    // this is why a child state with a value gets messed up
    else if(hasAttribute(cell, 'value')) {
        let mainPart = {name: cell.name, value: cell.value}
        if(Object.keys(cell).includes('hashTable')) {
            mainPart = {
                ...mainPart,
                hashTable: cell.hashTable
            }
        }
        return mainPart
    }
    else if(hasAttribute(cell, 'hashTable')) {
        return {name: cell.name, hashTable: cell.hashTable}
    }

    let variables = {}
    if(hasAttributeOfCollection(cell, 'variableNames')) {

        cell.variableNames.forEach(variableStateName => {
            variables = {
                ...variables,

                // should return a tree of states
                [variableStateName]: {...treeVisualizer2(table,
                                                variableStateName)}
            }
        })
    }

    let children = []
    if(hasAttributeOfCollection(cell, 'children')) {

        cell.children.forEach(childStateName => {

            // should return a tree of states
            children = [...children,
                        treeVisualizer2(table,
                                childStateName)]
        })
    }

    let substates = []
    if(hasSubstates2(cell)) {

        // visit subtrees here
        // console.log('current state', currentState, 'substates', cell.substates)
        cell.substates.forEach(substate => {
            // console.log('substate name', currentState + ' ' + substate)
            // get the next nested granular state within currentState
            substates = [
                ...substates,
                treeVisualizer2(table,
                        currentState + ' ' + substate)
                ]
        })
    }
    // console.log(cell.name, Object.keys(cell))
    // if(Object.keys(cell).includes('hashTable')) {
    //     console.log({f_hashTable: cell.hashTable})
    // }
    
    return {
            // a, b, and c parts are so this is the order they show up in the inspector
            a_name: cell.name,
            ...(cell.functionCode === undefined? {} : {b_function: cell.functionCode.name}),
            // missing next states
            ...(cell.nextStates === undefined? {} : {c_nextStates: cell.nextStates}),
            d_children: children,
            e_variables: variables,
            // ...(!Object.keys(cell).includes('hashTable')? {} : {f_hashTable: cell.hashTable}),
            ...(cell.jsObject === undefined? {} : {jsObject: cell.jsObject}),
            substates: substates  
    }
}
export const printTreeInteractive = (state) => {
    let elementarySchoolName = 'elementarySchool'
    let x = treeVisualizer2(state, elementarySchoolName)
    console.log('tree', x)

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
    // assume each occurrence of this function on the callstack represents the outcome of the state machine
    // [state, pass/fail status]
    // This function will create a stack overflow if the state chart tree has any cycles
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
            console.log('cell found', cell.name)
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
            const result = cell['functionCode'](temporaryState, action)
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
            console.log("we have children", childrenStates)
            action.meta.parentStateName = action.type
            // call the routing agin with next states holding the children
            
            const nestedResult = breathFirstTraversal(temporaryState, action, childrenStates, levelId + 1)
            // const submachineSuccess = nestedResult[1]
            passes = nestedResult[1]
            if(!passes) {
                return null
            }
            // console.log('done with submachine', nestedResult)
            // if(!submachineSuccess) {

            //     // if the submachine is false then this state is also false 
            //     passes = false
            //     return null
            // }
            temporaryState = nestedResult[0]
            // console.log('submachine passes', temporaryState)

        })
        // if state is not end state
            // if passes
                // move on to next state
            // else
                // return false for entire machine(early exit)
        // end state
            // return [temporaryState, pass]

        if(passes) {
            console.log("we have a winner", winningStateName, winningFunctionName)

            currentStateName = winningStateName
            
            const currentStateObject = getCell(temporaryState, currentStateName)
            // putting this in would force all states to have it as an attribute even if they have no edges
            if(!Object.keys(currentStateObject).includes('nextStates')) {
                console.log('The next states doesn\'t exist')
                // printTreeInteractive(temporaryState)

                return [temporaryState, true]
            }
            if(currentStateObject.nextStates.length === 0) {
                console.log(`machine is done 1 ${levelId}`)
                // keepGoing = false
                return [temporaryState, true]
            }
            nextStates = currentStateObject.nextStates

            console.log("next set of edges", nextStates)
        // we are at an end state
        // what is the difference between a dead state(machine will return false) and an end state(
        // machine will return true after finishing all state)
        // assumes any end state means the machine will return true
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
