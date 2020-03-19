export const setToValue = (container, value) => {
    return value
}
export const append = (container, value) => {

    return [...container, value]
}
export const getValue = (state, path) => {

    if(path.length === 0) {
        return state
    } else if(path.length > 0) {
        const firstNode = path[0]
        if(!state.hasOwnProperty(firstNode)) {
            return state
        } else {
            return getValue(state[firstNode], path.filter((node, i) => i > 0))
        }
    }
}
export const deepAssign = (state, path, value, cb) => {
    // state is an object
    // console.log("deep copy", path)
    // console.log("path", path)
    // console.log("reduced path", path.filter((node, i) => i > 0))
    // console.log(path.length === 0)
    // console.log(state)

    if(path.length === 0) {
        // console.log("replace", state, value)
        return cb(state, value)

    } else if(path.length > 0) {

        const firstNode = path[0]

        if(!state.hasOwnProperty(firstNode)) {

            // copy of original with some object references from the original?
            return {...state}
        }
        else {
            return {
                ...state,
                // [] seems to protect the variable name from being treated as a key
                [firstNode]: deepAssign(    state[firstNode],
                                            path.filter((node, i) => i > 0),
                                            value,
                                            cb)
            }
        }
    }
}
/*
assume the path is a tree
"0", "answerForm" "value"
"0", "answerForm" "quantity"

"0" : {
    "answerForm" : {
        "value" : {
            "value": ourValue,
            "cb": ourCb
        },
        quantity: {
            "value": ourValue,
            "cb": ourCb
        }
    }
}

*/

// export const deepAssignTree = (state, tree) => {
//     // state is an object
//     // console.log("deep copy", path)
//     // console.log("path", path)
//     // console.log("reduced path", path.filter((node, i) => i > 0))
//     // console.log(path.length === 0)
//     // console.log(state)

//     if(Object.keys(tree).length === 2 &&
//         Object.keys(tree).includes("value") &&
//         Object.keys(tree).includes("cb")) {
//         // console.log("replace", state, value)
//         return tree.cb(state, tree.value)//cb(state, value)

//     } else {//if(path.length > 0) {

//         Object.keys(tree).forEach(pathKey => {

//         })
//         const firstNode = path[0]

//         if(!state.hasOwnProperty(firstNode)) {

//             // copy of original with some object references from the original?
//             return {...state}
//         }
//         else {
//             return {
//                 ...state,
//                 // [] seems to protect the variable name from being treated as a key
//                 [firstNode]: deepAssign(    state[firstNode],
//                                             path.filter((node, i) => i > 0),
//                                             value,
//                                             cb)
//             }
//         }
//     }
// }
