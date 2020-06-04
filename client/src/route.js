
import React from "react";
import { Route, Switch, useParams, Redirect } from "react-router-dom";
import Home from "./container/home";
import Login from "./container/Login";
import NotFound from "./container/NotFound";
import Data from "./container/data";
import Signup from "./container/signup";
import Test from "./container/Test";
import Profile from "./container/profile";
import Continent from './container/continent';
import Logout from "./container/logout";

class Routes extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    <Route exact path="/login">
        <Login />
    </Route>
    <Route exact path="/data">
        <Data />
    </Route>
    <Route exact path="/test">
        <Test />
    </Route>
    <Route exact path="/signup">
        <Signup />
    </Route>
    <Route exact path="/profile">
        <Profile />
    </Route>
    <Route exact path="/logout">
        <Logout />
    </Route>
    <Route exact path="/continent/:name" render={(props) => <Continent {...props} isAuthed={true} />} />
        {/* <Continent /> */}
    {/* </Route> */}
    {/* Finally, catch all unmatched routes */}
    <Route exact path="*">
        <Redirect to="/"><NotFound /></Redirect>
    </Route>
    </Switch>
  );
}
}
export default Routes
