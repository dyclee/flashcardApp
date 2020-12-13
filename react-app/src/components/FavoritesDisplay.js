import React from 'react';
import { useEffect, useSelector, useDispatch } from 'react-redux';

export default function FavoritesDisplay(){
    const user = useSelector(state => state.userReducer.user);
    const sets = useSelector(state => state.setReducer);
    console.log("USER and SETS", user, sets)

    // useEffect(() => {
    //     (async () => {
    //         c
    //     })()
    // })

    return (<>
    </>)
}
