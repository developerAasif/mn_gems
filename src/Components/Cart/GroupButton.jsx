import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { ButtonGroup, Button, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { getCart, updateCart } from "../../redux/actions/cartActions";
import Session from "../../utils/session";

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupedButton = ({item}) => {
    const user = Session.getSession('auth');
    var user_id = user?.id
    const [ counter, setCounter ] = useState(1);
    const dispatch = useDispatch()

    const handleIncrement = async(item) => {
        var payload = {
            "cart_id":item.id,
            "qty":Number(item?.qty) + 1,
        }
      const result = await dispatch(updateCart(payload))
      if(result){
        toast.success('update cart')
        dispatch(getCart(user_id))
      }
    };

    const handleDecrement = async() => {
        var payload = {
            "cart_id":item.id,
            "qty":Number(item?.qty) - 1,
        }
      const result = await dispatch(updateCart(payload))
      if(result){
        toast.success('update cart')
        dispatch(getCart(user_id))
      }
    };

console.log('product==>>>>', )
var check = item.qty < item?.product_detail?.stock;

    return (
        <Component>
            <StyledButton onClick={() => handleDecrement()} disabled={item.qty == 1 }>-</StyledButton>
            <Button disabled>{item?.qty}</Button>
            <StyledButton onClick={() => handleIncrement(item)} disabled={!check} >+</StyledButton>
        </Component>
    );
}

export default GroupedButton;