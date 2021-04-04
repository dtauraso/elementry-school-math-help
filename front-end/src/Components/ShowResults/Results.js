import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ProblemSets from './ProblemSets'
import ProblemSet from './ProblemSet'
import Loader from 'react-loader-spinner';

import { connect } from 'react-redux'
import { getProblemSets, clearResults } from '../../Redux/Actions'
import {
    getCell,
    treeVisualizer } from '../../Redux/reducerHelpers'


// https://github.com/BW-Dev-Desk-Queue-1/Front-End/blob/master/dev-desk-queue/src/components/Student/StudentDashboard.js

const ShowProblems = styled.div`

    display: flex;
    justify-content:  space-between;
    padding-left: 20px;
    padding-right: 20px;
`
const Results = (props) => {
    const {Root} = props
    console.log('here')
    // let renderNumber = false
    // const [renderNumber, setRenderNumber] = useState(false)
    // if(renderNumber == false) {
    //     console.log('here in problem sets fine')

    //     renderNumber = true
    //     // console.log('got here')
    //     props.getProblemSets()
    //     console.log('loaded the problems in')
    // }
    useEffect(() => {
        console.log('here in problem sets')
        // run action to get the problem sets
        props.getProblemSets()
        // assume we are getting all the problems for now
    }, [])

    let elementarySchoolName = 'elementarySchool'

    console.log('print tree')
    // treeVisualizer(Root, elementarySchoolName, 1)

    // .value already existed when the state chart was initialized
    let stuff = getCell(Root, 'resultsFromBackend').value['problemSets']
    // let problemSets = getCell(Root, ['resultsFromBackend']).value['problemSets']
    const clearResults = () => {
        props.clearResults()
    }
    if(stuff) {
        // console.log('stuff', stuff.value)
        return (
            <div>
                <ShowProblems>
                    <ProblemSets />
                    <ProblemSet />
                </ShowProblems>

                {/* <button onClick={() => clearResults()}>clear results</button> */}

            </div>
            


            
        )
    
    }

    return (
        <div>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getProblemSets, clearResults }

)(Results)
