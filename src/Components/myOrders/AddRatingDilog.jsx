import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { Dialog, DialogContent, TextField, Box, Button, Typography, styled, CircularProgress } from '@mui/material';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { LOADER } from '../../redux/constants/otherConstant';
import apiPath from '../../utils/apiPath';
import helper from '../../utils/helper';
import { toast } from 'react-hot-toast';



const Component = styled(DialogContent)(({ theme }) => ({
    height: '50vh',
    width: '30vw',
    padding: ' 0',
    paddingTop: ' 0',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        width: '80vw',
    }
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
    marginLeft: 'auto',
    marginTop: '20px',
    backgroundColor: '#2874f0',
    borderRadius: '2px',
    fontSize: '13px',
    width:'100%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
    }
}));


const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 1;
    margin-top: 10px;
    font-weight: 600;
`
// height: 70vh;

const Rating = styled(Box)(({ theme }) => ({
    width: '100%',
}));



const secondExample = {
    size: 40,
    count: 5,
    color: "black",
    activeColor: "red",
    value: 2,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    // filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
        console.log(`Example 2: new value is ${newValue}`);
    }
};

const AddRating = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, showError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);




    const handleClose = () => {
        setOpen(false);
    }
    const changeRating = (val) => {
        setRating(val)
    }
    const Submit = async() => {

        if(!comment){
            showError('please enter coomment!')
            return
        }
        if(!rating){
            showError('please give rating!')
            return
        }
      
        try {
            dispatch({ type: LOADER, payload: true });
            var payload = {
                "customer_id":open?.customer_id,
                "product_id":open?.products[0]?.id,
               "comment":comment,
               "rating":rating
            }
            var url = apiPath.addRating;
            const res = await helper.api(url, "post", payload);
            console.log('ratinggg==>>>>>', res);
            if (res?.status == 200) {
                dispatch({ type: LOADER, payload: false });
                toast.success(res?.message)
            }
            dispatch({ type: LOADER, payload: false });
        } catch (error) {
            console.log('err in get send rating ==>>>', error)
            toast.success(error?.message)
            dispatch({ type: LOADER, payload: false });
        }
      
    }




    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: '100%' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%', width: '100%', }}>

                    <Wrapper >
                        <Box style={{ background: '', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 10px' }}>
                            <Typography style={{ fontSize: '22px', }}>Add Review </Typography>
                        </Box>
                        <TextField variant="standard" onChange={(e) => setComment(e.target.value)} name='comment' label='Enter Comment' />

                        <Rating >
                            <StarRatings
                                starDimension="35px"
                                starSpacing="5px"
                                rating={0}
                                starRatedColor="blue"
                                changeRating={changeRating}
                                numberOfStars={5}
                                name='rating'
                                isHalf={true}
                                isSelectable={true}
                            />

                        </Rating>

                        <Error>{error}</Error>

                        <ViewAllButton variant="contained" color="primary" onClick={() => Submit()}>&nbsp; Submit</ViewAllButton>
                    </Wrapper>

                </Box>
            </Component>
        </Dialog>
    )
}

export default AddRating;