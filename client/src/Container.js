import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, withRouter, Switch, BrowserRouter } from "react-router-dom";

const WorldHomepage = lazy(() =>
  import("./Components/World-homepage/WorldHomepage")
);
const WorldList = lazy(() => import("./Components/Homepage/WorldList"));
const AddWorld = lazy(() => import("./Components/AddWorld/AddWorld"));
const WorldInteraction = lazy(() =>
  import("./Components/World-interaction/WorldInteraction")
);
const Signup = lazy(() => import("./Components/Forms/Signup"));
const Login = lazy(() => import("./Components/Forms/Login"));

function Container({ location }) {
  return (
    <Wrapper>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={"fade"}
        >
          <section className="route-section">
            <Suspense
              fallback={<div className="ui active centered loader"></div>}
            >
              <BrowserRouter>
                <Switch location={location}>
                  <Route exact path="/" component={WorldList} />
                  <Route exact path="/add-world" component={AddWorld} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/world/:id" component={WorldHomepage} />
                  <Route
                    exact
                    path="/world/:id/graph"
                    component={WorldInteraction}
                  />
                </Switch>
              </BrowserRouter>
            </Suspense>
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
