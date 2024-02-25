import { ADD_SELLER_DATA, EDIT_PRODUCT, ADD_PRODUCT_DATA, ADD_TO_CART, REMOVE_FROM_CART, INC_QTY_IN_CART, DEC_QTY_IN_CART, ADD_USER_DATA } from "./constants"

export const addSellerData = (data) => {
    return {
        type: ADD_SELLER_DATA,
        payload: data
    }
}

export const addUserData = (data) => {
    return {
        type: ADD_USER_DATA,
        payload: data
    }
}

export const addProductData = (data) => {
    return {
        type: ADD_PRODUCT_DATA,
        payload: data
    }
}

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
}


export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId
    }
}


export const increaseProductQty = (productId) => {
    return {
        type: INC_QTY_IN_CART,
        payload: productId
    }
}


export const decreaseProductQty = (productId) => {
    return {
        type: DEC_QTY_IN_CART,
        payload: productId
    }
}


export const editProductDetails = (productDetails) => {
    return {
        type: EDIT_PRODUCT,
        payload: productDetails
    }
}