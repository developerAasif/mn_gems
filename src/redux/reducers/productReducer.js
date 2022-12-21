import * as actionTypes from '../constants/productConstant';


export const getProductReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return { products: action.payload }
        case actionTypes.GET_PRODUCTS_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};


export const getViewAllReducer = (state = {viewAll: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_VIEW_ALL_SUCCESS:
            return { viewAll: action.payload?.result, totalPage: action.payload?.total_pages }
        case actionTypes.GET_VIEW_ALL_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};

export const searchReducer = (state = {search: []}, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_PRODUCTS_SUCCESS:
            return {search:action.payload}
        default:
            return state
    }
};

export const getProductDetailsReducer = (state = { product: {}}, action) => {
    
    switch(action.type){
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_PRODUCT_DETAILS_RESET: 
            return {
                product: {}
            }
        default:
            return state
    }
}