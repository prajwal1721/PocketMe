import './App.css';
import { useHistory } from "react-router-dom";
// import { createBrowserHistory } from 'history';
import React, { useState, useEffect } from 'react';
import { UrlPage } from './pages/UrlPage/UrlPage';
// import about{ CreateLink } from './components/createLink/createLink';
// import { QR } from './components/Overlays/QR/qr';
import { Navbar } from './components/Navbar/navbar';
import { Signin } from './components/Auth/Signin/signin';
import { SignUp } from './components/Auth/Signup/signup';
import { RedirectLink } from './components/Redirect/redirectLink';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from './axiosurl';
import { NotLogged } from './components/NotLogged/notLogged';
const App = () => {
  // check for authentication first if logged in and all stuff
  const [user, setUser] = useState(null);
  const [urlLeft, setUrlLeft] = useState(null);
  const [view, toggleView] = useState(true);
  const history = useHistory();
  // const history = createBrowserHistory();
  useEffect(() => {
    // console.log(user);
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
  }, [user, urlLeft]);
  return (
    <Router history={history}>
      <div className="App">
        {/* {!user && history.location.pathname === '/' ? <NotLogged toggleView={toggleView} /> : <></>} */}
        {!user ? <></> : <Navbar user={user} used={urlLeft} />}
        {
          !user ?
            <Switch>
              <Route exact path="/signup" ><SignUp /></Route >
              <Route   ><Signin /></Route>
              {/* <Redirect from='/' to='/login' /> */}
            </Switch> :
            <Switch>
              <Route exact path="/:user/:shortUrl" component={RedirectLink} />
              <Route exact path='/'  >
                <UrlPage user={user} />
              </Route>
              <Redirect to='/' />
            </Switch>
        }
        {/* page under construction */}
      </div >
    </Router >
  );
}

export default App;
