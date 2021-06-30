import React, { useState } from 'react';
import { FormInput } from '../../FormInput/FormInput'
// import { alertSuccess, alertWarning } from '../../Alert/alert';
import axios from '../../../axiosurl';
import { useHistory } from 'react-router-dom';
import './signup.scss';


export const SignUp = () => {
    const [Username, setUsername] = useState('');
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [number, setNumber] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: Name,
            userName: Username,
            email: email,
            password: password,
            number: number,
            urlAllocated: 1000,
            countryCode: countryCode,
            urlLeft: 0
        }
        axios.post('/register', data)
            .then((res) => {
                if (res.status === 200) {
                    // alertSuccess(res.data);
                    alert(res.data);
                    console.log(res.data);
                    setTimeout(
                        () => history.push('/login'),
                        1000);
                    // won't work as rendering the same route now no need to check 

                }
                else {
                    // alertWarning(res.data.message + ",please sign-up . ");
                    alert('Error Try again');
                }
            })
            .catch((err) => {
                // alertWarning(err.response.data);
                if (err.response)
                    alert(err.response.data);

            });


    }

    return (
        <div className="signup-form-container">
            <div className="from-header">Sign Up</div>
            <form method='post' onClick={handleSubmit} className='input-container-form'>
                <FormInput
                    label='Name'
                    type='text'
                    required
                    value={Name}
                    set={setName}
                />

                <FormInput
                    label='Username'
                    placeholder="(7 digit at max)"
                    type='text'
                    required
                    value={Username}
                    set={setUsername}
                />

                <FormInput
                    label='Email'
                    type='email'
                    required
                    value={email}
                    set={setEmail}
                />
                <FormInput
                    label='Country Code'
                    type='text'
                    required
                    value={countryCode}
                    set={setCountryCode}
                />
                <FormInput
                    label='Contact Number'
                    type='tel'
                    pattern='[0-9]{10}'
                    maxLength='10'
                    required
                    value={number}
                    set={setNumber}
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    value={password}
                    set={setPassowrd}
                />
                <button className="signup-button" type='submit'>SignUp</button>
            </form>
            <div className='message1'>Already have an account yet?</div>
            <button className="signup-button" onClick={() => history.push('/login')}>{`SignIn`}</button>
        </div >)

}


// validate password  : https://paste.ubuntu.com/p/hT8wbpSV8J/