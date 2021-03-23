import React from 'react';
import logo from '../assets/logo.png';
import {Redirect} from 'react-router-dom'
import { createBrowserHistory } from "history"

const history = createBrowserHistory();

const BackNavigation = () => {
    return (
    <div className = "back-standard">
        <div><a href = '/'><img className = "logo-small" src = {logo} alt = "logo" /></a></div>
        <div className = "logo-small"><i className="fa fa-chevron-left back-navigation" aria-hidden="true" onClick = {()=> history.goBack()}> Go Back</i></div>
    </div>
    )
};

export default BackNavigation;