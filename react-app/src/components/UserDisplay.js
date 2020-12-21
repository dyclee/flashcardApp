import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";

import SetListItem from './SetListItem';
import LikeIcon from './LikeIcon';
import FaveIcon from './FaveIcon';
import pencil from '../icons/pencil-alt.svg';


export default function UserDisplay() {
    const [user, setUser] = useState({});
    const [setArr, setSetArr] = useState();
    // Notice we use useParams here instead of getting the params
    // From props.
    const { userId }  = useParams();
    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    const sets = useSelector(state => state.setReducer);

    useEffect(() => {
        // console.log("USER ID", userId)
        if (!userId) {
        return
        }
        (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        //   console.log("USER", user);
        setUser(user);
        const getUserSets = await fetch(`/api/users/${userId}/sets`)
        const userSets = await getUserSets.json();
        console.log("USER SETS", userSets)
        // console.log("SETS", sets)
        const storeSetArr = [];
        userSets.forEach((set) => {
            storeSetArr.push(sets[set.id])
        })
        // console.log("STORE SET ARR", storeSetArr);
        setSetArr(storeSetArr);
        })();
    }, [userId]);
    // console.log("SET ARR", setArr)
    if (!user || !setArr || !likes || !faves) {
        return null;
    }

    return (<>
            <div className="setheader-everything">
                <div className="setheader-container">
                    <div className="setheader-topline">
                        <div className="setheader-title">{user.username}</div>
                        <div className="setheader-icons">
                            <img src={pencil} />
                            {/* <DeleteSetForm set={set} hidden={hidden} /> */}
                        </div>
                    </div>
                    <div className="setheader-description">{user.email}</div>
                    <div className="setheader-creator">Made by: <strong><i>UserName</i></strong></div>
                    {/* <div className="setheader-cardcount">{set.card.length} cards</div> */}
                    <div className="setheader-stats">
                        {/* <CreateCardForm setId={id} hidden={hidden} /> */}
                        {/* <FaveIcon id={id} isFave={isFave} user={user} />
                        <LikeIcon id={id} count={count} isLike={isLike} user={user}/> */}
                    </div>
                </div>
            </div>
            <div className="homedisplay__welcome">Your sets</div>
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
