import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import helper from '../../utils/helper';
import apiPath from '../../utils/apiPath';
import { LOADER } from '../constants/otherConstant';






export const userLogin = (data) => async (dispatch) => {
    try {
        dispatch({ type: LOADER, payload: true });
        console.log('login user==>>>>',data)
        var url = apiPath.userLogin;
        const result  = await helper.api(url, "post", data);
        console.log('login response ==>>>',result)
        if(result?.status == 200){
            dispatch({ type: LOADER, payload: false });
            toast.success(result?.message)
           return result
        } else{
            toast.error(result?.response?.data?.message)
            dispatch({ type: LOADER, payload: false });
            return false
        }

    } catch (error) {
        console.log('err in register api==>>>', error)
        // dispatch({ type: actionTypes.GET_CART_FAIL, payload: error.response });
        // dispatch({ type: LOADER, payload: false });
    }
};


export const changePassword = (data) => async (dispatch) => {
    try {
        dispatch({ type: LOADER, payload: true });
        var url = apiPath.changePassword;
        const result  = await helper.api(url, "post", data);
        console.log('login response ==>>>',result)
        if(result?.status == 200){
            dispatch({ type: LOADER, payload: false });
            toast.success(result?.message)
           return result
        } else{
            toast.error(result?.response?.data?.message)
            dispatch({ type: LOADER, payload: false });
            return false
        }

    } catch (error) {
        console.log('err in change password api==>>>', error)
        dispatch({ type: LOADER, payload: false });
    }
};


export const register = (data) => async (dispatch) => {
    try {
        dispatch({ type: LOADER, payload: true });
        console.log('register user==>>>>',data)
        var url = apiPath.register;
        const result  = await helper.api(url, "post", data);
        console.log('data==>>>',result)
        if(result?.status == 200){
            dispatch({ type: LOADER, payload: false });
            toast.success(data?.message)
           return result
        } else{
            toast.error(result?.response?.data?.message)
            dispatch({ type: LOADER, payload: false });
            return false
        }

    } catch (error) {
        console.log('err in register api==>>>', error)
        // dispatch({ type: actionTypes.GET_CART_FAIL, payload: error.response });
        // dispatch({ type: LOADER, payload: false });
    }
};

