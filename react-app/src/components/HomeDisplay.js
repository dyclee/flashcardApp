import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSets, getUserSets, getSubjects } from '../store/actions/sets';
import { getCards } from '../store/actions/cards';
import { getLikes } from '../store/actions/likes';
import { getFavorites, createFavorite, deleteFavorite } from '../store/actions/favorites';
import SetListItem from './SetListItem';
import { CreateSetForm } from './SetForm';
import { CreateSubjectForm } from './SubjectForm';
import FaveIcon from './FaveIcon';
import LikeIcon from './LikeIcon';

const HomeDisplay = ({subjects}) => {
    const user = useSelector(state => state.userReducer.user);
    const [sets, setSets] = useState([]);
    const [subjectArr, setSubjectArr] = useState([]);

    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("USER", user)
        if (!user) return;
        (async() => {

        const res = await fetch(`/api/sets`)
        const {sets, cards, favorites, likes} = await res.json();

        dispatch(getCards(cards))

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
        dispatch(getLikes(likeSets))
        dispatch(getFavorites(faveSets))
        dispatch(getSets(newSets))
        setSets(newSets)

        const subjectRes = await fetch('/api/subjects');
        const subjects = await subjectRes.json();

        dispatch(getSubjects(subjects))
        setSubjectArr(subjects)

        })();
      }, [user]);

    const allSets = Object.keys(sets).map((key) => {
        return { [key]: sets[key] }
    })

    if (!allSets || !faves || !likes) return null;
    // console.log(allSets)
    // console.log("FAVES", faves)
    return (<>
            <article>
                <h1>All Sets</h1>
                <CreateSetForm subjectOptions={subjectArr}/>
                <CreateSubjectForm />
                <div className="homedisplay__sets-container">
                    {allSets.map(set => {
                        let id = Object.keys(set)[0]
                        let setObj = Object.values(set)[0]
                        let isFave = faves[id]
                        let isLike = likes[id].exists
                        let count = likes[id].count
                        // console.log(isLike)
                        return (<>
                            <Link to={`/set/${id}`}>
                                <SetListItem set={setObj}></SetListItem>
                            </Link>
                            <div className="homedisplay__icons">
                            <FaveIcon id={id} isFave={isFave} user={user}/>
                            <LikeIcon id={id} count={count} isLike={isLike} user={user} />
                            </div>
                        </>)
                    })}
                </div>
            </article>
        </>
    )

}

export default HomeDisplay;
