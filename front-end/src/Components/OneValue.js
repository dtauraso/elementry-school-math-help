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

const OneValue = (props) => {

    console.log("one value", props)
    let {
        problemPart,
        pathDownObject,
        backgroundColor} = props


    let {value,
        quantity,
        isForm,
        actualAnswer} = problemPart

    // what if I added padding to ensure there was always the same 
    // should take in a single value and display it along with the quantity
    // why am I using useState on props?
    // const [value, setValue] = useState(props.value)
    
    // why isn't quantiy's prob being updated when oneValue's is being updated?

    console.log('here', value, quantity)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        // const data = new FormData(event.target);
        
        // fetch('/api/form-submit-url', {
        //   method: 'POST',
        //   body: data,
        // });
      }
    // this.makeQuantity()
    return (
        // if you don't have a solid styling plan, your webapp is screwed
        <Container>
            {/* if there is a form, display the extra component holding the form */}
            {/* don't show value if it's undefined */}
            {isForm && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Best Guess -> </label>
                    <input id="username" name="username" type="text"
                    onChange={(e) => {
                        console.log(e.target.value)
                    }} />
                    <button>Send data!</button>

                </form>
            )}
            {!isForm && (
            <Value>
                {value}
            </Value>)}

            <Quantity
                quantity={quantity}
                backgroundColor={backgroundColor}
                />
                
        </Container>
    )
}

export default OneValue