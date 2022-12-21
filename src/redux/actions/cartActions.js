import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import helper from '../../utils/helper';
import apiPath from '../../utils/apiPath';
import { LOADER } from '../constants/otherConstant';
import Session from '../../utils/session';

const user = Session.getSession('auth');
var user_id = user?.id;

export const saveShippingInfo = (data) => async (dispatch) => {
    try {
        const address = `${data.address}, ${data.city}, ${data.state}, ${data.pinCode}, ${data.country}`;

        var payload = {
            "user_id": user_id,
            "lat": "0",
            "long": "0'",
            "contact_name": data?.name,
            "mobile": data?.phoneNo,
            "address_line": JSON.stringify(address)
        }

        var url = apiPath.addressAdd
        const res = await helper.api(url, "post", payload);
        // if (data?.status == 200) {
        //     dispatch({ type: actionTypes.GET_CART_PRODUCTS, payload: data?.result });
        //     dispatch({ type: LOADER, payload: false });
        // }

        dispatch({ type: actionTypes.SAVE_SHIPPING_INFO, payload: data });
        dispatch({ type: LOADER, payload: false });


    } catch (error) {
        console.log('err in save shipping info ==>>>', error)
        dispatch({ type: actionTypes.GET_CART_FAIL, payload: error.response });
        dispatch({ type: LOADER, payload: false });
    }

};
export const getCart = (user_id) => async (dispatch) => {
    try {
        var url = apiPath.getCartItems + user_id
        const data = await helper.api(url, "GET", {});
        if (data?.status == 200) {
            dispatch({ type: actionTypes.GET_CART_PRODUCTS, payload: data?.result });
            dispatch({ type: LOADER, payload: false });
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_CART_FAIL, payload: error.response });
        dispatch({ type: LOADER, payload: false });
    }

};
export const updateCart = (payload) => async (dispatch) => {
    try {
        var url = apiPath.updateCartItems;
        const data = await helper.api(url, "post", payload);
        if (data?.status == 200) {
            dispatch({ type: LOADER, payload: false });
            return true
        } else {
            dispatch({ type: LOADER, payload: false });
            return false
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_CART_FAIL, payload: error.response });
        dispatch({ type: LOADER, payload: false });
    }
};
export const removeFromCart = (id) => async (dispatch) => {
    try {
        var url = apiPath.deleteCartItems + id;
        const data = await helper.api(url, "GET", {});
        if (data?.status == 200) {
            dispatch({ type: LOADER, payload: false });
            toast.success(data?.message)
            return true
        } else {
            dispatch({ type: LOADER, payload: false });
            return false
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_CART_FAIL, payload: error.response });
        dispatch({ type: LOADER, payload: false });
    }
};

export const orderPlace = (data) => async (dispatch, getState) => {
    try {

        data.customer_id = user_id
        var url = apiPath.placeOrder;
        const res = await helper.api(url, "post", data);
        if (data?.status == 200) {
            // dispatch({ type: actionTypes.GET_CART_PRODUCTS, payload: data?.result });
            return res;
        }else{
            dispatch({ type: LOADER, payload: false });
            return res
        }
       

    } catch (error) {
        console.log('place order api==>>>>>', error)
        dispatch({ type: LOADER, payload: false });
    }

};




export const getOrders = (id) => async (dispatch) => {
    try {
        dispatch({ type: LOADER, payload: true });
        var payload = {
            "customer_id": id,
            "current-page":1,
            "page-limit":22,
        }
        var url = apiPath.getOrders;
        const res = await helper.api(url, "post", payload);
        if (res?.status == 200) {
            dispatch({ type: actionTypes.GET_ORDERS, payload: res?.result });
            dispatch({ type: LOADER, payload: false });
        }
        dispatch({ type: LOADER, payload: false });
    } catch (error) {
        console.log('err in get orders info ==>>>', error)
        dispatch({ type: LOADER, payload: false });
    }

};



// export const getCart = (id) => async (dispatch) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8000/product/${id}`);

//         dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });

//     } catch (error) {
//         console.log('Error while calling cart API');
//     }
// };


// export const removeFromCart = (id) => (dispatch) => {
//     dispatch({
//         type: actionTypes.REMOVE_FROM_CART,
//         payload: id
//     })

// };


