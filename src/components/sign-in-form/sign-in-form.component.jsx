import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const defaultFormFields = {
    email: '',
    password: '',
}
 
const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
};



const SignInForm = () => {
    const setCurrentUser = useSelector(selectCurrentUser);
    const [formFields, setFromFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFromFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
                setCurrentUser(user);
                resetFormFields();
        }catch(error){
            switch(error.code){
                case("auth/wrong-password") : alert('incorrect password for email');
                break;
                case("auth/user-not-found") : alert('no user associated with this email');
                break;
                default:
                    console.log(error);
            }
        }

    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFromFields({...formFields, [name]:value})
    };

    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label="Email" 
                type='email' 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}/>
                <FormInput
                label="Password" 
                type='password' 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}/>
                <ButtonsContainer>
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted} >Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;