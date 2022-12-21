import { useState } from 'react';

import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, styled } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { Link } from 'react-router-dom';

//components
import CustomButtons from './CustomButtons';
import Search from './Search';
import { GiCutDiamond } from "react-icons/gi";
import { motion } from "framer-motion";
import MobileSizeLogin from './MobileSizeLogin';
import SideMenu from './SideMenu';

const StyledHeader = styled(AppBar)`
    background: #1a0000;
    height: 55px;
`;

const Component = styled(Link)`
    margin-left: 0%;
    line-height: 0;
    color: #FFFFFF;
    text-decoration: none;
`;

const SubHeading = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontStyle: 'italic',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        width:'100%',
        // display: 'block'
    }
}));


// const SubHeading = styled(Typography)`
//     font-size: 16px;
//     font-style: italic;
// `

const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
})

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));
const CustomButtonWrapperMobileSize = styled('span')(({ theme }) => ({
    // margin: '0 5% 0 auto',
    display:'none',
    [theme.breakpoints.down('sm')]: {
        // display: 'none'
        display:'flex',
        marginLeft:'auto'
    }
}));

const Header = () => {
    const logoURL = ' ';
    const subURL = '';

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

   


    return (
        <StyledHeader position="fixed" >
            <Toolbar style={{ minHeight: 60, background:'black' }}>
                <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>

                <Drawer open={open} onClose={handleClose} >
                 <SideMenu handleClose={handleClose} />
                </Drawer>

                <Component to='/'>
                    {/* <img src={logoUL} style={{ width: 75 }} /> */}
                    <motion.div initial={{ x: "-100%" }} whileInView={{ x: 0 }} style={{  }}>
                        <Box component="span" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <GiCutDiamond style={{ fontSize: '3rem', color: 'blue', margin: '1px 13px', }} />
                            <SubHeading>
                                <Box component="span" style={{ color: '#FFE500' }}>
                                    MG-GEMS
                                </Box>
                            </SubHeading>
                        </Box>
                    </motion.div>
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>

                <CustomButtonWrapperMobileSize>
                <MobileSizeLogin />
                </CustomButtonWrapperMobileSize>

                
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;