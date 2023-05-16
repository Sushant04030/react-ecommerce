import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    productListReducers, 
    productDetailsReducers, 
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer, 
} from './reducers/productReducers'

import { cartReducers } from './reducers/cartReducers'
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer,
    updateUserDetailsReducer,
    userListReducer,
    getuserReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
 
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,


    cart: cartReducers,

    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    updateUserDetailsR : updateUserDetailsReducer,
    userList: userListReducer,
    getuserR : getuserReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy :orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : null

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : null

const initialState = {
    cart : { 
        cartItems: cartItemsFromStorage,
        shippingAddress : shippingAddressFromStorage,
        paymentMethod : paymentMethodFromStorage,
    },
    userLogin : { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store