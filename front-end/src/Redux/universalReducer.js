import { newContextualStateChart } from "./InitReducers";
import {
  getCell,
  breathFirstTraversal,
  printTreeInteractive,
} from "./reducerHelpers";
import {
  setVariable2,
  getVariable2,
  getState2,
  setTimelineMetadataToStates,
  makeEntry,
  getParentObject,
  setupFirstState,
  setupSetInAllRemainingStates,
  revisitingSuccessfullyRunStates,
  allRemainingSetCallsInState,
  treeVisualizer2,
  setupForBreathFirstTraversal2,
  breathFirstTraversal2,
} from "./reducerHelpers2";
import { printStateRunTree } from "./Timeline/stateRunHierarchyRules";
// import { BreakApp } from './reducers/breakAppReducer'
const initialState = {
  ...newContextualStateChart,
  // breakAppTree: BreakApp
};
// vector state name
// trie tree js object
// store variables as state names

// 1 button -> 1 action
// 1 action -> 1 Reducers or (2 reducers: 1 success and 1 failue for axios calls)
// 1 Reducers -> n nodes run in state machine
// for now the state name will be defined as the path from the root js object
// down to the target js object that we want to be called the state name
const universalReducer = (state = initialState, action) => {
  // console.log("in the Reducers")
  // console.log({state, action})
  // action.type always holds the start state
  // console.log(action.type, state, Root)
  const { type, payload, meta } = action;
  // console.log({meta})
  // if(typeof(type) === 'string') {
  //     console.log('caught', type)
  //     return state
  // }

  if (type === "@@INIT") {
    // console.log("running init")
    return state;
  } else {
    // console.log('problem')
    // return state
    // type is the start state
    const [temporaryState, success] = setupForBreathFirstTraversal2(
      state,
      action,
      0
    );
    // breathFirstTraversal(state, action, type, 0, {})
    if (success) {
      console.log("all reducers are done");
      console.log(temporaryState);
      printStateRunTree(temporaryState["entries"][0], "");

      return temporaryState;
    } else {
      console.log("there was a failure");
      console.log(temporaryState);
      printStateRunTree(temporaryState["entries"][0], "");

      return state;
    }
  }
};

export default universalReducer;
