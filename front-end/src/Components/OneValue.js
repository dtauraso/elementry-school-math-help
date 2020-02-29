import React from 'react'
import Quantity from './Quantity'
import styled from 'styled-components'

const Container = styled.div`

    width: %100;
    diplay: flex;
    flex-direction: column;

`

class OneValue extends React.Component {

    // should take in a single value and display it along with the quantity
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            quantity: []
        }
        // this.setState()
    }
    makeQuantity = (value) => {
        let x = []
        for(let i = 0; i < value; i++) {
            x = [...x, '*']
        }
        this.setState({
            ...this.state,
            quantity: x
        })
        

    }

    componentDidMount() {
        this.makeQuantity(this.state.value)
    }
    
    render() {
        console.log('here')
        // this.makeQuantity()
        return (
            <Container>
                <p>{this.state.value}</p>
                <Quantity quantity={this.state.quantity}/>
                    
            </Container>
        )
    }
}

export default OneValue