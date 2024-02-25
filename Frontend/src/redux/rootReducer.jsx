import {combineReducers} from 'redux'
import { sellerReducer } from './reducers/sellerReducer'
import { userReducer } from './reducers/userReducer'
import { productReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { sellerEditProductReducer } from './reducers/sellerEditProductReducer'

export default combineReducers({
    sellerReducer,
    userReducer,
    productReducer,
    cartReducer,
    sellerEditProductReducer
})