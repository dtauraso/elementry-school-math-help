import React, {useState} from 'react'
import styled from 'styled-components'

const Box = styled.p`

    width: 50%;

    border-top: 1px solid black;
    border-bottom: 1px solid black;
    color: ${props => props.isColor ? props.backgroundColor: "black"};

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
// I want them to expand to the right only
const SetOfBoxes = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid black;
`
const Boxes = styled.div`

    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid black;
`


const makeQuantity = (total) => {
    let x = []
    for(let i = 0; i < total; i++) {
        x = [...x, '@']
    }

    return x

}
const Quantity = (props) => {

    // should take in the quantity array
    const [quantity, setQuantity] = useState(makeQuantity(props.total))
    const [value, setValue] = useState(props.value)
    const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor)
    
    // const [difference, setDifference] = useState(total - quantity)
    // console.log('in quantity', quantity, value)
    return (
        <SetOfBoxes>
            <Boxes>
                {/* i : [0, total] quantity: [0, < total] */}
                {quantity.map((item, i) => {
                    const truthFlag = (value - 1) < i

                    // console.log(value < i)
                    if(i === 0) {
                        return <StartBox
                                    key={i}
                                    isColor={truthFlag}
                                    backgroundColor={backgroundColor}>{item}</StartBox>

                    } else if(i > 0 && i < quantity.length - 1) {
                        return <MiddleBox
                                    key={i}
                                    isColor={truthFlag}
                                    backgroundColor={backgroundColor}>{item}</MiddleBox>

                    } else if(i === quantity.length - 1) {
                        return <EndBox
                                    key={i}
                                    isColor={truthFlag}
                                    backgroundColor={backgroundColor}>{item}</EndBox>
                    }
                })}
            </Boxes>
        </SetOfBoxes>
        
    )
    
}

export default Quantity