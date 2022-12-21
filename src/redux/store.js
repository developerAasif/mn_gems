import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from './reducers/cartReducer';
import { getProductDetailsReducer, getProductReducer, getViewAllReducer, searchReducer } from './reducers/productReducer';
import { loader } from './reducers/otherReducer';

const reducer = combineReducers({
    loader: loader,
    cart: cartReducer,
    view: getViewAllReducer,
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducer,
    search: searchReducer,
})


const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;