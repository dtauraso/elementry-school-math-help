import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner';
import ProblemSetCard from './ProblemSetCard'
import AddTwoValues from '../Problems/AddTwoValues'
import { connect } from 'react-redux'
import { getCat, submitAnswer, addToAnswer } from '../../Redux/Actions'
import {
    getCell,
    getVariable,
    getChild } from '../../Redux/reducerHelpers'

    
const ProblemSet = (props) => {
    const {Root} = props

    // assume the state chart is already made
    // look for states using the old frontend components with a start offset of 'display '

    let problemSet = getCell(Root, 'resultsFromBackend').value['problems']
    let id = getCell(Root, 'selectedProblemSetFromBackend').value
    let problemsId = getCell(Root, 'problemSetIdMapToAppendedProblemId').value
    let displayResults = getCell(Root, 'displayResults')
    let children = displayResults.children
    let childName = children[ problemsId[id] ]
    console.log({childName})
    console.log({id, problemsId, children: children[ problemsId[id] ]})
    console.log({offsetString: 'displayResults', id: `${problemsId[id]}`})


    // get the ith problem set
    // it appears the state chart data is not getting overwritten like last time
    let elementarySchoolName = 'elementarySchool'

    let elementarySchool = getCell(Root, elementarySchoolName)
    let problemSets = getChild(Root, elementarySchool, 'displayResults')
    console.log({problemSets})

    let ithProblemSet = problemSets.children.length - 1
    console.log({ithProblemSet})
    // seems to work till we visit it again and it restores the prev item only 1 time
    // why are we selecting the ith problem within the ith problem set?
    // appears to select the same items but if the previous item is -1 then itt's changed to -1
    if(id >= 0) {
        console.log('my problems', problemSet[id])
        // corrdinates from the 'displayResults ' states
        // ith problem set
        // run AddTwoValues for each problem in the ith problem set
        // problemSetIdMapToAppendedProblemId
        // before we display anything prove we can find the right data
        return (
            <div>
                {problemSet[id].map((problem, i) => (
                    <ProblemSetCard key={i} stateCoordinates={{
                                                    problemSet: id,
                                                    problemId: i,
                                                    offsetString: 'displayResults '}}/>
                ))}
                {/* { ithProblemSet: ithProblemSet,
                                    problemId: problem.split(' ')[3],
                                    offsetString: myPath} */}
                <AddTwoValues
                // key={i}
                // using the array id instead of the child id?
                // the child id for the parent of the problems != the problem name id
                // using wrong kind of number for the problemId
                // i={{problemId: problemId}}  // prefered pracice as accessing key directly is not a good idea
                stateCoordinates={{
                    ithProblemSet: problemsId[id],
                    problemId: '0',
                    offsetString: 'displayResults'}}
                // pass in a state name prefix to identify the prefixth data set
                />
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    
    }
}

const mapStateToProps = state => {
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat, submitAnswer, addToAnswer }

)(ProblemSet)
