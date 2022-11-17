import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";


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



const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

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

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
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
                banners && banners?.length > 0 && banners.map(item => (
                    <CardBox>
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
            <StyledButton onClick={() => addItemToCart()} style={{ marginRight: 10, background: '#ff9f00' }} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => buyNow()} style={{ background: '#fb641b' }} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;