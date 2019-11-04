import React from 'react';
import logo from '../../assets/logo.png';
import SearchBar from './SearchBar.js'
import MenuButton from './MenuButton';
import WorldList from '../Homepage/WorldList';

const Header = () => {
    return (
        <div className = "header">
            <div className = "topbar">
                <div className = "ui grid">
                    <div className = "four wide column"> 
                    </div>
                        <div className = "eight wide column">
                            <div className = "logo-parent">
                                <img src = {logo} alt = "logo" className = "logo" />
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