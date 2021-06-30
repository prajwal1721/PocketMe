import React, { useState } from 'react';
import { FormInput } from '../../FormInput/FormInput';
// import { alertSuccess, alertWarning } from '../Alert/alert';
import { useHistory } from 'react-router-dom';
import axios from '../../../axiosurl';
import './signin.scss';


export const Signin = () => {
    const history = useHistory();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = () => {
        // alert(`${username},${password}`);
        axios.post('/login', {
            userName: username,
            password: password
        }).then((res) => {
            // console.log('xyz');
            alert(res.data.message);
            // console.log(res.data);
            setUserName('');
            setPassword('');
            history.push('/');
        }).catch((err) => {
            console.error(err);
        })
    }
    return (
        <div className="signin-form-contianer">
            <div className="signin-form"><h2>Log In</h2></div>
            <form method='post' onSubmit={handleClick}>
                <FormInput
                    label='UserName'
                    type='text'
                    required
                    max='7'
                    height='50'
                    value={username}
                    set={setUserName}
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    value={password}
                    set={setPassword}
                />
                <button className="signin-button" type='submit' >{`Sign-In`}</button>
            </form>
            <div className='message'>Don't have an account yet?</div>
            <button className="signin-button" onClick={() => history.push('/signup')}>{`Sign-Up`}</button>
        </div>)
}


