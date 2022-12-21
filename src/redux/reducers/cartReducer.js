import Session from '../../utils/session';
import * as actionTypes from '../constants/cartConstants';
const shippingInfo = Session.getSession('shippingInfo')

var caritems = Session.getSession('cartItems') || {}

var initialState = { 
    cartItems: caritems, 
    shippingInfo:shippingInfo,
    orders:[]
}
export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            // const item = action.payload;

            // const existItem = state.cartItems.find(product => product.id === item.id);
            
            // if(existItem){
            //     return {
            //         ...state, cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
            //     }
            // } else {
            //     return  { ...state, cartItems: [...state.cartItems, item]}
            // }
        case actionTypes.GET_CART_PRODUCTS:
            Session.setSession('cartItems',{...action?.payload?.cart,['count']:action?.payload?.cart?.carts?.length})
            return {
                ...state,  cartItems: {...action?.payload?.cart,['count']:action?.payload?.cart?.carts?.length}
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload)
            }

        case actionTypes.SAVE_SHIPPING_INFO:
            Session.setSession('shippingInfo', action.payload)
            return {
                ...state, shippingInfo: action.payload
            }

        case actionTypes.GET_ORDERS:
            return {
                ...state, orders: action.payload
            }

        default:
            return state;
    }
}