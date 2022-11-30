import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks

import { Dialog, DialogContent, TextField, Box, Button, Typography, styled } from '@mui/material';

import { authenticateLogin, authenticateSignup } from '../../service/api';
import { register } from '../../redux/actions/authAction';



const Component = styled(DialogContent)(({ theme }) => ({
    height: '50vh',
    width: '30vw',
    padding: ' 0',
    paddingTop: ' 0',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        width: '80vw',
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    background: '#FB641B',
    color: '#fff',
    height: '48px',
    borderRadius: '2px',
    '&:hover': {
        background: '#fb5200',
    },
    [theme.breakpoints.down('sm')]: {

    }
}));



const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
// height: 70vh;

const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 40%;
    height: 100%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name:'',
    password: '',
    mobile: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState(false);
    const [account, toggleAccount] = useState(accountInitialValues.login);

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        dispatch(register(login))
        
        // let response = await authenticateLogin(login);
        // if (!response)
        //     showError(true);
        // else {
        //     showError(false);
        //     handleClose();
        //     setAccount(login.username);
        // }
    }

    const signupUser = async () => {
        dispatch(register(signup))
        // let response = await authenticateSignup(signup);
        // if (!response) return;
        // handleClose();
        // setAccount(signup.username);
    }

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }
    const toggleLogin = () => {
        toggleAccount(accountInitialValues.login);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: '100%' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%', width: '100%', }}>
                    {/* <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
                    </Image> */}
                    {
                        account.view === 'login' ?
                            <Wrapper style={{}}>
                                <TextField variant="standard" onChange={(e) => onValueChange(e)} name='mobile' label='Enter Mobile number' />
                                {error && <Error>Please enter valid Mobile number</Error>}
                                <TextField variant="standard" onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                                <Text>By continuing, you agree to  Terms of Use and Privacy Policy.</Text>
                                <LoginButton onClick={() => loginUser()} >Login</LoginButton>
                                {/* <Text style={{ textAlign: 'center' }}>OR</Text>
                                <RequestOTP>Request OTP</RequestOTP> */}
                                <CreateAccount onClick={() => toggleSignup()}>New to MN-Gems? Create an account</CreateAccount>
                            </Wrapper> :
                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter name' />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='mobile' label='Enter mobile number' />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                                <LoginButton onClick={() => signupUser()} >Continue</LoginButton>
                                <CreateAccount onClick={() => toggleLogin()}>MN-Gems? Back To Login </CreateAccount>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;