import { useState, useEffect } from 'react';

import { Box, Typography, styled } from '@mui/material';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Box)`
    float: right;
`;

const TotalAmount = styled(Box)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Box)`
    font-size: 16px; 
    color: green;
`

// component: {
//     // width: '30%'
// },


const TotalView = ({ cartItems, total }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [delivery, setDelivery] = useState(0)
    console.log('total view==>>>>>',cartItems)

    useEffect(() => {
        totalAmount();
    }, [cartItems]);
    
    const totalAmount = () => {
        let price = 0, discount = 0, delevery_charge = 0;
        cartItems.map(item => {
            // price += Number(item?.product_detail?.price)
            delevery_charge += Number(item?.product_detail?.delivery_charge)
            // discount += (Number(item?.product_detail?.price) - Number(item?.product_detail?.price)+100) 
        })
 
        // setPrice(price);
        // setDiscount(discount);
        setDelivery(delevery_charge);
    }

    return (
        <Box>  {/* className={classes.component}> */}
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography >Price ({cartItems?.length} item)
                    <Price style={{color:'green'}} component="span">${total}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-${discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">${delivery}</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price style={{color:'green'}}>${Number(total) - Number(discount) + Number(delivery)}</Price>
                </TotalAmount>
                <Discount>You will save ${Number(discount) - Number(delivery)} on this order</Discount>
            </Container>
        </Box>
    )
}

export default TotalView;