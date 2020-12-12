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
import { getSets, getUserSets, getSubjects } from './store/actions/sets';
import { getCards } from './store/actions/cards';
import { getLikes } from './store/actions/likes';
import { getFavorites } from './store/actions/favorites';
import { useDispatch } from 'react-redux';
import './styles/random.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(getUser(user))
        setUser(user)

      }

      // setLoaded(true)
    })()
  },[])
  useEffect(() => {
    if (!user) return;
    (async() => {

    const res = await fetch(`/api/sets`)
    const {sets, cards, favorites, likes} = await res.json();


    const newSets = {}
    const allSets = Object.keys(sets).map((key) => {
        if (user.id === sets[key].createdBy) {
            // console.log(key)
            sets[key]["hidden"] = false
            newSets[key] = sets[key]
            return
        }
        sets[key]["hidden"] = true;
        newSets[key] = sets[key]
        return
    })
    const faveSets = {}
    const setsWithFavorites = Object.keys(newSets).map((key) => {
        const favIdArr = newSets[key].favorites.map((favObj) => {
            return favObj.userId
        })

        if (favIdArr.includes(user.id)) {
            faveSets[key] = true
            return
        }
        faveSets[key] = false
    })
    const likeSets = {}
    const setsWithLikes = Object.keys(newSets).map((key) => {
        const likeIdArr = newSets[key].likes.map((likeObj) => {
            return likeObj.userId
        });
        let count = likeIdArr.length;
        if (likeIdArr.includes(user.id)) {
            likeSets[key] = {exists: true, count}
            return
        }
        likeSets[key] = { exists: false, count}
    })
    // console.log("LIKE SETS", likeSets)
    const cardSets = {}
    const setsWithCards = Object.keys(newSets).map((key) => {
        const cardObj = {}
        const cardArr = newSets[key].cards.map((card) => {
            cardObj[card.id] = card
        });
        // console.log("CARD Obj", cardObj);
        cardSets[key] = cardObj;
    });

    dispatch(getCards(cardSets))
    dispatch(getLikes(likeSets))
    dispatch(getFavorites(faveSets))
    dispatch(getSets(newSets))
    // setSets(newSets)

    const subjectRes = await fetch('/api/subjects');
    const subjects = await subjectRes.json();

    dispatch(getSubjects(subjects))
    // setSubjectArr(subjects)
    setLoaded(true)
    })();
  }, [user]);


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
        <ProtectedRoute path="/" exact={true} authenticated={authenticated} >
          <HomeDisplay />
        </ProtectedRoute>
      {/* </UserContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
