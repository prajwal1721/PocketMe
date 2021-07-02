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
    const onClickLoginLogout = (e) => {
        e.preventDefault();
        console.log('clicked');
        if (userName) {
            axios.post('/logout')
                .then((res) => {
                    alert('Successfully logged out!');
                    changeUser(null);
                    changeTitle('Login');
                    history.push(`/login`);
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        else {
            history.push('/login');
        }

        console.log(user);

    }
    return (
        <div className='container'>
            <nav className="navbar-parent top">
                <div className='nav-inner-left'>
                    <img alt="logo" src={LogoImg} className="Img" style={{ width: '8    0px', height: '75px' }} />
                    <span>
                        <div className='heading'>PocketMe</div>
                        <div>Equiping technology in Education</div>
                    </span>
                </div>
                <div className='nav-inner-right'>
                    {/* <span className='searchbox'>
                    <input placeholder='search an url by title'></input>
                    <button className='search-button'>Search</button>
                </span> */}
                    <CreateLink className='create-link' userName={userName} />
                    {

                        userName ? <div className='user-display'>{`Hello, ${userName.toUpperCase()}`}</div> : <Button className='sigin-button' title={`Signup`} r={255} g={255} b={255} clickAction={() => history.push('/signup')} />
                    }

                    <span className='navbar-link'>{`Used ${1000 - used}`}</span>
                    <span className='navbar-link'>{`Left ${used}`}</span>

                    <button style={{ r: 255, g: 250, b: 218 }} onClick={onClickLoginLogout} className='logout-signup-button' >{title}</button>
                </div>
            </nav >

        </div>
    );
}