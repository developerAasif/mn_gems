import React, { useState, useContext } from 'react';

import { Box, Typography, Badge, Button, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

import Profile from './Profile';
import LoginDialog from '../Login/LoginDialog';

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    '& > *': {
        '&:hover': {
            color: 'red',
        },
    },

    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    width:'100%',
    '& > *': {
        marginRight: '40px !important',
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: 12,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            color: '#2874f0',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10
        }
    },
    [theme.breakpoints.down('sm')]: {
        // display: 'block'
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#2874f0',
    background: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    '&:hover': {
        color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
        background: '#2874f0',
        color: '#FFFFFF',
    }
}));

const MyordersBox = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    color: '#fff',
    // height: '48px',
    marginTop:5,
    cursor:'pointer',
    '&:hover': {
        color: '#fb5200',
    },
    [theme.breakpoints.down('sm')]: {

    }
}));



const CustomButtons = () => {

    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate()

    const { count } = useSelector(state => state.cart?.cartItems);



    const openDialog = () => {
        setOpen(true);
    }
    const myOrders = () => {
        navigate('/orders')
    }

    return (
        <Wrapper >
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <LoginButton variant="contained" onClick={() => openDialog()}>Login</LoginButton>

            }
            {
                account && (
                    <>
                        <MyordersBox onClick={myOrders}>My Orders</MyordersBox>
                    </>
                )
            }


            <Container to='/cart'>
                <Badge badgeContent={count} color="secondary">
                    <ShoppingCart />
                </Badge>
                {/* <Typography style={{ marginLeft: 10 }}>Cart</Typography> */}
            </Container>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Wrapper>
    )
}

export default CustomButtons;