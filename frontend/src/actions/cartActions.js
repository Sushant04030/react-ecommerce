import { 
    CART_REQUEST_ITEM, 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 

    SHIPPING_ADDRESS_SUCCESS, 
    PAYMENT_METHOD_SUCCESS,

 } from '../constants/cartConstants'

import { PRODUCT_DETAILS_FAIL } from '../constants/productConstants'
import axios from 'axios'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    try{
        dispatch({ type: CART_REQUEST_ITEM})

        const { data } = await axios.get(`/api/products/${id}`)
        
        
        dispatch({
            type : CART_ADD_ITEM,
            payload: { 
                _id : data._id,
                name : data.name,
                image: data.image,
                price : data.price,
                countInStock : data.countInStock,
                qty
            }
        })
        
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }catch(error){
        dispatch({ type: PRODUCT_DETAILS_FAIL,
             payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                })
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload : {
            _id : id,
        }

    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const shippingAddressAction = (data) => async (dispatch, getState) => {
        
        dispatch({
            type : SHIPPING_ADDRESS_SUCCESS,
            payload: data,
        })
        
        localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const paymentMethodAction = (data) => async (dispatch, getState) => {
    
    dispatch({
        type : PAYMENT_METHOD_SUCCESS,
        payload: data,
    })
    
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}