import React from 'react';
import logo from '../../assets/logo.png';
import SearchBar from './SearchBar.js'
import MenuButton from './MenuButton';
import WorldList from './WorldList';

const Homepage = () => {
    return (
        <div className = "homepage">
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
            <div className = "world-list">
            <WorldList></WorldList>
            </div>
        </div>
    );
}
 
export default Homepage;