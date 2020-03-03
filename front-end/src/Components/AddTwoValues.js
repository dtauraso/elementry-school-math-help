import React from 'react'
import OneValue from './OneValue';
import styled from 'styled-components'
import Answer from './Answer'
// AddTwoValues box
// mobile first
const backgroundColor = "lightblue"
const Container = styled.div`

    // @media(max-width: 400px) {
        width: vw;
        background-color: ${props => props.backgroundColor};
        border: 1px solid #BADA55;
    
        margin: 0 auto;
        // magin-left: 
    // }
    
`
// need to know all the values so the right total spaces can be calculated
const AddTwoValues = (props) => {
    return (
        <Container backgroundColor={backgroundColor}>
            {/* <h1>testing</h1> */}
            <OneValue
                value={3} 
                total={4 + 3}
                backgroundColor={backgroundColor}/>
            <OneValue
                value={4} 
                total={4 + 3}
                backgroundColor={backgroundColor}/>
            <Answer
                value={7} 
                total={4 + 3}
                backgroundColor={backgroundColor}/>
        </Container>
    )
}

export default AddTwoValues;