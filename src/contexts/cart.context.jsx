import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id)

    if (existingCartItem) {
        
        return cartItems.map((cartItem)=> 
        cartItem.id===existingCartItem.id ? 
        {...cartItem, quantity:cartItem.quantity+1} 
        : cartItem);
    }


    return [...cartItems, {...productToAdd, quantity:1}]

}

const removeCartItem = (cartItems, cartItemToRemove) =>{

    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id);

    if (cartItemToRemove.quantity>1) {
        
        return cartItems.map((cartItem)=> 
        cartItem.id===existingCartItem.id ? 
        {...cartItem, quantity:cartItem.quantity-1} 
        : cartItem);
    }         
        return cartItems.filter((item)=>item.id!==cartItemToRemove.id);
    }

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((item)=>item.id!==cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    total: 0,
})


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(()=>{
        const newTotal = cartItems.reduce((total, cartItem)=> total + cartItem.price*cartItem.quantity, 0);
        setTotal(newTotal);
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart,
        clearItemFromCart,
        total
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}