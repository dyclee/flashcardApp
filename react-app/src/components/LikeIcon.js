import like from '../icons/plant.svg';
import nolike from '../icons/emptyplant.svg';
import { createLike, deleteLike } from '../store/actions/likes';

import React from 'react';
import { useDispatch } from 'react-redux';

export default function LikeIcon ({count, id, isLike, user }) {
    const dispatch = useDispatch();

    const switchLike = async (e) => {
        const action = e.target.name;
        const setId = e.target.className;

        if (action === "create") {
            const resLike = await fetch(`/api/likes/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    setId,
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
                setId,
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
            <img className={id} src={like} name={"delete"} onClick={switchLike} />
            {count}
        </>)
    }
    return (<>
        <img className={id} src={nolike} name={"create"} onClick={switchLike} />
        {count}
    </>)
}
