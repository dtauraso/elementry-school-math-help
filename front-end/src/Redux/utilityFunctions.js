export const setVariable2 = () => {};
export const getVariable2 = (root, absolutePath) => {};

export const getState2 = (root, absolutePathArray) => {
  // assume absolute path is name1 name2 name3 - name4 name5 - name6
  // let listOfStrings = absolutePath.split(' - ')
  let pathList = absolutePathArray.map((string) => string.split(" "));

  let tracker = root;
  // console.log({root, pathList})
  pathList.forEach((stateNameParts, i) => {
    stateNameParts.forEach((stateNamePart) => {
      if (stateNamePart in tracker) {
        tracker = tracker[stateNamePart];
      }
    });
    // ' - ' means child and is only between the states in the path
    if (i < pathList.length - 1) {
      if ("children" in tracker) {
        tracker = tracker["children"];
      }
    }

    // console.log({tracker, stateNameParts})
  });
  // console.log('return this', tracker)
  return tracker;
};
const deepAssign = (state, path, object, cb) => {
  // state is an object
  // console.log("deep copy", path)
  // console.log("path", path)
  // console.log("reduced path", path.filter((node, i) => i > 0))
  // console.log(path.length === 0)
  // console.log(state)

  if (path.length === 0) {
    // console.log("replace", state, value)
    return cb(state, object);
  } else if (path.length > 0) {
    const firstNode = path[0];
    // if the path is broken return {..state}
    if (!state.hasOwnProperty(firstNode)) {
      // copy of original with some object references from the original?
      return { ...state };
    } else {
      return {
        ...state,
        [firstNode]: deepAssign(
          state[firstNode],
          path.filter((node, i) => i > 0),
          object,
          cb
        ),
      };
    }
  }
};

/*
return deepAssign(  state,
                            ['movieListCategory', 'search'],
                            {string: `Results for "${meta}"`, container: movies},
                            assign)

state = deepAssign( state,
                    ['movieListCategory', 'search', 'container', `${payload}`],
                    { isNominated: true },
                    assign)

return deepAssign(  state,
                    ['movieListCategory', 'nominations', 'container'],
                    {[payload]: state.movieListCategory.search.container[payload]},
                    assign)
*/
