import { makeQuantity } from '../../utility'
import { setToValue, append, getValue, deepAssign } from '../../deepAssign'

const answer = 4 + 3

export const fetchCatStart = (state, action) => {

    return {...state,
            catTree : {...state.catTree,
                        isFetching: true
                    }
            
    }
}


export const fetchCatSuccess = (state, action) => {


    return {...state,
            catTree : {...state.catTree,
                        error: '',
                        isFetching: false,
                        cat: action.payload
                }
        
    }
}
export const fetchCatFailure = (state, action) => {
    return {...state,
            catTree : {...state.catTree,
                        error: action.payload,
                        cat: null,
                        isFetching: false
                }

    }
}
const returnState = (state, action) => {
    return state
}
const submitValue = (state, action/*e*/) => {
    // console.log(e.target.value)
    // console.log(pathDownObject)
    // console.log(answerForm)
    const {
        problemSet,
        pathDownObject,
        actualAnswer,
        e,
        firstTimeSubmitting
    } = action.payload
    let y = deepAssign(
        problemSet,
        [...pathDownObject, 'value'],
        parseInt(e.target.value),
        setToValue
    )
    y = deepAssign(
        y,
        [...pathDownObject, 'quantity'],
        makeQuantity(parseInt(e.target.value), actualAnswer),
        setToValue
    )

    if(firstTimeSubmitting === "notYetSubmitted") {
        y = deepAssign(
            y,
            [...pathDownObject, 'firstTimeSubmitting'],
            "firstTime",
            setToValue
        )
        // check answer
        y = deepAssign(
            y,
            [...pathDownObject, 'correctFirstTime'],
            actualAnswer === parseInt(e.target.value),
            setToValue
        )

    }
    y = deepAssign(
        y,
        [...pathDownObject, 'correct'],
        actualAnswer === parseInt(e.target.value),
        setToValue
    )
    return y
    
}
// const updateState = (state, currentStatePath, cb, event) => {
//     return cb(state, currentStatePath, event)
// }

// reducers and the state for it in the same file
// merge the states with 1 initialState
// group by context of problem, not by kind of coding construct

// start state
export const Cat = {
    redux: {
        // have a cat category
        // have a BreakApp category
        // store the different reducer functions outside this function
        // break up the reducers but keep the store the same
        cat: {
            children: [['FETCH_CAT_START']],
            variables: [['error'], ['catPic']]
        },
        error: '',
        catPic: null,
        
        // -> FETCH_CAT_SUCCESS or FETCH_CAT_FAILURE
        'FETCH_CAT_START' : {
            
            'next': [['FETCH_CAT_SUCCESS'], ['FETCH_CAT_FAILURE']],
            'functions': fetchCatStart
        },

        'FETCH_CAT_SUCCESS' : {
            // {'next': {'0': {'validate':'0', 'invalid':'0'}},
            'functions': fetchCatSuccess
        },

        'FETCH_CAT_FAILURE' : {
            // {'next': {'0': {}},
            // 'children': {'0': {'char':'0'}},
            'functions': fetchCatFailure
        },

        'elementary school' : {
            children: {
                'problem set': {
                    '0': {
                        a: {
                            // array of primitives or primitives
                            variables: {
                                value: 4,
                                quantity: makeQuantity(4, answer),
                                isForm: false,
                                operationType: ''
                            },
                            'function': returnState
                            
            
                        },
                        b: {
                            variables: {
                                value: 3,
                                quantity: makeQuantity(3, answer),
                                isForm: false,
                                operationType: '+'
                            },
                            'function': returnState

                            
            
                        },
                        answerForm: {
                            variables: {
                                value: undefined,
                                quantity: makeQuantity(0, answer),
                
                                actualAnswer: answer,
                                isForm: true,
                                correctFirstTime: false,
                                correct: false,
                                // possible values: notYetSubmitted, firstTime
                                firstTimeSubmitting: "notYetSubmitted"
                            },
                            'function': submitValue
                            
            
            
                        }
                    }
                }
            }
        },
        
    }
    
    
}