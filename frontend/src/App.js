import './App.css';
import { createBrowserHistory } from "history";
import React, { useState, useEffect } from 'react';
import { UrlPage } from './pages/UrlPage/UrlPage';
// import { QR } from './components/Overlays/QR/qr';
import { Navbar } from './components/Navbar/navbar';
import { Signin } from './components/Auth/Signin/signin';
import { SignUp } from './components/Auth/Signup/signup';
import { RedirectLink } from './components/Redirect/redirectLink';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from './axiosurl';
let history = createBrowserHistory();
const App = () => {
  // check for authentication first if logged in and all stuff
  const [user, setUser] = useState(null);
  const [urlLeft, setUrlLeft] = useState(null);
  useEffect(() => {
    axios.get('/')
      .then(
        (res) => {
          setUser(res.data.userName);
          setUrlLeft(res.data.urlLeft);
        }
      )
      .catch((err) => {
        console.log(err);
      })
  }, [user]);
  return (
    <Router history={history}>
      <div className="App">
        <Navbar user={user} used={urlLeft} />
        <Signin />
        <Switch>
          {!user ?
            <>
              <Route exact path="/signup" component={SignUp} />
              <Route path='login' component={Signin} />
              <Redirect path='login' component={Signin} />
            </> :
            <>
              <Route path="/:user/:shortUrl" component={RedirectLink} />
              <Route path="/" component={UrlPage} />
              <Redirect path='/' component={UrlPage} />

            </>
          }
        </Switch>
        {/* page under construction */}
      </div>
    </Router >
  );
}

export default App;
