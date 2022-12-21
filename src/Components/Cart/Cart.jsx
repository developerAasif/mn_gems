import { useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

import { post } from '../../utils/paytm';
import { payUsingPaytm } from '../../service/api';
import Session from '../../utils/session';
import Loader from '../Loader/Loader';
import { LOADER } from '../../redux/constants/otherConstant';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const user = Session.getSession('auth');
    var user_id = user?.id
    const { loader } = useSelector(state => state?.loader);
    const { count, carts, total } = useSelector(state => state.cart?.cartItems);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: LOADER, payload: true });
        dispatch(getCart(user_id));
    }, []);

    const removeItemFromCart = async (item) => {
        const result = await dispatch(removeFromCart(item.id));
        if (result) {
            dispatch(getCart(user_id));
        }

    }

    const buyNow = async () => {
        // let response = await payUsingPaytm({ amount: 500, email: 'kunaltyagi@gmail.com' });
        // var information = {
        //     action: 'https://securegw-stage.paytm.in/order/process',
        //     params: response
        // }
        // post(information);
        navigate('/shipping')
    }

    return (
        <>
            {
                loader ? (<Loader />) : (
                    <>
                        {
                            carts && carts?.length > 0 ?
                                (
                                    <Component container>
                                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                                            <Header>
                                                <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Cart ({carts?.length})</Typography>
                                            </Header>
                                            {carts.map((item, i) => (
                                                <CartItem item={item} removeItemFromCart={removeItemFromCart} key={i} />
                                            ))
                                            }
                                            <BottomWrapper>
                                                <StyledButton onClick={() => buyNow()} variant="contained">Place Order</StyledButton>
                                            </BottomWrapper>
                                        </LeftComponent>
                                        <Grid item lg={3} md={3} sm={12} xs={12}>
                                            <TotalView cartItems={carts} total={total} />
                                        </Grid>
                                    </Component>
                                ) : (<EmptyCart />)
                        }
                    </>
                )
            }
        </>

    )
}

export default Cart;