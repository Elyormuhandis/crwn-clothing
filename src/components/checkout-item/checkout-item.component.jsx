import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.select'
import { Arrow, CheckoutItemContainer, ImageContainer, Name, Price, Quantity, RemoveButton, Value } from './checkout-item.styles';

const  CheckoutItem = ({checkoutItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity  }= checkoutItem;
    const addItemHandler = () => dispatch(addItemToCart(cartItems, checkoutItem));
    const removeItemHandler = () =>  dispatch(removeItemFromCart(cartItems, checkoutItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, checkoutItem));
    
    

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                 <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&lt;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&gt;</Arrow>
            </Quantity>
            <Price>{price}$</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;