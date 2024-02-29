import { EDIT_PRODUCT } from "../constants";

let initialState = null;

export const sellerEditProductReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_PRODUCT:
            // console.log(action.payload);
            return action.payload
        default: 
            return state
    }
}