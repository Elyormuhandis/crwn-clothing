import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {UserContext} from '../../contexts/user.context';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import { SignUpContainer } from "./sign-up-form.styles";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    coniformPassword: ''
}



const SignUpForm = () => {
    const [formFields, setFromFields] = useState(defaultFormFields);
    const {displayName, email, password, coniformPassword} = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFromFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== coniformPassword){
            alert("passwords don't match")
            return;
        }

        try{

            const {user} = await createAuthUserWithEmailAndPassword(
                email, 
                password
                );
                setCurrentUser(user);
                await createUserDocumentFromAuth(user, {displayName})
                resetFormFields();
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else{
                console.log('user creation encountered an error', error);
            }
        }

    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFromFields({...formFields, [name]:value})
    };

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label="Display Name" 
                type='text' 
                required 
                onChange={handleChange} 
                name="displayName" 
                value={displayName}/>
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
                <FormInput
                label="Coniform Password" 
                type='password' 
                required 
                onChange={handleChange} 
                name="coniformPassword" 
                value={coniformPassword}/>
                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;