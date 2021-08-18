import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventsList from "./components/EventsList";
import HomesList from "./components/HomesList";
import HomeData from "./components/HomeData";
import HomeAdd from "./components/HomeAdd";

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
            <EventsList />
          </Route>
          <Route path="/events">
            <EventsList />
          </Route>
          <Route exact path="/homes">
            <HomesList />
          </Route>
          <Route path="/homes/:id(\\d+)">
            <HomeData />
          </Route>
          <Route path="/homes/new">
            <HomeAdd />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
