
import { Cat } from './catReducer'
import { setToValue,
         append,
         getValue,
         objectExistsAtPath,
         deepAssign,
         breathFirstTraversal} from '../../reducerHelpers'

// import { BreakApp } from './reducers/breakAppReducer'
const initialState = {
    ...Cat,
    // breakAppTree: BreakApp
}
// vector state name
// trie tree js object
// store variables as state names

// 1 button -> 1 action
// 1 action -> 1 reducer or (2 reducers: 1 success and 1 failue for axios calls)
// 1 reducer -> n nodes run in state machine
// for now the state name will be defined as the path from the root js object
// down to the target js object that we want to be called the state name
const universalReducer = (state = initialState, action) => {

    console.log("in the reducer")
    console.log(state, action)
    // action.type always holds the start state
    // console.log(action.type, state, Cat)
    const { type, payload, meta} = action
    if(typeof(type) === 'string') {
        return state
    }
    if(!objectExistsAtPath(state, type)) {
        return state
    } else {

        // have type hold all the 
        const [temporaryState, success] = breathFirstTraversal(state, action, [type])
        if(success) {
            return temporaryState
        } else {
            return state
        }

    }
}

export default universalReducer;