
import { Root } from './Reducers'
import {
    setToValue,
    append,
    getValue,
    deepAssign,
    getCell,
    getVariable,
    getChild,
    tableAssign,
    breathFirstTraversal2 } from '../../reducerHelpers'

// import { BreakApp } from './reducers/breakAppReducer'
const initialState = {
    ...Root,
    // breakAppTree: BreakApp
}
// vector state name
// trie tree js object
// store variables as state names

// 1 button -> 1 action
// 1 action -> 1 Reducers or (2 reducers: 1 success and 1 failue for axios calls)
// 1 Reducers -> n nodes run in state machine
// for now the state name will be defined as the path from the root js object
// down to the target js object that we want to be called the state name
const universalReducer = (state = initialState, action) => {

    console.log("in the Reducers")
    console.log(state, action)
    // action.type always holds the start state
    // console.log(action.type, state, Root)
    const { type, payload, meta} = action
    if(typeof(type) === 'string') {
        console.log('caught', type)
        return state
    }
    if(getCell(state, type) === null) {
        return state
    } else {

        // have type hold all the 
        const [temporaryState, success] = breathFirstTraversal2(state, action, type, 0)
        if(success) {
            console.log('all reducers are done', temporaryState)
            return temporaryState
        } else {
            return state
        }

    }
}

export default universalReducer;