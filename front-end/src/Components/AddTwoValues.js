import React from 'react'
import OneValue from './OneValue';
import styled from 'styled-components'
// AddTwoValues box
// mobile first

const Container = styled.div`

    @media(max-width: 400px) {
        width: 400px;
        background-color: lightblue;
        border: 1px solid #BADA55;
    
        margin: 0 auto;
    }
    
`

const AddTwoValues = (props) => {
    return (
        <Container>
            {/* <h1>testing</h1> */}
            <OneValue value={2}/>
        </Container>
    )
}

export default AddTwoValues;