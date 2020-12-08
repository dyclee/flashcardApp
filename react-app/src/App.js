import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import HomeDisplay from './components/HomeDisplay';
import SetDisplay from './components/SetDisplay';
import { getUser } from './store/actions/users';
import { getSets, getUserSets } from './store/actions/sets';
import { useDispatch } from 'react-redux';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        // console.log("AT APP, USER:,", user)
        setAuthenticated(true);
        dispatch(getUser(user))
        setUser(user)
      }
      const res = await fetch(`api/sets`)
      const setObjs = await res.json();
      console.log("SET OBJS", setObjs);
      dispatch(getSets(setObjs))

      const userRes = await fetch(`api/users/${user.id}/sets`)
      const setUserObjs = await userRes.json();
      console.log("USER SETS", setUserObjs)
      dispatch(getUserSets(setUserObjs))
      setLoaded(true);
    })();
  }, []);


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <UserContext.Provider value={{ user }}> */}

        <NavBar setAuthenticated={setAuthenticated} />
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
          <SetDisplay />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <HomeDisplay />
        </ProtectedRoute>
      {/* </UserContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
