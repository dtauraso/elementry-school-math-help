
import { Cat } from './catReducer'
import { setToValue, append, getValue, objectExistsAtPath, deepAssign, } from '../../deepAssign'

// import { BreakApp } from './reducers/breakAppReducer'
const initialState = {
    ...Cat,
    // breakAppTree: BreakApp
}
// vector state name
// trie tree js object
// store variables as state names

// 1 button -> 1 action
// 1 action -> 1 reducer or (2 reducers: 1 success and 1 failue)
// 1 reducer -> n nodes run in state machine
// for now the state name will be defined as the path from the root js object
// down to the target js object we want to be called state name
const universalReducer = (state = initialState, action) => {

    // console.log(action.type, state, Cat)
    if(typeof(action.type) === 'string') {
        return state
    }
    // if(!objectExistsAtPath(state, action.type)) {
    //     return state
    // } else {
    //     return getValue(state, action.type)['function'](state, action)
    // }
    let [solutionName, stateFirstName, context] = action.type
    // console.log('got name parts', action.type)
    if(!Object.keys(state[solutionName]['tree']).includes(stateFirstName)) {
        return state
    }

    // console.log('going to run a state', action.type)

    return state[solutionName]['tree'][stateFirstName]['functions'][context](state, action)

}

export default universalReducer;