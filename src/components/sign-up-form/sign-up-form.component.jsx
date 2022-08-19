import { useState } from "react";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    coniformPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFromFields] = useState(defaultFormFields);
    const {displayName, email, password, conifromPassword} = formFields;
    console.log(formFields);
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFromFields({...formFields, [name]:value})
    };

    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => {}}>
                <label>Display Name</label>
                <input type='text' required onChange={handleChange} name="displayName" value={displayName}/>
                <label>Email</label>
                <input type='email' required onChange={handleChange} name="email" value={email}/>
                <label>Password</label>
                <input type='password' required onChange={handleChange} name="password" value={password}/>
                <label>Coniform Password</label>
                <input type='password' required onChange={handleChange} name="coniformPassword" value={conifromPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;