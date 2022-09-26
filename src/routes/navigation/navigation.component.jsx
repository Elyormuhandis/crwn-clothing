import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import{ signOutUser} from '../../utils/firebase/firebase.utils.js';
import { NavigationContainer, NavLink, NavLinksContainer, LogoContainer } from './navigation.styles.jsx';
import './navigation.styles.jsx'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.select';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);
    
    const signOutHandler = async () => {
        await  signOutUser();
    }

    return(
    <Fragment>
     <NavigationContainer>
        <LogoContainer to='/'>
            <CrwnLogo className='logo'/>
        </LogoContainer>
        <NavLinksContainer>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
             currentUser ? (<NavLink as='span' onClick={signOutHandler}>
             SIGN OUT
             </NavLink>) : (   
             <NavLink to='/auth'>
                SIGN IN
             </NavLink>
            )}
           <CartIcon/>
        </NavLinksContainer>
        {isCartOpen && <CartDropdown/>} 
     </NavigationContainer>
       <Outlet/>
    </Fragment>
    )
   }

export default Navigation;