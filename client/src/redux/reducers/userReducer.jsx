import { ADD_USER_DATA } from "../constants";

let initialState = null;

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_USER_DATA:
            return action.payload
        default: 
            return state
    }
}