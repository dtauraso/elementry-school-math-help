import React, {useEffect} from 'react'
import ProblemSets from './ProblemSets'
import ProblemSet from './ProblemSet'
import Loader from 'react-loader-spinner';

import { connect } from 'react-redux'
import { getProblemSets } from '../Redux/Actions'
import {
    getCell,
    getVariable } from '../../reducerHelpers'


// https://github.com/BW-Dev-Desk-Queue-1/Front-End/blob/master/dev-desk-queue/src/components/Student/StudentDashboard.js

const Results = (props) => {
    const {Root} = props
    useEffect(() => {
        console.log('here in problem sets')
        // run action to get the problem sets
        props.getProblemSets()
        // assume we are getting all the problems for now
    }, [])

    let stuff = getCell(Root, ['results from backend'])
    if(stuff) {
        // console.log('stuff', stuff.jsObject)
        return (
            <div>
                <ProblemSets />
                <ProblemSet />
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
    { getProblemSets }

)(Results)
