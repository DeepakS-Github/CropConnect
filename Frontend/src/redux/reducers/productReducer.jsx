import { ADD_PRODUCT_DATA } from "../constants";

let initialState = null;

export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PRODUCT_DATA:
            return action.payload
        default: 
            return state
    }
}