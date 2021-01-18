import like from '../icons/plant.svg';
import nolike from '../icons/emptyplant.svg';
import { createLike, deleteLike } from '../store/actions/likes';

import React from 'react';
import { useDispatch } from 'react-redux';

export default function LikeIcon ({count, id, isLike, user, disable }) {
    const dispatch = useDispatch();

    const switchLike = async (e) => {
        e.preventDefault();
        // if (disable === true) {
        //     e.preventDefault();
        //     return;
        // }
        const action = e.target.name;
        const setId = e.target.className;

        if (action === "create") {
            const resLike = await fetch(`/api/likes/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    setId: id,
                    userId: user.id
                })
            })
            if (resLike.ok) {
                const resObj = await resLike.json();
                dispatch(createLike(resObj.likeObj))
            }
            return;
        }
        const deleteRes = await fetch(`/api/likes/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                setId: id,
                userId: user.id
            })
        })
        if (deleteRes.ok) {
            const resObj = await deleteRes.json();
            dispatch(deleteLike(resObj.likeObj))
            return;
        }
    }
    if (isLike) {
        return (<>
            <img className="likeIcon" src={like} name={"delete"} onClick={switchLike} />
            {/* <strong className="homedisplay__count">{count}</strong> */}
        </>)
    }
    return (<>
        <img className="likeIcon" src={nolike} name={"create"} onClick={switchLike} />
        {/* <strong className="homedisplay__count">{count}</strong> */}
    </>)
}
