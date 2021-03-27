
export const setVariable2 = () => {

}
export const getVariable2 = () => {

}

export const setTimelineMetadataToStates = (contextualStateChart) => {
    
}
export const set2 = (parentDataKey, referenceToParentObject, varName, newValue) => {
    // the react components will travel down the state chart
    // when loading components

    /*
    parentKey iteraion count
    
    stateName could match parentDataState1 or not
    reference to rootObject, 
    parentstateNameAbsolutePath,
    stateWeWillRunName,
    parentDataStateAbsolutePath,
    varName,
    newValue
    the form state machine should hold a collection of timelines
    store the data into the parent state
    after the child state is done running
    take the last piece of data from the child state in the parent state
    and store it into the child state. use the refernce

    if childStateName is the start child and Set2SFromtateFunctionCallCount === 0
        start the new timeline
    childStateName: {
        Set2SFromtateFunctionCallCount: 0,
        timeLines: [ {
            0: {
                childStateName1: {
                    parentDataStateAbsolutePath1: {
                        // is assigned 1 time
                        before: {
                            var1: 
                            var2:
                        }
                        // is assigned the remaining times
                        after: {
                            var1:
                            var2
                        }
                    }
                }
            },
            1: {
                childStateName2: {
                    parentDataStateAbsolutePath2: {
                        before: {
                            var1: 
                            var2:
                        }
                        after: {
                            var1:
                            var2
                        }
                    }
                }
            }
        }]
    }
    
    */
}

export const treeVisualizer2 = () => {

}

export const breathFirstTraversal2 = () => {

}