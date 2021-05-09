export const setVariable2 = () => {

}
export const getVariable2 = (root, absolutePath) => {

}

export const getState2 = (root, absolutePathArray) => {
    // assume absolute path is name1 name2 name3 - name4 name5 - name6
    // let listOfStrings = absolutePath.split(' - ')
    let pathList = absolutePathArray.map(string => string.split(' '))

    let tracker = root
    // console.log({root, pathList})
    pathList.forEach((stateNameParts, i) => {
        stateNameParts.forEach(stateNamePart => {
            if(stateNamePart in tracker) {
                tracker = tracker[stateNamePart]
            }
        })
        // ' - ' means child and is only between the states in the path
        if(i < pathList.length - 1) {
            if('children' in tracker) {
                tracker = tracker['children']
            }
        }
        
        // console.log({tracker, stateNameParts})
    })
    // console.log('return this', tracker)
    return tracker

}
