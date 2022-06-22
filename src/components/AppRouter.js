import { useKeycloak } from "@react-keycloak/web";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import { PrivateRoute } from "../utilities/PrivateRoute";

export const AppRouter = () => {
  const { initialized } = useKeycloak();
  if (!initialized) {
    return <h3>Loading ... </h3>;
  }
  return (
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <PrivateRoute
            // roles={["RealmAdmin"]}
            path="/home"
            component={Home}
          />
        </Switch>
      </BrowserRouter>
  );
};
