import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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


export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',

};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0,
};


const cartReducer = (state, action) => {
    const { type, payload} = action;

    switch(type) {

        case CART_ACTION_TYPES.SET_CART_ITEMS: 
        return {
            ...state,
            ...payload
        };

        case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
        return {
            ...state,
            isCartOpen: payload
        };

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    };

};


 
export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, total} = state;

    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce((total, cartItem) => 
            total + cartItem.quantity, 0);

        const newTotal = newCartItems.reduce((total, cartItem)=> 
            total + cartItem.price*cartItem.quantity, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems, 
                cartCount: newCartCount, 
                total: newTotal}));
        };
    
        
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }
    const setIsCartOpen = (bool) => 
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    
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