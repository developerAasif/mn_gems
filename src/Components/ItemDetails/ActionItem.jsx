import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

import { addToCart, getCart } from '../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import helper from '../../utils/helper';
import apiPath from '../../utils/apiPath';
import Session from '../../utils/session';


const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '10px 10px 0 10px',
    }
}))

// const Image = styled('img')({
//     padding: '15px 20px',
//     border: '1px solid #f0f0f0',
//     width: '95%'
// });


const StyledButtonContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   display:'flex',
   alignItems:'center',
   justifyContent:'center',
    [theme.breakpoints.down('sm')]: {
      
    }
}));


const StyledButton = styled(Button)(({ theme }) => ({
    width: '60%',
    borderRadius: '2px',
    height: '50px',
    color: '#FFF',
    [theme.breakpoints.down('sm')]: {
      
    }
}));

const CardBox = styled(Box)(({ theme }) => ({
    padding: '25px 15px',
    margin: '0 10px',
    textAlign: 'center',
    height:'50vh',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        padding: '10px 0px',
        margin: '0px 0px',
        height:'25vh',
        width:'100%',
    }
}));

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: '44vh',
    objectFit: 'cover',
    borderRadius:'10px',
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: '20vh',
        width:'100%',
    }
}));

const ActionItem = ({ product }) => {
    const user = Session.getSession('auth');
    var user_id = user?.id
    const navigate = useNavigate();

    const { id } = product;

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com' });
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response
        }
        post(information);
    }

    const addItemToCart = async(product) => {
        console.log('add to cart calleddd')
        if(!user){
            toast.error('Please Login to Order Product!') 
            return
        }
            try {
                var payload = {
                    "user_id":user_id,
                    "product_id":product?.id,
                    "current_price":product?.price
                }
                var url = apiPath.addToCart;
                const data  = await helper.api(url, "POST",payload);
                console.log('cart api data=>>>>>',data)
                if(data?.status == 200){
                    console.log('message==>>>',data?.message);
                    toast.success(data?.message)
                      dispatch(getCart(user_id));
                }else{
                    console.log('message==>>>',data?.response?.data?.message);
                    toast.error(data?.response?.data?.message) 
                }
        
            } catch (error) {
                console.log('err in add to cart api==>>>>>>>',error.message);
            }
      
    }

    const DetailImage = ({ banners }) => {
        return (
            <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // customTransition="all .5"
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            showDots={true}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                banners && banners?.length > 0 && banners.map((item,i) => (
                    <CardBox key={i}>
                    <Image src={item?.image} alt="banner" id={item?.id} key={item?.id} />
                    </CardBox>
                ))
            }
        </Carousel>
        )
    }

    return (
        <LeftContainer>
            {/* <Image src={product?.images[0]?.image} /> */}
            <DetailImage banners={product?.images} />
            <br />

            <StyledButtonContainer>
            <StyledButton onClick={() => addItemToCart(product)} style={{ marginRight: 10, background: '#ff9f00' }} variant="contained" disabled={product?.stock == 0 && true} ><Cart />Add to Cart</StyledButton>
            </StyledButtonContainer>
            {/* <StyledButton onClick={() => buyNow()} style={{ background: '#fb641b' }} variant="contained"><Flash /> Buy Now</StyledButton> */}
        </LeftContainer>
    )
}

export default ActionItem;