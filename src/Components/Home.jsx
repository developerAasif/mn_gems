import React, { useEffect, useState } from 'react';

import { Box, styled } from '@mui/material';

import Cateegory from './Home/Cateegory';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';
import HomeProducts from './HomeProducts';
import Session from '../utils/session';
import Loader from './Loader/Loader';
import { LOADER } from '../redux/constants/otherConstant';
import { getCart } from '../redux/actions/cartActions';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;

const Home = () => {
    const { loader } = useSelector(state => state?.loader);
    const { banners, categories, popular_products, products } = useSelector(state => state?.getProducts?.products);
  

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: LOADER, payload: true });
        dispatch(listProducts())
    }, [dispatch])


    return (
        <>

        {
           loader ? (<Loader />) : (

            <Component>
                {
                    banners && banners?.length > 0 && <Banner banners={banners} />
                }
                {
                    categories && categories?.length > 0 && <Cateegory categories={categories} />
                }
                {
                    popular_products && popular_products?.length > 0 && <MidSlide products={popular_products} />
                }
                {
                    products && products?.length > 0 && <HomeProducts products={products} title={'Products'} />
                }
            </Component>
            
           )
        }
        </>
    )
}

export default Home;