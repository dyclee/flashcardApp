import heart from '../icons/heart.svg';
import noheart from '../icons/emptyheart.svg';
import { createFavorite, deleteFavorite } from '../store/actions/favorites';

import React from 'react';
import { useDispatch} from 'react-redux';

export default function FaveIcon ({id, isFave, user}) {
    const dispatch = useDispatch()

    const switchFav = async (e) => {
        // console.log(e.target, e.target.name, e.target.className)
        const action = e.target.name;
        const setId = e.target.className;
        // console.log("ACTION", action, "SET ID", setId)
        if (action === "create") {
            const createRes = await fetch(`/api/favorites/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    setId,
                    userId: user.id
                })
            })
            if (createRes.ok) {
                const resObj = await createRes.json();
                // console.log(resObj.favObj)
                // console.log(resObj.favObj.setId)
                dispatch(createFavorite(resObj.favObj))
            }
            return;
        }
        const deleteRes = await fetch(`/api/favorites/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                setId,
                userId: user.id
            })
        })
        if (deleteRes.ok) {
            const resObj = await deleteRes.json();
            // console.log(resObj.favObj.setId)
            dispatch(deleteFavorite(resObj.favObj))
            return;
        }
    }

    if (isFave) {
        return (<img className={id} src={heart} name={"delete"} onClick={switchFav} />)
    }
    return (<img className={id} src={noheart} name={"create"} onClick={switchFav}/>)

}
