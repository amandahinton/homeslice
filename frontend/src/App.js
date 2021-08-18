import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventsList from "./components/EventsList";
import HomesList from "./components/HomesList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <h1>Welcome home!</h1>
          </Route>
          <Route path="/events">
            <EventsList />
          </Route>
          <Route path="/homes">
            <HomesList />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
