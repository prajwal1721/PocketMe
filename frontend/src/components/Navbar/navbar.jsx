import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/button';
import './navbar.scss';
export const Navbar = ({ used, user }) => {
    const history = useHistory();
    return (
        <div>
            <nav className="navbar-parent top">
                <span className="Img">Here is an image</span>
                <span>
                    <div>PocketMe</div>
                    <div>Equiping technology in Education</div>
                </span>
                <img src='../../Logo1.png' alt="" />
                <span>Search bar</span>

                {
                    user ? <span>{`Hello, ${user.toUpperCase()}`}</span> : <Button title={`Register`} r={255} g={218} b={250} clickAction={() => history.push('/regiser')} />
                }
                {
                    <Button title={user ? 'Logout' : 'Login'} r={255} g={250} b={218} clickAction={(e) => {
                        // history.push(`${user ? 'logout' : 'login'}`);
                        // 
                        e.preventDefault();
                        console.log(user);
                        if (user === null) user = "TAn";
                        else user = null;
                    }} />
                }
            </nav >
            <div className="navbar-parent bottom">
                <span>{`Links used ${used}`}</span>
                <span>{`Links Left ${1000 - used}`}</span>
                <span></span>
            </div>
        </div>
    );
}