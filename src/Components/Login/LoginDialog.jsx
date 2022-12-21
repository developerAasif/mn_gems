import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import { Dialog, DialogContent, TextField, Box, Button, Typography, styled, CircularProgress } from '@mui/material';
import OtpInput from 'react-otp-input';

import { authenticateLogin, authenticateSignup } from '../../service/api';
import { register, userLogin } from '../../redux/actions/authAction';

import { useUserAuth } from "../../firebase/userContextAuth";
import toast, { Toaster } from 'react-hot-toast';

import './PhoneNumber.css'

import Loader from '../Loader/Loader';
import Session from '../../utils/session';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCart } from '../../redux/actions/cartActions';



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
    font-size: 12px;
    color: #ff6161;
    line-height: 1;
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
    name: '',
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
    },
    otp: {
        view: 'otp',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState(false);
    const [account, toggleAccount] = useState(accountInitialValues.login);

    // const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const [loader, setLoader] = useState(false);

    const { setUpRecaptha, logOut } = useUserAuth();

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
        setLoader(true)
        var data = {
            "mobile": number,
            "password": signup?.password
        }
        const response = await dispatch(userLogin(data))
        if (!response) {
            showError(true);
            Session.clearAllSession();
            setLoader(false)
        }
        else {
            Session.setSession('auth', response?.result[0])
            dispatch(getCart(response?.result[0]?.id))
            setAccount(response?.result[0]?.name);
            showError(false);
            handleClose();
            navigate('/')
            setLoader(false)
        }

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

    const getOtp = async (e) => {
        setLoader(true)
        var isErrors = number ? (isValidPhoneNumber(number) ? false : 'Invalid phone number') : 'Phone number required'
        if (isErrors) {
            toast.error(isErrors)
            showError(isErrors)
            return
        }
        if (!signup?.name || !signup.password) {
            showError('required all fields')
            return
        }
        try {
            var data = {
                "name": signup?.name,
                "mobile": number,
                "password": signup?.password,
                "fcm_token": "fsdafsdfdf"
            }
            Session.setSession('signup', data)
            console.log('send otp for ==>>>', data)
            const response = await setUpRecaptha(number);
            setResult(response);
            toggleAccount(accountInitialValues.otp);
            console.log('response ==>>>>>>>', response);
        } catch (err) {
            toast.error(err?.message)
            showError(err.message);
        }
        setLoader(false)
    };

    const signupUser = async () => {
        setLoader(true)
        if (otp === "" || otp === null) {
            showError('required all fields')
        };
        try {
            var data = {}
            var res = await result.confirm(otp);
            if (res) {
                var data = Session.getSession('signup')
                var response = await dispatch(register(data))
                if (response) {
                    Session.setSession('auth', response?.result[0])
                    setAccount(signup.name);
                    handleClose()
                    navigate('/')
                } else {
                    logOut()
                    Session.clearAllSession()
                }
                // Session.clearAllSession()
            }
            // console.log('verifyyyy==>>>>', res);
            setLoader(false)
            //   navigate("/home");
        } catch (err) {
            setLoader(false)
            showError(err.message);
        }
        // dispatch(register(signup))
        // let response = await authenticateSignup(signup);
        // if (!response) return;
        // handleClose();
        // setAccount(signup.username);

    }
    const logoutUser = async () => {
        const res = await logOut()
        console.log('log out res==>>>>', res);
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

                                <PhoneInput
                                    defaultCountry="IN"
                                    value={number}
                                    onChange={setNumber}
                                    placeholder="Enter Phone Number"
                                />
                                <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                                <Error>{error}</Error>

                                {loader ? <LoginButton disabled={true}   > <CircularProgress /> </LoginButton> : <LoginButton onClick={() => loginUser()} >Login</LoginButton>}

                                <CreateAccount onClick={() => toggleSignup()}>New to MN-Gems? Create an account</CreateAccount>
                            </Wrapper>
                            : account.view === 'signup' ?
                                <Wrapper>

                                    <PhoneInput
                                        defaultCountry="IN"
                                        value={number}
                                        onChange={setNumber}
                                        placeholder="Enter Phone Number"
                                    />
                                    <div id="recaptcha-container"></div>
                                    <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='name' label='Enter name' />
                                    <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                                    <Error>{error}</Error>

                                    {loader ? <LoginButton disabled={true}   > <CircularProgress /> </LoginButton> : <LoginButton onClick={() => getOtp()} >Continue</LoginButton>}


                                    <CreateAccount onClick={() => toggleLogin()}>MN-Gems? Back To Login </CreateAccount>
                                </Wrapper>
                                :
                                <Wrapper >

                                    <Box style={{ background: '', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 10px' }}>
                                        <Typography style={{ fontSize: '22px', }}>Verify OTP for Continew </Typography>
                                    </Box>

                                    <Box style={{ background: '', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 10px' }}>
                                        <OtpInput
                                            value={otp}
                                            onChange={(value) => setOtp(value)}
                                            numInputs={6}
                                            separator={<span>-</span>}
                                            inputStyle="inputStyle"
                                            isInputNum={true}
                                        />

                                    </Box>

                                    {/* <TextField variant="standard" onChange={(e) => setOtp(e.target.value)} name='otp' label='Enter otp' /> */}
                                    {console.log('otp length==>>', otp.length)}
                                    <Error>{error}</Error>
                                    {loader ?
                                        <LoginButton disabled={true}   > <CircularProgress /> </LoginButton>
                                        : <LoginButton disabled={otp.length !== 6} onClick={() => signupUser()}  > Verify OTP </LoginButton>
                                    }
                                    <CreateAccount onClick={() => toggleLogin()}>MN-Gems? Back To Login </CreateAccount>
                                    {/* <CreateAccount onClick={() => getOtp()}>resend otp </CreateAccount> */}
                                </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;