import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as groupActions from "./store/groups";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import GroupDetails from "./components/GroupDetails";
import Groups from "./components/Groups";
import UserProfile from "./components/UserProfile";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import EditEventForm from "./components/EditEventForm";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    dispatch(groupActions.getGroups()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {sessionUser ? <Redirect to={`/users/${sessionUser.id}`} /> : <Splash />}
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route path="/users/:userId">
            {sessionUser ? <UserProfile sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route path="/events/:eventId/edit">
            <EditEventForm />
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
