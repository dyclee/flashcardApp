import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import SetListItem from './SetListItem';
import LikeIcon from './LikeIcon';
import FaveIcon from './FaveIcon';
import pencil from '../icons/pencil-alt.svg';
import userCircle from '../icons/userCircle.svg';


export default function UserDisplay() {
    const [user, setUser] = useState({});
    const [setArr, setSetArr] = useState();
    // Notice we use useParams here instead of getting the params
    // From props.
    const { userId }  = useParams();
    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    const sets = useSelector(state => state.setReducer);
    const sessionUser = useSelector(state => state.userReducer.user);

    useEffect(() => {
        // console.log("USER ID", userId)
        if (!userId) {
        return
        }
        (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        user.created_date = new Date(user.created_at).toDateString()
        setUser(user);
        const getUserSets = await fetch(`/api/users/${userId}/sets`)
        const userSets = await getUserSets.json();

        const storeSetArr = [];
        userSets.forEach((set) => {
            storeSetArr.push(sets[set.id])
        })
        // console.log("STORE SET ARR", storeSetArr);
        setSetArr(storeSetArr);
        })();
    }, [userId]);

    // console.log("USER", user)
    if (!user || !setArr || !likes || !faves || !sessionUser) {
        return null;
    }

    return (<>
    <main>
            <div className="setheader-everything">
                <div className="userheader-container">
                    <div className="userheader-topline">
                        {<Avatar alt={`${user.username}`} src={user.avatarUrl === "/user-circle.svg" ? userCircle : user.avatarUrl}/>}
                        <div className="userheader-title">{user.username}</div>
                    </div>
                    <div className="userheader-description"><strong>{user.email}</strong></div>
                    <div className="userheader-creator">Created: <strong><i>{user.created_date}</i></strong></div>
                    {/* <div className="userheader-cardcount">{set.card.length} cards</div> */}
                    <div className="userheader-stats">
                        {/* <CreateCardForm setId={id} hidden={hidden} /> */}
                        {/* <FaveIcon id={id} isFave={isFave} user={user} />
                        <LikeIcon id={id} count={count} isLike={isLike} user={user}/> */}
                    </div>
                </div>
            </div>
            <div className="homedisplay__header">
                {sessionUser.id === user.id ?
                <div className="headerdisplay__welcome">Your sets</div>
                :
                <div className="headerdisplay__welcome">{user.username}'s sets</div>
                }
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
                                    <FaveIcon id={id} isFave={isFave} user={sessionUser}/>
                                    <LikeIcon id={id} count={count} isLike={isLike} user={sessionUser} />
                                </div>
                            </div>
                        </>)
                    })}
                </div>
    </main>
    </>);
}
