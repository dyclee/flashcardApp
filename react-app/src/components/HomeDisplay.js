import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSets, getUserSets, getSubjects } from '../store/actions/sets';
import { getCards } from '../store/actions/cards';
import { getLikes } from '../store/actions/likes';
import { getFavorites } from '../store/actions/favorites';
import SetListItem from './SetListItem';
import { CreateSetForm } from './SetForm';
import { CreateSubjectForm } from './SubjectForm';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import heart from '../icons/heart.svg';
import noheart from '../icons/emptyheart.svg';

const HomeDisplay = ({subjects}) => {
    const user = useSelector(state => state.userReducer.user);
    const [sets, setSets] = useState([]);
    const [subjectArr, setSubjectArr] = useState([]);
    const dispatch = useDispatch();
    // const setsWithHidden = useSelector(state => {
    //     let newSets = Object.items(sets).map((pair) => {
    //         console.log(pair)
    //     })
    // })
    useEffect(() => {
        console.log("HITTING THIS?")
        console.log("USER", user)
        if (!user) return;
        (async() => {

        const res = await fetch(`/api/sets`)
        const {sets, cards, favorites, likes} = await res.json();
        // console.log("SET OBJS", sets);
        // dispatch(getSets(sets))
        dispatch(getCards(cards))
        dispatch(getLikes(likes))
        dispatch(getFavorites(favorites))

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
        const setsWithFavorites = Object.keys(newSets).map((key) => {
          const favIdArr = newSets[key].favorites.map((favObj) => {
            return favObj.userId
          })
          // console.log("FAV ID ARR", favIdArr)
          if (favIdArr.includes(user.id)) {
            newSets[key]["userFavorite"] = true
            return
          }
          newSets[key]["userFavorite"] = false
        })

        dispatch(getSets(newSets))
        setSets(newSets)

        const subjectRes = await fetch('/api/subjects');
        const subjects = await subjectRes.json();
        // console.log("SUBJECTS", subjects)
        dispatch(getSubjects(subjects))
        setSubjectArr(subjects)

        })();
      }, [user]);

    const allSets = Object.keys(sets).map((key) => {
        return { [key]: sets[key] }
    })


    const switchFav = async (e) => {
        // console.log(e.target, e.target.name, e.target.className)
        const action = e.target.name;
        const setId = e.target.className;
        console.log("ACTION", action, "SET ID", setId)
        if (action === "create") {
            const createRes = await fetch(`/api/favorites/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    setId,
                    userId: user.id
                })
            })
        }

    }
    if (!allSets) return null;
    console.log(allSets)
    return (<>
            <article>
                <h1>All Sets</h1>
                <CreateSetForm subjectOptions={subjectArr}/>
                <CreateSubjectForm />
                <div>
                    {allSets.map(set => {
                        let id = Object.keys(set)[0]
                        let setObj = Object.values(set)[0]

                        return (<>
                            <Link to={`/set/${id}`}>
                                <SetListItem set={setObj}></SetListItem>
                            </Link>
                            {setObj.userFavorite ?
                                <img className={id} src={heart} name={"delete"} onClick={switchFav} /> :
                                <img className={id} src={noheart} name={"create"} onClick={switchFav}/>
                            }

                        </>)
                    })}
                </div>
            </article>
        </>
    )

}

export default HomeDisplay;
