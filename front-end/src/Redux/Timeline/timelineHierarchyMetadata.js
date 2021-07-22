export const substateKeys = (state) => {
  let specialKeys = [
    "functionCode",
    "start",
    "next",
    "children",
    "variables",
    "parent",
  ];
  let keys = Object.keys(state).filter((key) => !specialKeys.includes(key));
  // console.log(keys)
  return keys;
};
export const isLeafState = (state) => {
  // console.log(state, !('children' in state), substateKeys(state).length)
  return substateKeys(state).length === 0 && !("children" in state);
};
export const isInternalState = (state) => {
  return substateKeys(state).length > 0 || "children" in state;
};
export const setTimelineMetadataToStates = (contextualStateChart) => {
  // add timeline keys to each state
  // linking state to it's parent
  // a timeline key is not added to root because the key can only be added
  // to the child when it links to the root
  // put in parent links
  if (Object.keys(contextualStateChart).length === 0) {
    return [contextualStateChart];
  }
  // if('variables' in contextualStateChart && !('children' in state)) {
  //     // console.log("PASSES")
  //     return [contextualStateChart]
  // }
  if (isLeafState(contextualStateChart)) {
    // console.log(substateKeys(contextualStateChart), contextualStateChart)
    // console.log("leaf state", Object.keys(contextualStateChart))
    return [contextualStateChart];
  }
  if (isInternalState(contextualStateChart)) {
    // getting all the substates(may be several nodes long) of a particular state to connect
    // them to their parent
    let returnCollection = [];

    if ("children" in contextualStateChart) {
      let allSubstates = [];

      Object.keys(contextualStateChart.children).forEach((child) => {
        allSubstates = [
          ...allSubstates,
          ...setTimelineMetadataToStates(contextualStateChart.children[child]),
        ];
      });
      allSubstates.forEach((nestedSubstate) => {
        nestedSubstate["parent"] = contextualStateChart;
        nestedSubstate["Set2SFromStateFunctionCallCount"] = 0;
        nestedSubstate["stateRunCount"] = 0;
        nestedSubstate["E2ETimeLines"] = [];
        nestedSubstate["unitTimeLines"] = [];
      });
      returnCollection.push(contextualStateChart);
    }
    let subKeys = substateKeys(contextualStateChart);

    if (subKeys.length > 0) {
      subKeys.forEach((subKey) => {
        returnCollection = [
          ...returnCollection,
          ...setTimelineMetadataToStates(contextualStateChart[subKey]),
        ];
      });
      if (
        "variables" in contextualStateChart &&
        !("children" in contextualStateChart)
      ) {
        returnCollection = [...returnCollection, contextualStateChart];
      }
    }
    return returnCollection;
  } else {
    console.log("problem", contextualStateChart);
  }
};
export const addNames = (keySequence, contextualStateChart) => {
  // leaf node
  if ("variables" in contextualStateChart) {
    contextualStateChart["name"] = keySequence;
    return;
  }
  let currentSequence = keySequence;
  // have to deposit the current name if we are
  // at a substate that has children
  // internal node representing the full substate name
  if ("start" in contextualStateChart) {
    contextualStateChart["name"] = currentSequence;
    currentSequence = "";
  }
  // test if a state has a next
  /*
  2 pointer approach for visiting the nodes
  parent, child
  child object depends on the parent and the child key
  parent[child_key] -> child object
  have to keep multiple ideas running at same time
  2 pointer where the child object is dependent on the parent
  redux console needs to print out a state as a string
  user needs a convenient way to think about the path through the state tree
  the current path(root to current state) of the 2 pointers needs to have clean symmetrical push and pop operations
  the user writes the start path in the dispatch call as a string, but
    when they use a parent state for data(it might be a different parent than 
    the current state) they need to use an array
    (string to array was a sacrifice decision as it was too unpleasant to use only 
        a string or an array)
  visitor function must be clean
  the record and print need to show enough information to be trustworthy
        a path for the first line to show where in the state tree the first
        state comes from

  these are used to decide when to link recording nodes up in a sequence or
  a hierarchy(for end to end testing and unit testing)
  set function call count
    this is when a variable change can be recorded from the user
  state visit count

  the state tree is primed with metadata for system to work

  the recording tree is traversed to print out the record of nodes visited
  to the console
  */
  const sequenceIsEmpty = currentSequence === "";

  Object.keys(contextualStateChart).forEach((substateName) => {
    addNames(
      `${currentSequence}${sequenceIsEmpty ? "" : ", "}${substateName}`,
      contextualStateChart[substateName]
    );
  });
};
