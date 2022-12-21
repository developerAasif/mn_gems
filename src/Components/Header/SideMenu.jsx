import React, { useContext } from 'react'
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, styled, Button } from '@mui/material';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { GiCutDiamond } from "react-icons/gi";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { RiFileList3Line, RiFileList2Line } from "react-icons/ri";
import { MdOutlinePolicy } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { LOADER } from '../../redux/constants/otherConstant';
import Session from '../../utils/session';
import { getCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useUserAuth } from "../../firebase/userContextAuth";
import { LoginContext } from '../../context/ContextProvider';
import { toast } from 'react-hot-toast';






const ListItems = styled(Link)(({ theme }) => ({
    // margin: '0 5% 0 auto',
    border: '1px solid red',
    width: '100%'

}));




const Component = styled(Box)(({ theme }) => ({
    fontSize: '20px',
    fontStyle: 'italic',
    background: 'black',
    // boxShadow:'2px 2px 5px gray',
    height: 60
}));
const SubHeading = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontStyle: 'italic',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        width: '100%',
        // display: 'block'
    }
}));

const ContainerList = styled(Button)(({ theme }) => ({
    background: '#FFFF',
    color: '#2874f0',
    border: '1px solid #f0f0f0',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    // padding: '0px 40px',
    height: 50,
    // boxShadow: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        color: 'white',
    },
    // [theme.breakpoints.down('sm')]: {

    //     padding: '15px 40px',
    // }
}));

const LeftBox = styled(Typography)(({ theme }) => ({
    fontSize: '25px',
    fontStyle: 'italic',
    width: '30%',
    // border:'1px solid red',
    '& > *': {
        fontSize: '25px',
        fontWeight: 600,
        // color:'black'
    }
}));
const RightBox = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontStyle: 'italic',
    width: '100%',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    // border:'1px solid black',
    '& > *': {
        fontSize: '16px',
        fontWeight: 600,
        // color:'black'
    },

}));



const SideMenu = ({ handleClose }) => {

    const { account, setAccount } = useContext(LoginContext);
    const { setUpRecaptha, logOut } = useUserAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();


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

    const sideclick = (to) => {
        if (to == '/logout') {
            logout()
        } else {
            navigate(to)
        }
    }
    return (
        <Box style={{ width: 200, }} onClick={handleClose}>
            <Component to='/' >
                {/* <img src={logoUL} style={{ width: 75 }} /> */}
                <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }} style={{}}>
                    <Box component="span" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <GiCutDiamond style={{ fontSize: '3rem', color: 'blue', margin: '1px 13px', }} />
                        <SubHeading>
                            <Box component="span" style={{ color: '#FFE500', fontWeight: 600, fontSize: '18px' }}>
                                MG-GEMS
                            </Box>
                        </SubHeading>
                    </Box>
                </motion.div>
            </Component>
            <List>

                <motion.div initial={{ y: "-100%", opacity: 0, }} whileInView={{ y: 0, opacity: 1, }} transition={{ delay: 0.4, }} >
                    <ContainerList variant="contained" onClick={() => sideclick('/')} >
                        <LeftBox> <AiOutlineHome /> </LeftBox>
                        <RightBox> <Box >Home</Box> </RightBox>
                    </ContainerList>
                </motion.div>

                {
                    account && <motion.div initial={{ y: "-100%", opacity: 0, }} whileInView={{ y: 0, opacity: 1, }} transition={{ delay: 0.4, }}  >
                        <ContainerList variant="contained" onClick={() => sideclick('/orders')} >
                            <LeftBox> <RiFileList3Line /> </LeftBox>
                            <RightBox> <Box >My Orders</Box> </RightBox>
                        </ContainerList>
                    </motion.div>
                }


                <motion.div initial={{ y: "-100%", opacity: 0, }} whileInView={{ y: 0, opacity: 1, }} transition={{ delay: 0.5, }} >
                    <ContainerList variant="contained" onClick={() => sideclick('/')} >
                        <LeftBox> <RiFileList2Line /> </LeftBox>
                        <RightBox> <Box >Terms & Con</Box> </RightBox>
                    </ContainerList>
                </motion.div>

                <motion.div initial={{ y: "-100%", opacity: 0, }} whileInView={{ y: 0, opacity: 1, }} transition={{ delay: 0.6, }}  >
                    <ContainerList variant="contained" onClick={() => sideclick('/')} >
                        <LeftBox> <MdOutlinePolicy /> </LeftBox>
                        <RightBox> <Box >Privacy Policy</Box> </RightBox>
                    </ContainerList>
                </motion.div>

                <motion.div initial={{ y: "-100%", opacity: 0, }} whileInView={{ y: 0, opacity: 1, }} transition={{ delay: 0.7, }} >
                    <ContainerList variant="contained" onClick={() => sideclick('/')} >
                        <LeftBox> <FiUsers /> </LeftBox>
                        <RightBox> <Box >About Us</Box> </RightBox>
                    </ContainerList>
                </motion.div>

                {
                    account && <motion.div initial={{ y: "-100%", opacity: 0, }} whileInView={{ y: 0, opacity: 1, }} transition={{ delay: 0.8, }}  >
                        <ContainerList variant="contained" onClick={() => sideclick('/logout')} >
                            <LeftBox> <AiOutlineLogout /> </LeftBox>
                            <RightBox> <Box >Log Out</Box> </RightBox>
                        </ContainerList>
                    </motion.div>
                }



            </List>
        </Box>
    )
}

export default SideMenu