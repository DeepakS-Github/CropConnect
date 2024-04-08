import { ADD_SELLER_DATA } from "../constants";

let initialState = null;

export const sellerReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_SELLER_DATA:
            return action.payload
        default: 
            return state
    }
}