import React, {useState} from 'react'
import styled from 'styled-components'

const Box = styled.p`

    width: 50%;

    border-top: 1px solid black;
    border-bottom: 1px solid black;

`

const StartBox = styled(Box)`
    border-left: 1px solid black;
    border-right: 1px solid black;
`

const MiddleBox = styled(Box)`
    border-left: 1px solid black;
    border-right: 1px solid black;
`

const EndBox = styled(Box)`
    border-right: 1px solid black;

    // have this added to color the extra items 
    color: lightblue;

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
const Quantity = (props) => {

    // should take in the quantity array
    const [quantity, setQuantity] = useState(props.quantity)

        console.log('in quantity', quantity)
        return (
            <SetOfBoxes>
                <Boxes>
                {quantity.map((item, i) => {
                    if(i === 0) {
                        return <StartBox key={i}>{item}</StartBox>

                    } else if(i > 0 && i < quantity.length - 1) {
                        return <MiddleBox key={i}>{item}</MiddleBox>

                    } else if(i === quantity.length - 1) {
                        return <EndBox key={i}>{item}</EndBox>
                    }
                })}
            </Boxes>
            </SetOfBoxes>
            
        )
    
}

export default Quantity