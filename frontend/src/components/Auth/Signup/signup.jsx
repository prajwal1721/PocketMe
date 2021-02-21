import React, { useState } from 'react';
import { FormInput } from '../../FormInput/FormInput'
// import { alertSuccess, alertWarning } from '../../Alert/alert';
import axios from '../../../axiosurl';
import { useHistory } from 'react-router-dom';
// import './signup.scss';


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

        axios.post('/register',
            {
                name: Name,
                userName: Username,
                email: email,
                password: password,
                number: number,
                urlAllocated: 1000,
                countryCode: countryCode,
                urlLeft: 0
            })
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
                alert(err.response.data);
                console.log(err.response.data);
            });


    }

    return (
        <div className="card card-main card-signup-main">
            <div className="card-body">
                <form action="">
                    <div className="form-header-text mt-2"><h2>Sign Up</h2></div>
                    <div className="row w-100">
                        {/* <div className="col-md-2"></div> */}
                        <div className="col-md-12">
                            <FormInput
                                label='Name'
                                type='text'
                                required
                                value={Name}
                                set={setName}
                            />
                        </div>
                    </div>
                    <div className="row w-100">
                        {/* <div className="col-md-2"></div> */}
                        <div className="col-md-12">
                            <FormInput
                                label='Username(7 digit at max)'
                                type='text'
                                required
                                value={Username}
                                set={setUsername}
                            />
                        </div>
                    </div>
                    <div className="row w-100">
                        {/* <div className="col-md-2"></div> */}
                        <div className="col-md-12">
                            <FormInput
                                label='Email'
                                type='email'
                                required
                                value={email}
                                set={setEmail}
                            />
                        </div>
                    </div>

                    <div className="row w-100">
                        <div className="col-md-6">
                            <FormInput
                                label='Country Code'
                                type='text'
                                required
                                value={countryCode}
                                set={setCountryCode}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                label='Contact Number'
                                type='tel'
                                pattern='[0-9]{10}'
                                maxLength='10'
                                required
                                value={number}
                                set={setNumber}
                            />
                        </div>
                    </div>
                    <div className="row w-100">
                        <div className="col-md-6">
                            <FormInput
                                label='Password'
                                type='password'
                                required
                                value={password}
                                set={setPassowrd}
                            />
                        </div>
                    </div>
                    <button className="btn-signup mt-2" onClick={handleSubmit}>{`Signup`}</button>
                </form>
            </div>
        </div >)

}


// validate password  : https://paste.ubuntu.com/p/hT8wbpSV8J/