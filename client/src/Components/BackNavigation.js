import React from 'react';
import logo from '../assets/logo.png';
import { createBrowserHistory } from "history"

const history = createBrowserHistory();

const BackNavigation = () => {
    return (
    <div className = "back-standard">
        <img className = "logo-small" src = {logo} />
        <i className="fa fa-chevron-left back-navigation" aria-hidden="true" onClick = {()=> history.goBack()}> Go Back</i>
    </div>
    )
};

export default BackNavigation;