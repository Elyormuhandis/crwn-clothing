import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const  CheckoutItem = ({checkoutItem}) => {
    const { name, imageUrl, price, quantity  }= checkoutItem;
    const {addItemToCart, clearItemFromCart, removeItemFromCart} = useContext(CartContext);
    
    const addItemHandler = () => addItemToCart(checkoutItem);
    const removeItemHandler = () =>  removeItemFromCart(checkoutItem);
    const clearItemHandler = () => clearItemFromCart(checkoutItem);
    
    

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                 <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <div  className='quantity'>
                <span className='arrow' onClick={removeItemHandler}>&lt;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={addItemHandler}>&gt;</span>
            </div>
            <span className='price'>{price}$</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;