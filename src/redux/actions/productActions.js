import * as actionTypes from '../constants/productConstant';
import axios from 'axios';
import apiPath from '../../utils/apiPath';
import helper from '../../utils/helper';

export const getProducts = () => async (dispatch) => {
    try {
        const data  = await helper.api(apiPath.getHomeData, "GET", {});
        if(data?.status == 200){
            dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data?.result });
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
    }
};
export const viewAllProducts = (payload,url) => async (dispatch) => {
    try {
        const data  = await helper.api(url, "post", payload);
        if(data?.status == 200){
            dispatch({ type: actionTypes.GET_VIEW_ALL_SUCCESS, payload: data });
        }

    } catch (error) {
        dispatch({ type: actionTypes.GET_VIEW_ALL_FAIL, payload: error.response });
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

    }
};


export const removeProductDetails = () => (dispatch) => {
    
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });

};
