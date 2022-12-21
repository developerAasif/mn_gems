import * as actionTypes from '../constants/productConstant';
import axios from 'axios';
import apiPath from '../../utils/apiPath';
import helper from '../../utils/helper';
import { LOADER } from '../constants/otherConstant';

export const getProducts = () => async (dispatch) => {
    try {
        const data  = await helper.api(apiPath.getHomeData, "GET", {});
        if(data?.status == 200){
            dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data?.result });
            dispatch({ type: LOADER, payload: false });
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
        dispatch({ type: LOADER, payload: false });
    }
};
export const viewAllProducts = (payload,url) => async (dispatch) => {
    try {
        const data  = await helper.api(url, "post", payload);
        if(data?.status == 200){
            dispatch({ type: actionTypes.GET_VIEW_ALL_SUCCESS, payload: data });
            dispatch({ type: LOADER, payload: false });
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_VIEW_ALL_FAIL, payload: error.response });
        dispatch({ type: LOADER, payload: false });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        const url = apiPath.getProductDetail+id
        const data  = await helper.api(url, "GET", {});
        if(data?.status == 200){
            const [result] = data.result
            dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: result });
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response});
        dispatch({ type: LOADER, payload: false });
    }
};


export const removeProductDetails = () => (dispatch) => {
    
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

};


export const searchProducts = (payload) => async (dispatch) => {
    try {
        const data  = await helper.api(apiPath.searcgProducts, "post", payload);
        console.log('result of search===>>>>>>',data)
        if(data?.status == 200){
            dispatch({ type: actionTypes.SEARCH_PRODUCTS_SUCCESS, payload: data?.result });
            dispatch({ type: LOADER, payload: false });
        }

    } catch (error) {
        dispatch({ type: LOADER, payload: false });
    }
};