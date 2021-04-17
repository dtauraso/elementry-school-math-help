import axios from 'axios';
import { store } from '../../index'
import { getState2 } from '../../Redux/reducerHelpers2'

export const getProblemSets = () => dispatch => {

    console.log('inside the action')
    axios
        .get(`http://localhost:3001/api`)
        .then(res => {
            console.log('returned')
            if(res.status === 200) {
                console.log('got the data', res.data)
            
                // let x = { displayResults: getState2(store.getState(), `elementarySchool - displayResults`)}
                // console.log("X", x)
                dispatch({

                    type: 'elementarySchool',// - displayResults',
                    payload: res.data,
                    meta: {
                            offsetString: 'plusProblems',
                            // currentState: getState2(store.getState(), startStateName),
                            // parent: getState2(store.getState(), 'elementarySchool'),
                            // if you are going to run a state that access data outside the scope of
                            // type object
                            // root: store.getState()
                            // basePath: pathToState, // base state(for the object data)
                            // parentStateName: pathToState,
                            // testPayload: store.getState()
                        }
                });
        
            }
            else {
                console.log('res is not ok')
            }
        })
        .catch(error => {
            console.log('error', error)
        })
}
export const clearResults = () => dispatch => {
    // axios
    //     .delete(`http://localhost:3001/api`)
    //     .catch(error => {
    //         console.log('error', error)
    //     })
}