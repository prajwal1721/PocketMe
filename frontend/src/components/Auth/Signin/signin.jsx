import React, { useState } from 'react';
import { FormInput } from '../../FormInput/FormInput';
// import { alertSuccess, alertWarning } from '../Alert/alert';
import { useHistory } from 'react-router-dom';
import axios from '../../../axiosurl';
// import './signin.scss';


export const Signin = () => {
    const history = useHistory();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // const dispatch = useDispatch();
    // const setAuthUser = useCallback(
    //     (user) => dispatch({ type: "SET_AUTH_USER", user }),
    //     [dispatch]
    // );
    // const json = JSON.stringify({
    //     userName: username,
    //     password: password
    // });
    const handleClick = () => {
        alert(`${username},${password}`);
        axios(
            {
                method: 'POST',
                url: '/login',
                data: {
                    userName: username,
                    password: password
                }
            })
            .then((res) => {
                console.log('xyz');
                alert(res);
                console.log(res.data);
                history.push('/');
            }).catch((err) => {
                console.error(err);
            })
    }
    return (
        <div className="card card-main card-signin-main">
            <div className="card-body card-signin-body">
                <form>
                    <div className="form-header-text mt-5"><h2>Log In</h2></div>
                    <FormInput
                        label='UserName'
                        type='text'
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
                    <button className="btn-signin mt-3" onClick={handleClick}>{`Sign-In`}</button>
                </form>
            </div>

        </div>)
}


