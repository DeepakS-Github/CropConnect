import { SET_USER_LOCATION } from "../constants";

let initialState = [];

export const userLocationReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_LOCATION:
            return action.payload
        default: 
            return state
    }
}