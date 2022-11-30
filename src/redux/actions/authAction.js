import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import helper from '../../utils/helper';
import apiPath from '../../utils/apiPath';
import { LOADER } from '../constants/otherConstant';
import { firebase, auth, RecaptchaVerifier  } from '../../firebase';





export const register = (data) => async (dispatch) => {
    try {

        let verify = new RecaptchaVerifier('recaptcha-container', {}, auth);

        const phoneNumber = 7737704984;

        auth.signInWithPhoneNumber(phoneNumber, verify).then((result) => {
            // setfinal(result);
            console.log('result==>>>>', result)
            alert("code sent")
        })
            .catch((err) => {
                // alert(err);
                console.log('errrrrrr', err)
                // window.location.reload()
            });




        // const message = firebase.messaging()
        // console.log('register user==>>>>',message)
        // data.fcm_token = '';
        // var url = apiPath.register;
        // const result  = await helper.api(url, "post", data);
        // console.log('data==>>>',result)
        // if(data?.status == 200){
        //     dispatch({ type: LOADER, payload: false });
        //     toast.success(data?.message)
        //    return true
        // }else{
        //     dispatch({ type: LOADER, payload: false });
        //     return false
        // }

    } catch (error) {
        console.log('err in api==>>>', error)
        // dispatch({ type: actionTypes.GET_CART_FAIL, payload: error.response });
        // dispatch({ type: LOADER, payload: false });
    }
};

