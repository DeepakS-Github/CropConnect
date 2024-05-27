import {combineReducers} from 'redux'
import { productReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { sellerEditProductReducer } from './reducers/sellerEditProductReducer'

export default combineReducers({
    productReducer,
    cartReducer,
    sellerEditProductReducer
})