//setProblemSetSelector for viewing the result
export const setProblemSetSelector = (problemSetId) => dispatch => {

    // assume we have loaded the data from the backend into a value state
    dispatch({
        type: ['saveProblemSetSelectedForDisplay'], // current state (can't make it the base state for object datatbecause sometimes the current state doesn't have ojbect data )
        payload: problemSetId,
        meta: {
                offsetString: 'plusProblems',
                // basePath: pathToState, // base state(for the object data)
                parentStateName: 'elementarySchool displayResults'//pathToState,
            }
    });

}

