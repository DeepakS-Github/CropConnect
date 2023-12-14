import {combineReducers} from 'redux'
import { sellerReducer } from './reducers/sellerReducer'
import { userReducer } from './reducers/userReducer'
import { productReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'

export default combineReducers({
    sellerReducer,
    userReducer,
    productReducer,
    cartReducer
})