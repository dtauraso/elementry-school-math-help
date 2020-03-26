
import { Cat } from './catReducer'
import { setToValue,
         append,
         getValue,
         objectExistsAtPath,
         deepAssign,
         breathFirstTraversal} from '../../deepAssign'

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

    console.log("in the reducer")
    console.log(state, action)
    // action.type always holds the start state
    // console.log(action.type, state, Cat)
    if(typeof(action.type) === 'string') {
        return state
    }
    if(!objectExistsAtPath(state, action.type)) {
        return state
    } else {
        let { meta } = action
        let { stateStateName } = meta

        // console.log("can we send action?", action)
        return breathFirstTraversal(
                state,
                action,
                stateStateName)


        // return getValue(state, action.type)['function'](state, action)
    }
    let [solutionName, stateFirstName, context] = action.type
    // console.log('got name parts', action.type)
    if(!Object.keys(state[solutionName]['tree']).includes(stateFirstName)) {
        return state
    }
    // let { meta } = action
    // let [ pathToState, stateStateName, endStateName ] = meta
    // console.log('going to run a state', action.type)
    // run bft on the reducer path
    // return breathFirstTraversal(
    //         state,
    //         action,
    //         stateStateName,
    //         startPayload action.payload,
    //          endStateName)

    return state[solutionName]['tree'][stateFirstName]['functions'][context](state, action)

}

export default universalReducer;