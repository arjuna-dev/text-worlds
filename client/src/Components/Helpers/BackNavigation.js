import React from "react";
import logo from "../../assets/logo.png";

import { useHistory } from "react-router-dom";



const BackNavigation = () => {
  let history = useHistory();
  return (
    <div className="back-standard">
      <div>
        <a href="/">
          <img className="logo-small" src={logo} alt="logo" />
        </a>
      </div>
      <div className="logo-small">
        <i
          data-testid="back-navigation-icon"
          className="fa fa-chevron-left back-navigation"
          aria-hidden="true"
          onClick={() => history.goBack()}
        >
          Go Back
        </i>
      </div>
    </div>
  );
};

export default BackNavigation;
