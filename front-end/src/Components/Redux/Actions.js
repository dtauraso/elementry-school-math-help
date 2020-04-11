import axios from 'axios';
import { store } from '../../index'
// import univer
// export const FETCH_CAT_START = 'FETCH_CAT_START'
// export const FETCH_CAT_SUCCESS = 'FETCH_CAT_SUCCESS'
// export const FETCH_CAT_FAILURE = 'FETCH_CAT_FAILURE'


// middleware functions
export const getCat = () => dispatch => {

    dispatch({  type: ['redux', 'FETCH_CAT_START'] });

    axios
        .get('https://aws.random.Root/meow')
        .then(res => {
            // console.log("from api", res.data.file)
            dispatch({  type: ['redux', 'FETCH_CAT_SUCCESS'],
                        payload: res.data.file });
        })
        .catch(err => {
            dispatch({  type: ['redux', 'FETCH_CAT_FAILURE'],
                        payload: err.response })
        });

};
export const autoSolve = (pathToState) => dispatch => {
    dispatch({
        type: [pathToState],
        meta: {
            parentStateName: pathToState
        }
    })
    // let myProblemTable = getCell(state, ['payload'])

    let x = store.getState()['payload']
    console.log('submit this', x)
    axios
        .post(`http://localhost:3001/api`, x.jsObject)
        .then(res => {
            if(res.status == 200) {
                console.log('added the data')

            }
        })
    // x.name = ['testing']
    // console.log(x)

}
export const addToAnswer = (lotsOfThings, pathToState) => dispatch => {

    // have a custom state that just lets you save to the field variable
    dispatch({
        type: [pathToState], // current state (can't make it the base state for object datatbecause sometimes the current state doesn't have ojbect data )
        payload: lotsOfThings,
        meta: {
                basePath: pathToState, // base state(for the object data)
                parentStateName: pathToState,
            }
    });


}
export const submitAnswer = (pathToState) => dispatch => {

    // console.log("in the action")
    // prop drilling provides the path
    // ['redux', 'elementary school', 'children', 'problem set', '0', 'answerForm']
    // component provides the data the state function will use
    // runs a graph of connected nodes
    // use the action meta property
    console.log(store.getState())
    dispatch({
            type: [pathToState], // current state (can't make it the base state for object datatbecause sometimes the current state doesn't have ojbect data )
            // payload: lotsOfThings,
            meta: {
                    basePath: pathToState, // base state(for the object data)
                    parentStateName: pathToState,
                    // testPayload: store.getState()
                }
        });
    // let x = store.getState()
    // console.log('after action is done', x)
    // dispatch({
    //         type: [pathToState], // current state (can't make it the base state for object datatbecause sometimes the current state doesn't have ojbect data )
    //         payload: lotsOfThings,
    //         meta: {
    //                 basePath: pathToState, // base state(for the object data)
    //                 parentStateName: pathToState,
    //                 // testPayload: store.getState()
    //             }
    //     });
}
