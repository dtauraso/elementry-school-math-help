export const makeQuantity = (value, total) => {
    // hilights when to print out an @ and when not to using 1's and 0's
    let x = []
    for(let i = 0; i < total; i++) {
        if(i < value) {
            x = [...x, 1]

        } else {
            x = [...x, 0]
        }
    }

    return x

}