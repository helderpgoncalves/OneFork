import { ADDCART, REMCART, CLRCART } from '../consts';

export const addCart = (product) => ({
    type: ADDCART,
    payload: {
        product: product
    }
})

export const remCart = (productId) => ({
    type: REMCART,
    payload: {
        id: productId
    }
})

export const clrCart = () => ({
    type: CLRCART
})