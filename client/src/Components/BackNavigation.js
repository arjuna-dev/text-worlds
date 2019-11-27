import React from 'react';
import logo from '../assets/logo.png';
import {Link} from 'react-router-dom'
import { createBrowserHistory } from "history"

const history = createBrowserHistory();

const BackNavigation = () => {
    return (
    <div className = "back-standard">
        <div><Link to = '/'><img className = "logo-small" src = {logo} alt = "logo" /></Link></div>
        <div className = "logo-small"><i className="fa fa-chevron-left back-navigation" aria-hidden="true" onClick = {()=> history.goBack()}> Go Back</i></div>
    </div>
    )
};

export default BackNavigation;