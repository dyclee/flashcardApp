import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';

import FaveIcon from './FaveIcon';
import LikeIcon from './LikeIcon';
import SetListItem from './SetListItem';


export default function FavoritesDisplay(){
    const [userFaves, setUserFaves] = useState()
    const user = useSelector(state => state.userReducer.user);
    const sets = useSelector(state => state.setReducer);
    const faves = useSelector(state => state.favoriteReducer);
    const likes = useSelector(state => state.likeReducer);
    // const subjects = sets.pop();
    // console.log("USER and SETS", user, sets)

    useEffect(() => {
        (async () => {
            const userfavorites = []
            const setArr = Object.keys(sets).map((key) => {
                let faveObjArr = sets[key].favorites.map((faveObj) => {
                    return faveObj.userId
                })
                console.log("FAVE OBJ ARR", faveObjArr)
                if (faveObjArr.includes(user.id)) {
                    userfavorites.push(sets[key])
                }
            });
            setUserFaves(userfavorites);
        })()
    },[])
    if (!userFaves) return null;

    return (<>
        <article>
            <div className="homedisplay__welcome">Your favorites</div>
            {/* <CreateSetForm subjectOptions={subjectArr}/>
            <CreateSubjectForm /> */}
            <div className="homedisplay__allsets-container">
                {userFaves.map(set => {
                    let id = set.id
                    let setObj = set
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
                            </div>
                        </div>
                    </>)
                })}
            </div>
        </article>
    </>
)
}
