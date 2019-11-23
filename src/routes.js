import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/Home";

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null
  });

const loadableRoutes = {
  "/home": {
    component: loadable(() => import("./pages/Home"))
  },

  "/404": {
    component: loadable(() => import("./pages/NotFoundPage"))
  },

  "/missions": {
    component: loadable(() => import("./pages/missions"))
  },

  "/payload/:payload": {
    component: loadable(() => import("./pages/payload"))
  },
  "/launchpads": {
    component: loadable(() => import("./pages/launchpads"))
  }
};

class Routes extends React.Component {
  timeoutId = null;

  componentDidMount() {
    this.timeoutId = setTimeout(
      () =>
        Object.keys(loadableRoutes).forEach(path =>
          loadableRoutes[path].component.preload()
        ),
      5000 // load after 5 sec
    );
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path];
          props.exact = exact === void 0 || exact || false; // set true as default
          return <Route key={path} path={path} {...props} />;
        })}
        <Route render={() => <NotFoundPage />} />
      </Switch>
    );
  }
}

export { loadableRoutes };
export default Routes;
