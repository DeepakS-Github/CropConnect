import { EDIT_PRODUCT, ADD_PRODUCT_DATA, ADD_TO_CART, REMOVE_FROM_CART, INC_QTY_IN_CART, DEC_QTY_IN_CART, SET_USER_LOCATION, REMOVE_ALL_FROM_CART } from "./constants"

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

export const setUserLocation = (location) => {
    return {
        type: SET_USER_LOCATION,
        payload: location
    }
}


export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId
    }
}

export const removeAllProductfromCart = () => {
    return {
        type: REMOVE_ALL_FROM_CART,
        payload: null
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