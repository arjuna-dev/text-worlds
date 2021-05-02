import React from 'react';
import logo from '../../assets/logo.png';
import MenuButton from './MenuButton';
//import {Link} from 'react-router-dom';

const Header = () => 

{
    function logout(){
        localStorage.removeItem('usertoken');
        window.location.reload(true);
    }

    const notlogged = (
        <div>
            <a href= "/signup" className = "signup">Sign up </a>
            <a href= "/login">Log in </a>
        </div>
    )
    const logged = (
        <div onClick = {logout} className = "logout">
            Logout
        </div>
    )
    return (
        <div className = "header">
            <div className = "topbar">
                <div className = "ui grid">
                    <div className = "four wide column"> 
                    </div>
                        <div className = "eight wide column">
                            <div className = "logo-parent">
                            <a href= "/"><img src = {logo} alt = "logo" className = "logo" /></a>
                            </div>
                        </div>
                    <div className = "four wide column">
                        <div className = "menu">
                        <MenuButton />
                        <div className = "auth-button">
                            {localStorage.usertoken ? logged : notlogged}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Header;