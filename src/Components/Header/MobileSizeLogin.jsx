import React, { useState, useContext } from 'react';

import { Box, Typography, Badge, Button, styled } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

import Profile from './Profile';
import LoginDialog from '../Login/LoginDialog';

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        // display: 'block'
        marginLeft: '20px !important',
    }
}));

const Wrapper = styled(Box)(({ theme }) => ({
    // margin: '0 3% 0 auto',
    display: 'flex',
    justifyContent:'flex-end',
    alignItems:'center',
    // width:'100%',
    '& > *': {
       
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: 12,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            color: '#white',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            alignItems:'center',
            margin: 0,
            padding:0,
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
    // padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        background: 'red',
        color: '#FFFFFF'
    }
}));


const MobileSizeLogin = () => {

    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const {count} = useSelector(state => state.cart?.cartItems);

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <LoginButton variant="contained" onClick={() => openDialog()}>Login</LoginButton>

            }

            <Container to='/cart'>
                <Badge badgeContent={count} color="success" >
                    <ShoppingCart style={{fontSize:'30px', color:'white'}}/>
                </Badge>
                {/* <Typography style={{ marginLeft: 10 }}></Typography> */}
            </Container>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Wrapper>
    )
}

export default MobileSizeLogin;