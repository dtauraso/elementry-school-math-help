import axios from 'axios';
import { store } from '../../index'


export const getProblemSets = () => dispatch => {

    console.log('inside the action')
    axios
        .get(`http://localhost:3001/api`)
        .then(res => {
            console.log('returned')
            if(res.status === 200) {
                console.log('got the data', res.data)
                dispatch({
                    type: ['elementarySchool - displayResults'], // current state (can't make it the base state for object datatbecause sometimes the current state doesn't have ojbect data )
                    payload: res.data,
                    meta: {
                            offsetString: 'plusProblems',
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