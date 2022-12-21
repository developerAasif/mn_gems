import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Typography, Menu, MenuItem, Box, styled, Dialog, DialogContent, CircularProgress, Button, TextField } from '@mui/material';
import { PowerSettingsNew, LockClockOutlined } from '@mui/icons-material';
import Session from '../../utils/session';
import { useUserAuth } from "../../firebase/userContextAuth";
import { useDispatch } from 'react-redux';
import { LOADER } from '../../redux/constants/otherConstant';
import { changePassword } from '../../redux/actions/authAction';
import { getCart } from '../../redux/actions/cartActions';

const Component = styled(Menu)`
    margin-top: 5px;
    cursor:pointer;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;



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
const ProfileBox = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    // background: '#FB641B',
    boxShadow: '1px 1px 5px white',
    padding: '5px 10px',
    color: '#fff',
    // height: '48px',
    borderRadius: '10px',
    '&:hover': {
        color: '#fb5200',
    },
    [theme.breakpoints.down('sm')]: {
        // boxShadow: 'none',
    }
}));
const AccountText = styled(Typography)(({ theme }) => ({
    marginTop: 2,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
        padding: 10,
        fontSize: '10px',
    }
}));

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 40%;
    height: 200px;
    border:1px solid red;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    width:100%;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size: 15px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Profile = ({ account, setAccount }) => {
    const { setUpRecaptha, logOut } = useUserAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openForgot, setOpenForgot] = useState(false);
    const [loader, setLoader] = useState(false);
    const [signup, setSignup] = useState({ password: '', newPassword: '' });
    const [error, showError] = useState(false);
    var user = Session.getSession('auth')

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const forgotPassword = () => {
        var data = {
            "mobile": user?.mobile,
            "password": signup?.password
        }
        const response = dispatch(changePassword(data));
        if (response) {
            setOpenForgot(false)
            setOpen(false)
        } else {

        }
    }

    const logout = () => {
        dispatch({ type: LOADER, payload: true });
        setAccount('');
        Session.clearSession('auth')
        Session.clearSession('cartItems')
        dispatch(getCart())
        logOut()
        navigate('/')
        setTimeout(() => {
            dispatch({ type: LOADER, payload: false });
        }, 200);
    }

    // console.log('open==>>>',open);
    // console.log('change pass==>>>',openForgot);

    return (
        <>
            <ProfileBox onClick={handleClick}><AccountText >{account}</AccountText></ProfileBox>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { setOpenForgot(!openForgot) }}>
                    <LockClockOutlined fontSize='small' color='primary' />
                    <Logout>Change Password</Logout>
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); logout(); }}>
                    <PowerSettingsNew fontSize='small' color='primary' />
                    <Logout>Logout</Logout>
                </MenuItem>


                <Dialog open={openForgot} onClose={() => setOpenForgot(!openForgot)} PaperProps={{ sx: { maxWidth: '100%' } }}>
                    <Box style={{ display: 'flex', height: '100%', width: '100%', }}>
                        {/* <Image>
                            <Typography variant="h5">Change Pawword</Typography>
                            <Typography style={{ marginTop: 20 }}>you can protect your password</Typography>
                        </Image> */}
                        <Wrapper style={{}}>
                            <Typography variant="h5">Change Pawword</Typography>
                            <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='confirm_password' label='Enter Confirm Password' />

                            <Error>{error}</Error>

                            {loader ? <LoginButton disabled={true}   > <CircularProgress /> </LoginButton> : <LoginButton onClick={() => forgotPassword()} >Continue</LoginButton>}
                        </Wrapper>
                    </Box>
                </Dialog>


            </Component>
        </>
    )
}


export default Profile;