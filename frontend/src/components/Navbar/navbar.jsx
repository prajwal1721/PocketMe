import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LogoImg from '../../assets/Logo1.png'
import { Button } from '../Button/button';
import axios from '../../axiosurl';
import { CreateLink } from '../createLink/createLink';
import './navbar.scss';
export const Navbar = ({ used, user }) => {
    const [userName, changeUser] = useState(user);
    const history = useHistory();
    const [title, changeTitle] = useState(userName ? 'Logout' : 'Login');
    return (
        <div>
            <nav className="navbar-parent top">
                <img alt="logo" src={LogoImg} className="Img" style={{ width: '200px', height: '200px' }} />
                <span>
                    <div>PocketMe</div>
                    <div>Equiping technology in Education</div>
                </span>
                <span>Search bar</span>
                {
                    userName ? <span>{`Hello, ${userName.toUpperCase()}`}</span> : <Button title={`Signup`} r={255} g={218} b={250} clickAction={() => history.push('/signup')} />
                }
                <CreateLink />
                {console.log(userName)}
                <button style={{ r: 255, g: 250, b: 218 }} onClick={(e) => {
                    e.preventDefault();
                    console.log('clicked');
                    if (userName) {
                        axios.post('/logout')
                            .then((res) => {
                                alert('Successfully logged out!');
                                changeUser(null);
                                changeTitle('Login');
                            })
                            .catch((err) => {
                                console.log(err.response);
                            })
                    }
                    else {
                        history.push(`/login`);
                    }

                    console.log(user);

                }} >{title}</button>
            </nav >
            <div className="navbar-parent bottom">
                <span>{`Links used ${used}`}</span>
                <span>{`Links Left ${1000 - used}`}</span>
                <span></span>
            </div>
        </div>
    );
}