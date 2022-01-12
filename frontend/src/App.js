import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as groupActions from "./store/groups";
import * as eventActions from "./store/events";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import GroupDetails from "./components/GroupDetails";
import Groups from "./components/Groups";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(groupActions.getGroups());
    dispatch(eventActions.getEvents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route>
            404 NOT FOUND
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
