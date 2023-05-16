import { 
    CART_REQUEST_ITEM, 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
 
    SHIPPING_ADDRESS_SUCCESS, 
    PAYMENT_METHOD_SUCCESS,
} from "../constants/cartConstants"; 




export const cartReducers = (state = { cartItems : [] }, action) => {
    switch (action.type) {

        case CART_REQUEST_ITEM:
            const cartItems = localStorage.getItem('cartItems') 
                ? JSON.parse(localStorage.getItem('cartItems'))
                : [];
            console.log(cartItems);
            return { loading : true, cartItems}

        case CART_ADD_ITEM:
            
            const item = action.payload
            console.log({item})
            // console.log({cartItems})

            const existItem = state.cartItems.find(x => x._id === item._id)
            console.log(existItem);
            
            if(existItem) {
                
                return { 
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x._id === existItem._id ? item : x)
                }
            }
            else{
                
                return{ 
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state, 
                cartItems:state.cartItems.filter( x => x._id !== action.payload._id)
            }

        case SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state, 
                shippingAddress: action.payload 
            }

        case PAYMENT_METHOD_SUCCESS:
            return {
                ...state, 
                paymentMethod : action.payload 
            }

        default:
            console.log()
            return state
    }
}
