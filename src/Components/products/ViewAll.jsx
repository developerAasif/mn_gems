
import { Link, useNavigate, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Button, Divider, Box, Typography, styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import Countdown from 'react-countdown';
import "react-multi-carousel/lib/styles.css";
import { viewAllProducts } from '../../redux/actions/productActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import apiPath from '../../utils/apiPath';
import Loader from '../Loader/Loader';
import { LOADER } from '../../redux/constants/otherConstant';




const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`


const DealText = styled(Typography)(({ theme }) => ({
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '32px',
    marginRight: '25px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
        fontWeight: 600,
    }
}));


const ViewAllButton = styled(Button)(({ theme }) => ({
    marginRight: 'auto',
    backgroundColor: '#2874f0',
    borderRadius: '2px',
    fontSize: '13px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
    }
}));

const Image = styled('img')(({ theme }) => ({
    width: 150,
    height: 150,
    borderRadius: '10%',
    border: '2px solid white',
    // boxShadow: '15px 15px 20px  black',
    [theme.breakpoints.down('md')]: {
        width: 100,
        height: 100,
    }

}))

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`

const HomeContainer = styled(Box)(({ theme }) => ({
    // padding: '25px 15px',
    // margin: '0 10px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
        // display: 'none'
    }
}));

const Product = styled(Box)(({ theme }) => ({
    padding: '25px 15px',
    margin: '10px 10px',
    // border: '1px solid gray',
    borderRadius: '10px',
    boxShadow: '2px 2px 10px gray',
    width: '15%',
    [theme.breakpoints.down('lg')]: {
        width: '20%',
    },
    [theme.breakpoints.down('md')]: {
        width: '27%',
        padding: '5px 5px',
        margin: '10px 10px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '45%',
        padding: '5px 5px',
        margin: '10px 5px',
    }
}));

const TextBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',


}));

const TextLeft = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    borderBottom: '1px solid #f0f0f0',
    width: '40%',
    marginRight: 5,
}));
const TextRight = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    // borderBottom: '1px solid #f0f0f0',
    width: '50%',

}));

const Rating = styled(Box)(({ theme }) => ({
    width: '100%',
}));


const PaginationContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTop: '2px solid #f1f1f1',
    [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
        fontWeight: 600,
    }
}));

const ViewAll = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { viewAll, totalPage } = useSelector(state => state?.view);
    const { loader } = useSelector(state => state?.loader);

    const handleChange = (e, value) => {
        setPage(value);
    };


    useEffect(() => {
        // location.state.id
        dispatch({ type: LOADER, payload: true });
        var data = { 'page-limit': 18, 'current-page': page }
        var url = location?.state?.path == 'Products' ? apiPath.getViewAllProducts : location?.state?.path == 'category' ? `${apiPath.getViewAllProducts}/${location?.state?.id}` : apiPath.getViewAllPopularProducts;
        dispatch(viewAllProducts(data, url))
    }, [dispatch, page])


    return (
        <>

            {
                loader ? (<Loader />) : (
                    <Component>
                    <Deal>
                        <ViewAllButton variant="contained" color="primary" onClick={() => navigate('/')}><BiArrowBack /></ViewAllButton>
                        <DealText>{['Products', 'category'].includes(location?.state?.path) ? 'All Products' : 'All Popular Products'}</DealText>
                    </Deal>
                    <Divider />
                    <HomeContainer>
                        {
                            viewAll && viewAll.length > 0 && viewAll.map((item, i) => (
                                <Product textAlign="center" key={i} >
                                    {/* {item?.avg_rating == '0.0' && (item.avg_rating = 1)} */}
                                    <Link to={`../product/${item?.id}`} style={{ textDecoration: 'none', }} >
                                        <Image src={item?.images[0]?.image} />
                                        <Text style={{ fontWeight: 600, color: '#212121' }}>{item?.name}</Text>
                                        <TextBox>
                                            <TextLeft> <Text style={{ color: 'gray', fontSize: '12px' }}> Price:</Text> </TextLeft>
                                            <TextRight> <Text style={{ color: 'green' }}> ${item?.price}</Text> </TextRight>
                                        </TextBox>
                                        <TextBox>
                                            <TextLeft> <Text style={{ color: 'gray', fontSize: '12px' }}> Qty:</Text> </TextLeft>
                                            <TextRight> <Text style={{ color: 'blue', }}> {item?.stock}</Text> </TextRight>
                                        </TextBox>
                                        <TextBox>
                                            <TextLeft> <Text style={{ color: 'gray', fontSize: '12px' }}> Rating:</Text> </TextLeft>
                                            <TextRight> <Text style={{ color: '#212121', opacity: '.6' }}> {item?.avg_rating}</Text> </TextRight>
                                        </TextBox>
                                        <Rating >
                                            <StarRatings
                                                starDimension="20px"
                                                starSpacing="5px"
                                                rating={Number(item?.avg_rating) || 0}
                                                starRatedColor="blue"
                                                // changeRating={this.changeRating}
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </Rating>

                                    </Link>
                                </Product>
                            ))
                        }
                    </HomeContainer>
                    <PaginationContainer>
                        <Stack spacing={2} >
                            <Pagination count={totalPage} color="primary" page={page} onChange={handleChange} />
                        </Stack>
                    </PaginationContainer>

                </Component>
                )
            }
           

        </>
    )
}

export default ViewAll
