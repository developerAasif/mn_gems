
import { Link, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Button, Divider, Box, Typography, styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import Countdown from 'react-countdown';
import "react-multi-carousel/lib/styles.css";
import { AiOutlineEye } from "react-icons/ai";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import AddRating from './AddRatingDilog';
import { useState } from 'react';



const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`


const ViewAllButton = styled(Button)(({ theme }) => ({
    marginLeft: 'auto',
    marginTop: '20px',
    backgroundColor: '#2874f0',
    borderRadius: '2px',
    fontSize: '13px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
    }
}));



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
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('lg')]: {
        width: '100%',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '5px 5px',
        margin: '10px 10px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '15px 5px',
        margin: '10px 5px',

    }
}));

const TextBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10


}));

const TextLeft = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    borderBottom: '1px solid #f0f0f0',
    width: '40%',
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
        // marginRight: 0,

    }
}));
const TextRight = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    // borderBottom: '1px solid #f0f0f0',
    width: '50%',
    [theme.breakpoints.down('sm')]: {

    }

}));

const Rating = styled(Box)(({ theme }) => ({
    width: '100%',
}));

const MobileMyOrders = ({ products }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const viewAll = (item) => {
        navigate('/order/details', { state: item })
    }


    const addRating = (item) => {
       
    }

    return (
        <Component>

            <HomeContainer>

                {
                    products.map((item, i) => (
                        <>
                            {
                                item?.payment_status !== 'unpaid' &&
                                <Product textAlign="center" key={i} >
                                    <Text style={{ fontWeight: 600, color: '#212121', fontSize: 18 }}>order Id : #{item?.order_id}</Text>

                                    <TextBox>
                                        <TextLeft> <Text style={{ color: 'gray', fontSize: '12px' }}> Order Date:</Text> </TextLeft>
                                        <TextRight> <Text style={{ color: '', fontSize: '12px' }}> {moment(item?.created_at).format("LL") || ""}</Text> </TextRight>
                                    </TextBox>
                                    <TextBox>
                                        <TextLeft> <Text style={{ color: 'gray', fontSize: '12px' }}> Price:</Text> </TextLeft>
                                        <TextRight> <Text style={{ color: 'green', fontSize: '18px' }}> ${item?.total}</Text> </TextRight>
                                    </TextBox>
                                    <TextBox>
                                        <TextLeft> <Text style={{ color: 'gray', fontSize: '12px' }}>Order Status:</Text> </TextLeft>
                                        <TextRight> <Text style={{ color: '' }}> {item?.order_status}</Text> </TextRight>
                                    </TextBox>
                                    <TextBox>
                                        <TextLeft> <Text style={{ color: 'gray', fontSize: '12px' }}>Payment Status:</Text> </TextLeft>
                                        <TextRight> <Text style={{ color: '' }}> {item?.payment_status}</Text> </TextRight>
                                    </TextBox>

                                    <Divider />
                                    {
                                        item?.order_status === 'dispatch' && <ViewAllButton variant="outlined" color="primary" onClick={() => setOpen(item)} style={{ marginRight: 20, background: 'none' }}>  Add Ratiing</ViewAllButton>
                                    }
                                    <ViewAllButton variant="contained" color="primary" onClick={() => viewAll(item)}> <AiOutlineEye /> &nbsp; View All Details</ViewAllButton>

                                </Product>
                            }

                        </>
                    ))
                }
            </HomeContainer>

            <AddRating  open={open} setOpen={setOpen}  />

        </Component>
    )
}



export default MobileMyOrders;

