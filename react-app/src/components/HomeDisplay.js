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

const HomeDisplay = ({}) => {
    const user = useSelector(state => state.userReducer.user);
    const sets = useSelector(state => state.setReducer)
    const [subjectArr, setSubjectArr] = useState();
    const [setArr, setSetArr] = useState([]);

    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const allSets = Object.keys(sets).map((key) => {
            return { [key]: sets[key] }
        })

        const subjects = allSets.pop(-1);
        setSetArr(allSets)
        setSubjectArr(subjects.subjects)

    }, [])

    if (!setArr || !faves || !likes || !subjectArr) return null;
    // console.log(allSets)
    // console.log("FAVES", faves)
    return (<>
            <article>
                <h1>All Sets</h1>
                <CreateSetForm subjectOptions={subjectArr}/>
                <CreateSubjectForm />
                <div className="homedisplay__allsets-container">
                    {setArr.map(set => {
                        let id = Object.keys(set)[0]
                        let setObj = Object.values(set)[0]
                        let isFave = faves[id]
                        let isLike = likes[id].exists
                        let count = likes[id].count
                        // console.log(isLike)
                        return (<>
                            <div id={id} className="homedisplay__singleset-container">
                                <Link to={`/set/${id}`} className="homedisplay__links">
                                    <SetListItem set={setObj}></SetListItem>
                                </Link>
                                <div className="homedisplay__icons">
                                    <FaveIcon id={id} isFave={isFave} user={user}/>
                                    <LikeIcon id={id} count={count} isLike={isLike} user={user} />
                                    <i>{count}</i>
                                </div>
                            </div>
                        </>)
                    })}
                </div>
            </article>
        </>
    )

}

export default HomeDisplay;
