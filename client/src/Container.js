import React from 'react';
import styled from "styled-components";
import World from './Components/World-homepage/World';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import WorldList from './Components/Homepage/WorldList';
import AddWorld from './Components/AddWorld/AddWorld';
import WorldGraph from './Components/World-graph/WorldGraph'
import Signup from './Components/Forms/Signup';
import Login from './Components/Forms/Login';

import { Route, withRouter, Switch } from 'react-router-dom';

function Container({ location }) {
    return (
      <Wrapper>
          <TransitionGroup className="transition-group">
            <CSSTransition
                key={location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames={'fade'}
            >
            <section className="route-section">
            <Switch location={location}>
                <Route exact path = '/' component = {WorldList}/>
                <Route exact path = '/add-world' component = {AddWorld} />
                <Route exact path = '/signup' component = {Signup} />
                <Route exact path = '/login' component = {Login} />
                <Route exact path = '/world/:id' component = {World}/>
                <Route exact path = '/world/:id/graph' component = {WorldGraph} />
            </Switch>
            </section>
            </CSSTransition>
          </TransitionGroup>
      </Wrapper>
    );
  }
  
  const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
}

.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
}

.fade-exit {
    opacity: 1;
}

.fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
}
div.transition-group {
    position: relative;
}
section.route-section {
 position: absolute;
 width: 100%;
 height: 100vh;
 top: 0;
 left: 0;
}
  `;

  export default withRouter(Container);