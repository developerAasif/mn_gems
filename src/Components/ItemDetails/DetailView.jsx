import { useState, useEffect } from 'react';

import { styled, Box, Typography, Grid } from '@mui/material';

import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../redux/actions/productActions';

const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))
const RightContainer = styled(Grid)(({ theme }) => ({
    marginTop: '50px',
    '& > p': {
        marginTop: '10px',
    },
    [theme.breakpoints.down('sm')]: {
       textAlign:'center'
    }
}))



const DetailView = () => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    
    const { id } = useParams();

    const { loading, product } = useSelector(state => state.getProductDetails);

    const dispatch = useDispatch();
    
    useEffect(() => {
            dispatch(getProductDetails(id));
            console.log('product id==>>>',id)
    }, [dispatch, id]);


    return (
        <Component>
        
            { product && Object.keys(product).length &&
                <Container container> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <Typography>{product.name}</Typography>
                       
                        <Typography>
                            <span style={{ fontSize: 28, color:'green' }}>₹{product.price}</span>&nbsp;&nbsp;&nbsp; 
                            <span style={{ color: '#878787' }}><strike>₹{Number(product.price) + 100}</strike></span>&nbsp;&nbsp;&nbsp;
                            {/* <span style={{ color: '#388E3C' }}>{product.price.discount} off</span> */}
                        </Typography>
                        
                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            }   
        </Component>
    )
}

export default DetailView;