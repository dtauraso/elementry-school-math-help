import React, {useState} from 'react'
import Quantity from './Quantity'
import styled from 'styled-components'
// need another flexbox so the centering doesn't affect the flex-start
// the flex-start should start from 1 spot and go right(its starting from different
// positions on the left)
const Container = styled.div`
    @media(max-width: 400px) {

        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px solid white;
        justify-content: flex-end;
        
        // align-items: center;
}
`

const Value = styled.p`
    margin-left: 10px;
    margin-right: 10px;

`

const OneValue = (props) => {

    // what if I added padding to ensure there was always the same 
    // should take in a single value and display it along with the quantity
    const [value, setValue] = useState(props.value)
    const [quantity, setQantity] = useState([])
    const makeQuantity = (value) => {
        let x = []
        for(let i = 0; i < value+1; i++) {
            x = [...x, '@']
        }
        // setQantity(x)
        return x

    }
    
    // why isn't quantiy's prob being updated when oneValue's is being updated?

    console.log('here', value, quantity)
    // this.makeQuantity()
    return (
        <Container>
            <Value>{value}</Value>
            <Quantity quantity={makeQuantity(value)}/>
                
        </Container>
    )
}

export default OneValue