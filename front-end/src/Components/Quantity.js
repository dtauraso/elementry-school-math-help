import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
border-top: 1px solid black;
border-bottom: 1px solid black;

`

const StartBox = styled(Box)`
    border-left: 1px solid black;
`

const MiddleBox = styled(Box)`
    border-left: 1px solid black;
    border-right: 1px solid black;
`

const EndBox = styled(Box)`
    border-right: 1px solid black;
`

const Boxes = styled.div`

    display: flex;
    flex-direction: row;
`
class Quantity extends React.Component {

    // should take in the quantity array
    constructor(props) {
        super(props)
        this.state = {
            quantity: [props.quantity]
        }
        // this.setState()
    }


    render() {
        console.log(this.state.quantity)
        return (
            <Boxes>
                {this.state.quantity.map((item, i) => {
                    if(i === 0) {
                        return <StartBox key={i}>{item}</StartBox>

                    } else if(i > 0 && i < this.state.quantity.length - 1) {
                        return <MiddleBox key={i}>{item}</MiddleBox>

                    } else if(i === this.state.quantity.length - 1) {
                        return <EndBox key={i}>{item}</EndBox>
                    }
                })}
            </Boxes>
        )
    }
}

export default Quantity