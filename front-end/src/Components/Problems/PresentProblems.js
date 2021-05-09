import React from 'react'
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import { connect } from 'react-redux'
import { autoSolve } from '../../Redux/Actions'

import {
    getState2 } from '../../Redux/utilityFunctions'
import AddTwoValues from './AddTwoValues'


// this component uses redux memoizing as an experiment
// the other components don't use it
const getMyProblems = ( state, location ) => {

    let Root = state
    // console.log('my lcoation inside the selector', location)
    const offsetString = location
    let elementarySchoolName = 'elementarySchool'
    console.log({Root})
    let path = 'elementarySchool - plusProblems problemSet'
    // console.log({problemSet: Root['elementarySchool'].children['plusProblems']['problemSet']})
    let problemSet = getState2(Root, path)
    // console.log(getState2(Root, path))
    // let x = treeVisualizer2(state, elementarySchoolName)
    // console.log('tree', x)
    // console.log(state)
    // let problemSetDataSetName = props.location.pathname//useHistory().location.pathname
    // console.log('history', problemSetDataSetName.slice(1, problemSetDataSetName.length))

    // let elementarySchool = getCell(Root, elementarySchoolName)
    // console.log(elementarySchool)
    // printTreeInteractive(Root)
    // const offsetStateName = offsetString.slice(0, offsetString.length - 1)

    // fails as offsetstring is not exactly the state name
    // let problemSets = getChild(Root, elementarySchool, `${offsetString}`)
    // console.log('stuff', elementarySchool, problemSets.value - 1)
    // messed up here
    // console.log(problemSets, `${offsetString}problemSet ${problemSets.children.length - 1}`)
    // let problemSet = getChild(Root, problemSets, `${offsetString} problemSet ${problemSets.children.length - 1}`)
    // console.log('problem set', problemSet)
    // let problems = problemSet.children//Object.keys(problemSet.children)
    // console.log('my problems', problems)
    return problemSet
}

// ensures redux will not refresh the component when the data fetched is the same

// the n to n-1 parameters must be selector functions returning data to be cached
const getProblems = createSelector( (state, location) => ( getMyProblems(state, location) ),
                                    (stuff) => (stuff) )
  



const getTheProblemSetId = (Root, location) => {
    // let elementarySchoolName = 'elementarySchool'

    // let elementarySchool = getCell(Root, elementarySchoolName)
    // let problemSets = getChild(Root, elementarySchool, `${location}`)
    // // console.log({location, problemSets})

    // let ithProblemSet = problemSets.children.length - 1

    return []
}
const getProblemSetId = createSelector( (state, location) => (getTheProblemSetId(state, location)),
                                        (stuff) => (stuff))



const PresentProblems = (props) => {

    const { problems, myPath, ithProblemSet } = props
    
    const autoSolve1 = () => {
        props.autoSolve( 'elementarySchool testing')

    }
    console.log('refreshing present problems')
    /*
    problem set, #of problems, 
    */
   console.log({problems})
//    console.log(Object.keys(problems))
   const problemNumbers = Object.keys(problems)
                                .map(numberString => Number(numberString))

//    console.log(problem, problems[problem])
    // need the problem set
    // seems to be stuck on the first problem
    return (
        <div>

        {/* how the coordinates are calculated here is wrong 
        use the problem name to get the coordinates*/}
        {problemNumbers.map((problem, i) => (
            <AddTwoValues
                key={i}
                // i={{problemId: problemId}}  // prefered pracice as accessing key directly is not a good idea
                stateCoordinates={{
                    problem: problems[problem].children,
                    offsetString: 'plusProblems'
                }}
                // pass in a state name prefix to identify the prefixth data set
                />

        ))}
        
        {/* need an autocompute and submit button here */}
        <button onClick={() => autoSolve1()}>autoCompute</button>

        </div>
    )
}

const mapStateToProps = (state, ownProps) => {

    return {
        
        problems: getProblems(state, ownProps.myPath),
        ithProblemSet: getProblemSetId(state, ownProps.myPath)

    }
}
export default connect(
    mapStateToProps,
    { autoSolve }

)(PresentProblems)
