import { ADDCART, REMCART } from '../consts';

export const addCart = (product) => ({
    type: ADDCART,
    payload: {
        product: product
    }
})

export const remCart = (productId) => ({
    type: ADDCART,
    payload: {
        id: productId
    }
})