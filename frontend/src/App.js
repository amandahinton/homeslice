import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import EventsList from "./components/EventsList";
import HomesList from "./components/HomesList";
import HomeData from "./components/HomeData";
import HomeAdd from "./components/HomeAdd";
import HomeLoader from "./components/HomeLoader";
import BookingList from "./components/BookingList";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    < >
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <div className="splashDiv">
              <Navigation isLoaded={isLoaded}  />
                <Splash />
              <Footer isSplash={true} />
            </div>
          </Route>
          <Route>
            <Navigation isLoaded={isLoaded} />
            <Switch>
              <Route path="/events">
                <EventsList />
              </Route>
              <Route path="/homes/:id/edit">
                <HomeLoader />
              </Route>
              <Route path="/homes/:id/bookings">
                <BookingList />
              </Route>
              <Route exact path="/homes/new">
                <HomeAdd />
              </Route>
              <Route path="/homes/:id">
                <HomeData />
              </Route>
              <Route exact path="/homes">
                <HomesList />
              </Route>
            </Switch>
            <Footer isSplash={false} />
          </Route>
        </Switch>
      )}


    </>
  );
}

export default App;
