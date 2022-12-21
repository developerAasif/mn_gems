

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";


import { Button, styled, Box } from '@mui/material';

import Loader from "../Loader/Loader";
import Session from "../../utils/session";



const IFRAME = styled(Box)(({ theme }) => ({
    backgroundColor: '#2874f0',
    width: '100%',
    height:'100vh',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
    }
}));


const OrderTrack = () => {
    const user = Session.getSession('auth');
    const params = useParams();
    const navigate = useNavigate();

    const { loader } = useSelector(state => state?.loader);

    const location = useLocation();

    var data = location?.state;




    console.log('order detail datadatadata s==>>>>>', data)



    return (


        <>
            {loader === false ? (
                <IFRAME className="orderDetails">
                    {
                        data && <iframe src={data} height='100%' width='100%'  />
                    }
                </IFRAME>
            ) : (
                <Loader />
            )}
        </>

    );
};

export default OrderTrack;
