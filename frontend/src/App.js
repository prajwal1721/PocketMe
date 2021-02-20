import './App.css';
import { createBrowserHistory } from "history";
import React from 'react';
import { UrlPage } from './pages/UrlPage/UrlPage';
import { CreateLink } from './components/createLink/createLink';
import { Navbar } from './components/Navbar/navbar';
import { Signin } from './components/Auth/Signin/signin';
import { SignUp } from './components/Auth/Signup/signup';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import { Description } from './components/Overlays/Description/description';
let history = createBrowserHistory();
const App = () => {
  // check for authentication first if logged in and all stuff
  return (
    <Router history={history}>
      <div className="App">
        {/* // Navbar to be fixed */}
        {/* <Navbar user={'tan'} used={52} /> */}
        {/* <CreateLink /> */}
        {/* <Description /> */}
        {/* <UrlPage /> */}
        {/* <Signin /> */}
        <Switch>
          {/* <Route path='/logout' component={Navbar}></Route> */}
          <Route path='/description' render={(props) => <Description {...props} />} />
          <Route path="/" />
        </Switch>
        {/* page under construction */}
      </div>
    </Router >
  );
}

export default App;
