import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import LoadState from './components/LoadState';
import HomeDisplay from './components/HomeDisplay';
import SetDisplay from './components/SetDisplay';
import FavoritesDisplay from './components/FavoritesDisplay';
import { getUser } from './store/actions/users';

import { useDispatch } from 'react-redux';
import './styles/random.css';

import NavMUI from './components/NavMUI';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState();
  const [sets, setSets] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setUser(user)
        setAuthenticated(true);
        dispatch(getUser(user))

      }
      setLoaded(true)
    })()
  },[])

  // console.log(user)
  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      {/* <UserContext.Provider value={{ user }}> */}

        <NavBar setAuthenticated={setAuthenticated} />
        <NavMUI authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/set/:setId" exact={true} authenticated={authenticated}>
          <LoadState user={user} component={<SetDisplay />} />
        </ProtectedRoute>
        <ProtectedRoute path="/favorites" exact={true} authenticated={authenticated}>
          <LoadState user={user} component={<FavoritesDisplay />} />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated} >
          <LoadState user={user} component={<HomeDisplay />}/>
        </ProtectedRoute>
      {/* </UserContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
