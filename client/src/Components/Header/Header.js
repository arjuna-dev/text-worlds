import React from 'react';
import logo from '../../assets/logo.png';
import SearchBar from './SearchBar.js'
import MenuButton from './MenuButton';
import {Link} from 'react-router-dom';

const Header = () => {
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
                        <MenuButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Header;