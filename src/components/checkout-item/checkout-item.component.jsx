import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Arrow, CheckoutItemContainer, ImageContainer, Name, Price, Quantity, RemoveButton, Value } from './checkout-item.styles';

const  CheckoutItem = ({checkoutItem}) => {
    const { name, imageUrl, price, quantity  }= checkoutItem;
    const {addItemToCart, clearItemFromCart, removeItemFromCart} = useContext(CartContext);
    
    const addItemHandler = () => addItemToCart(checkoutItem);
    const removeItemHandler = () =>  removeItemFromCart(checkoutItem);
    const clearItemHandler = () => clearItemFromCart(checkoutItem);
    
    

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