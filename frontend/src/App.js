import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as groupActions from "./store/groups";
import * as eventActions from "./store/events";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import GroupDetails from "./components/GroupDetails";
import Groups from "./components/Groups";
import UserProfile from "./components/UserProfile";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
            {sessionUser ? <Redirect to="/users/:userId" /> : <Splash />}
          </Route>
          <Route exact path="/groups">
            {/* {sessionUser ? <Groups /> : <Redirect to="/" />} */}
            <Groups />
          </Route>
          <Route path="/groups/:groupId">
            {/* {sessionUser ? <GroupDetails /> : <Redirect to="/" />} */}
            <GroupDetails />
          </Route>
          <Route path="/users/:userId">
            <UserProfile />
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
