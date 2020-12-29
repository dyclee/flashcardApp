import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSets } from '../store/actions/sets';
import { getCards } from '../store/actions/cards';
import { getLikes } from '../store/actions/likes';
import { getFavorites } from '../store/actions/favorites';
import { getSubjects } from '../store/actions/subjects';
import { authenticate } from "../services/auth";

import "../styles/random.css"

export default function LoadState({component}) {
    // console.log("LOCATION", window.location.href)
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
        const user = await authenticate();
        const res = await fetch(`/api/sets/`);
        const {sets, cards, favorites, likes} = await res.json();
        console.log("RESPONSE FROM /sets/:      ", sets)


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

        const subjectRes = await fetch('/api/subjects/');
        const subjects = await subjectRes.json();
        console.log("SUBJECTS          ", subjects);
        dispatch(getSubjects(subjects))
        // console.log("hitting this")
        setLoaded(true)
        })();
      }, []);

      if (!loaded) return null;

      return (<>
        {component}
      </>)
}
