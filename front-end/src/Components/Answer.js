import React, {useState} from 'react'
import Quantity from './Quantity'
import styled from 'styled-components'
// need another flexbox so the centering doesn't affect the flex-start
// the flex-start should start from 1 spot and go right(its starting from different
// positions on the left)
const Container = styled.div`
    // @media(max-width: 400px) {

        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px solid white;
        justify-content: flex-end;
        
        // align-items: center;
// }
`

const Value = styled.p`
    margin-left: 10px;
    margin-right: 10px;

`

const Answer = (props) => {

    // what if I added padding to ensure there was always the same 
    // should take in a single value and display it along with the quantity
    const [value, setValue] = useState(props.value)
    
    // why isn't quantiy's prob being updated when oneValue's is being updated?

    // console.log('here', value, quantity)
    // this.makeQuantity()
    return (
        <Container>
            {/* form for entering in the answer */}
            <Value>{props.total}</Value>
            <Quantity
                total={props.total}
                value={props.value}
                backgroundColor={props.backgroundColor}
                />
                
        </Container>
    )
}

export default Answer