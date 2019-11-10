import React from 'react';
import logo from '../../assets/logo.png';
import SearchBar from './SearchBar.js'
import MenuButton from './MenuButton';
import {Link} from 'react-router-dom';

const Header = () => 

{
    function logout(){
        localStorage.removeItem('usertoken');
        window.location.reload(true);
    }

    const notlogged = (
        <div>
            <Link to = "/signup" className = "signup">Sign up </Link>
            <Link to = "/login">Log in </Link>
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
                            <Link to= "/"><img src = {logo} alt = "logo" className = "logo" /></Link>
                            </div>
                        </div>
                    <div className = "four wide column">
                        <SearchBar />
                        <br />
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