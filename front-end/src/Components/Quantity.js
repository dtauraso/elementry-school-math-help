import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat } from './Redux/Actions'
import {
    getCell,
    getVariable } from '../reducerHelpers'

const Box = styled.p`

    // what if this was dependent on the expected total number of @ symbols?
    width: 25px;

    border-top: 1px solid black;
    border-bottom: 1px solid black;
    margin-top: 1px;
    margin-bottom: 1px;
    color: ${props => props.isColor ? "black": "white"};

`

const StartBox = styled(Box)`
    border-left: 1px solid black;
    border-right: 1px solid black;
`

const MiddleBox = styled(Box)`
    border-left: 1px solid black;
    border-right: 1px solid black;
`

const EndBox = styled(Box/*, props */)`
    border-right: 1px solid black;

    // have this added to color the extra items 

`
// things are expanding from the center
const Boxes = styled.div`

    // what if this was dependent on the expected total number of @ symbols?
    width: ${props => props.quantityLength * 27}px;//50%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid black;
`

const Quantity = (props) => {

    const {
        stateCoordinates,
        Root} = props

    // should have the form flag and the problem, problem part coordinates
    // if form
        // get it from problem, problem part(2 0, submission 0) quntity call
    // else
        // get it from problem, problem part(1 0) quntity call
    let problemPartName = `${stateCoordinates.offsetString}${stateCoordinates.problemId} ${stateCoordinates.problemPart}`
    // let x = getCell(Root, problemPartName)
    let quantity = []
    // console.log('problem for quantity', x)
    if(stateCoordinates.isForm) {
        quantity = getVariable(Root,
            `${problemPartName} submission`,
            `${stateCoordinates.offsetString}quantity`
            ).value
    } else {
        quantity = getVariable(Root,
            problemPartName,
            `${stateCoordinates.offsetString}quantity`
            ).value

    }
    // let quantity = getValue(Root, statePath)
    // should take in the quantity array
    // We should already have the array by this point
    // const [value, setValue] = useState(value)
    // const [backgroundColor, setBackgroundColor] = useState(backgroundColor)
    
    // const [difference, setDifference] = useState(total - quantity)
    // console.log('in quantity', getValue(Root, statePath))
    return (
            <Boxes quantityLength={quantity.length}>
                {/* i : [0, total] quantity: [0, < total] */}
                {quantity.map((item, i) => {
                    // const truthFlag = (value - 1) < i
                    // console.log(item)
                    // read the quantity [1, 1, 0] and an @ followed by the background color
                    // depending on which one it is
                    // console.log(value < i)
                    if(i === 0) {
                        return <StartBox
                                    key={i}
                                    isColor={item}>@</StartBox>

                    } else if(i > 0 && i < quantity.length - 1) {
                        return <MiddleBox
                                    key={i}
                                    isColor={item}>@</MiddleBox>

                    } else if(i === quantity.length - 1) {
                        return <EndBox
                                    key={i}
                                    isColor={item}>@</EndBox>
                    }
                })}
            </Boxes>
        
    )
    
}

const mapStateToProps = state => {
    return {
        Root: state
    }
}
export default connect(
    mapStateToProps,
    { getCat }

)(Quantity)
