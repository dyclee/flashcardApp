import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";

import SetListItem from './SetListItem';
import LikeIcon from './LikeIcon';
import FaveIcon from './FaveIcon';
import pencil from '../icons/pencil-alt.svg';


export default function SubjectDisplay() {
    const [setArr, setSetArr] = useState();
    const [subject, setSubject] = useState();
    // Notice we use useParams here instead of getting the params
    // From props.
    const { subjectId }  = useParams();
    const user = useSelector(state => state.userReducer.user);
    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    const sets = useSelector(state => state.setReducer);

    useEffect(() => {
        // console.log("USER ID", userId)
        if (!subjectId) {
            return
        }
        (async () => {
        const getSubjectSets = await fetch(`/api/subjects/${subjectId}`)
        // , {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({
        //         subjectId
        //     })
        // })
        const subjectRes = await getSubjectSets.json();
        console.log(subjectRes);
        setSubject(subjectRes.subject)
        const storeSetArr = [];
        subjectRes.subjectSets.forEach((set) => {
            storeSetArr.push(sets[set.id])
        })
        // console.log("STORE SET ARR", storeSetArr);
        setSetArr(storeSetArr);
        })();
    }, [subjectId]);

    // console.log("USER", user)
    if (!user || !setArr || !likes || !faves) {
        return null;
    }

    return (<>
            <div className="setheader-everything">
                <div className="subjectheader-container">
                    <div className="userheader-topline">
                        <div className="subjectheader-title">{subject.name}</div>
                        {/* <div className="userheader-icons">
                            <img src={pencil} />
                        </div> */}
                    </div>
                    <div className="userheader-description"><strong>Number of sets: {subject.setss.length}</strong></div>
                </div>
            </div>
            <div className="homedisplay__header">
                <div className="headerdisplay__welcome">'{`${subject.name}`}' sets</div>
            </div>
            <div className="homedisplay__allsets-container">
                    {setArr.map(setObj => {
                        let id = setObj.id
                        // console.log("ID", id)

                        let isFave = faves[id]
                        let isLike = likes[id].exists
                        let count = likes[id].count
                        // console.log(isLike)
                        return (<>
                            <div key={`${id}-container`} className="homedisplay__singleset-container">
                                <Link to={`/set/${id}`} className="homedisplay__links">
                                    <SetListItem set={setObj}></SetListItem>
                                </Link>
                                <div className="homedisplay__icons">
                                    <FaveIcon id={id} isFave={isFave} user={user}/>
                                    <LikeIcon id={id} count={count} isLike={isLike} user={user} />
                                </div>
                            </div>
                        </>)
                    })}
                </div>
    </>);
}
