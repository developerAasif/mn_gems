import React, { useEffect } from 'react';

import { Box, styled } from '@mui/material';

import Cateegory from './Home/Cateegory';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';
import HomeProducts from './HomeProducts';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;

const Home = () => {
    const { banners, categories, popular_products, products } = useSelector(state => state?.getProducts?.products);
    console.log('productsss==>>>>', popular_products)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect calledddd');
        dispatch(listProducts())
    }, [dispatch])



    return (
        <>

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
        </>
    )
}

export default Home;