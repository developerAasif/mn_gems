
import {LOADER} from '../constants/otherConstant.js';

export const loader = (state = { loader: false}, action) => {
    switch(action.type) {  
        case LOADER:
            return {
                loader:action.payload
            }
        default:
            return state;
    }
}