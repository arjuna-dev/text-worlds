import React from 'react';
import logo from '../../assets/logo.png';
import MenuButton from './MenuButton';
import { createBrowserHistory } from "history"
//import {Link} from 'react-router-dom';

const history = createBrowserHistory();

const Header = () => 

{
    function logout(){
        localStorage.removeItem('usertoken');
        history.push('/');
    }

    const notlogged = (
        <div data-testid = "login-button">
            <a href= "/signup" className = "signup">Sign up </a>
            <a href= "/login">Log in </a>
        </div>
    )
    const logged = (
        <div data-testid="logout-button" onClick = {logout} className = "logout">
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