import {combineReducers} from 'redux'
import { productReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { sellerEditProductReducer } from './reducers/sellerEditProductReducer'
import { userLocationReducer } from './reducers/userLocationReducer'

export default combineReducers({
    productReducer,
    cartReducer,
    sellerEditProductReducer,
    userLocationReducer
})