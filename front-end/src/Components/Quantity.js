import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getCat } from './Redux/catActions'
import { setToValue, append, getValue, deepAssign } from '../deepAssign'
import { makeQuantity } from '../utility'

const Box = styled.p`

    width: 50%;

    border-top: 1px solid black;
    border-bottom: 1px solid black;
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

    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid black;
`

const Quantity = (props) => {

    const {
        quantity,
        statePath,
        Cat} = props

    // should take in the quantity array
    // We should already have the array by this point
    // const [value, setValue] = useState(value)
    // const [backgroundColor, setBackgroundColor] = useState(backgroundColor)
    
    // const [difference, setDifference] = useState(total - quantity)
    console.log('in quantity', getValue(Cat, statePath))
    return (
            <Boxes>
                {/* i : [0, total] quantity: [0, < total] */}
                {getValue(Cat, statePath).map((item, i) => {
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
        Cat: state
    }
}
export default connect(
    mapStateToProps,
    { getCat }

)(Quantity)
