import React, { useState, useCallback } from 'react';
import { FormInput } from '../../FormInput/FormInput';
// import { alertSuccess, alertWarning } from '../Alert/alert';
// import axios from '../../../axiosurl';
// import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
// import './signin.scss';
import { useDispatch } from 'react-redux';


export const Signin = ({ handleClick }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    // const dispatch = useDispatch();
    // const setAuthUser = useCallback(
    //     (user) => dispatch({ type: "SET_AUTH_USER", user }),
    //     [dispatch]
    // );
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
                    <button className="btn-signin mt-3" onClick={() => { }}>{`Sign-In`}</button>
                </form>
            </div>

        </div>)
}


